import { motion, useReducedMotion } from "framer-motion";
import {
  Compass,
  Smartphone,
  Gauge,
  Code2,
  MessagesSquare,
  TrendingUp,
} from "lucide-react";

import SectionHeading from "../ui/SectionHeading.jsx";

const REASONS = [
  {
    icon: Compass,
    title: "Designed around your business",
    text: "No generic templates. The design starts from your brand, audience and goals.",
  },
  {
    icon: Smartphone,
    title: "Mobile-first",
    text: "Built for phones first, so it feels intentional everywhere — not squeezed.",
  },
  {
    icon: Gauge,
    title: "Fast performance",
    text: "Optimized images, lean code and smart architecture keep things quick.",
  },
  {
    icon: Code2,
    title: "Clean development",
    text: "Readable, maintainable code with modern, secure best practices.",
  },
  {
    icon: MessagesSquare,
    title: "Easy communication",
    text: "You'll know what's happening at every step, in plain language.",
  },
  {
    icon: TrendingUp,
    title: "Built for growth",
    text: "Clear calls to action and SEO-ready structure help turn visits into customers.",
  },
];

export default function WhyKoruSection() {
  const reduce = useReducedMotion();

  return (
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          align="center"
          eyebrow="Why Koru"
          title="Why work with me?"
          description="Because a website should earn its keep — by looking professional, working reliably, and helping you grow."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map(({ icon: Icon, title, text }, i) => (
            <motion.div
              key={title}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="group card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/25"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent">
                <Icon size={20} aria-hidden />
              </div>
              <h3 className="mt-4 font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}