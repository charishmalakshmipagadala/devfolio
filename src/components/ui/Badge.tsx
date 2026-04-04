interface BadgeProps {
  label: string;
  variant?: "brand" | "ghost" | "success" | "danger";
}

const variants = {
  brand: "bg-brand/15 text-brand-light border border-brand/30",
  ghost: "bg-dark-700 text-slate-400 border border-dark-600",
  success: "bg-green-500/15 text-green-400 border border-green-500/30",
  danger: "bg-red-500/15 text-red-400 border border-red-500/30",
};

export function Badge({ label, variant = "brand" }: BadgeProps) {
  return (
    <span
      className={`inline-block px-3 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}
    >
      {label}
    </span>
  );
}
