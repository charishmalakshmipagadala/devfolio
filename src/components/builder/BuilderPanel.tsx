import { useState } from "react";
import { Button } from "../ui";
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
    <div style={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Tab bar */}
      <div style={{ display: "flex", borderBottom: "1px solid #1f2937", overflowX: "auto", flexShrink: 0, paddingLeft: 4 }}>
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant="tab"
            size="sm"
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 20px" }}>{renderTab()}</div>
    </div>
  );
}
