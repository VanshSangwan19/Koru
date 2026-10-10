import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const TAGLINES = [
  { lead: "Built to stand out.", accent: "Designed to perform." },
  { lead: "Your vision.", accent: "Our digital craft." },
  { lead: "Less ordinary.", accent: "More digital." },
];

const INTERVAL_MS = 3000;
const TRANSITION_MS = 650;

export default function TaglineRotator({ className = "" }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    if (reduce) return;
    const tick = () => {
      if (document.hidden) return;
      setIndex((i) => (i + 1) % TAGLINES.length);
    };
    const onVisibility = () => {
      if (timer.current) clearInterval(timer.current);
      timer.current = setInterval(tick, INTERVAL_MS);
    };
    timer.current = setInterval(tick, INTERVAL_MS);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      if (timer.current) clearInterval(timer.current);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduce]);

  const current = TAGLINES[index];

  if (reduce) {
    return (
      <p className={`text-lg text-sage sm:text-xl ${className}`}>
        {TAGLINES[0].lead} <span className="text-accent">{TAGLINES[0].accent}</span>
      </p>
    );
  }

  return (
    <div className={`tagline-lock overflow-hidden ${className}`} aria-live="polite" aria-atomic="true">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          className="text-lg text-sage sm:text-xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: TRANSITION_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
        >
          {current.lead} <span className="font-semibold text-accent">{current.accent}</span>
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
