import { motion, useReducedMotion } from "framer-motion";

const LETTERS = ["k", "o", "r", "u"];

export default function Wordmark({ className = "", textSize = "text-xl" }) {
  const reduce = useReducedMotion();

  return (
    <span
      className={`group relative inline-flex items-baseline font-display font-extrabold tracking-tight text-cream ${textSize} ${className}`}
      role="img"
      aria-label="koru."
    >
      <span aria-hidden className="inline-flex overflow-hidden pb-1">
        {LETTERS.map((letter, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={reduce ? false : { y: "115%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.55,
              delay: 0.1 + i * 0.09,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {letter}
          </motion.span>
        ))}
      </span>
      <motion.span
        aria-hidden
        className="wordmark-dot inline-block"
        initial={reduce ? false : { opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        .
      </motion.span>
      <motion.span
        aria-hidden
        className="absolute -bottom-0.5 left-0 h-px w-full origin-left bg-accent/70"
        initial={reduce ? false : { scaleX: 0, opacity: 0 }}
        animate={{ scaleX: [0, 1, 1], opacity: [0, 1, 0.25] }}
        transition={{ duration: 1.2, times: [0, 0.55, 1], ease: "easeOut" }}
      />
    </span>
  );
}
