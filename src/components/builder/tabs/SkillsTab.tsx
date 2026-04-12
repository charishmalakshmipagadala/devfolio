import { useSkills } from "../../../hooks/useSkills";
import { Button, Input } from "../../ui";

export function SkillsTab() {
  const {
    skills,
    handleAdd,
    handleUpdateName,
    handleUpdateLevel,
    removeSkill,
  } = useSkills();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#6366f1",
            textTransform: "uppercase" as const,
            letterSpacing: 2,
          }}
        >
          Skills
        </div>
        <Button size="sm" variant="secondary" onClick={handleAdd}>
          + Add Skill
        </Button>
      </div>

      {skills.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "40px 0",
            color: "#4b5563",
            fontSize: 14,
          }}
        >
          No skills yet. Add your first one.
        </div>
      )}

      {skills.map((skill) => (
        <div
          key={skill.id}
          style={{
            background: "#111827",
            border: "1px solid #1f2937",
            borderRadius: 12,
            padding: 16,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <Input
              placeholder="e.g. React"
              value={skill.name}
              onChange={(e) => handleUpdateName(skill.id, e.target.value)}
            />
            <Button
              variant="danger"
              size="sm"
              onClick={() => removeSkill(skill.id)}
            >
              ✕
            </Button>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <input
              type="range"
              min={10}
              max={100}
              value={skill.level}
              onChange={(e) =>
                handleUpdateLevel(skill.id, Number(e.target.value))
              }
              style={{ flex: 1, accentColor: "#6366f1" }}
            />
            <span
              style={{
                fontSize: 12,
                color: "#94a3b8",
                minWidth: 32,
                textAlign: "right",
              }}
            >
              {skill.level}%
            </span>
          </div>

          <div
            style={{
              height: 6,
              background: "#1f2937",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${skill.level}%`,
                background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                borderRadius: 4,
                transition: "width .3s ease",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
