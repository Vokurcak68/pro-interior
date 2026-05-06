import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

// Placeholder. Až napojíme Supabase, bude se to tahat z DB.
const items = Array.from({ length: 12 }).map((_, i) => ({
  id: `demo-${i + 1}`,
  title: `Realizace #${i + 1}`,
  category: i % 3 === 0 ? "Kuchyně" : i % 3 === 1 ? "Vestavby" : "Nábytek",
}));

export default function RealizacePage() {
  return (
    <div className="min-h-full flex flex-col">
      <SiteHeader />
      <main className="flex-1 py-12">
        <div className="container">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: "var(--brand)" }}>
              NAŠE REALIZACE
            </div>
            <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
              Ukázky práce
            </h1>
            <p className="mt-4 text-slate-600 leading-8">
              Kuchyně, vestavěné skříně i nábytek na míru. Postupně sem budeme
              přidávat další realizace.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((it, idx) => (
              <Link
                key={it.id}
                href={`/realizace/${it.id}`}
                className="rounded-2xl border overflow-hidden block"
                style={{ borderColor: "var(--line)", background: "var(--surface)" }}
              >
                <div
                  className="aspect-[4/3] w-full"
                  style={{
                    backgroundImage: `url(/realizace/r${String((idx % 12) + 1).padStart(2, "0")}.svg)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  aria-label={it.title}
                />
                <div className="p-4">
                  <div className="text-sm font-medium text-slate-900">{it.title}</div>
                  <div className="mt-1 text-xs text-slate-600">{it.category}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
