import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import Button from "../ui/Button.jsx";

export default function CtaSection({ title, description }) {
  const reduce = useReducedMotion();

  return (
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-accent/20 bg-gradient-to-br from-ink-100 to-ink px-6 py-16 text-center sm:px-12 sm:py-20"
        >
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
              maskImage: "radial-gradient(ellipse 60% 80% at 50% 50%, black, transparent)",
              WebkitMaskImage: "radial-gradient(ellipse 60% 80% at 50% 50%, black, transparent)",
            }}
          />
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[560px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" aria-hidden />

          <div className="relative">
            <h2 className="heading-lg mx-auto max-w-2xl text-balance">
              {title || "Have a project in mind?"}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-zinc-400">
              {description || "Let's talk about what you need. You'll get an honest take on scope, timeline and cost — no pressure."}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button to="/contact" size="lg">
                Start a Project
                <ArrowUpRight size={18} />
              </Button>
              <Button to="/services" size="lg" variant="secondary">
                See services
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}