import { usePortfolio } from "../../../context/PortfolioContext";
import { Button, Input, TextArea } from "../../ui";
import { type Experience } from "../../../types/portfolio";

export function ExperienceTab() {
  const { portfolio, dispatch } = usePortfolio();

  function addExperience() {
    const newExp: Experience = {
      id: crypto.randomUUID(),
      company: "",
      role: "",
      period: "",
      description: "",
    };
    dispatch({ type: "ADD_EXPERIENCE", experience: newExp });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="text-xs font-bold text-brand uppercase tracking-widest">
          Experience
        </div>
        <Button size="sm" variant="secondary" onClick={addExperience}>
          + Add Experience
        </Button>
      </div>

      {portfolio.experience.length === 0 && (
        <div className="text-center py-10 text-slate-600 text-sm">
          No experience yet. Add your first role.
        </div>
      )}

      {portfolio.experience.map((exp, index) => (
        <div
          key={exp.id}
          className="bg-dark-800 border border-dark-700 rounded-xl p-4 flex flex-col gap-3"
        >
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-500 font-semibold">
              Position {index + 1}
            </span>
            <Button
              variant="danger"
              size="sm"
              onClick={() =>
                dispatch({ type: "REMOVE_EXPERIENCE", id: exp.id })
              }
            >
              Remove
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Company"
              placeholder="Company Name"
              value={exp.company}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_EXPERIENCE",
                  id: exp.id,
                  data: { company: e.target.value },
                })
              }
            />
            <Input
              label="Role"
              placeholder="Software Engineer"
              value={exp.role}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_EXPERIENCE",
                  id: exp.id,
                  data: { role: e.target.value },
                })
              }
            />
          </div>

          <Input
            label="Period"
            placeholder="Jan 2023 – Present"
            value={exp.period}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_EXPERIENCE",
                id: exp.id,
                data: { period: e.target.value },
              })
            }
          />

          <TextArea
            label="What you did"
            placeholder="Describe what you built and the impact it had..."
            value={exp.description}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_EXPERIENCE",
                id: exp.id,
                data: { description: e.target.value },
              })
            }
          />
        </div>
      ))}
    </div>
  );
}
