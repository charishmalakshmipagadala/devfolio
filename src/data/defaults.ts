import type { Portfolio } from "../types/portfolio";

export const defaultPortfolio: Portfolio = {
  name: "",
  title: "",
  bio: "",
  email: "",
  avatar: "",
  theme: "dark",
  social: {
    github: "",
    linkedin: "",
    website: "",
  },
  skills: [
    { id: "1", name: "React", level: 80 },
    { id: "2", name: "TypeScript", level: 70 },
    { id: "3", name: "Node.js", level: 65 },
  ],
  projects: [
    {
      id: "1",
      name: "My First Project",
      description: "A project I built to learn the stack.",
      tech: ["React", "TypeScript"],
      githubUrl: "",
      liveUrl: "",
    },
  ],
  experience: [
    {
      id: "1",
      company: "Company Name",
      role: "Software Developer",
      period: "2023 – Present",
      description: "What you worked on and what you shipped.",
    },
  ],
};

export const themeConfig = {
  dark: {
    bg: "#0a0a0f",
    card: "#111827",
    border: "#1f2937",
    text: "#f1f5f9",
    muted: "#94a3b8",
    accent: "#6366f1",
  },
  minimal: {
    bg: "#ffffff",
    card: "#f8fafc",
    border: "#e2e8f0",
    text: "#0f172a",
    muted: "#64748b",
    accent: "#6366f1",
  },
  purple: {
    bg: "#0f0a1e",
    card: "#1a1040",
    border: "#3730a3",
    text: "#f1f5f9",
    muted: "#a5b4fc",
    accent: "#a78bfa",
  },
} as const;
