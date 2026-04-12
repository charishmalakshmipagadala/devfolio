import { usePortfolioStore } from "../../../store/portfolioStore";
import { Button, Input, TextArea } from "../../ui";
import { type Project } from "../../../types/portfolio";

export function ProjectsTab() {
  const portfolio = usePortfolioStore((s) => s.portfolio);
  const addProject = usePortfolioStore((s) => s.addProject);
  const updateProject = usePortfolioStore((s) => s.updateProject);
  const removeProject = usePortfolioStore((s) => s.removeProject);

  function handleAdd() {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name: "",
      description: "",
      tech: [],
      githubUrl: "",
      liveUrl: "",
    };
    addProject(newProject);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#6366f1", textTransform: "uppercase", letterSpacing: 2 }}>
          Projects
        </div>
        <Button size="sm" variant="secondary" onClick={handleAdd}>
          + Add Project
        </Button>
      </div>

      {portfolio.projects.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px 0", color: "#475569", fontSize: 14 }}>
          No projects yet. Add your first one.
        </div>
      )}

      {portfolio.projects.map((project, index) => (
        <div key={project.id} style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: 12, padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>Project {index + 1}</span>
            <Button variant="danger" size="sm" onClick={() => removeProject(project.id)}>
              Remove
            </Button>
          </div>

          <Input
            label="Project Name"
            placeholder="My Awesome Project"
            value={project.name}
            onChange={(e) => updateProject(project.id, { name: e.target.value })}
          />

          <TextArea
            label="Description"
            placeholder="What did you build and why?"
            value={project.description}
            onChange={(e) => updateProject(project.id, { description: e.target.value })}
          />

          <Input
            label="Tech Stack (comma separated)"
            placeholder="React, TypeScript, Node.js"
            value={project.tech.join(", ")}
            onChange={(e) =>
              updateProject(project.id, {
                tech: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
              })
            }
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Input
              label="GitHub URL"
              placeholder="https://github.com/..."
              value={project.githubUrl}
              onChange={(e) => updateProject(project.id, { githubUrl: e.target.value })}
            />
            <Input
              label="Live URL"
              placeholder="https://..."
              value={project.liveUrl}
              onChange={(e) => updateProject(project.id, { liveUrl: e.target.value })}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
