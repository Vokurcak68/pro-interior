import crypto from "node:crypto";

const COOKIE_NAME = "pi_admin";

function base64url(buf: Buffer) {
  return buf
    .toString("base64")
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function fromBase64url(s: string) {
  const pad = "===".slice((s.length + 3) % 4);
  return Buffer.from(s.replaceAll("-", "+").replaceAll("_", "/") + pad, "base64");
}

function sign(payload: string, secret: string) {
  const mac = crypto.createHmac("sha256", secret).update(payload).digest();
  return base64url(mac);
}

export function makeAdminCookie(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SECRET;
  if (!expected || !secret) throw new Error("Missing ADMIN_PASSWORD or ADMIN_SECRET");

  if (password !== expected) return null;

  const exp = Date.now() + 1000 * 60 * 60 * 24 * 14; // 14 days
  const payload = JSON.stringify({ exp });
  const token = `${base64url(Buffer.from(payload))}.${sign(payload, secret)}`;

  return { token, exp };
}

export function clearAdminCookie() {
  return { token: "", exp: 0 };
}

export function isAdminFromCookie(cookieValue: string | undefined) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  if (!cookieValue) return false;

  const [p64, sig] = cookieValue.split(".");
  if (!p64 || !sig) return false;

  let payload: string;
  try {
    payload = fromBase64url(p64).toString("utf8");
  } catch {
    return false;
  }

  const expectedSig = sign(payload, secret);
  // timingSafeEqual requires equal length buffers
  if (sig.length !== expectedSig.length) return false;
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expectedSig))) return false;

  try {
    const data = JSON.parse(payload) as { exp: number };
    return Date.now() < data.exp;
  } catch {
    return false;
  }
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
