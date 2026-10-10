import { motion, useReducedMotion } from "framer-motion";
import { MonitorSmartphone, Gauge, SearchCheck } from "lucide-react";

import SEO from "../components/SEO.jsx";
import PageHero from "../components/ui/PageHero.jsx";
import ServicesSection from "../components/sections/ServicesSection.jsx";
import ProcessSection from "../components/sections/ProcessSection.jsx";
import FaqSection from "../components/sections/FaqSection.jsx";
import CtaSection from "../components/sections/CtaSection.jsx";

const EASE = [0.22, 1, 0.36, 1];

function ServicesVisual() {
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
      <div className="relative rotate-3 overflow-hidden rounded-2xl border border-line bg-ink-200 opacity-70">
        <img
          src="/images/projects/kora.svg"
          alt=""
          aria-hidden
          loading="lazy"
          className="h-44 w-full object-cover object-top"
        />
      </div>
      <div className="relative -mt-24 -rotate-2 overflow-hidden rounded-2xl border border-accent/25 bg-ink-200 shadow-glow-soft">
        <img
          src="/images/projects/novafit.svg"
          alt="NovaFit concept project preview"
          loading="lazy"
          className="h-52 w-full object-cover object-top"
        />
        <div className="flex items-center justify-between border-t border-line/70 px-4 py-2.5">
          <span className="text-xs font-semibold text-cream">NovaFit</span>
          <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">
            Fitness Brand
          </span>
        </div>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.45, ease: EASE }}
        className="absolute -right-4 -top-5 flex items-center gap-1.5 rounded-xl border border-line bg-ink-300 px-3 py-2 shadow-card"
      >
        <MonitorSmartphone size={14} className="text-accent" />
        <span className="text-[11px] font-medium text-sage">Responsive</span>
      </motion.div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75, duration: 0.45, ease: EASE }}
        className="absolute -bottom-4 -left-4 flex items-center gap-1.5 rounded-xl border border-line bg-ink-300 px-3 py-2 shadow-card"
      >
        <SearchCheck size={14} className="text-accent" />
        <span className="text-[11px] font-medium text-sage">SEO-ready</span>
      </motion.div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.45, ease: EASE }}
        className="absolute bottom-16 -right-3 flex items-center gap-1.5 rounded-xl border border-line bg-ink-300 px-3 py-2 shadow-card"
      >
        <Gauge size={14} className="text-accent" />
        <span className="text-[11px] font-medium text-sage">Fast by default</span>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <>
      <SEO
        title="Services"
        description="Business websites, landing pages, portfolios, e-commerce, redesigns and custom web apps — built modern, fast and responsive."
        path="/services"
      />
      <PageHero
        title={
          <>
            Services designed around{" "}
            <span className="bg-gradient-to-r from-accent to-accent-soft bg-clip-text text-transparent">
              your business.
            </span>
          </>
        }
        description="Every project starts with understanding what you actually need. No bloated packages, no unnecessary features — just a website that works."
        visual={<ServicesVisual />}
      />
      <ServicesSection showHeading={false} />
      <ProcessSection />
      <FaqSection />
      <CtaSection
        title="Not sure what you need?"
        description="Tell me where you are and where you want to be. I'll recommend the right approach — even if it means a smaller project."
      />
    </>
  );
}
