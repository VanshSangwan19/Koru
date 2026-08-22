import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  Building2,
  Target,
  Palette,
  ShoppingBag,
  RefreshCcw,
  Code2,
  ArrowRight,
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

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="group card relative overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/25"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(240px 120px at 50% -20%, rgba(56,189,248,0.09), transparent)",
        }}
        aria-hidden
      />
      <div className="relative">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-105">
          <Icon size={22} aria-hidden />
        </div>
        <h3 className="mt-5 text-lg font-bold">{service.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">{service.description}</p>
        <Link
          to="/services"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-soft"
        >
          Learn more
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
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
          <SectionHeading
            eyebrow="Services"
            title="What I can build for you."
            description="Focused, modern builds — not template work. Every project is designed around your business."
          />
        )}

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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