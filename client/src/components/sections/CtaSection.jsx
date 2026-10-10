import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import Magnetic from "../ui/Magnetic.jsx";
import Wordmark from "../ui/Wordmark.jsx";

export default function CtaSection({ title, description }) {
  const reduce = useReducedMotion();

  return (
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden rounded-3xl border border-line bg-ink-100 px-6 py-16 text-center sm:px-12 sm:py-24"
        >
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden
            style={{
              backgroundImage:
                "linear-gradient(rgba(245,247,245,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(245,247,245,0.025) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
              maskImage: "radial-gradient(ellipse 60% 80% at 50% 50%, black, transparent)",
              WebkitMaskImage: "radial-gradient(ellipse 60% 80% at 50% 50%, black, transparent)",
            }}
          />
          <div className="pointer-events-none absolute -top-28 left-1/2 h-64 w-[560px] -translate-x-1/2 rounded-full bg-accent/[0.08] blur-3xl" aria-hidden />

          <div className="relative">
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex justify-center"
            >
              <Wordmark textSize="text-sm" />
            </motion.div>
            <h2 className="heading-lg mx-auto mt-6 max-w-2xl text-balance">
              {title || "Have something worth building?"}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-sage">
              {description || "Let's turn your next idea into a thoughtful digital experience."}
            </p>
            <div className="mt-9 flex justify-center">
              <Magnetic>
                <Link
                  to="/contact"
                  className="group inline-flex h-12 items-center gap-1.5 rounded-xl bg-accent px-7 text-base font-semibold text-ink transition-all hover:bg-accent-soft hover:shadow-glow active:scale-[0.98]"
                >
                  Let&apos;s Talk
                  <ArrowUpRight size={18} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </Magnetic>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
