import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { type Portfolio, type PortfolioAction } from "../types/portfolio";
import { defaultPortfolio } from "../data/defaults";

// --- Reducer ---
function portfolioReducer(
  state: Portfolio,
  action: PortfolioAction,
): Portfolio {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };

    case "SET_SOCIAL":
      return {
        ...state,
        social: { ...state.social, [action.field]: action.value },
      };

    case "ADD_SKILL":
      return { ...state, skills: [...state.skills, action.skill] };

    case "UPDATE_SKILL":
      return {
        ...state,
        skills: state.skills.map((s) =>
          s.id === action.id ? { ...s, ...action.data } : s,
        ),
      };

    case "REMOVE_SKILL":
      return {
        ...state,
        skills: state.skills.filter((s) => s.id !== action.id),
      };

    case "ADD_PROJECT":
      return { ...state, projects: [...state.projects, action.project] };

    case "UPDATE_PROJECT":
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.id ? { ...p, ...action.data } : p,
        ),
      };

    case "REMOVE_PROJECT":
      return {
        ...state,
        projects: state.projects.filter((p) => p.id !== action.id),
      };

    case "ADD_EXPERIENCE":
      return { ...state, experience: [...state.experience, action.experience] };

    case "UPDATE_EXPERIENCE":
      return {
        ...state,
        experience: state.experience.map((e) =>
          e.id === action.id ? { ...e, ...action.data } : e,
        ),
      };

    case "REMOVE_EXPERIENCE":
      return {
        ...state,
        experience: state.experience.filter((e) => e.id !== action.id),
      };

    case "LOAD":
      return action.data;

    case "RESET":
      return defaultPortfolio;

    default:
      return state;
  }
}

// --- Context shape ---
interface PortfolioContextType {
  portfolio: Portfolio;
  dispatch: React.Dispatch<PortfolioAction>;
  isSaved: boolean;
}

const PortfolioContext = createContext<PortfolioContextType | null>(null);

// --- Provider ---
export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [portfolio, dispatch] = useReducer(portfolioReducer, defaultPortfolio);
  const [isSaved, setIsSaved] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("devfolio_portfolio");
      if (saved) {
        dispatch({ type: "LOAD", data: JSON.parse(saved) });
      }
    } catch (err) {
      console.error("Failed to load saved portfolio:", err);
    }
  }, []);

  // Auto-save to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem("devfolio_portfolio", JSON.stringify(portfolio));
      setIsSaved(true);
      const timer = setTimeout(() => setIsSaved(false), 1500);
      return () => clearTimeout(timer);
    } catch (err) {
      console.error("Failed to save portfolio:", err);
    }
  }, [portfolio]);

  return (
    <PortfolioContext.Provider value={{ portfolio, dispatch, isSaved }}>
      {children}
    </PortfolioContext.Provider>
  );
}

// --- Custom hook ---
export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx)
    throw new Error("usePortfolio must be used inside PortfolioProvider");
  return ctx;
}
