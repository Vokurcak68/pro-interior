"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const nav = [
  { href: "/", label: "Domů" },
  { href: "/realizace", label: "Naše realizace" },
  { href: "/sluzby", label: "Služby" },
  { href: "/o-nas", label: "O nás" },
  { href: "/kontakt", label: "Kontakt" },
];

export function SiteHeader({ variant = "sticky" }: { variant?: "sticky" | "overlay" }) {
  const isOverlay = variant === "overlay";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isOverlay) return;
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isOverlay]);

  const darkBarStyle = useMemo(
    () =>
      ({
        borderColor: "rgba(255,255,255,.10)",
        background:
          "linear-gradient(90deg, rgba(0,0,0,.62) 0%, rgba(0,0,0,.32) 55%, rgba(0,0,0,.18) 100%), url(/realizace/hero-1.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backdropFilter: "blur(10px)",
      }) as const,
    [],
  );

  const overlayStyle = useMemo(() => {
    // overlay: nahoře průhledné přes hero, po scrollu / otevření menu přejde na tmavý bar
    if (!isOverlay) return undefined;
    if (!scrolled && !open) {
      return { borderColor: "transparent", background: "transparent" } as const;
    }
    return darkBarStyle;
  }, [isOverlay, scrolled, open, darkBarStyle]);

  // Sticky varianta na ostatních stránkách: vždy tmavý bar + stejné pozadí jako homepage
  const stickyStyle = darkBarStyle;

  const navClass = "text-white/90";
  const navHover = "hover:text-white";

  return (
    <header
      className={isOverlay ? "fixed inset-x-0 top-0 z-40" : "sticky top-0 z-40 border-b"}
      style={isOverlay ? overlayStyle : stickyStyle}
    >
      <div className="container">
        <div className="flex h-16 items-center justify-between gap-3">
          <Link href="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
            <Image
              src="/logo.jpg"
              alt="PRO-interior"
              width={34}
              height={34}
              className={isOverlay ? "rounded-lg" : "rounded-lg border"}
              style={isOverlay ? undefined : { borderColor: "var(--line)" }}
            />
            <div className="min-w-0 leading-tight">
              <div
                className={
                  isOverlay
                    ? "font-semibold tracking-tight text-white truncate text-sm sm:text-base"
                    : "font-semibold tracking-tight text-slate-900 truncate text-sm sm:text-base"
                }
              >
                PRO-interior
              </div>
              <div
                className={isOverlay ? "hidden sm:block text-xs text-white/80" : "hidden sm:block text-xs"}
                style={isOverlay ? undefined : { color: "var(--wood)" }}
              >
                truhlářství
              </div>
            </div>
          </Link>

          {/* Desktop menu */}
          <nav className={isOverlay ? "hidden gap-6 text-sm text-white/90 md:flex" : "hidden gap-6 text-sm text-slate-700 md:flex"}>
            {nav.map((i) => (
              <Link key={i.href} href={i.href} className={`${navHover} transition-colors`}>
                {i.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            {/* Mobile hamburger */}
            <button
              type="button"
              className={
                isOverlay
                  ? "md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10"
                  : "md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border"
              }
              style={isOverlay ? undefined : { borderColor: "var(--line)", background: "rgba(255,255,255,.92)" }}
              aria-label={open ? "Zavřít menu" : "Otevřít menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke={isOverlay ? "white" : "currentColor"}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <Link
              href="/kontakt"
              className={
                isOverlay
                  ? "hidden sm:inline-flex rounded-full px-4 py-2 text-sm font-medium text-slate-900 whitespace-nowrap"
                  : "hidden sm:inline-flex rounded-full px-4 py-2 text-sm font-medium text-white whitespace-nowrap"
              }
              style={
                isOverlay
                  ? { background: "rgba(255,255,255,.92)", border: "1px solid rgba(255,255,255,.25)" }
                  : { background: "linear-gradient(135deg, var(--brand), var(--brand-2))" }
              }
              onClick={() => setOpen(false)}
            >
              Nezávazná poptávka
            </Link>
          </div>
        </div>

        {/* Mobile dropdown */}
        {open ? (
          <div className="md:hidden pb-4">
            <div
              className={
                isOverlay
                  ? "rounded-2xl p-4 border border-white/20 bg-black/30 backdrop-blur"
                  : "rounded-2xl p-4 border"
              }
              style={isOverlay ? undefined : { borderColor: "var(--line)", background: "rgba(255,255,255,.96)" }}
            >
              <div className={`grid gap-1 text-sm ${navClass}`}>
                {nav.map((i) => (
                  <Link
                    key={i.href}
                    href={i.href}
                    className={`${navHover} transition-colors py-2`}
                    onClick={() => setOpen(false)}
                  >
                    {i.label}
                  </Link>
                ))}
                <Link
                  href="/kontakt"
                  className={`${navHover} transition-colors py-2 sm:hidden`}
                  onClick={() => setOpen(false)}
                >
                  Nezávazná poptávka
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
