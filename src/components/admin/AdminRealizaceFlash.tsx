"use client";

import { useEffect, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function AdminRealizaceFlash({
  hasFlash,
}: {
  hasFlash: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const cleanUrl = useMemo(() => {
    // odstraníme jen naše flash parametry
    const next = new URLSearchParams(sp.toString());
    next.delete("deleted");
    next.delete("created");
    next.delete("updated");
    next.delete("err");
    const qs = next.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  }, [pathname, sp]);

  useEffect(() => {
    if (!hasFlash) return;

    const t = setTimeout(() => {
      router.replace(cleanUrl, { scroll: false });
    }, 2500);

    return () => clearTimeout(t);
  }, [hasFlash, router, cleanUrl]);

  return null;
}
