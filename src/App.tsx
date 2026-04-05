import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { usePortfolio } from "./context/PortfolioContext";
import { LandingPage } from "./components/landing/LandingPage";
import { BuilderPanel } from "./components/builder/BuilderPanel";
import { PortfolioPreview } from "./components/portfolio/PortfolioPreview";
import { Button } from "./components/ui";

// Protected route — redirects to landing if no portfolio name set yet
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { portfolio } = usePortfolio();
  if (!portfolio.name) return <Navigate to="/" replace />;
  return <>{children}</>;
}

function BuilderPage() {
  const { isSaved } = usePortfolio();
  const [splitView, setSplitView] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-5 py-3 bg-dark-800 border-b border-dark-700 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            ← Home
          </Button>
          <span className="text-base font-black bg-gradient-to-r from-brand to-purple-400 bg-clip-text text-transparent">
            DevFolio
          </span>
          {isSaved && <span className="text-xs text-green-400">✓ Saved</span>}
        </div>
        <div className="flex gap-2">
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
        className={`flex-1 grid overflow-hidden ${splitView ? "grid-cols-2" : "grid-cols-1"}`}
      >
        <div className="border-r border-dark-700 overflow-hidden flex flex-col">
          <BuilderPanel />
        </div>
        {splitView && (
          <div className="overflow-auto">
            <div className="px-4 py-2 bg-dark-800 border-b border-dark-700 text-xs text-slate-500 font-semibold uppercase tracking-widest">
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
    <div className="min-h-screen flex flex-col">
      <div className="flex justify-between items-center px-5 py-3 bg-dark-800 border-b border-dark-700 flex-shrink-0">
        <Button variant="ghost" size="sm" onClick={() => navigate("/builder")}>
          ← Back to Builder
        </Button>
        <span className="text-xs text-brand font-mono">
          devfolio.app/{slug}
        </span>
        <span className="text-xs text-green-400 font-medium">
          ✓ Live Preview
        </span>
      </div>
      <div className="flex-1">
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
      <Route
        path="/preview"
        element={
          <ProtectedRoute>
            <PreviewPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
