import { useState } from "react";
import { BasicTab } from "./tabs/BasicTab";
import { SkillsTab } from "./tabs/SkillsTab";
import { ProjectsTab } from "./tabs/ProjectsTab";
import { ExperienceTab } from "./tabs/ExperienceTab";
import { ThemeTab } from "./tabs/ThemeTab";

const tabs = [
  { id: "basic", label: "Basic" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "theme", label: "Theme" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function BuilderPanel() {
  const [activeTab, setActiveTab] = useState<TabId>("basic");

  const renderTab = () => {
    switch (activeTab) {
      case "basic":
        return <BasicTab />;
      case "skills":
        return <SkillsTab />;
      case "projects":
        return <ProjectsTab />;
      case "experience":
        return <ExperienceTab />;
      case "theme":
        return <ThemeTab />;
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Tab bar */}
      <div className="flex border-b border-dark-700 overflow-x-auto flex-shrink-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px
              ${
                activeTab === tab.id
                  ? "text-brand border-brand"
                  : "text-slate-500 border-transparent hover:text-slate-300"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto p-5">{renderTab()}</div>
    </div>
  );
}
