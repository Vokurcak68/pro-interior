"use client";

import { useCallback } from "react";

export default function ConfirmDeleteRealizaceForm({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    // Native confirm – žádná server action, čistě klient.
    const ok = window.confirm(`Opravdu smazat realizaci „${title}“?`);
    if (!ok) e.preventDefault();
  }, [title]);

  return (
    <form action="/admin/api/realizace/delete" method="post" onSubmit={onSubmit}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="rounded-full px-4 py-2 text-xs font-semibold border"
        style={{ borderColor: "rgba(239,68,68,.35)", background: "rgba(239,68,68,.08)", color: "#991b1b" }}
      >
        Smazat
      </button>
    </form>
  );
}
