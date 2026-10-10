export default function HeroBackdrop({ className = "" }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <svg
        className="absolute -right-48 top-0 h-full w-[760px] text-accent"
        viewBox="0 0 760 620"
        fill="none"
        preserveAspectRatio="xMaxYMin slice"
      >
        <g stroke="currentColor" strokeWidth="1">
          <circle cx="700" cy="80" r="140" opacity="0.16" />
          <circle cx="700" cy="80" r="210" opacity="0.11" />
          <circle cx="700" cy="80" r="280" opacity="0.08" />
          <circle cx="700" cy="80" r="350" opacity="0.055" />
          <circle cx="700" cy="80" r="420" opacity="0.035" />
        </g>
        <g stroke="currentColor" strokeWidth="1" opacity="0.1">
          <line x1="0" y1="140" x2="760" y2="140" />
          <line x1="0" y1="330" x2="760" y2="330" />
          <line x1="0" y1="520" x2="760" y2="520" />
        </g>
        <g stroke="currentColor" strokeWidth="1.5" opacity="0.22">
          <path d="M120 132h16M128 124v16" />
          <path d="M540 322h16M548 314v16" />
          <path d="M250 512h16M258 504v16" />
        </g>
        <circle cx="700" cy="80" r="5" fill="currentColor" opacity="0.5" />
      </svg>
      <div className="absolute right-[-120px] top-[-80px] h-[420px] w-[420px] rounded-full bg-accent/[0.07] blur-3xl" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(246,241,231,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(246,241,231,0.022) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 60% 55% at 78% 20%, black 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 55% at 78% 20%, black 20%, transparent 75%)",
        }}
      />
    </div>
  );
}
