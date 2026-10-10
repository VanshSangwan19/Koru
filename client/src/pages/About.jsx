import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Code2, Database, Globe } from "lucide-react";

import SEO from "../components/SEO.jsx";
import PageHero from "../components/ui/PageHero.jsx";
import Button from "../components/ui/Button.jsx";
import Wordmark from "../components/ui/Wordmark.jsx";
import { useSettings } from "../context/SettingsContext.jsx";

const EASE = [0.22, 1, 0.36, 1];

const SKILLS = [
  {
    title: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express", "REST APIs"],
  },
  {
    title: "Database",
    items: ["MongoDB", "SQL"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "VS Code", "Figma"],
  },
];

const VALUES = [
  {
    title: "Websites, not templates",
    text: "The process always starts with your business — your audience, your goals, your brand. That's what makes the result feel custom.",
  },
  {
    title: "Honest scope",
    text: "I'd rather say 'you don't need that yet' than sell you something you won't use. It's how long-term client relationships work.",
  },
  {
    title: "Care in the details",
    text: "Fast load times, proper spacing, accessible markup, mobile-first layouts. The small things are what make a site feel premium.",
  },
  {
    title: "Built to grow",
    text: "Whether you need a contact form or a full admin dashboard, the foundation is built so your site can evolve with you.",
  },
];

function AboutVisual() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
      className="relative w-[340px] overflow-hidden rounded-2xl border border-line bg-ink-200 p-7 shadow-card"
    >
      <div
        aria-hidden
        className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/[0.1] blur-3xl"
      />
      <Wordmark textSize="text-4xl" />
      <p className="mt-3 text-sm leading-relaxed text-sage">
        Independent digital studio — design, code, and care in every pixel.
      </p>
      <div className="mt-5 space-y-2.5 border-t border-line pt-5">
        {[
          { icon: Globe, label: "Design-led builds" },
          { icon: Code2, label: "React · Node · MongoDB" },
          { icon: Database, label: "CMS-driven content" },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2.5 text-sm text-sage">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-ink-300 text-accent">
              <Icon size={15} />
            </span>
            {label}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function About() {
  const reduce = useReducedMotion();
  const { settings } = useSettings();
  const site = settings?.site;

  return (
    <>
      <SEO
        title="About"
        description="Koru is a web development practice focused on modern, fast, responsive and business-focused websites."
        path="/about"
      />
      <PageHero
        eyebrow="About"
        title={
          <>
            Building digital experiences with code,{" "}
            <span className="bg-gradient-to-r from-accent to-accent-soft bg-clip-text text-transparent">
              design and curiosity.
            </span>
          </>
        }
        description={`I'm the developer behind ${site?.name || "Koru"}. I build websites that are modern, fast, responsive and easy to use — with a focus on what actually matters to businesses: clear communication and growth.`}
        visual={<AboutVisual />}
      />

      <section className="py-16 sm:py-24">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="heading-lg">How I approach a project.</h2>
              <div className="mt-8 space-y-8">
                {VALUES.map((value, i) => (
                  <motion.div
                    key={value.title}
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="flex gap-4"
                  >
                    <span className="text-sm font-bold text-accent/70">0{i + 1}</span>
                    <div>
                      <h3 className="font-bold">{value.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-sage">{value.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="heading-lg">Skills.</h2>
              <p className="mt-3 text-sm text-muted">
                The tools I work with daily — kept honest, no inflated expertise.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {SKILLS.map(({ title, items }) => (
                  <div key={title} className="card p-5">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-accent">{title}</h3>
                    <ul className="mt-3 space-y-2">
                      {items.map((item) => (
                        <li key={item} className="text-sm text-sage">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-16 sm:py-24">
        <div className="container-page flex flex-col items-start justify-between gap-8 rounded-3xl border border-line bg-ink-100 p-8 sm:flex-row sm:items-center sm:p-12">
          <div>
            <h2 className="heading-md">Want to build something together?</h2>
            <p className="mt-2 max-w-lg text-sm text-sage">
              If your project is a good fit, I'll tell you. If it isn't, I'll point
              you in the right direction.
            </p>
          </div>
          <Button to="/contact" size="lg" className="shrink-0">
            Start a Project
            <ArrowUpRight size={18} />
          </Button>
        </div>
      </section>
    </>
  );
}
