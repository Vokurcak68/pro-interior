export function SiteFooter() {
  return (
    <footer className="border-t" style={{ borderColor: "var(--line)" }}>
      <div className="container">
        <div className="py-10 text-sm text-slate-600 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="font-medium text-slate-900">PRO-interior</span> — truhlářství na míru
          </div>
          <div className="text-slate-500">© {new Date().getFullYear()}</div>
        </div>
      </div>
    </footer>
  );
}
