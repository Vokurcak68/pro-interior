import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Section } from "@/components/Section";

const services = [
  {
    title: "Kuchyně na míru",
    desc: "Návrh, výroba a montáž. Čisté detaily, chytré úložné prostory.",
  },
  {
    title: "Vestavěné skříně",
    desc: "Maximální využití prostoru. Ložnice, chodby, šatny.",
  },
  {
    title: "Nábytek do interiéru",
    desc: "Obývák, koupelna, pracovna. Materiály podle potřeby i rozpočtu.",
  },
];

export default function Home() {
  return (
    <div className="min-h-full flex flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* HERO */}
        <section className="pt-10 sm:pt-16">
          <div className="container">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-6">
                <div className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: "var(--brand)" }}>
                  TRUHLÁŘSTVÍ PRO-INTERIOR
                </div>
                <h1 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
                  Interiéry na míru.
                  <br />
                  Čistý detail. Poctivá práce.
                </h1>
                <p className="mt-5 text-lg leading-8 text-slate-600 max-w-xl">
                  Kuchyně, vestavby a nábytek přesně podle prostoru. Přivezu vzorky,
                  domluvíme detaily a dodáme výsledek, co vydrží.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/kontakt"
                    className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium text-white"
                    style={{ background: "linear-gradient(135deg, var(--brand), var(--brand-2))" }}
                  >
                    Nezávazná poptávka
                  </Link>
                  <Link
                    href="/realizace"
                    className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium border"
                    style={{ borderColor: "var(--line)", background: "var(--surface)" }}
                  >
                    Naše realizace
                  </Link>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
                  <div className="rounded-2xl border p-4" style={{ borderColor: "var(--line)", background: "var(--surface)" }}>
                    <div className="text-xl font-semibold text-slate-900">10+ let</div>
                    <div className="text-sm text-slate-600">zkušeností</div>
                  </div>
                  <div className="rounded-2xl border p-4" style={{ borderColor: "var(--line)", background: "var(--surface)" }}>
                    <div className="text-xl font-semibold text-slate-900">Na míru</div>
                    <div className="text-sm text-slate-600">každý kus</div>
                  </div>
                  <div className="rounded-2xl border p-4" style={{ borderColor: "var(--line)", background: "var(--surface)" }}>
                    <div className="text-xl font-semibold text-slate-900">Montáž</div>
                    <div className="text-sm text-slate-600">bez stresu</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div
                className="aspect-[4/3] w-full rounded-3xl border overflow-hidden"
                style={{
                  borderColor: "var(--line)",
                  background:
                    "linear-gradient(135deg, rgba(249,115,22,.18), rgba(245,158,11,.08))",
                }}
              >
                <div className="h-full w-full flex items-center justify-center text-slate-600 text-sm">
                  Sem přijde velká fotka realizace (hero)
                </div>
              </div>
              <div className="mt-3 text-xs text-slate-500">
                Řemeslný vibe: teplejší pozadí + oranžový akcent + fotky detailů.
              </div>
              </div>
            </div>
          </div>
        </section>

        {/* SLUŽBY */}
        <Section title="Co pro vás vyrobíme" kicker="Služby">
          <div className="grid gap-4 md:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border p-6"
                style={{ borderColor: "var(--line)", background: "var(--surface)" }}
              >
                <div className="text-base font-semibold text-slate-900">{s.title}</div>
                <div className="mt-2 text-sm leading-7 text-slate-600">{s.desc}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* REALIZACE PREVIEW */}
        <Section title="Naše realizace" kicker="Ukázky práce">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border overflow-hidden"
                style={{ borderColor: "var(--line)", background: "var(--surface)" }}
              >
                <div
                  className="aspect-[4/3] w-full flex items-center justify-center text-slate-500 text-sm"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(249,115,22,.10), rgba(245,158,11,.06))",
                  }}
                >
                  Fotka realizace (doplníme)
                </div>
                <div className="p-4">
                  <div className="text-sm font-medium text-slate-900">Realizace #{i + 1}</div>
                  <div className="mt-1 text-xs text-slate-600">Kuchyně / Vestavba / Nábytek</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="/realizace"
              className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium border"
              style={{ borderColor: "var(--line)", background: "var(--surface)" }}
            >
              Zobrazit všechny realizace
            </Link>
          </div>
        </Section>
      </main>

      <SiteFooter />
    </div>
  );
}
