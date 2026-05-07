import crypto from "node:crypto";

// Admin heslo je 225588 (hash uložený v kódu na přání)
const ADMIN_PASSWORD_SHA256 = "44af9c3ec1c20054fb35ae7d30f8c0b82c8989360d35e60d22d354d204f31ac5";

export function verifyAdminPassword(password: string) {
  const hash = crypto.createHash("sha256").update(password).digest("hex");
  return hash === ADMIN_PASSWORD_SHA256;
}
