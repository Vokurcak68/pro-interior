import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function ONasPage() {
  return (
    <div className="min-h-full flex flex-col">
      <SiteHeader />
      <main className="flex-1 py-12">
        <div className="container">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: "var(--brand)" }}>
              O NÁS
            </div>
            <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
              Poctivá výroba, čistý detail
            </h1>
            <p className="mt-4 text-slate-600 leading-8">
              Jsme truhlářství zaměřené na interiéry na míru. Dáváme si záležet na
              detailech, přesnosti a férové domluvě.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              ["Domluva", "Vyslechneme potřeby, navrhneme řešení a sladíme rozpočet."],
              ["Výroba", "Kvalitní materiály, precizní zpracování, kontrola detailu."],
              ["Montáž", "Čistá montáž a předání díla tak, aby to dávalo smysl."],
            ].map(([t, d]) => (
              <div key={t} className="rounded-2xl border p-6" style={{ borderColor: "var(--line)", background: "var(--surface)" }}>
                <div className="text-base font-semibold text-slate-900">{t}</div>
                <div className="mt-2 text-sm leading-7 text-slate-600">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
