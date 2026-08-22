export default function Badge({ children, className = "", tone = "accent" }) {
  const tones = {
    accent: "border-accent/30 bg-accent/10 text-accent",
    neutral: "border-white/10 bg-white/5 text-zinc-300",
    success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    warning: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}