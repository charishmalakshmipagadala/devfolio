import { Button } from "../ui";

interface LandingPageProps {
  onGetStarted: () => void;
}

const features = [
  {
    icon: "⚡",
    title: "Live Preview",
    desc: "See your portfolio update as you type",
  },
  { icon: "🎨", title: "3 Themes", desc: "Dark Pro, Minimal, Purple Night" },
  { icon: "📱", title: "Responsive", desc: "Looks great on every screen" },
  { icon: "💾", title: "Auto-saves", desc: "Never lose your work" },
  { icon: "🔐", title: "Auth (soon)", desc: "Accounts and saved portfolios" },
  { icon: "🤖", title: "AI (soon)", desc: "Bio writer and job matcher" },
];

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-dark-900 flex flex-col">
      {/* Nav */}
      <nav className="flex justify-between items-center px-8 py-4 border-b border-dark-700">
        <div className="text-xl font-black bg-gradient-to-r from-brand to-purple-400 bg-clip-text text-transparent">
          DevFolio
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" size="sm" onClick={onGetStarted}>
            Sign In
          </Button>
          <Button size="sm" onClick={onGetStarted}>
            Get Started →
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        <div className="inline-block px-4 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand-light text-xs font-semibold uppercase tracking-widest mb-8">
          For Developers, By a Developer
        </div>

        <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 max-w-3xl">
          Your portfolio,{" "}
          <span className="bg-gradient-to-r from-brand to-purple-400 bg-clip-text text-transparent">
            built in minutes.
          </span>
        </h1>

        <p className="text-lg text-slate-400 max-w-xl leading-relaxed mb-10">
          Fill in your details, pick a theme, and get a beautiful shareable
          portfolio page. No code. No Figma. No wrestling with templates.
        </p>

        <div className="flex gap-3 flex-wrap justify-center">
          <Button size="lg" onClick={onGetStarted}>
            Build My Portfolio →
          </Button>
          <Button size="lg" variant="ghost" onClick={onGetStarted}>
            See Example
          </Button>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-20 w-full max-w-2xl">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-dark-800 border border-dark-700 rounded-xl p-5 text-left hover:border-brand/40 transition-colors"
            >
              <div className="text-2xl mb-3">{f.icon}</div>
              <div className="font-semibold text-sm text-slate-200 mb-1">
                {f.title}
              </div>
              <div className="text-xs text-slate-500 leading-relaxed">
                {f.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6 text-xs text-slate-600 border-t border-dark-700">
        Built with React · TypeScript · Tailwind — by a developer learning in
        public
      </div>
    </div>
  );
}
