import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Sparkles, Shield, Zap, Smartphone, LayoutTemplate } from "lucide-react";

import { useSettings } from "../../context/SettingsContext.jsx";
import Button from "../ui/Button.jsx";

const TRUST = [
  { icon: LayoutTemplate, label: "Modern Design" },
  { icon: Smartphone, label: "Responsive" },
  { icon: Zap, label: "Fast" },
  { icon: Shield, label: "SEO Ready" },
];

const CODE_LINES = [
  { indent: 0, color: "text-purple-400", text: "const koru = {", },
  { indent: 1, color: "text-accent", text: "design: 'premium'," },
  { indent: 1, color: "text-emerald-400", text: "performance: 'fast'," },
  { indent: 1, color: "text-amber-400", text: "focus: 'conversion'," },
  { indent: 0, color: "text-zinc-500", text: "};" },
];

function BrowserMockup() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="relative mx-auto w-full max-w-md lg:max-w-lg"
    >
      <div className="absolute -inset-8 rounded-[2.5rem] bg-accent/10 blur-3xl" aria-hidden />

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-ink-100 shadow-glow">
        <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
          <div className="ml-3 flex-1 rounded-md bg-white/[0.04] px-3 py-1 text-[10px] text-zinc-500">
            koru.dev
          </div>
        </div>

        <div className="space-y-3 p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="h-2.5 w-24 rounded-full bg-white/15" />
            <div className="h-6 w-16 rounded-lg bg-accent/80" />
          </div>
          <div className="h-3.5 w-full rounded-full bg-white/10" />
          <div className="h-3.5 w-3/4 rounded-full bg-white/[0.06]" />
          <div className="grid grid-cols-3 gap-2 pt-1">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-16 rounded-lg border border-white/[0.06] bg-white/[0.03] p-2">
                <div className="h-2 w-2/3 rounded-full bg-accent/50" />
                <div className="mt-1.5 h-1.5 w-full rounded-full bg-white/10" />
                <div className="mt-1 h-1.5 w-1/2 rounded-full bg-white/[0.05]" />
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/[0.06] px-4 py-3">
          <pre className="overflow-hidden text-[10px] leading-relaxed">
            <code>
              {CODE_LINES.map((line, i) => (
                <div key={i} style={{ paddingLeft: `${line.indent * 0.75}rem` }}>
                  <span className={line.color}>{line.text}</span>
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7 }}
        className="absolute -right-3 -top-4 rounded-xl border border-white/10 bg-ink-200 px-3 py-2 shadow-card sm:-right-6"
      >
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-[11px] font-medium text-zinc-300">All systems fast</span>
        </div>
      </motion.div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="absolute -bottom-5 -left-3 flex items-center gap-2 rounded-xl border border-white/10 bg-ink-200 px-3 py-2 shadow-card sm:-left-6"
      >
        <Sparkles size={14} className="text-accent" />
        <span className="text-[11px] font-medium text-zinc-300">Conversion-focused</span>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const { settings } = useSettings();
  const availability = settings?.site?.availability || "Available for freelance projects";

  return (
    <section className="relative overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-40">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black 30%, transparent 75%)",
        }}
      />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-3xl" aria-hidden />

      <div className="container-page relative grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/[0.08] px-3.5 py-1.5"
          >
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-xs font-medium text-accent-soft">{availability}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="heading-xl mt-6 text-balance"
          >
            Websites built to make your business{" "}
            <span className="bg-gradient-to-r from-accent to-accent-soft bg-clip-text text-transparent">
              stand out.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-lg text-base leading-relaxed text-zinc-400 sm:text-lg"
          >
            I design and build fast, modern and conversion-focused websites
            for businesses, creators and startups.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button to="/contact" size="lg">
              Start a Project
              <ArrowUpRight size={18} />
            </Button>
            <Button to="/work" size="lg" variant="secondary">
              View My Work
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/[0.06] pt-6"
          >
            {TRUST.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon size={16} className="text-accent" aria-hidden />
                <span className="text-sm font-medium text-zinc-400">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <BrowserMockup />
      </div>
    </section>
  );
}