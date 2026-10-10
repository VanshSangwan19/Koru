import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowDown, Sparkles } from "lucide-react";

import { useApi } from "../../hooks/useApi.js";
import { api } from "../../lib/api.js";
import TaglineRotator from "../ui/TaglineRotator.jsx";
import Magnetic from "../ui/Magnetic.jsx";
import { AmbientGlow } from "../ui/AmbientGlow.jsx";
import ProjectVisual from "../ProjectVisual.jsx";

const EASE = [0.22, 1, 0.36, 1];

function MaskedLine({ children, delay = 0, className = "" }) {
  const reduce = useReducedMotion();
  return (
    <span className={`block overflow-hidden pb-1 ${className}`}>
      <motion.span
        className="block"
        initial={reduce ? false : { y: "110%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.7, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function StudioMockup() {
  const reduce = useReducedMotion();
  const { data } = useApi(async () => (await api.get("/projects?featured=true")).data);
  const featured = (data || [])[0];

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 28, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
      className="relative mx-auto w-full max-w-md lg:max-w-lg"
    >
      <AmbientGlow className="-inset-10" />
      <div
        aria-hidden
        className="absolute -inset-16 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,rgba(52,211,153,0.14),transparent_65%)] blur-2xl"
      />

      <div className="relative overflow-hidden rounded-2xl border border-line bg-ink-200 shadow-card">
        <div className="flex items-center gap-1.5 border-b border-line/70 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
          <div className="ml-3 flex-1 rounded-md bg-white/[0.04] px-3 py-1 text-[10px] text-muted">
            {featured ? `koru.studio/work/${featured.slug}` : "koru.studio"}
          </div>
        </div>

        <div className="h-56 sm:h-64">
          {featured ? (
            <ProjectVisual project={featured} />
          ) : (
            <div className="flex h-full flex-col justify-between p-5">
              <div className="h-2.5 w-28 rounded-full bg-white/15" />
              <div className="space-y-2">
                <div className="h-3.5 w-full rounded-full bg-white/10" />
                <div className="h-3.5 w-2/3 rounded-full bg-white/[0.06]" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-16 rounded-lg border border-line bg-white/[0.03]" />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-line/70 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-cream">
              {featured ? featured.title : "Selected work"}
            </span>
            <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent">
              {featured ? featured.category : "Studio"}
            </span>
          </div>
          {featured && (
            <Link
              to={`/work/${featured.slug}`}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent transition-colors hover:text-accent-soft"
              aria-label={`Open case study: ${featured.title}`}
            >
              Case study
              <ArrowUpRight size={13} />
            </Link>
          )}
        </div>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.5, ease: EASE }}
        className="absolute -right-3 -top-4 rounded-xl border border-line bg-ink-300 px-3 py-2 shadow-card sm:-right-6"
      >
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-[11px] font-medium text-sage">Responsive by default</span>
        </div>
      </motion.div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.05, duration: 0.5, ease: EASE }}
        className="absolute -bottom-5 -left-3 flex items-center gap-2 rounded-xl border border-line bg-ink-300 px-3 py-2 shadow-card sm:-left-6"
      >
        <Sparkles size={14} className="text-accent" />
        <span className="text-[11px] font-medium text-sage">Designed to convert</span>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-44">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,247,245,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(245,247,245,0.025) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black 30%, transparent 75%)",
        }}
      />
      <AmbientGlow className="-top-48 left-1/2 h-[480px] w-[720px] -translate-x-1/2" />

      <div className="container-page relative grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-xs font-semibold uppercase tracking-[0.24em] text-accent"
          >
            Independent digital studio
          </motion.p>

          <h1 className="heading-xl mt-6 text-balance">
            <MaskedLine delay={0.1}>Digital experiences,</MaskedLine>
            <MaskedLine delay={0.22}>
              built with <span className="text-accent">intention.</span>
            </MaskedLine>
          </h1>

          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-5"
          >
            <TaglineRotator />
          </motion.div>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
            className="mt-5 max-w-lg text-base leading-relaxed text-sage sm:text-lg"
          >
            We design and build distinctive websites that help businesses stand out,
            earn trust, and grow.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.72, ease: EASE }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Magnetic>
              <Link
                to="/contact"
                className="group inline-flex h-12 items-center gap-1.5 rounded-xl bg-accent px-6 text-base font-semibold text-ink transition-all hover:bg-accent-soft hover:shadow-glow active:scale-[0.98]"
              >
                Start a Project
                <ArrowUpRight size={18} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </Magnetic>
            <Link
              to="/work"
              className="group inline-flex h-12 items-center justify-center gap-1.5 rounded-xl border border-line bg-white/[0.02] px-6 text-base font-semibold text-cream transition-all hover:border-accent/40 hover:bg-white/[0.05] active:scale-[0.98]"
            >
              Explore Our Work
              <ArrowDown size={18} className="transition-transform duration-200 group-hover:translate-y-0.5" />
            </Link>
          </motion.div>
        </div>

        <StudioMockup />
      </div>
    </section>
  );
}
