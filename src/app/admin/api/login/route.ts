import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, makeAdminCookie } from "@/lib/adminAuth";

export async function POST(req: Request) {
  const form = await req.formData();
  const password = String(form.get("password") || "");

  const cookie = makeAdminCookie(password);
  if (!cookie) {
    // explicit 303 redirect so mobile browsers don't behave weirdly after POST
    return NextResponse.redirect(new URL("/admin/prihlaseni?err=1", req.url), 303);
  }

  const res = NextResponse.redirect(new URL("/admin", req.url), 303);
  res.cookies.set(ADMIN_COOKIE_NAME, cookie.token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    expires: new Date(cookie.exp),
  });
  return res;
}
