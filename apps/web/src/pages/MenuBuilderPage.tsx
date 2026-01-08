import { GripVertical, Plus } from "lucide-react";

const sampleCategories = [
  {
    name: "Starters",
    items: [
      { name: "Truffle Arancini", price: "$14" },
      { name: "Roasted Carrots", price: "$10" },
    ],
  },
  {
    name: "Mains",
    items: [
      { name: "Charred Salmon", price: "$28" },
      { name: "Wild Mushroom Risotto", price: "$24" },
    ],
  },
];

export default function MenuBuilderPage() {
  return (
    <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
      <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Menu builder</h2>
            <p className="text-sm text-slate-400">Inline edit items and drag to reorder.</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm">
            <Plus className="h-4 w-4" /> Add category
          </button>
        </div>

        <div className="mt-6 space-y-6">
          {sampleCategories.map((category) => (
            <div key={category.name} className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GripVertical className="h-4 w-4 text-slate-500" />
                  <input
                    className="bg-transparent text-lg font-semibold text-white outline-none"
                    defaultValue={category.name}
                  />
                </div>
                <button className="text-xs text-slate-400">Edit</button>
              </div>
              <div className="mt-4 space-y-3">
                {category.items.map((item) => (
                  <div key={item.name} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <GripVertical className="h-3 w-3 text-slate-500" />
                      <input className="bg-transparent text-sm text-slate-100 outline-none" defaultValue={item.name} />
                    </div>
                    <input className="w-20 bg-transparent text-right text-sm text-slate-300 outline-none" defaultValue={item.price} />
                  </div>
                ))}
                <button className="text-xs text-brand-50">+ Add item</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <aside className="space-y-4">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-lg font-semibold">Live preview</h3>
          <p className="mt-2 text-sm text-slate-400">Mobile and desktop preview surfaces.</p>
          <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950 p-4 text-xs text-slate-400">
            Preview frame
          </div>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-lg font-semibold">Option groups</h3>
          <p className="mt-2 text-sm text-slate-400">Create sizes, add-ons, and modifiers.</p>
          <button className="mt-4 rounded-full border border-slate-700 px-4 py-2 text-xs text-slate-200">
            Add option group
          </button>
        </div>
      </aside>
    </div>
  );
}
