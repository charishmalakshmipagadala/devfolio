import { type InputHTMLAttributes, type TextareaHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const baseStyle = {
  width: "100%",
  background: "#111827",
  border: "1px solid #1f2937",
  color: "#e2e8f0",
  padding: "8px 12px",
  borderRadius: 8,
  fontSize: 14,
  outline: "none",
  fontFamily: "inherit",
  transition: "border-color .2s",
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, style, ...props }, ref) => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {label && (
          <label
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#64748b",
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          style={{
            ...baseStyle,
            borderColor: error ? "#ef4444" : "#1f2937",
            ...style,
          }}
          onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
          onBlur={(e) =>
            (e.target.style.borderColor = error ? "#ef4444" : "#1f2937")
          }
          {...props}
        />
        {error && (
          <span style={{ fontSize: 12, color: "#f87171" }}>{error}</span>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, style, ...props }, ref) => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {label && (
          <label
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#64748b",
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          rows={3}
          style={{
            ...baseStyle,
            resize: "vertical",
            minHeight: 80,
            borderColor: error ? "#ef4444" : "#1f2937",
            ...style,
          }}
          onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
          onBlur={(e) =>
            (e.target.style.borderColor = error ? "#ef4444" : "#1f2937")
          }
          {...props}
        />
        {error && (
          <span style={{ fontSize: 12, color: "#f87171" }}>{error}</span>
        )}
      </div>
    );
  },
);
TextArea.displayName = "TextArea";
