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
        // jen šedohnědý bar (bez obrázku), aby header nebyl "foto".
        background: "linear-gradient(135deg, rgba(87, 60, 38, .78), rgba(60, 41, 26, .72))",
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

  const headerIsDark = isOverlay || variant === "sticky";

  const navClass = headerIsDark ? "text-white/90" : "text-slate-700";
  const navHover = headerIsDark ? "hover:text-white" : "hover:text-slate-950";

  return (
    <>
      <header
        className={"fixed inset-x-0 top-0 z-40"}
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
                  headerIsDark
                    ? "font-semibold tracking-tight text-white truncate text-sm sm:text-base"
                    : "font-semibold tracking-tight text-slate-900 truncate text-sm sm:text-base"
                }
              >
                PRO-interior
              </div>
              <div
                className={headerIsDark ? "hidden sm:block text-xs text-white/80" : "hidden sm:block text-xs"}
                style={headerIsDark ? undefined : { color: "var(--wood)" }}
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
              href="/poptavka"
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
                // Na homepage chceme dropdown světlý jako na ostatních stránkách.
                "rounded-2xl p-4 border"
              }
              style={{ borderColor: "var(--line)", background: "rgba(255,255,255,.96)" }}
            >
              <div className="grid gap-1 text-sm text-slate-700">
                {nav.map((i) => (
                  <Link
                    key={i.href}
                    href={i.href}
                    className="hover:text-slate-950 transition-colors py-2"
                    onClick={() => setOpen(false)}
                  >
                    {i.label}
                  </Link>
                ))}
                <Link
                  href="/poptavka"
                  className="hover:text-slate-950 transition-colors py-2 sm:hidden"
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
      {/* Spacer aby obsah nezačínal pod fixed headrem (na homepage hero to řeší paddingTop) */}
      {!isOverlay ? (
        <div
          className="h-24"
          style={{ height: "calc(64px + env(safe-area-inset-top) + 24px)" }}
        />
      ) : null}
    </>
  );
}
