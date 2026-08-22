import { useMemo } from "react";
import { ArrowUpRight } from "lucide-react";

const PALETTES = [
  "from-sky-500/30 via-blue-600/20 to-transparent",
  "from-violet-500/30 via-indigo-600/20 to-transparent",
  "from-emerald-500/30 via-teal-600/20 to-transparent",
  "from-rose-500/30 via-pink-600/20 to-transparent",
  "from-amber-500/30 via-orange-600/20 to-transparent",
  "from-cyan-500/30 via-sky-600/20 to-transparent",
];

const GRIDS = [
  "grid-cols-6",
  "grid-cols-5",
  "grid-cols-7",
  "grid-cols-6",
  "grid-cols-5",
  "grid-cols-7",
];

function initials(name = "") {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function ProjectVisual({ project, className = "" }) {
  const palette = useMemo(() => PALETTES[project.title.length % PALETTES.length], [project.title]);
  const grid = useMemo(() => GRIDS[project.title.length % GRIDS.length], [project.title]);
  const chars = initials(project.title);

  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-gradient-to-br ${palette} ${className}`}
      role="img"
      aria-label={`Concept visual for ${project.title}`}
    >
      <div
        className={`absolute inset-0 grid ${grid} gap-px opacity-[0.18]`}
        aria-hidden
      >
        {Array.from({ length: 36 }).map((_, i) => (
          <div
            key={i}
            className="bg-white/10"
            style={{
              borderRadius: i % 7 === 0 ? "9999px" : "4px",
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <span className="rounded-md border border-white/20 bg-black/30 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/80">
            Concept Project
          </span>
          <ArrowUpRight size={16} className="text-white/60" />
        </div>
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {chars}
            </p>
            <p className="mt-1 text-sm font-medium text-white/70">{project.title}</p>
          </div>
          <div className="hidden h-10 w-16 overflow-hidden rounded-md border border-white/20 bg-black/20 sm:block">
            <div className="h-2 w-full bg-white/20" />
            <div className="mt-1 space-y-1 px-1.5">
              <div className="h-1.5 w-full rounded bg-white/15" />
              <div className="h-1.5 w-2/3 rounded bg-white/15" />
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
    </div>
  );
}