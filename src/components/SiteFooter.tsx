import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t" style={{ borderColor: "var(--line)" }}>
      <div className="container">
        <div className="py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="text-sm text-slate-600">
            <div className="font-semibold text-slate-900">Interiéry navržené PRO vás</div>
            <div className="mt-2 text-slate-600">truhlářství na míru</div>
          </div>

          <div className="text-sm text-slate-700">
            <div className="text-slate-500">Kontakt</div>
            <div className="mt-3 grid gap-2">
              <a
                className="underline decoration-slate-300 hover:decoration-slate-500"
                href="tel:+420724808157"
              >
                +420 724 808 157
              </a>
              <a
                className="underline decoration-slate-300 hover:decoration-slate-500"
                href="mailto:prointerior@gmail.com"
              >
                prointerior@gmail.com
              </a>
              <div className="text-slate-600">Lešany 40, 257 44</div>
            </div>
          </div>

          <div className="text-sm text-slate-700">
            <div className="text-slate-500">Rychlé odkazy</div>
            <div className="mt-3 grid gap-2">
              <Link className="underline decoration-slate-300 hover:decoration-slate-500" href="/realizace">
                Realizace
              </Link>
              <Link className="underline decoration-slate-300 hover:decoration-slate-500" href="/sluzby">
                Služby
              </Link>
              <Link className="underline decoration-slate-300 hover:decoration-slate-500" href="/kontakt">
                Kontakt
              </Link>
              <Link className="underline decoration-slate-300 hover:decoration-slate-500" href="/poptavka">
                Nezávazná poptávka
              </Link>
            </div>
          </div>
        </div>

        <div
          className="py-6 text-xs text-slate-500 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-t"
          style={{ borderColor: "var(--line)" }}
        >
          <div>© {new Date().getFullYear()} PRO-interior</div>
          <div>Vyrobeno v ČR</div>
        </div>
      </div>
    </footer>
  );
}
