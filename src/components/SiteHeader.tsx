"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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

  const navClass = isOverlay ? "text-white/90" : "text-slate-700";
  const navHover = isOverlay ? "hover:text-white" : "hover:text-slate-950";

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
          <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
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

          {/* Desktop menu */}
          <nav className={isOverlay ? "hidden gap-6 text-sm text-white/90 md:flex" : "hidden gap-6 text-sm text-slate-700 md:flex"}>
            {nav.map((i) => (
              <Link key={i.href} href={i.href} className={`${navHover} transition-colors`}>
                {i.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Mobile menu button */}
            <button
              type="button"
              className={
                isOverlay
                  ? "md:hidden rounded-full px-3 py-2 text-sm font-medium text-white/95 border border-white/25 bg-white/10"
                  : "md:hidden rounded-full px-3 py-2 text-sm font-medium text-slate-900 border"
              }
              style={isOverlay ? undefined : { borderColor: "var(--line)", background: "rgba(255,255,255,.9)" }}
              aria-label="Menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              Menu
            </button>

            <Link
              href="/kontakt"
              className={isOverlay ? "rounded-full px-4 py-2 text-sm font-medium text-slate-900" : "rounded-full px-4 py-2 text-sm font-medium text-white"}
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
          <div
            className={
              isOverlay
                ? "md:hidden pb-4"
                : "md:hidden pb-4"
            }
          >
            <div
              className={
                isOverlay
                  ? "rounded-2xl p-4 border border-white/20 bg-black/30 backdrop-blur"
                  : "rounded-2xl p-4 border"
              }
              style={isOverlay ? undefined : { borderColor: "var(--line)", background: "rgba(255,255,255,.92)" }}
            >
              <div className={`grid gap-2 text-sm ${navClass}`}>
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
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
