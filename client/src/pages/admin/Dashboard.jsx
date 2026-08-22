import { FolderKanban, Layers, Inbox, MessageSquareQuote, Star, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import SEO from "../../components/SEO.jsx";
import { useApi } from "../../hooks/useApi.js";
import { api } from "../../lib/api.js";
import { useSettings } from "../../context/SettingsContext.jsx";
import { AdminPageHeader } from "./adminHelpers.jsx";
import { Spinner } from "../../components/ui/Skeleton.jsx";

function StatCard({ icon: Icon, label, value, to, accent = false }) {
  return (
    <Link
      to={to}
      className="card group flex items-center justify-between p-5 transition-all hover:-translate-y-0.5 hover:border-white/15"
    >
      <div className="flex items-center gap-4">
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${
            accent ? "bg-accent/10 text-accent" : "bg-white/5 text-zinc-300"
          }`}
        >
          <Icon size={20} aria-hidden />
        </span>
        <div>
          <p className="text-sm text-zinc-400">{label}</p>
          <p className="text-2xl font-extrabold text-white">{value}</p>
        </div>
      </div>
      <ArrowUpRight size={18} className="text-zinc-600 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
    </Link>
  );
}

export default function Dashboard() {
  const { settings, loading: settingsLoading } = useSettings();

  const projects = useApi(async () => (await api.get("/projects?limit=50")).data);
  const services = useApi(async () => (await api.get("/services")).data);
  const testimonials = useApi(async () => (await api.get("/testimonials")).data);
  const messages = useApi(async () => (await api.get("/contact?limit=50")).data);

  const loading =
    projects.loading || services.loading || testimonials.loading || messages.loading || settingsLoading;

  const projectList = projects.data || [];
  const messageList = messages.data || [];
  const testimonialList = testimonials.data || [];

  const newMessages = messageList.filter((m) => m.status === "new").length;
  const pendingTestimonials = testimonialList.filter((t) => !t.approved).length;
  const featuredProjects = projectList.filter((p) => p.featured).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <SEO title="Admin Dashboard" description="Koru admin dashboard." path="/admin" />
      <AdminPageHeader
        title="Dashboard"
        description="An overview of your website content."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard icon={FolderKanban} label="Total Projects" value={projectList.length} to="/admin/projects" accent />
        <StatCard icon={Star} label="Featured Projects" value={featuredProjects} to="/admin/projects" />
        <StatCard icon={Inbox} label="Contact Requests" value={messageList.length} to="/admin/messages" />
        <StatCard icon={Inbox} label="New Messages" value={newMessages} to="/admin/messages" accent />
        <StatCard icon={MessageSquareQuote} label="Testimonials" value={testimonialList.length} to="/admin/testimonials" />
        <StatCard icon={Layers} label="Services" value={services.data?.length || 0} to="/admin/services" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">Recent messages</h2>
            <Link to="/admin/messages" className="text-sm font-semibold text-accent hover:text-accent-soft">
              View all
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {messageList.slice(0, 5).map((m) => (
              <div key={m._id} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-white">{m.name}</p>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium capitalize ${
                      m.status === "new"
                        ? "bg-accent/10 text-accent"
                        : "bg-white/5 text-zinc-400"
                    }`}
                  >
                    {m.status}
                  </span>
                </div>
                <p className="mt-1 truncate text-xs text-zinc-500">{m.email}</p>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-zinc-400">{m.message}</p>
              </div>
            ))}
            {messageList.length === 0 && (
              <p className="py-6 text-center text-sm text-zinc-500">No messages yet.</p>
            )}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="font-bold">Pending testimonials</h2>
          <p className="mt-1 text-sm text-zinc-500">
            {pendingTestimonials === 0
              ? "All testimonials are approved or none exist yet."
              : `${pendingTestimonials} testimonial${pendingTestimonials > 1 ? "s" : ""} awaiting approval.`}
          </p>
          <Link
            to="/admin/testimonials"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-soft"
          >
            Manage testimonials
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </>
  );
}