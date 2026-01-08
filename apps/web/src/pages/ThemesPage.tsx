import { themes } from "../theme/themes";

export default function ThemesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Theme selector</h2>
        <p className="text-sm text-slate-400">Choose from curated templates and customize later.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {themes.map((theme) => (
          <div key={theme.id} className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{theme.name}</h3>
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">{theme.typography}</span>
            </div>
            <p className="mt-2 text-sm text-slate-400">{theme.description}</p>
            <div className="mt-4 flex gap-2">
              {theme.palette.map((color) => (
                <div key={color} className="h-8 w-8 rounded-full" style={{ backgroundColor: color }} />
              ))}
            </div>
            <button className="mt-6 w-full rounded-full bg-brand-600 py-2 text-sm">Apply theme</button>
          </div>
        ))}
      </div>
    </div>
  );
}
