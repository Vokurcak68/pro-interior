import Link from "next/link";

const nav = [
  { href: "/", label: "Domů" },
  { href: "/realizace", label: "Naše realizace" },
  { href: "/sluzby", label: "Služby" },
  { href: "/o-nas", label: "O nás" },
  { href: "/kontakt", label: "Kontakt" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b" style={{ borderColor: "var(--line)", background: "rgba(248,250,252,.8)", backdropFilter: "blur(10px)" }}>
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight">
            <span className="text-slate-900">pro-</span>
            <span style={{ color: "var(--brand)" }}>interior</span>
          </Link>

          <nav className="hidden gap-6 text-sm text-slate-700 md:flex">
            {nav.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className="hover:text-slate-950 transition-colors"
              >
                {i.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/kontakt"
              className="rounded-full px-4 py-2 text-sm font-medium text-white"
              style={{ background: "linear-gradient(135deg, var(--brand), var(--brand-2))" }}
            >
              Nezávazná poptávka
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
