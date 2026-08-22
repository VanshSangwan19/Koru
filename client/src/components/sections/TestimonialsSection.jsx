import { Quote } from "lucide-react";

import { useApi } from "../../hooks/useApi.js";
import { api } from "../../lib/api.js";
import SectionHeading from "../ui/SectionHeading.jsx";
import { CardSkeleton } from "../ui/Skeleton.jsx";
import EmptyState from "../ui/EmptyState.jsx";

export default function TestimonialsSection() {
  const { data, loading } = useApi(async () =>
    (await api.get("/testimonials?public=true")).data
  );

  const testimonials = data || [];

  return (
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          align="center"
          eyebrow="Testimonials"
          title="What clients say."
          description="Real feedback from real projects. This space fills up as clients come through."
        />

        <div className="mt-12">
          {loading && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          )}

          {!loading && testimonials.length === 0 && (
            <EmptyState
              title="Client testimonials will appear here."
              description="No testimonials yet — and none will be invented. They'll be added here as real clients share their feedback."
            />
          )}

          {!loading && testimonials.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <figure key={t._id} className="card flex flex-col p-6">
                  <Quote size={22} className="text-accent/60" aria-hidden />
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-zinc-300">
                    {t.message}
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-sm font-bold text-accent">
                      {t.clientName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{t.clientName}</p>
                      {(t.role || t.company) && (
                        <p className="text-xs text-zinc-500">
                          {[t.role, t.company].filter(Boolean).join(" · ")}
                        </p>
                      )}
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}