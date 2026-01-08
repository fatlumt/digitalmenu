import { NavLink, Outlet } from "react-router-dom";
import { LayoutGrid, MenuSquare, Palette, Settings, Store, UploadCloud } from "lucide-react";

const navItems = [
  { label: "Overview", to: "/dashboard", icon: LayoutGrid },
  { label: "Restaurants", to: "/dashboard/restaurants", icon: Store },
  { label: "Menus", to: "/dashboard/menus", icon: MenuSquare },
  { label: "Themes", to: "/dashboard/themes", icon: Palette },
  { label: "Publish", to: "/dashboard/publish", icon: UploadCloud },
  { label: "Settings", to: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex">
        <aside className="w-64 border-r border-slate-800 bg-slate-950 p-6">
          <div className="text-xl font-semibold text-white">Digital Menu</div>
          <div className="mt-8 flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    isActive ? "bg-brand-600 text-white" : "text-slate-300 hover:bg-slate-900"
                  }`
                }
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
          </div>
        </aside>
        <div className="flex-1">
          <header className="flex items-center justify-between border-b border-slate-800 px-8 py-5">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Dashboard</p>
              <h1 className="text-2xl font-semibold">Restaurant Control Center</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200">
                New Menu
              </button>
              <div className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold">Owner</div>
            </div>
          </header>
          <main className="p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
