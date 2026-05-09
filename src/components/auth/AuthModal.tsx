import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../../store/authStore";
import { Input, Button } from "../ui";

const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type SignupForm = z.infer<typeof signupSchema>;
type LoginForm = z.infer<typeof loginSchema>;

interface AuthModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function AuthModal({ onClose, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuthStore();

  const signupForm = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });
  const loginForm = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  async function handleSignup(values: SignupForm) {
    try {
      setLoading(true);
      setError("");
      await signup(values.email, values.password, values.name);
      onSuccess();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(values: LoginForm) {
    try {
      setLoading(true);
      setError("");
      await login(values.email, values.password);
      onSuccess();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    // Backdrop
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        padding: 20,
      }}
    >
      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#111827",
          border: "1px solid #1f2937",
          borderRadius: 16,
          padding: 32,
          width: "100%",
          maxWidth: 400,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#f1f5f9" }}>
              {mode === "signup" ? "Create account" : "Welcome back"}
            </div>
            <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>
              {mode === "signup"
                ? "Start building your portfolio"
                : "Sign in to your account"}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "#64748b",
              fontSize: 20,
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: 8,
              padding: "10px 14px",
              marginBottom: 16,
              fontSize: 13,
              color: "#f87171",
            }}
          >
            {error}
          </div>
        )}

        {/* Signup Form */}
        {mode === "signup" && (
          <form
            onSubmit={signupForm.handleSubmit(handleSignup)}
            style={{ display: "flex", flexDirection: "column", gap: 14 }}
          >
            <Input
              label="Full Name"
              placeholder="John Doe"
              error={signupForm.formState.errors.name?.message}
              {...signupForm.register("name")}
            />
            <Input
              label="Email"
              placeholder="you@email.com"
              error={signupForm.formState.errors.email?.message}
              {...signupForm.register("email")}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Min 8 characters"
              error={signupForm.formState.errors.password?.message}
              {...signupForm.register("password")}
            />
            <Button
              type="submit"
              fullWidth
              disabled={loading}
              style={{ marginTop: 8 }}
            >
              {loading ? "Creating account..." : "Create Account →"}
            </Button>
          </form>
        )}

        {/* Login Form */}
        {mode === "login" && (
          <form
            onSubmit={loginForm.handleSubmit(handleLogin)}
            style={{ display: "flex", flexDirection: "column", gap: 14 }}
          >
            <Input
              label="Email"
              placeholder="you@email.com"
              error={loginForm.formState.errors.email?.message}
              {...loginForm.register("email")}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Your password"
              error={loginForm.formState.errors.password?.message}
              {...loginForm.register("password")}
            />
            <Button
              type="submit"
              fullWidth
              disabled={loading}
              style={{ marginTop: 8 }}
            >
              {loading ? "Signing in..." : "Sign In →"}
            </Button>
          </form>
        )}

        {/* Toggle */}
        <div
          style={{
            textAlign: "center",
            marginTop: 20,
            fontSize: 13,
            color: "#64748b",
          }}
        >
          {mode === "signup"
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <button
            onClick={() => {
              setMode(mode === "signup" ? "login" : "signup");
              setError("");
            }}
            style={{
              background: "transparent",
              border: "none",
              color: "#6366f1",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 13,
            }}
          >
            {mode === "signup" ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
