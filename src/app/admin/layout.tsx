import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen" style={{ background: "var(--bg)" }}>{children}</div>;
}
