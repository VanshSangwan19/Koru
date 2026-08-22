import { Mail, MapPin, ArrowUpRight } from "lucide-react";

import SEO from "../components/SEO.jsx";
import ContactForm from "../components/sections/ContactForm.jsx";
import { useSettings } from "../context/SettingsContext.jsx";

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
      <div className="pt-32 sm:pt-40">
        <div className="container-page">
          <p className="section-title">Contact</p>
          <h1 className="heading-xl mt-4 max-w-2xl text-balance">
            Let's build something{" "}
            <span className="bg-gradient-to-r from-accent to-accent-soft bg-clip-text text-transparent">
              worth doing.
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            Tell me about your project, your goals and your timeline. I'll get
            back to you with an honest take on scope and pricing.
          </p>
        </div>
      </div>

      <section className="py-16 sm:py-24">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div>
              <h2 className="heading-md">Prefer to say it directly?</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                You can also reach me by email — responses usually come within
                a day or two.
              </p>

              {site?.email && (
                <a
                  href={`mailto:${site.email}`}
                  className="group mt-8 inline-flex items-center gap-3 text-lg font-semibold text-white transition-colors hover:text-accent"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-accent">
                    <Mail size={20} />
                  </span>
                  {site.email}
                  <ArrowUpRight size={18} className="text-zinc-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              )}

              <div className="mt-8 flex items-start gap-3 text-sm text-zinc-400">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-accent">
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