import { Component, type ReactNode, type ErrorInfo } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div
            style={{
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#0a0a0f",
            }}
          >
            <div
              style={{
                background: "#111827",
                border: "1px solid #ef4444",
                borderRadius: 16,
                padding: 40,
                maxWidth: 400,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 16 }}>⚠️</div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#f1f5f9",
                  marginBottom: 8,
                }}
              >
                Something went wrong
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "#94a3b8",
                  marginBottom: 24,
                  lineHeight: 1.6,
                }}
              >
                {this.state.error?.message || "An unexpected error occurred"}
              </div>
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                style={{
                  background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                  color: "#fff",
                  padding: "10px 24px",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Try Again
              </button>
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
