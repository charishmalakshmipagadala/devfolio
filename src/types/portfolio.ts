export type Theme = "dark" | "minimal" | "purple";

export interface Skill {
  id: string;
  name: string;
  level: number; // 0–100
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  githubUrl: string;
  liveUrl: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  website: string;
}

export interface Portfolio {
  name: string;
  title: string;
  bio: string;
  email: string;
  avatar: string;
  theme: Theme;
  social: SocialLinks;
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
}

// Utility types you'll explain in interviews
export type PortfolioUpdate = Partial<Portfolio>;
export type ProjectPreview = Pick<
  Project,
  "id" | "name" | "description" | "tech"
>;
export type SkillWithoutId = Omit<Skill, "id">;

// Reducer action types — strictly typed
export type PortfolioAction =
  | {
      type: "SET_FIELD";
      field: keyof Portfolio;
      value: Portfolio[keyof Portfolio];
    }
  | { type: "SET_SOCIAL"; field: keyof SocialLinks; value: string }
  | { type: "ADD_SKILL"; skill: Skill }
  | { type: "UPDATE_SKILL"; id: string; data: Partial<Skill> }
  | { type: "REMOVE_SKILL"; id: string }
  | { type: "ADD_PROJECT"; project: Project }
  | { type: "UPDATE_PROJECT"; id: string; data: Partial<Project> }
  | { type: "REMOVE_PROJECT"; id: string }
  | { type: "ADD_EXPERIENCE"; experience: Experience }
  | { type: "UPDATE_EXPERIENCE"; id: string; data: Partial<Experience> }
  | { type: "REMOVE_EXPERIENCE"; id: string }
  | { type: "LOAD"; data: Portfolio }
  | { type: "RESET" };
