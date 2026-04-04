import { usePortfolio } from "../../context/PortfolioContext";
import { themeConfig } from "../../data/defaults";
import { Avatar, Badge } from "../ui";
import type { Portfolio } from "../../types/portfolio";

export function PortfolioPreview() {
  const { portfolio } = usePortfolio();
  const theme = themeConfig[portfolio.theme];

  return (
    <div
      style={{ background: theme.bg, minHeight: "100%", padding: "32px 24px" }}
    >
      <div
        style={{
          maxWidth: 640,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <HeroSection portfolio={portfolio} theme={theme} />
        {portfolio.skills.length > 0 && (
          <SkillsSection portfolio={portfolio} theme={theme} />
        )}
        {portfolio.projects.length > 0 && (
          <ProjectsSection portfolio={portfolio} theme={theme} />
        )}
        {portfolio.experience.length > 0 && (
          <ExperienceSection portfolio={portfolio} theme={theme} />
        )}
        <footer
          style={{
            textAlign: "center",
            fontSize: 11,
            color: theme.muted,
            paddingTop: 8,
          }}
        >
          Built with DevFolio
        </footer>
      </div>
    </div>
  );
}

type SectionProps = {
  portfolio: Portfolio;
  theme: (typeof themeConfig)[keyof typeof themeConfig];
};

function card(theme: (typeof themeConfig)[keyof typeof themeConfig]) {
  return {
    background: theme.card,
    border: `1px solid ${theme.border}`,
    borderRadius: 16,
    padding: 24,
  };
}

function sectionLabel(color: string) {
  return {
    fontSize: 11,
    fontWeight: 700,
    color,
    letterSpacing: 3,
    textTransform: "uppercase" as const,
    marginBottom: 16,
  };
}

function HeroSection({ portfolio, theme }: SectionProps) {
  return (
    <div
      style={{
        ...card(theme),
        display: "flex",
        gap: 20,
        alignItems: "flex-start",
      }}
    >
      <Avatar name={portfolio.name || "Your Name"} size={72} />
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: theme.text,
            lineHeight: 1.2,
          }}
        >
          {portfolio.name || "Your Name"}
        </div>
        <div
          style={{
            fontSize: 14,
            color: theme.accent,
            fontWeight: 600,
            margin: "4px 0",
          }}
        >
          {portfolio.title || "Your Title"}
        </div>
        <div
          style={{
            fontSize: 13,
            color: theme.muted,
            lineHeight: 1.7,
            marginTop: 6,
          }}
        >
          {portfolio.bio || "Your bio will appear here..."}
        </div>
        <div
          style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap" }}
        >
          {portfolio.email && (
            <a
              href={`mailto:${portfolio.email}`}
              style={{
                fontSize: 12,
                color: theme.accent,
                textDecoration: "none",
              }}
            >
              ✉ {portfolio.email}
            </a>
          )}
          {portfolio.social.github && (
            <a
              href={portfolio.social.github}
              style={{
                fontSize: 12,
                color: theme.accent,
                textDecoration: "none",
              }}
            >
              GitHub ↗
            </a>
          )}
          {portfolio.social.linkedin && (
            <a
              href={portfolio.social.linkedin}
              style={{
                fontSize: 12,
                color: theme.accent,
                textDecoration: "none",
              }}
            >
              LinkedIn ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function SkillsSection({ portfolio, theme }: SectionProps) {
  return (
    <div style={card(theme)}>
      <div style={sectionLabel(theme.accent)}>Skills</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px 24px",
        }}
      >
        {portfolio.skills
          .filter((s) => s.name)
          .map((skill) => (
            <div key={skill.id}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 13,
                  color: theme.text,
                  marginBottom: 5,
                }}
              >
                <span>{skill.name}</span>
                <span style={{ color: theme.muted }}>{skill.level}%</span>
              </div>
              <div
                style={{
                  height: 6,
                  background: theme.border,
                  borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${skill.level}%`,
                    background: `linear-gradient(90deg, ${theme.accent}, #8b5cf6)`,
                    borderRadius: 4,
                    transition: "width .4s ease",
                  }}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

function ProjectsSection({ portfolio, theme }: SectionProps) {
  return (
    <div>
      <div style={sectionLabel(theme.accent)}>Projects</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {portfolio.projects
          .filter((p) => p.name)
          .map((project) => (
            <div key={project.id} style={card(theme)}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 8,
                }}
              >
                <div
                  style={{ fontSize: 15, fontWeight: 700, color: theme.text }}
                >
                  {project.name}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      style={{
                        fontSize: 12,
                        color: theme.accent,
                        textDecoration: "none",
                        padding: "2px 10px",
                        border: `1px solid ${theme.accent}`,
                        borderRadius: 20,
                      }}
                    >
                      Live ↗
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      style={{
                        fontSize: 12,
                        color: theme.muted,
                        textDecoration: "none",
                      }}
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: theme.muted,
                  marginBottom: 12,
                  lineHeight: 1.6,
                }}
              >
                {project.description}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {project.tech.map((tech, i) => (
                  <Badge key={i} label={tech} />
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

function ExperienceSection({ portfolio, theme }: SectionProps) {
  return (
    <div style={card(theme)}>
      <div style={sectionLabel(theme.accent)}>Experience</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {portfolio.experience
          .filter((e) => e.company)
          .map((exp) => (
            <div
              key={exp.id}
              style={{
                borderLeft: `2px solid ${theme.accent}`,
                paddingLeft: 16,
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 700, color: theme.text }}>
                {exp.role}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: theme.accent,
                  fontWeight: 600,
                  margin: "2px 0",
                }}
              >
                {exp.company}
              </div>
              <div
                style={{ fontSize: 12, color: theme.muted, marginBottom: 6 }}
              >
                {exp.period}
              </div>
              <div
                style={{ fontSize: 13, color: theme.muted, lineHeight: 1.6 }}
              >
                {exp.description}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
