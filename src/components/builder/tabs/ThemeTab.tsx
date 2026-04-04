import { usePortfolio } from "../../../context/PortfolioContext";
import { type Theme } from "../../../types/portfolio";

const themes: { id: Theme; label: string; desc: string; preview: string }[] = [
  {
    id: "dark",
    label: "Dark Pro",
    desc: "Dark background with indigo accents",
    preview: "#0a0a0f",
  },
  {
    id: "minimal",
    label: "Minimal",
    desc: "Clean white with lots of space",
    preview: "#ffffff",
  },
  {
    id: "purple",
    label: "Purple Night",
    desc: "Deep purple with violet accents",
    preview: "#0f0a1e",
  },
];

export function ThemeTab() {
  const { portfolio, dispatch } = usePortfolio();

  return (
    <div className="flex flex-col gap-4">
      <div className="text-xs font-bold text-brand uppercase tracking-widest">
        Choose Theme
      </div>

      {themes.map((theme) => (
        <div
          key={theme.id}
          onClick={() =>
            dispatch({ type: "SET_FIELD", field: "theme", value: theme.id })
          }
          className={`
            flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all
            ${
              portfolio.theme === theme.id
                ? "border-brand bg-brand/10"
                : "border-dark-700 bg-dark-800 hover:border-dark-600"
            }
          `}
        >
          <div
            className="w-10 h-10 rounded-lg border border-dark-600 flex-shrink-0"
            style={{ background: theme.preview }}
          />
          <div>
            <div
              className={`font-semibold text-sm ${portfolio.theme === theme.id ? "text-brand-light" : "text-slate-200"}`}
            >
              {theme.label}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">{theme.desc}</div>
          </div>
          {portfolio.theme === theme.id && (
            <div className="ml-auto text-brand text-lg">✓</div>
          )}
        </div>
      ))}
    </div>
  );
}
