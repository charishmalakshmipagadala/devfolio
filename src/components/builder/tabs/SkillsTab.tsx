import { usePortfolio } from "../../../context/PortfolioContext";
import { Button, Input } from "../../ui";
import { type Skill } from "../../../types/portfolio";

export function SkillsTab() {
  const { portfolio, dispatch } = usePortfolio();

  function addSkill() {
    const newSkill: Skill = {
      id: crypto.randomUUID(),
      name: "",
      level: 50,
    };
    dispatch({ type: "ADD_SKILL", skill: newSkill });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="text-xs font-bold text-brand uppercase tracking-widest">
          Skills
        </div>
        <Button size="sm" variant="secondary" onClick={addSkill}>
          + Add Skill
        </Button>
      </div>

      {portfolio.skills.length === 0 && (
        <div className="text-center py-10 text-slate-600 text-sm">
          No skills yet. Add your first one.
        </div>
      )}

      {portfolio.skills.map((skill) => (
        <div
          key={skill.id}
          className="bg-dark-800 border border-dark-700 rounded-xl p-4 flex flex-col gap-3"
        >
          <div className="flex gap-2 items-center">
            <Input
              placeholder="e.g. React"
              value={skill.name}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_SKILL",
                  id: skill.id,
                  data: { name: e.target.value },
                })
              }
            />
            <Button
              variant="danger"
              size="sm"
              onClick={() => dispatch({ type: "REMOVE_SKILL", id: skill.id })}
            >
              ✕
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="range"
              min={10}
              max={100}
              value={skill.level}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_SKILL",
                  id: skill.id,
                  data: { level: Number(e.target.value) },
                })
              }
              className="flex-1 accent-brand"
            />
            <span className="text-xs text-slate-400 w-8 text-right">
              {skill.level}%
            </span>
          </div>

          {/* Live skill bar preview */}
          <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand to-purple-500 rounded-full transition-all duration-300"
              style={{ width: `${skill.level}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
