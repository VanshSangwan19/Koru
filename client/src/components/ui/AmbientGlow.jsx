import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export function AmbientGlow({ className = "" }) {
  const reduce = useReducedMotion();
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full bg-accent/[0.11] blur-3xl ${
        reduce ? "" : "animate-ambient-drift"
      } ${className}`}
    />
  );
}

export function CursorGlow() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const target = useRef({ x: -400, y: -400 });
  const pos = useRef({ x: -400, y: -400 });

  useEffect(() => {
    if (reduce) return;
    if (typeof window === "undefined" || !window.matchMedia) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.08;
      pos.current.y += (target.current.y - pos.current.y) * 0.08;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${pos.current.x - 160}px, ${pos.current.y - 160}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 hidden lg:block"
    >
      <div
        ref={ref}
        className="h-80 w-80 rounded-full opacity-[0.05]"
        style={{
          background: "radial-gradient(circle, #a7f3d0 0%, transparent 65%)",
          willChange: "transform",
        }}
      />
    </div>
  );
}
