import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function SluzbyPage() {
  return (
    <div className="min-h-full flex flex-col">
      <SiteHeader />
      <main className="flex-1 py-12" style={{ paddingTop: "calc(var(--header-offset) + 48px)" }}>
        <div className="container">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: "var(--brand)" }}>
              SLUŽBY
            </div>
            <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
              Co umíme
            </h1>
            <p className="mt-4 text-slate-600 leading-8">
              Kuchyně na míru, vestavěné skříně, nábytek do interiéru, atypické
              řešení podle prostoru.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {[
              ["Kuchyně na míru", "Od návrhu po montáž. Včetně spotřebičů dle domluvy."],
              ["Vestavěné skříně", "Chodby, šatny, ložnice. Prakticky a čistě."],
              ["Obývací stěny", "TV stěny, knihovny, designové prvky."],
              ["Koupelnový nábytek", "Odolné materiály, chytré řešení úložných prostor."],
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
