import { usePortfolio } from "../../../context/PortfolioContext";
import { Button, Input, TextArea } from "../../ui";
import { type Project } from "../../../types/portfolio";

export function ProjectsTab() {
  const { portfolio, dispatch } = usePortfolio();

  function addProject() {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name: "",
      description: "",
      tech: [],
      githubUrl: "",
      liveUrl: "",
    };
    dispatch({ type: "ADD_PROJECT", project: newProject });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="text-xs font-bold text-brand uppercase tracking-widest">
          Projects
        </div>
        <Button size="sm" variant="secondary" onClick={addProject}>
          + Add Project
        </Button>
      </div>

      {portfolio.projects.length === 0 && (
        <div className="text-center py-10 text-slate-600 text-sm">
          No projects yet. Add your first one.
        </div>
      )}

      {portfolio.projects.map((project, index) => (
        <div
          key={project.id}
          className="bg-dark-800 border border-dark-700 rounded-xl p-4 flex flex-col gap-3"
        >
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-500 font-semibold">
              Project {index + 1}
            </span>
            <Button
              variant="danger"
              size="sm"
              onClick={() =>
                dispatch({ type: "REMOVE_PROJECT", id: project.id })
              }
            >
              Remove
            </Button>
          </div>

          <Input
            label="Project Name"
            placeholder="My Awesome Project"
            value={project.name}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_PROJECT",
                id: project.id,
                data: { name: e.target.value },
              })
            }
          />

          <TextArea
            label="Description"
            placeholder="What did you build and why?"
            value={project.description}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_PROJECT",
                id: project.id,
                data: { description: e.target.value },
              })
            }
          />

          <Input
            label="Tech Stack (comma separated)"
            placeholder="React, TypeScript, Node.js"
            value={project.tech.join(", ")}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_PROJECT",
                id: project.id,
                data: {
                  tech: e.target.value
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean),
                },
              })
            }
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="GitHub URL"
              placeholder="https://github.com/..."
              value={project.githubUrl}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_PROJECT",
                  id: project.id,
                  data: { githubUrl: e.target.value },
                })
              }
            />
            <Input
              label="Live URL"
              placeholder="https://..."
              value={project.liveUrl}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_PROJECT",
                  id: project.id,
                  data: { liveUrl: e.target.value },
                })
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
}
