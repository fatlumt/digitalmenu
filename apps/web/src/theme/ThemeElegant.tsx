import { MenuData } from "./types";

export default function ThemeElegant({ menu }: { menu: MenuData }) {
  return (
    <div className="space-y-10 font-serif">
      {menu.categories.map((category) => (
        <section key={category.name} className="space-y-4">
          <h2 className="text-xl font-semibold text-amber-100">{category.name}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {category.items.map((item) => (
              <div key={item.name} className="rounded-2xl border border-amber-200/20 bg-slate-900/60 p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-lg font-semibold text-amber-50">{item.name}</p>
                    <p className="mt-1 text-sm text-amber-100/70">{item.description}</p>
                  </div>
                  <span className="text-lg text-amber-50">${item.price}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-amber-200/10 px-3 py-1 text-xs text-amber-100">
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
