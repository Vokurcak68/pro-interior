import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function KontaktPage() {
  return (
    <div className="min-h-full flex flex-col">
      <SiteHeader />
      <main className="flex-1 py-12">
        <div className="container">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: "var(--brand)" }}>
              KONTAKT
            </div>
            <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
              Kontakt
            </h1>
            <p className="mt-4 text-slate-600 leading-8">
              Ozvi se – telefon, e-mail nebo se stav podle adresy.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div
                className="rounded-3xl border p-6"
                style={{ borderColor: "var(--line)", background: "var(--surface)" }}
              >
                <div className="text-base font-semibold text-slate-900">Kde nás najdete</div>
                <div className="mt-3 text-sm text-slate-600 leading-7">
                  Pokud chceš poslat nezávaznou poptávku přes formulář, použij stránku{" "}
                  <a className="underline" href="/poptavka">Poptávka</a>.
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl border p-6" style={{ borderColor: "var(--line)", background: "var(--surface)" }}>
                <div className="text-base font-semibold text-slate-900">Kontakt</div>
                <div className="mt-4 grid gap-3 text-sm text-slate-700">
                  <div>
                    <div className="text-slate-500">Firma</div>
                    <div className="font-medium text-slate-900">Tomáš Prostecký – PRO-interior</div>
                  </div>
                  <div>
                    <div className="text-slate-500">Adresa</div>
                    <div className="font-medium text-slate-900">Lešany 40, 257 44</div>
                  </div>
                  <div>
                    <div className="text-slate-500">Telefon</div>
                    <a className="font-medium text-slate-900 underline decoration-slate-300 hover:decoration-slate-500" href="tel:+420724808157">
                      +420 724 808 157
                    </a>
                  </div>
                  <div>
                    <div className="text-slate-500">E-mail</div>
                    <a className="font-medium text-slate-900 underline decoration-slate-300 hover:decoration-slate-500" href="mailto:prointerior@gmail.com">
                      prointerior@gmail.com
                    </a>
                  </div>
                </div>

                <div className="mt-6 overflow-hidden rounded-2xl border" style={{ borderColor: "var(--line)" }}>
                  <div className="aspect-[4/3]">
                    <iframe
                      title="Mapa – Lešany 40, 257 44"
                      className="h-full w-full"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      src="https://www.google.com/maps?q=Le%C5%A1any%2040%2C%20257%2044&output=embed"
                    />
                  </div>
                  <div className="border-t px-4 py-3 text-xs" style={{ borderColor: "var(--line)", background: "rgba(255,255,255,.6)" }}>
                    <a
                      className="font-medium text-slate-900 underline decoration-slate-300 hover:decoration-slate-500"
                      href="https://www.google.com/maps/search/?api=1&query=Le%C5%A1any%2040%2C%20257%2044"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Otevřít v Google Maps
                    </a>
                  </div>
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
