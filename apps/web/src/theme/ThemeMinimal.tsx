import { MenuData } from "./types";

export default function ThemeMinimal({ menu }: { menu: MenuData }) {
  return (
    <div className="space-y-8">
      {menu.categories.map((category) => (
        <section key={category.name} className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight text-slate-100">{category.name}</h2>
          <div className="space-y-3">
            {category.items.map((item) => (
              <div key={item.name} className="flex items-start justify-between border-b border-slate-800 pb-3">
                <div>
                  <p className="text-base font-medium text-slate-100">{item.name}</p>
                  <p className="text-sm text-slate-400">{item.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-slate-700 px-2 py-0.5 text-xs text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-sm font-semibold text-slate-100">${item.price}</span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
