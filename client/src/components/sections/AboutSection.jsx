import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import SectionHeading from "../ui/SectionHeading.jsx";

const HIGHLIGHTS = ["Modern", "Fast", "Responsive", "Easy to use", "Business-focused"];

export default function AboutSection() {
  const reduce = useReducedMotion();

  return (
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
          >
            <SectionHeading
              eyebrow="About"
              title="Building digital experiences with code, design and curiosity."
              description="Koru is a web development practice focused on one thing: websites that genuinely help businesses. Not templates, not filler — just clear, fast, well-crafted digital experiences that work on every device."
            />
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {HIGHLIGHTS.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-sm font-medium text-zinc-300"
                >
                  {item}
                </li>
              ))}
            </ul>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-soft"
            >
              More about me
              <ArrowRight size={15} />
            </Link>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { icon: Sparkles, title: "Design first", text: "Visual direction before any code, so the result matches your brand." },
              { icon: Sparkles, title: "Performance built in", text: "Fast load times and clean code aren't afterthoughts here." },
              { icon: Sparkles, title: "Business focused", text: "Every section has a purpose — driving enquiries and growth." },
              { icon: Sparkles, title: "Straightforward", text: "Clear communication, honest timelines and fair pricing." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="card p-5">
                <Icon size={18} className="text-accent" aria-hidden />
                <h3 className="mt-3 text-sm font-bold">{title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">{text}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}