import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { useApi } from "../../hooks/useApi.js";
import { api } from "../../lib/api.js";
import SectionHeading from "../ui/SectionHeading.jsx";
import { CardSkeleton } from "../ui/Skeleton.jsx";
import ErrorState from "../ui/ErrorState.jsx";
import Badge from "../ui/Badge.jsx";
import ProjectVisual from "../ProjectVisual.jsx";

export function ProjectCard({ project, index = 0 }) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="group card flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-white/15"
    >
      <Link
        to={`/work/${project.slug}`}
        className="block h-52 overflow-hidden sm:h-56"
        aria-label={`View project: ${project.title}`}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} — ${project.category}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <ProjectVisual project={project} className="transition-transform duration-500 group-hover:scale-[1.03]" />
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">
            {project.category}
          </span>
          <div className="flex gap-1.5">
            {project.concept && <Badge tone="neutral">Concept Project</Badge>}
            {project.featured && <Badge tone="accent">Featured</Badge>}
          </div>
        </div>

        <h3 className="mt-3 text-lg font-bold">
          <Link to={`/work/${project.slug}`} className="transition-colors hover:text-accent">
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {(project.technologies || []).slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[11px] font-medium text-zinc-400"
            >
              {tech}
            </span>
          ))}
        </div>

        <Link
          to={`/work/${project.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-soft"
        >
          View Project
          <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </motion.article>
  );
}

export default function PortfolioSection({ showHeading = true, limit, featuredOnly = false }) {
  const { data, loading, error } = useApi(async () => {
    const query = featuredOnly ? "?featured=true" : "";
    return (await api.get(`/projects${query}`)).data;
  });

  const projects = (data || []).slice(0, limit);

  return (
    <section className="py-20 sm:py-28" id="work">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          {showHeading && (
            <SectionHeading
              eyebrow="Work"
              title="Selected work."
              description="A few concept projects exploring different industries and goals — each with its own full case study."
            />
          )}
          {showHeading && (
            <Link
              to="/work"
              className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-zinc-400 transition-colors hover:text-white sm:inline-flex"
            >
              View all projects
              <ArrowUpRight size={16} />
            </Link>
          )}
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {loading &&
            Array.from({ length: limit || 6 }).map((_, i) => <CardSkeleton key={i} />)}

          {error && !loading && <ErrorState onRetry={() => window.location.reload()} />}

          {!loading &&
            !error &&
            projects.map((project, i) => (
              <ProjectCard key={project._id} project={project} index={i} />
            ))}
        </div>

        {showHeading && (
          <div className="mt-10 text-center sm:hidden">
            <Link
              to="/work"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
            >
              View all projects
              <ArrowUpRight size={15} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}