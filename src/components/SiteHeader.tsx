import Image from "next/image";
import Link from "next/link";

const nav = [
  { href: "/", label: "Domů" },
  { href: "/realizace", label: "Naše realizace" },
  { href: "/sluzby", label: "Služby" },
  { href: "/o-nas", label: "O nás" },
  { href: "/kontakt", label: "Kontakt" },
];

export function SiteHeader({ variant = "sticky" }: { variant?: "sticky" | "overlay" }) {
  const isOverlay = variant === "overlay";

  return (
    <header
      className={isOverlay ? "absolute inset-x-0 top-0 z-40" : "sticky top-0 z-40 border-b"}
      style={
        isOverlay
          ? {
              borderColor: "transparent",
              background: "transparent",
            }
          : {
              borderColor: "var(--line)",
              background: "rgba(255, 247, 237, .85)",
              backdropFilter: "blur(10px)",
            }
      }
    >
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.jpg"
              alt="Pro-Interior"
              width={36}
              height={36}
              className={isOverlay ? "rounded-lg" : "rounded-lg border"}
              style={isOverlay ? undefined : { borderColor: "var(--line)" }}
            />
            <div className="leading-tight">
              <div className={isOverlay ? "font-semibold tracking-tight text-white" : "font-semibold tracking-tight text-slate-900"}>
                pro-interior
              </div>
              <div className={isOverlay ? "text-xs text-white/80" : "text-xs"} style={isOverlay ? undefined : { color: "var(--wood)" }}>
                truhlářství
              </div>
            </div>
          </Link>

          <nav className={isOverlay ? "hidden gap-6 text-sm text-white/90 md:flex" : "hidden gap-6 text-sm text-slate-700 md:flex"}>
            {nav.map((i) => (
              <Link key={i.href} href={i.href} className={isOverlay ? "hover:text-white transition-colors" : "hover:text-slate-950 transition-colors"}>
                {i.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/kontakt"
              className={isOverlay ? "rounded-full px-4 py-2 text-sm font-medium text-slate-900" : "rounded-full px-4 py-2 text-sm font-medium text-white"}
              style={
                isOverlay
                  ? { background: "rgba(255,255,255,.92)", border: "1px solid rgba(255,255,255,.25)" }
                  : { background: "linear-gradient(135deg, var(--brand), var(--brand-2))" }
              }
            >
              Nezávazná poptávka
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
