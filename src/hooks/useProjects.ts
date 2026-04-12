import { usePortfolioStore } from "../store/portfolioStore";
import { type Project } from "../types/portfolio";

export function useProjects() {
  const projects = usePortfolioStore((state) => state.portfolio.projects);
  const addProject = usePortfolioStore((state) => state.addProject);
  const updateProject = usePortfolioStore((state) => state.updateProject);
  const removeProject = usePortfolioStore((state) => state.removeProject);

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

  function handleUpdateTech(id: string, techString: string) {
    updateProject(id, {
      tech: techString
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });
  }

  return {
    projects,
    handleAdd,
    updateProject,
    handleUpdateTech,
    removeProject,
  };
}
