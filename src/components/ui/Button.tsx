import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger" | "tab";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  active?: boolean;
}

const variantStyles = {
  primary: {
    background: "linear-gradient(135deg, #6366f1, #4f46e5)",
    color: "#fff",
    border: "none",
  },
  secondary: {
    background: "rgba(99,102,241,0.15)",
    color: "#818cf8",
    border: "1px solid rgba(99,102,241,0.3)",
  },
  ghost: {
    background: "transparent",
    color: "#94a3b8",
    border: "1px solid #1f2937",
  },
  danger: {
    background: "rgba(239,68,68,0.15)",
    color: "#f87171",
    border: "1px solid rgba(239,68,68,0.3)",
  },
  tab: {
    background: "transparent",
    color: "#64748b",
    border: "none",
  },
};

const sizeStyles = {
  sm: { padding: "6px 12px", fontSize: 12 },
  md: { padding: "8px 16px", fontSize: 14 },
  lg: { padding: "12px 28px", fontSize: 16 },
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  active,
  style,
  ...props
}: ButtonProps) {
  const isTab = variant === "tab";
  return (
    <button
      style={{
        ...variantStyles[variant],
        ...sizeStyles[size],
        borderRadius: isTab ? 0 : 8,
        fontWeight: isTab ? 500 : 600,
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "opacity .2s, transform .1s",
        width: fullWidth ? "100%" : "auto",
        whiteSpace: isTab ? "nowrap" : undefined,
        borderBottom: isTab ? (active ? "2px solid #6366f1" : "2px solid transparent") : undefined,
        color: isTab ? (active ? "#6366f1" : "#64748b") : variantStyles[variant].color,
        marginBottom: isTab ? -1 : undefined,
        ...style,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      {...props}
    >
      {children}
    </button>
  );
}
