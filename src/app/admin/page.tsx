import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, isAdminFromCookie } from "@/lib/adminAuth";

export default async function AdminHome() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!isAdminFromCookie(token)) redirect("/admin/prihlaseni");

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Admin</h1>
        <form action="/admin/api/logout" method="post">
          <button className="rounded-full px-4 py-2 text-sm font-medium border" style={{ borderColor: "var(--line)", background: "var(--surface)" }}>
            Odhlásit
          </button>
        </form>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/admin/realizace" className="rounded-2xl border p-6" style={{ borderColor: "var(--line)", background: "var(--surface)" }}>
          <div className="text-base font-semibold text-slate-900">Realizace</div>
          <div className="mt-2 text-sm text-slate-600">Přidat / upravit realizace, nahrát fotky.</div>
        </Link>
      </div>
    </div>
  );
}
