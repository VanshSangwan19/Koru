import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, FolderOpen } from "lucide-react";

import SEO from "../components/SEO.jsx";
import PageHero from "../components/ui/PageHero.jsx";
import PortfolioSection from "../components/sections/PortfolioSection.jsx";
import CtaSection from "../components/sections/CtaSection.jsx";

const EASE = [0.22, 1, 0.36, 1];

function WorkVisual() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
      className="relative w-[340px]"
    >
      <div
        aria-hidden
        className="absolute -inset-8 rounded-[2rem] bg-accent/[0.08] blur-3xl"
      />
      <div className="relative -rotate-2 overflow-hidden rounded-2xl border border-line bg-ink-200 opacity-70">
        <img
          src="/images/projects/lumio.svg"
          alt=""
          aria-hidden
          loading="lazy"
          className="h-44 w-full object-cover object-top"
        />
      </div>
      <div className="relative -mt-24 rotate-2 overflow-hidden rounded-2xl border border-accent/25 bg-ink-200 shadow-glow-soft">
        <img
          src="/images/projects/velora.svg"
          alt="Velora concept project preview"
          loading="lazy"
          className="h-52 w-full object-cover object-top"
        />
        <div className="flex items-center justify-between border-t border-line/70 px-4 py-2.5">
          <span className="text-xs font-semibold text-cream">Velora</span>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent">
            Case study <ArrowUpRight size={12} />
          </span>
        </div>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.45, ease: EASE }}
        className="absolute -right-4 -top-5 flex items-center gap-1.5 rounded-xl border border-line bg-ink-300 px-3 py-2 shadow-card"
      >
        <FolderOpen size={14} className="text-accent" />
        <span className="text-[11px] font-medium text-sage">Full case studies</span>
      </motion.div>
    </motion.div>
  );
}

export default function Work() {
  return (
    <>
      <SEO
        title="Work"
        description="Selected concept projects: restaurant, fitness, fashion e-commerce, SaaS, real estate and portfolio websites."
        path="/work"
      />
      <PageHero
        title={
          <>
            A few projects to{" "}
            <span className="bg-gradient-to-r from-accent to-accent-soft bg-clip-text text-transparent">
              show how I work.
            </span>
          </>
        }
        description="These are concept projects exploring different industries and goals. Each one has a full breakdown of the thinking behind it."
        visual={<WorkVisual />}
      />
      <PortfolioSection showHeading={false} />
      <CtaSection
        title="Want a project like these?"
        description="Every concept here was built the same way your project would be — designed around a specific business and audience."
      />
    </>
  );
}
