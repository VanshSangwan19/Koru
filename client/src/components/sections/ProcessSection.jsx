import { motion, useReducedMotion } from "framer-motion";

import SectionHeading from "../ui/SectionHeading.jsx";

const STEPS = [
  {
    number: "01",
    title: "Discover",
    description: "Understand the business, its audience, and its goals.",
  },
  {
    number: "02",
    title: "Design",
    description: "Shape the visual direction and user experience.",
  },
  {
    number: "03",
    title: "Build",
    description: "Develop the website with responsive layouts and reliable functionality.",
  },
  {
    number: "04",
    title: "Launch",
    description: "Test, refine, and prepare the website for launch.",
  },
];

export default function ProcessSection() {
  const reduce = useReducedMotion();

  return (
    <section className="py-20 sm:py-28" id="process">
      <div className="container-page">
        <SectionHeading
          align="center"
          eyebrow="Process"
          title="From idea to launch."
          description="A clear path from first conversation to a website you're proud to share."
        />

        <div className="relative mt-14">
          <motion.div
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 top-8 hidden h-px origin-left bg-gradient-to-r from-transparent via-accent/50 to-transparent lg:block"
            aria-hidden
          />

          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {STEPS.map(({ number, title, description }, i) => (
              <motion.li
                key={number}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="relative flex flex-col items-start gap-4"
              >
                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-line bg-ink-200 font-display text-lg font-extrabold text-accent shadow-card">
                    {number}
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-cream">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-sage">
                    {description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
