import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { usePortfolio } from "./context/PortfolioContext";
import { LandingPage } from "./components/landing/LandingPage";
import { BuilderPanel } from "./components/builder/BuilderPanel";
import { PortfolioPreview } from "./components/portfolio/PortfolioPreview";
import { Button } from "./components/ui";

// function ProtectedRoute({ children }: { children: React.ReactNode }) {
//   const { portfolio } = usePortfolio();
//   if (!portfolio.name) return <Navigate to="/" replace />;
//   return <>{children}</>;
// }

function BuilderPage() {
  const { isSaved } = usePortfolio();
  const [splitView, setSplitView] = useState(true);
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 20px",
          background: "#111827",
          borderBottom: "1px solid #1f2937",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            ← Home
          </Button>
          <span
            style={{
              fontSize: 16,
              fontWeight: 900,
              background: "linear-gradient(135deg, #6366f1, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            DevFolio
          </span>
          {isSaved && (
            <span style={{ fontSize: 12, color: "#4ade80" }}>✓ Saved</span>
          )}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSplitView(!splitView)}
          >
            {splitView ? "Hide Preview" : "Show Preview"}
          </Button>
          <Button size="sm" onClick={() => navigate("/preview")}>
            View Live →
          </Button>
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: splitView ? "1fr 1fr" : "1fr",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            borderRight: "1px solid #1f2937",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <BuilderPanel />
        </div>
        {splitView && (
          <div style={{ overflowY: "auto" }}>
            <div
              style={{
                padding: "8px 16px",
                background: "#111827",
                borderBottom: "1px solid #1f2937",
                fontSize: 11,
                color: "#64748b",
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase" as const,
              }}
            >
              Live Preview
            </div>
            <PortfolioPreview />
          </div>
        )}
      </div>
    </div>
  );
}

function PreviewPage() {
  const { portfolio } = usePortfolio();
  const navigate = useNavigate();
  const slug = portfolio.name.toLowerCase().replace(/\s+/g, "") || "yourname";

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          background: "#111827",
          borderBottom: "1px solid #1f2937",
        }}
      >
        <Button variant="ghost" size="sm" onClick={() => navigate("/builder")}>
          ← Back
        </Button>
        <span
          style={{ fontSize: 12, color: "#6366f1", fontFamily: "monospace" }}
        >
          devfolio.app/{slug}
        </span>
        <span style={{ fontSize: 12, color: "#4ade80", fontWeight: 600 }}>
          ✓ Live Preview
        </span>
      </div>
      <div style={{ flex: 1 }}>
        <PortfolioPreview />
      </div>
    </div>
  );
}

function LandingWrapper() {
  const navigate = useNavigate();
  return <LandingPage onGetStarted={() => navigate("/builder")} />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingWrapper />} />
      <Route path="/builder" element={<BuilderPage />} />
      <Route path="/preview" element={<PreviewPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
