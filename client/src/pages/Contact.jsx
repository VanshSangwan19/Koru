import { motion, useReducedMotion } from "framer-motion";
import { Mail, MapPin, ArrowUpRight, Clock } from "lucide-react";

import SEO from "../components/SEO.jsx";
import PageHero from "../components/ui/PageHero.jsx";
import ContactForm from "../components/sections/ContactForm.jsx";
import { useSettings } from "../context/SettingsContext.jsx";

const EASE = [0.22, 1, 0.36, 1];

function ContactVisual() {
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
      <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
        <Mail size={22} />
      </span>
      <p className="mt-4 font-display text-lg font-bold text-cream">
        Every message gets a personal reply.
      </p>
      <p className="mt-2 text-sm leading-relaxed text-sage">
        No bots, no sales team — you talk directly to the person who will build your site.
      </p>
      <div className="mt-5 flex items-center gap-2 rounded-xl border border-line bg-ink-300 px-3.5 py-3">
        <Clock size={15} className="shrink-0 text-accent" />
        <span className="text-[13px] font-medium text-sage">Replies within 1–2 days</span>
      </div>
    </motion.div>
  );
}

export default function Contact() {
  const { settings } = useSettings();
  const site = settings?.site;

  return (
    <>
      <SEO
        title="Contact"
        description="Tell me about your project. Get a reply within a day or two — honest scope, timeline and pricing."
        path="/contact"
      />
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s build something{" "}
            <span className="bg-gradient-to-r from-accent to-accent-soft bg-clip-text text-transparent">
              worth doing.
            </span>
          </>
        }
        description="Tell me about your project, your goals and your timeline. I'll get back to you with an honest take on scope and pricing."
        visual={<ContactVisual />}
      />

      <section className="py-16 sm:py-24">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div>
              <h2 className="heading-md">Prefer to say it directly?</h2>
              <p className="mt-3 text-sm leading-relaxed text-sage">
                You can also reach me by email — responses usually come within
                a day or two.
              </p>

              {site?.email && (
                <a
                  href={`mailto:${site.email}`}
                  className="group mt-8 inline-flex items-center gap-3 text-lg font-semibold text-cream transition-colors hover:text-accent"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white/[0.02] text-accent">
                    <Mail size={20} />
                  </span>
                  {site.email}
                  <ArrowUpRight size={18} className="text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              )}

              <div className="mt-8 flex items-start gap-3 text-sm text-sage">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line bg-white/[0.02] text-accent">
                  <MapPin size={16} />
                </span>
                <p>
                  Based in India, working with clients everywhere.
                  <br />
                  Timezone-friendly and flexible with schedules.
                </p>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
