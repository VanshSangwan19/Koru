import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  Building2,
  Target,
  Palette,
  ShoppingBag,
  RefreshCcw,
  Code2,
  ArrowUpRight,
} from "lucide-react";

import { useApi } from "../../hooks/useApi.js";
import { api } from "../../lib/api.js";
import SectionHeading from "../ui/SectionHeading.jsx";
import { CardSkeleton } from "../ui/Skeleton.jsx";
import ErrorState from "../ui/ErrorState.jsx";

const ICON_MAP = {
  Building2,
  Target,
  Palette,
  ShoppingBag,
  RefreshCcw,
  Code2,
  Globe: Building2,
};

export function ServiceCard({ service, index = 0 }) {
  const reduce = useReducedMotion();
  const Icon = ICON_MAP[service.icon] || Code2;
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: Math.min(index, 5) * 0.06 }}
      className="group relative"
    >
      <Link
        to="/services"
        className="flex items-start gap-5 border-t border-line py-7 transition-colors duration-300 last:border-b hover:bg-white/[0.015] sm:items-center sm:gap-8 sm:px-4"
        aria-label={`${service.title} — learn more`}
      >
        <span className="font-display text-sm font-bold text-muted transition-colors group-hover:text-accent">
          {number}
        </span>
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-ink-300 text-accent transition-all duration-300 group-hover:border-accent/40 group-hover:shadow-glow-soft">
          <Icon size={22} aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-display text-lg font-bold text-cream sm:text-xl">
            {service.title}
          </span>
          <span className="mt-1.5 block max-w-2xl text-sm leading-relaxed text-sage">
            {service.description}
          </span>
        </span>
        <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-sage transition-all duration-300 group-hover:border-accent/50 group-hover:text-accent sm:mt-0">
          <ArrowUpRight
            size={17}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      </Link>
    </motion.article>
  );
}

export default function ServicesSection({ showHeading = true, limit }) {
  const { data, loading, error } = useApi(
    async () => (await api.get("/services")).data
  );

  const services = limit ? (data || []).slice(0, limit) : data || [];

  return (
    <section className="py-20 sm:py-28" id="services">
      <div className="container-page">
        {showHeading && (
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Services"
              title="What we do best."
              description="Focused builds around design, development, and launch — everything a business needs to look credible online."
            />
            <Link
              to="/contact"
              className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-sage transition-colors hover:text-cream sm:inline-flex"
            >
              Enquire about a service
              <ArrowUpRight size={16} />
            </Link>
          </div>
        )}

        <div className="mt-10 border-b border-line">
          {loading &&
            Array.from({ length: limit || 6 }).map((_, i) => <CardSkeleton key={i} />)}

          {error && !loading && <ErrorState onRetry={() => window.location.reload()} />}

          {!loading &&
            !error &&
            services.map((service, i) => (
              <ServiceCard key={service._id} service={service} index={i} />
            ))}
        </div>
      </div>
    </section>
  );
}
