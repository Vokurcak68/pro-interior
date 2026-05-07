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
      <main className="flex-1">
        {/* HERO (cover jako Tříska) */}
        <section className="relative">
          <div
            className="min-h-[520px] sm:min-h-[620px]"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(0,0,0,.72) 0%, rgba(0,0,0,.28) 55%, rgba(0,0,0,.10) 100%), url(/realizace/hero-1.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <SiteHeader variant="overlay" />

            <div className="container h-full">
              <div className="pt-28 sm:pt-32">
                <div className="max-w-2xl">
                  <h1 className="text-white text-4xl sm:text-6xl font-semibold tracking-tight">
                    PRO-interior
                  </h1>
                  <p className="mt-5 text-white/90 text-lg leading-8">
                    Vyrábíme nábytek na míru s důrazem na kvalitu, preciznost a včasné dodání.
                    Specializujeme se na kuchyně, vestavby a nábytek na míru.
                  </p>
                </div>
              </div>

              {/* 3 boxy jako na Tříska */}
              <div className="mt-10 pb-10 grid gap-4 lg:grid-cols-3">
                {[{
                  title: "Nábytek na míru",
                  desc: "Klademe důraz na kvalitu, precizní zpracování a spolehlivé dodání.",
                  href: "/sluzby",
                  cta: "Všechny naše služby",
                },{
                  title: "Realizace mluví za nás",
                  desc: "Každá zakázka je pro nás jedinečnou výzvou, které se s nadšením věnujeme.",
                  href: "/realizace",
                  cta: "Realizace",
                },{
                  title: "Rádi poradíme",
                  desc: "Kontaktujte nás a společně vytvoříme projekt přesně podle vašich představ.",
                  href: "/kontakt",
                  cta: "Kontaktujte nás",
                }].map((b) => (
                  <div key={b.title} className="rounded-3xl overflow-hidden" style={{ background: "rgba(255,255,255,.92)", border: "1px solid rgba(255,255,255,.25)" }}>
                    <div className="p-7">
                      <h2 className="text-xl font-semibold text-slate-900">{b.title}</h2>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{b.desc}</p>
                      <div className="mt-4">
                        <Link href={b.href} className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: "var(--wood)" }}>
                          {b.cta}
                          <span aria-hidden>→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>


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
                  className="aspect-[4/3] w-full bg-center bg-cover"
                  style={{
                    backgroundImage:
                      `url(/realizace/hero-${(i % 6) + 1}.jpg), linear-gradient(135deg, rgba(249,115,22,.10), rgba(245,158,11,.06))`,
                  }}
                  aria-label={`Realizace ${i + 1}`}
                />
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
