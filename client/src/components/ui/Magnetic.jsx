import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function Magnetic({ children, strength = 5, className = "" }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const coarse =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(pointer: coarse)").matches;

  if (reduce || coarse) {
    return <span className={`inline-flex ${className}`}>{children}</span>;
  }

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    const clamp = (v) => Math.max(-strength, Math.min(strength, v * 0.18));
    setOffset({ x: clamp(dx), y: clamp(dy) });
  };

  return (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "tween", duration: 0.18, ease: "easeOut" }}
      className={`inline-flex ${className}`}
    >
      {children}
    </motion.span>
  );
}
