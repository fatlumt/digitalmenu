import { Download } from "lucide-react";

export default function PublishPage() {
  const publicUrl = "https://digitalmenu.com/saffron-table";

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
        <h2 className="text-xl font-semibold">Publish menu</h2>
        <p className="mt-2 text-sm text-slate-400">Launch your menu and download QR codes.</p>
        <div className="mt-6 rounded-2xl border border-dashed border-slate-700 bg-slate-950 p-6">
          <p className="text-xs uppercase text-slate-500">Public URL</p>
          <p className="mt-2 text-lg font-semibold text-white">{publicUrl}</p>
          <button className="mt-4 rounded-full bg-brand-600 px-4 py-2 text-sm">Publish now</button>
        </div>
      </section>
      <aside className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
        <h3 className="text-lg font-semibold">QR assets</h3>
        <p className="mt-2 text-sm text-slate-400">Download PNG or SVG, print-ready sizes.</p>
        <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950 p-4 text-center text-xs text-slate-400">
          QR preview
        </div>
        <div className="mt-4 space-y-2">
          <button className="flex w-full items-center justify-between rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200">
            Download PNG <Download className="h-4 w-4" />
          </button>
          <button className="flex w-full items-center justify-between rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200">
            Download SVG <Download className="h-4 w-4" />
          </button>
          <button className="flex w-full items-center justify-between rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200">
            Print-ready PDF <Download className="h-4 w-4" />
          </button>
        </div>
      </aside>
    </div>
  );
}
