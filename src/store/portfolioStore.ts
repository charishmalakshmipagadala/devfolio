import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import {
 type Portfolio,
 type Skill,
 type Project,
 type Experience,
} from "../types/portfolio";
import { defaultPortfolio } from "../data/defaults";

// --- State shape ---
interface PortfolioStore {
  portfolio: Portfolio;
  isSaved: boolean;

  // Actions — grouped by concern
  setField: (field: keyof Portfolio, value: Portfolio[keyof Portfolio]) => void;
  setSocial: (field: keyof Portfolio["social"], value: string) => void;

  addSkill: (skill: Skill) => void;
  updateSkill: (id: string, data: Partial<Skill>) => void;
  removeSkill: (id: string) => void;

  addProject: (project: Project) => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  removeProject: (id: string) => void;

  addExperience: (experience: Experience) => void;
  updateExperience: (id: string, data: Partial<Experience>) => void;
  removeExperience: (id: string) => void;

  loadPortfolio: (data: Portfolio) => void;
  resetPortfolio: () => void;
  setIsSaved: (value: boolean) => void;
}

export const usePortfolioStore = create<PortfolioStore>()(
  devtools(
    persist(
      (set) => ({
        portfolio: defaultPortfolio,
        isSaved: false,

        setField: (field, value) =>
          set((state) => ({
            portfolio: { ...state.portfolio, [field]: value },
            isSaved: false,
          })),

        setSocial: (field, value) =>
          set((state) => ({
            portfolio: {
              ...state.portfolio,
              social: { ...state.portfolio.social, [field]: value },
            },
            isSaved: false,
          })),

        addSkill: (skill) =>
          set((state) => ({
            portfolio: {
              ...state.portfolio,
              skills: [...state.portfolio.skills, skill],
            },
          })),

        updateSkill: (id, data) =>
          set((state) => ({
            portfolio: {
              ...state.portfolio,
              skills: state.portfolio.skills.map((s) =>
                s.id === id ? { ...s, ...data } : s,
              ),
            },
          })),

        removeSkill: (id) =>
          set((state) => ({
            portfolio: {
              ...state.portfolio,
              skills: state.portfolio.skills.filter((s) => s.id !== id),
            },
          })),

        addProject: (project) =>
          set((state) => ({
            portfolio: {
              ...state.portfolio,
              projects: [...state.portfolio.projects, project],
            },
          })),

        updateProject: (id, data) =>
          set((state) => ({
            portfolio: {
              ...state.portfolio,
              projects: state.portfolio.projects.map((p) =>
                p.id === id ? { ...p, ...data } : p,
              ),
            },
          })),

        removeProject: (id) =>
          set((state) => ({
            portfolio: {
              ...state.portfolio,
              projects: state.portfolio.projects.filter((p) => p.id !== id),
            },
          })),

        addExperience: (experience) =>
          set((state) => ({
            portfolio: {
              ...state.portfolio,
              experience: [...state.portfolio.experience, experience],
            },
          })),

        updateExperience: (id, data) =>
          set((state) => ({
            portfolio: {
              ...state.portfolio,
              experience: state.portfolio.experience.map((e) =>
                e.id === id ? { ...e, ...data } : e,
              ),
            },
          })),

        removeExperience: (id) =>
          set((state) => ({
            portfolio: {
              ...state.portfolio,
              experience: state.portfolio.experience.filter((e) => e.id !== id),
            },
          })),

        loadPortfolio: (data) => set({ portfolio: data }),

        resetPortfolio: () => set({ portfolio: defaultPortfolio }),

        setIsSaved: (value) => set({ isSaved: value }),
      }),
      {
        name: "devfolio-storage", // key in localStorage
        // only persist the portfolio data, not isSaved
        partialize: (state) => ({ portfolio: state.portfolio }),
      },
    ),
  ),
);
