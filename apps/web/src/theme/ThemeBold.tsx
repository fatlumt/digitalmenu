import { MenuData } from "./types";

export default function ThemeBold({ menu }: { menu: MenuData }) {
  return (
    <div className="space-y-8">
      {menu.categories.map((category) => (
        <section key={category.name} className="space-y-3">
          <div className="inline-flex rounded-full bg-orange-500 px-4 py-1 text-sm font-semibold text-slate-950">
            {category.name}
          </div>
          <div className="grid gap-3">
            {category.items.map((item) => (
              <div key={item.name} className="rounded-2xl border border-slate-700 bg-slate-900 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-base font-semibold text-white">{item.name}</p>
                    <p className="text-xs text-slate-400">{item.description}</p>
                  </div>
                  <span className="rounded-full bg-sky-400 px-3 py-1 text-xs font-semibold text-slate-950">
                    ${item.price}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-slate-700 px-2 py-0.5 text-xs text-slate-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
