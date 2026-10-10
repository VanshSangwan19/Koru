import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import SectionHeading from "../ui/SectionHeading.jsx";

const VALUES = [
  { title: "Design with purpose", text: "Every section earns its place — guiding visitors toward enquiry." },
  { title: "Clear communication", text: "Plain language, honest timelines, no jargon or surprises." },
  { title: "Responsive implementation", text: "Pixel-considered on phones, tablets, laptops, and desktops." },
  { title: "Reliable delivery", text: "Tested, refined, and launched properly — then supported after." },
];

export default function AboutSection() {
  const reduce = useReducedMotion();

  return (
    <section className="py-20 sm:py-28" id="studio">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-16">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="lg:sticky lg:top-28"
          >
            <SectionHeading
              eyebrow="The Studio"
              title="An independent studio, built around your business."
              description="Koru is a design and development practice focused on one thing: distinctive websites that help businesses stand out, earn trust, and grow. No templates, no filler — just considered design, clean code, and attention to detail."
            />
            <Link
              to="/about"
              className="group mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-soft"
            >
              More about the studio
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          <div className="flex flex-col">
            {VALUES.map(({ title, text }, i) => (
              <motion.div
                key={title}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="border-t border-line py-6 last:border-b"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-xs font-bold text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-cream">{title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-sage">{text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
