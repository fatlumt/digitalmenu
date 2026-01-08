import { ArrowRight, QrCode } from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="flex items-center justify-between px-10 py-6">
        <div className="text-xl font-semibold">Digital Menu</div>
        <nav className="flex items-center gap-6 text-sm text-slate-300">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#themes" className="hover:text-white">Themes</a>
          <Link to="/auth" className="rounded-full bg-brand-600 px-4 py-2 text-white">Get started</Link>
        </nav>
      </header>
      <main className="px-10 pb-16">
        <section className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-600/40 px-3 py-1 text-xs uppercase text-brand-50">
              <QrCode className="h-4 w-4" /> QR-first menu platform
            </span>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              Craft beautiful, fast, and editable restaurant menus in minutes.
            </h1>
            <p className="text-lg text-slate-300">
              Digital Menu centralizes menu design, publishing, and QR distribution across web and mobile.
              Delight guests with immersive experiences and give your team instant editing power.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/auth" className="rounded-full bg-brand-600 px-6 py-3 font-medium">
                Start free
              </Link>
              <Link to="/dashboard" className="flex items-center gap-2 text-sm text-slate-300">
                View dashboard demo <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-8">
            <div className="space-y-4">
              <div className="rounded-2xl bg-slate-900 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Live preview</p>
                <h2 className="text-2xl font-semibold">Saffron Table</h2>
                <p className="text-sm text-slate-400">Tap to explore three themes instantly.</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  { title: "Minimal / Modern", desc: "Clean typography and airy spacing." },
                  { title: "Elegant / Fine dining", desc: "Rich textures with serif accents." },
                  { title: "Bold / Street food", desc: "Punchy colors and playful icons." },
                ].map((theme) => (
                  <div key={theme.title} className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                    <p className="text-sm font-semibold">{theme.title}</p>
                    <p className="text-xs text-slate-400">{theme.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mt-20 grid gap-6 md:grid-cols-3">
          {[
            { title: "Inline menu builder", desc: "Edit categories and items right in place." },
            { title: "Live preview", desc: "See mobile and desktop views instantly." },
            { title: "QR publishing", desc: "Generate print-ready QR codes in seconds." },
          ].map((feature) => (
            <div key={feature.title} className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-lg font-semibold">{feature.title}</p>
              <p className="text-sm text-slate-400">{feature.desc}</p>
            </div>
          ))}
        </section>

        <section id="themes" className="mt-20 rounded-3xl border border-slate-800 bg-slate-900 p-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Theme-first design system</h2>
              <p className="text-sm text-slate-400">
                Customize colors, typography, and layouts for each restaurant.
              </p>
            </div>
            <Link to="/dashboard/themes" className="rounded-full bg-white px-4 py-2 text-sm text-slate-950">
              Explore themes
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
