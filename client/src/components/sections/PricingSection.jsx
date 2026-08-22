import { motion, useReducedMotion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

import { useSettings } from "../../context/SettingsContext.jsx";
import SectionHeading from "../ui/SectionHeading.jsx";
import Button from "../ui/Button.jsx";

export default function PricingSection() {
  const reduce = useReducedMotion();
  const { settings, loading } = useSettings();
  const pricing = settings?.pricing;

  const plans = pricing?.plans?.length ? pricing.plans : [];

  return (
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          align="center"
          eyebrow="Pricing"
          title="Simple, honest pricing."
          description="Starting points — every project is scoped individually once we understand your needs."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {loading &&
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="card h-80 animate-pulse" />
            ))}

          {!loading &&
            plans.map((plan, i) => {
              const featured = i === 1;
              return (
                <motion.div
                  key={plan.name}
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className={`card relative flex flex-col p-7 transition-all duration-300 hover:-translate-y-1 ${
                    featured
                      ? "border-accent/30 bg-ink-100 shadow-glow"
                      : "hover:border-white/15"
                  }`}
                >
                  {featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-ink">
                      Most popular
                    </span>
                  )}
                  <h3 className="text-lg font-bold">{plan.name}</h3>
                  <p className="mt-1.5 min-h-10 text-sm text-zinc-400">{plan.tagline}</p>
                  <p className="mt-4 text-2xl font-extrabold tracking-tight">
                    {plan.priceLabel}
                  </p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {(plan.features || []).map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-zinc-300">
                        <Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    to="/contact"
                    variant={featured ? "primary" : "secondary"}
                    className="mt-7 w-full"
                  >
                    {featured ? "Let's talk" : "Get started"}
                    <ArrowRight size={16} />
                  </Button>
                </motion.div>
              );
            })}
        </div>

        <p className="mt-8 text-center text-sm text-zinc-500">
          {pricing?.note || "Every project is different. Contact me for a custom quote."}
        </p>
      </div>
    </section>
  );
}