import { usePortfolioStore } from "../store/portfolioStore";
import { type Skill } from "../types/portfolio";

export function useSkills() {
  const skills = usePortfolioStore((state) => state.portfolio.skills);
  const addSkill = usePortfolioStore((state) => state.addSkill);
  const updateSkill = usePortfolioStore((state) => state.updateSkill);
  const removeSkill = usePortfolioStore((state) => state.removeSkill);

  function createSkill(): Skill {
    return {
      id: crypto.randomUUID(),
      name: "",
      level: 50,
    };
  }

  function handleAdd() {
    addSkill(createSkill());
  }

  function handleUpdateName(id: string, name: string) {
    updateSkill(id, { name });
  }

  function handleUpdateLevel(id: string, level: number) {
    updateSkill(id, { level });
  }

  return {
    skills,
    handleAdd,
    handleUpdateName,
    handleUpdateLevel,
    removeSkill,
  };
}
