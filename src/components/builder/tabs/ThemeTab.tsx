import { usePortfolioStore } from "../../../store/portfolioStore";
import { type Theme } from "../../../types/portfolio";

const themes: { id: Theme; label: string; desc: string; preview: string }[] = [
  { id: "dark", label: "Dark Pro", desc: "Dark background with indigo accents", preview: "#0a0a0f" },
  { id: "minimal", label: "Minimal", desc: "Clean white with lots of space", preview: "#ffffff" },
  { id: "purple", label: "Purple Night", desc: "Deep purple with violet accents", preview: "#0f0a1e" },
];

export function ThemeTab() {
  const portfolio = usePortfolioStore((s) => s.portfolio);
  const setField = usePortfolioStore((s) => s.setField);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#6366f1", textTransform: "uppercase", letterSpacing: 2 }}>
        Choose Theme
      </div>

      {themes.map((theme) => {
        const isActive = portfolio.theme === theme.id;
        return (
          <div
            key={theme.id}
            onClick={() => setField("theme", theme.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: 16,
              borderRadius: 12,
              border: isActive ? "2px solid #6366f1" : "2px solid #1f2937",
              background: isActive ? "rgba(99,102,241,0.1)" : "#111827",
              cursor: "pointer",
              transition: "border-color .2s",
            }}
          >
            <div style={{ width: 40, height: 40, borderRadius: 8, border: "1px solid #374151", flexShrink: 0, background: theme.preview }} />
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, color: isActive ? "#818cf8" : "#e2e8f0" }}>
                {theme.label}
              </div>
              <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{theme.desc}</div>
            </div>
            {isActive && <div style={{ marginLeft: "auto", color: "#6366f1", fontSize: 18 }}>✓</div>}
          </div>
        );
      })}
    </div>
  );
}
