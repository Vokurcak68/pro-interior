export default function AdminLoginPage() {
  return (
    <div className="container py-12">
      <div className="max-w-sm rounded-2xl border p-6" style={{ borderColor: "var(--line)", background: "var(--surface)" }}>
        <h1 className="text-xl font-semibold text-slate-900">Přihlášení (admin)</h1>
        <p className="mt-2 text-sm text-slate-600">Zadej admin heslo.</p>

        <form className="mt-6 grid gap-3" action="/admin/api/login" method="post">
          <input
            type="password"
            name="password"
            placeholder="Heslo"
            className="w-full rounded-xl border px-4 py-3 text-sm"
            style={{ borderColor: "var(--line)", background: "white" }}
            required
          />
          <button
            type="submit"
            className="rounded-full px-5 py-3 text-sm font-medium text-white"
            style={{ background: "linear-gradient(135deg, var(--brand), var(--brand-2))" }}
          >
            Přihlásit
          </button>
        </form>
      </div>
    </div>
  );
}
