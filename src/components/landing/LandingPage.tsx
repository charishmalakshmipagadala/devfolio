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
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0f",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Nav */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 32px",
          borderBottom: "1px solid #1f2937",
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 900,
            background: "linear-gradient(135deg, #6366f1, #a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          DevFolio
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <Button
            onClick={onGetStarted}
            style={{
              background: "transparent",
              color: "#94a3b8",
              padding: "8px 16px",
              border: "1px solid #1f2937",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            Sign In
          </Button>
          <Button
            onClick={onGetStarted}
            style={{
              background: "linear-gradient(135deg, #6366f1, #4f46e5)",
              color: "#fff",
              padding: "8px 20px",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Get Started →
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "80px 24px",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "4px 16px",
            borderRadius: 20,
            background: "rgba(99,102,241,0.1)",
            border: "1px solid rgba(99,102,241,0.2)",
            color: "#818cf8",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: "uppercase",
            marginBottom: 32,
          }}
        >
          For Developers, By a Developer
        </div>

        <h1
          style={{
            fontSize: "clamp(40px, 7vw, 72px)",
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: 24,
            maxWidth: 700,
            color: "#f1f5f9",
          }}
        >
          Your portfolio,{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #6366f1, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            built in minutes.
          </span>
        </h1>

        <p
          style={{
            fontSize: 18,
            color: "#94a3b8",
            maxWidth: 480,
            lineHeight: 1.8,
            marginBottom: 48,
          }}
        >
          Fill in your details, pick a theme, and get a beautiful shareable
          portfolio page. No code. No Figma. No wrestling with templates.
        </p>

        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={onGetStarted}
            style={{
              background: "linear-gradient(135deg, #6366f1, #4f46e5)",
              color: "#fff",
              padding: "14px 32px",
              border: "none",
              borderRadius: 10,
              cursor: "pointer",
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            Build My Portfolio →
          </Button>
          <Button
            onClick={onGetStarted}
            style={{
              background: "transparent",
              color: "#94a3b8",
              padding: "14px 32px",
              border: "1px solid #1f2937",
              borderRadius: 10,
              cursor: "pointer",
              fontSize: 16,
            }}
          >
            See Example
          </Button>
        </div>

        {/* Features grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 16,
            marginTop: 80,
            width: "100%",
            maxWidth: 720,
          }}
        >
          {features.map((f, i) => (
            <div
              key={i}
              style={{
                background: "#111827",
                border: "1px solid #1f2937",
                borderRadius: 12,
                padding: 20,
                textAlign: "left",
                transition: "border-color .2s",
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 10 }}>{f.icon}</div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 14,
                  color: "#f1f5f9",
                  marginBottom: 4,
                }}
              >
                {f.title}
              </div>
              <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6 }}>
                {f.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          padding: "24px",
          fontSize: 12,
          color: "#374151",
          borderTop: "1px solid #1f2937",
        }}
      >
        Built with React · TypeScript · Tailwind — by a developer learning in
        public
      </div>
    </div>
  );
}
