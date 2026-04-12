import { usePortfolioStore } from "../../../store/portfolioStore";
import { Button, Input, TextArea } from "../../ui";
import { type Experience } from "../../../types/portfolio";

export function ExperienceTab() {
  const portfolio = usePortfolioStore((s) => s.portfolio);
  const addExperience = usePortfolioStore((s) => s.addExperience);
  const updateExperience = usePortfolioStore((s) => s.updateExperience);
  const removeExperience = usePortfolioStore((s) => s.removeExperience);

  function handleAdd() {
    const newExp: Experience = {
      id: crypto.randomUUID(),
      company: "",
      role: "",
      period: "",
      description: "",
    };
    addExperience(newExp);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#6366f1", textTransform: "uppercase", letterSpacing: 2 }}>
          Experience
        </div>
        <Button size="sm" variant="secondary" onClick={handleAdd}>
          + Add Experience
        </Button>
      </div>

      {portfolio.experience.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px 0", color: "#475569", fontSize: 14 }}>
          No experience yet. Add your first role.
        </div>
      )}

      {portfolio.experience.map((exp, index) => (
        <div key={exp.id} style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: 12, padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>Position {index + 1}</span>
            <Button variant="danger" size="sm" onClick={() => removeExperience(exp.id)}>
              Remove
            </Button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Input
              label="Company"
              placeholder="Company Name"
              value={exp.company}
              onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
            />
            <Input
              label="Role"
              placeholder="Software Engineer"
              value={exp.role}
              onChange={(e) => updateExperience(exp.id, { role: e.target.value })}
            />
          </div>

          <Input
            label="Period"
            placeholder="Jan 2023 – Present"
            value={exp.period}
            onChange={(e) => updateExperience(exp.id, { period: e.target.value })}
          />

          <TextArea
            label="What you did"
            placeholder="Describe what you built and the impact it had..."
            value={exp.description}
            onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
          />
        </div>
      ))}
    </div>
  );
}
