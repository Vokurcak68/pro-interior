import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getRealizaceById } from "@/lib/realizaceStore";

export default async function RealizaceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = getRealizaceById(id);

  if (!item || !item.published) notFound();

  const mainBg = item.imageUrl
    ? `url(${item.imageUrl}), linear-gradient(135deg, rgba(249,115,22,.10), rgba(245,158,11,.06))`
    : "linear-gradient(135deg, rgba(249,115,22,.10), rgba(245,158,11,.06))";

  return (
    <div className="min-h-full flex flex-col">
      <SiteHeader />
      <main className="flex-1 py-12">
        <div className="container">
          <div className="text-sm text-slate-600">
            <Link href="/realizace" className="hover:underline">
              ← Zpět na realizace
            </Link>
          </div>

          <div className="mt-6 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div
                className="aspect-[4/3] w-full rounded-3xl border overflow-hidden"
                style={{ borderColor: "var(--line)", background: "var(--surface)" }}
              >
                <div
                  className="h-full w-full bg-center bg-cover"
                  style={{ backgroundImage: mainBg }}
                  aria-label={item.title}
                />
              </div>

              {/* Zatím máme jen 1 fotku na realizaci. Jakmile bude galerie, přidáme sem další fotky. */}
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl border p-6" style={{ borderColor: "var(--line)", background: "var(--surface)" }}>
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{item.title}</h1>
                <p className="mt-3 text-slate-600 leading-8">{item.description}</p>

                <dl className="mt-6 grid gap-4 text-sm">
                  <div>
                    <dt className="text-slate-500">Kategorie</dt>
                    <dd className="font-medium text-slate-900">Kuchyně / Vestavby / Nábytek</dd>
                  </div>
                  <div>
                    <dt className="text-slate-500">Lokalita</dt>
                    <dd className="font-medium text-slate-900">Praha a okolí</dd>
                  </div>
                  <div>
                    <dt className="text-slate-500">Rok</dt>
                    <dd className="font-medium text-slate-900">2026</dd>
                  </div>
                </dl>

                <div className="mt-8 flex gap-3">
                  <Link
                    href="/kontakt"
                    className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium text-white"
                    style={{ background: "linear-gradient(135deg, var(--brand), var(--brand-2))" }}
                  >
                    Chci podobnou realizaci
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
