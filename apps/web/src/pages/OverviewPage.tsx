export default function OverviewPage() {
  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-3">
        {["Active Menus", "Published Restaurants", "Weekly Views"].map((label) => (
          <div key={label} className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">{label}</p>
            <p className="mt-3 text-3xl font-semibold">—</p>
            <div className="mt-4 h-2 w-full rounded-full bg-slate-800">
              <div className="h-2 w-1/2 rounded-full bg-brand-600" />
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
        <h2 className="text-xl font-semibold">Create your first menu</h2>
        <p className="mt-2 text-sm text-slate-400">
          Start by creating a restaurant workspace, then add categories and items. Preview and publish to go live.
        </p>
        <div className="mt-6 flex gap-3">
          <button className="rounded-full bg-brand-600 px-5 py-2 text-sm">New Restaurant</button>
          <button className="rounded-full border border-slate-700 px-5 py-2 text-sm text-slate-200">View guide</button>
        </div>
      </section>
    </div>
  );
}
