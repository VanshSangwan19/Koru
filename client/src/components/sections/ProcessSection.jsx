import { motion, useReducedMotion } from "framer-motion";
import { Search, PenTool, Code2, Rocket } from "lucide-react";

import SectionHeading from "../ui/SectionHeading.jsx";

const STEPS = [
  {
    icon: Search,
    title: "Discover",
    description: "Understand the business, audience and goals.",
  },
  {
    icon: PenTool,
    title: "Design",
    description: "Create the visual direction and user experience.",
  },
  {
    icon: Code2,
    title: "Build",
    description: "Develop a fast, responsive and scalable website.",
  },
  {
    icon: Rocket,
    title: "Launch",
    description: "Test, optimize and deploy the final product.",
  },
];

export default function ProcessSection() {
  const reduce = useReducedMotion();

  return (
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          align="center"
          eyebrow="Process"
          title="From idea to launch."
          description="A clear, proven process so you always know what's happening and what's next."
        />

        <div className="relative mt-14">
          <div
            className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent lg:block"
            aria-hidden
          />

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {STEPS.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="relative flex flex-col items-start gap-4"
              >
                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-ink-100 text-accent shadow-card">
                    <Icon size={24} aria-hidden />
                  </div>
                  <span className="absolute -right-3 -top-3 text-xs font-bold text-zinc-600">
                    0{i + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                    {description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}