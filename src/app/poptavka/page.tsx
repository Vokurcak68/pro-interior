import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function PoptavkaPage() {
  return (
    <div className="min-h-full flex flex-col">
      <SiteHeader />
      <main className="flex-1 py-12" style={{ paddingTop: "calc(var(--header-offset) + 48px)" }}>
        <div className="container">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-[0.22em] uppercase" style={{ color: "var(--brand)" }}>
              POPTÁVKA
            </div>
            <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
              Nezávazná poptávka
            </h1>
            <p className="mt-4 text-slate-600 leading-8">
              Napiš pár řádků o tom, co potřebuješ. Ozveme se a domluvíme další kroky.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            <form
              className="lg:col-span-7 rounded-3xl border p-6"
              style={{ borderColor: "var(--line)", background: "var(--surface)" }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm">
                  <span className="text-slate-700">Jméno</span>
                  <input
                    className="h-11 rounded-xl border px-3"
                    style={{ borderColor: "var(--line)" }}
                    placeholder="Jan Novák"
                  />
                </label>
                <label className="grid gap-2 text-sm">
                  <span className="text-slate-700">E-mail</span>
                  <input
                    type="email"
                    className="h-11 rounded-xl border px-3"
                    style={{ borderColor: "var(--line)" }}
                    placeholder="jan@example.com"
                  />
                </label>
                <label className="grid gap-2 text-sm sm:col-span-2">
                  <span className="text-slate-700">Telefon</span>
                  <input
                    className="h-11 rounded-xl border px-3"
                    style={{ borderColor: "var(--line)" }}
                    placeholder="+420 …"
                  />
                </label>
                <label className="grid gap-2 text-sm sm:col-span-2">
                  <span className="text-slate-700">Zpráva</span>
                  <textarea
                    className="min-h-32 rounded-xl border p-3"
                    style={{ borderColor: "var(--line)" }}
                    placeholder="Popiš prosím co nejvíc: co, kam, rozměry, termín…"
                  />
                </label>
              </div>

              <button
                type="button"
                className="mt-5 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium text-white"
                style={{ background: "linear-gradient(135deg, var(--brand), var(--brand-2))" }}
              >
                Odeslat (zatím bez backendu)
              </button>

              <div className="mt-3 text-xs text-slate-500">
                Formulář zatím jen jako prezentace. Až budeš chtít, dopojíme to na e-mail / DB.
              </div>
            </form>

            <div className="lg:col-span-5">
              <div
                className="rounded-3xl border p-6"
                style={{ borderColor: "var(--line)", background: "var(--surface)" }}
              >
                <div className="text-base font-semibold text-slate-900">Kontakt</div>
                <div className="mt-4 grid gap-3 text-sm text-slate-700">
                  <div>
                    <div className="text-slate-500">Telefon</div>
                    <a
                      className="font-medium text-slate-900 underline decoration-slate-300 hover:decoration-slate-500"
                      href="tel:+420724808157"
                    >
                      +420 724 808 157
                    </a>
                  </div>
                  <div>
                    <div className="text-slate-500">E-mail</div>
                    <a
                      className="font-medium text-slate-900 underline decoration-slate-300 hover:decoration-slate-500"
                      href="mailto:prointerior@gmail.com"
                    >
                      prointerior@gmail.com
                    </a>
                  </div>
                  <div>
                    <div className="text-slate-500">Adresa</div>
                    <div className="font-medium text-slate-900">Lešany 40, 257 44</div>
                  </div>
                </div>

                <div className="mt-6 text-xs text-slate-500">
                  Nebo mrkni na stránku <a className="underline" href="/kontakt">Kontakt</a>.
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
