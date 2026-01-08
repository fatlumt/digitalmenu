import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { themes } from "../theme/themes";
import ThemeBold from "../theme/ThemeBold";
import ThemeElegant from "../theme/ThemeElegant";
import ThemeMinimal from "../theme/ThemeMinimal";
import { MenuData } from "../theme/types";

const sampleMenu: MenuData = {
  restaurant: "Saffron Table",
  description: "Seasonal menu · Open 5pm - 11pm",
  categories: [
    {
      name: "Starters",
      items: [
        { name: "Truffle Arancini", description: "Parmesan foam, basil", price: 14, tags: ["popular"] },
        { name: "Citrus Salad", description: "Fennel, orange, mint", price: 12, tags: ["vegan"] },
      ],
    },
    {
      name: "Mains",
      items: [
        { name: "Charred Salmon", description: "Saffron beurre blanc", price: 28, tags: ["signature"] },
        { name: "Wild Mushroom Risotto", description: "Truffle oil, pecorino", price: 24, tags: ["vegetarian"] },
      ],
    },
  ],
};

export default function PublicMenuPage() {
  const [query, setQuery] = useState("");
  const [activeTheme, setActiveTheme] = useState(themes[0]);

  const filtered = useMemo(() => {
    if (!query) return sampleMenu.categories;
    return sampleMenu.categories
      .map((category) => ({
        ...category,
        items: category.items.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())),
      }))
      .filter((category) => category.items.length > 0);
  }, [query]);

  const ThemeComponent = activeTheme.id === "elegant" ? ThemeElegant : activeTheme.id === "bold" ? ThemeBold : ThemeMinimal;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">{sampleMenu.restaurant}</h1>
            <p className="text-sm text-slate-400">{sampleMenu.description}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                className="w-64 rounded-full border border-slate-700 bg-slate-900 py-2 pl-10 pr-3 text-sm"
                placeholder="Search menu"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <select
              className="rounded-full border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
              value={activeTheme.id}
              onChange={(event) => {
                const selected = themes.find((theme) => theme.id === event.target.value);
                if (selected) setActiveTheme(selected);
              }}
            >
              {themes.map((theme) => (
                <option key={theme.id} value={theme.id}>
                  {theme.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-10 px-6 py-10">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Theme preview</p>
          <p className="mt-2 text-lg font-semibold">{activeTheme.name}</p>
          <div className="mt-4 flex gap-3">
            {activeTheme.palette.map((color) => (
              <div key={color} className="h-8 w-8 rounded-full" style={{ backgroundColor: color }} />
            ))}
          </div>
        </div>

        <ThemeComponent menu={{ ...sampleMenu, categories: filtered }} />
      </main>
    </div>
  );
}
