import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";

import SEO from "../components/SEO.jsx";
import { useApi } from "../hooks/useApi.js";
import { api } from "../lib/api.js";
import Badge from "../components/ui/Badge.jsx";
import Button from "../components/ui/Button.jsx";
import { Spinner } from "../components/ui/Skeleton.jsx";
import ErrorState from "../components/ui/ErrorState.jsx";
import ProjectVisual from "../components/ProjectVisual.jsx";
import NotFound from "./NotFound.jsx";

function DetailRow({ label, items = [] }) {
  if (!items || items.length === 0) return null;
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-wider text-accent">{label}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-zinc-300">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();

  const { data: project, loading, error } = useApi(
    async () => (await api.get(`/projects/${slug}`)).data,
    [slug]
  );

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center pt-20">
        <Spinner />
      </div>
    );
  }

  if (error) {
    if (error.status === 404) {
      return <NotFound />;
    }
    return (
      <div className="container-page pt-40">
        <ErrorState message="Couldn't load this project. Please try again." />
      </div>
    );
  }

  const gallery = project.gallery || [];

  return (
    <>
      <SEO
        title={project.title}
        description={project.description}
        image={project.image || undefined}
        path={`/work/${project.slug}`}
        type="article"
      />

      <div className="pt-28 sm:pt-32">
        <div className="container-page">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to work
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge>{project.category}</Badge>
                {project.concept && <Badge tone="neutral">Concept Project</Badge>}
                {project.featured && <Badge tone="accent">Featured</Badge>}
              </div>
              <h1 className="heading-xl mt-4">{project.title}</h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
                {project.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {(project.technologies || []).map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container-page mt-10">
        <div className="overflow-hidden rounded-3xl border border-white/10">
          {project.image ? (
            <img
              src={project.image}
              alt={`${project.title} — project hero`}
              className="aspect-[21/9] w-full object-cover"
            />
          ) : (
            <ProjectVisual project={project} className="aspect-[21/9]" />
          )}
        </div>
      </div>

      <div className="container-page py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <div className="space-y-10">
            {project.longDescription && (
              <div>
                <h2 className="heading-md">Overview</h2>
                <p className="mt-4 text-base leading-relaxed text-zinc-400">
                  {project.longDescription}
                </p>
              </div>
            )}

            {project.problem && (
              <div className="rounded-2xl border border-white/[0.06] bg-ink-50 p-6 sm:p-8">
                <h2 className="heading-md">The problem</h2>
                <p className="mt-4 text-base leading-relaxed text-zinc-400">{project.problem}</p>
              </div>
            )}

            {project.solution && (
              <div className="rounded-2xl border border-accent/20 bg-accent/[0.04] p-6 sm:p-8">
                <h2 className="heading-md">The solution</h2>
                <p className="mt-4 text-base leading-relaxed text-zinc-300">{project.solution}</p>
              </div>
            )}

            {project.features && project.features.length > 0 && (
              <DetailRow label="Features" items={project.features} />
            )}

            {gallery.length > 0 && (
              <div>
                <h2 className="heading-md">Gallery</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {gallery.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`${project.title} screenshot ${i + 1}`}
                      loading="lazy"
                      className="aspect-[4/3] w-full rounded-2xl border border-white/10 object-cover"
                    />
                  ))}
                </div>
              </div>
            )}

            {project.results && project.results.length > 0 && (
              <div>
                <h2 className="heading-md">Results & goals</h2>
                <p className="mt-3 text-sm text-zinc-500">
                  Outcome-focused objectives — not invented metrics.
                </p>
                <ul className="mt-5 space-y-3">
                  {project.results.map((result) => (
                    <li key={result} className="flex items-start gap-3 text-sm leading-relaxed text-zinc-300">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                        <Check size={13} className="text-emerald-400" aria-hidden />
                      </span>
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="space-y-8">
            <div className="card p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-accent">Design decisions</h3>
              {project.designDecisions && project.designDecisions.length > 0 ? (
                <ul className="mt-4 space-y-3">
                  {project.designDecisions.map((d) => (
                    <li key={d} className="flex items-start gap-3 text-sm leading-relaxed text-zinc-300">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                      {d}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm text-zinc-500">Details coming soon.</p>
              )}
            </div>

            <div className="card p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-accent">Technologies</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {(project.technologies || []).map((tech) => (
                  <span key={tech} className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-zinc-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <section className="border-t border-white/[0.06] py-16 sm:py-20">
        <div className="container-page flex flex-col items-start justify-between gap-6 rounded-3xl border border-white/[0.06] bg-ink-50 p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="heading-md">Have a similar project?</h2>
            <p className="mt-2 text-sm text-zinc-400">
              If your project fits this kind of work, let's talk about it.
            </p>
          </div>
          <Button to="/contact" size="lg" className="shrink-0">
            Let's Build It
            <ArrowUpRight size={18} />
          </Button>
        </div>
      </section>
    </>
  );
}