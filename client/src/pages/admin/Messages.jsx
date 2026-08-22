import { useState } from "react";
import { Trash2, Mail, Phone, Building2, Briefcase, Wallet, CircleDot } from "lucide-react";

import SEO from "../../components/SEO.jsx";
import { useApi } from "../../hooks/useApi.js";
import { api } from "../../lib/api.js";
import { useToast } from "../../context/ToastContext.jsx";
import { AdminPageHeader, ConfirmDialog } from "./adminHelpers.jsx";
import Badge from "../../components/ui/Badge.jsx";
import { Spinner } from "../../components/ui/Skeleton.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";

const STATUSES = ["new", "read", "replied", "archived"];

const STATUS_TONES = {
  new: "accent",
  read: "neutral",
  replied: "success",
  archived: "warning",
};

function MetaItem({ icon: Icon, label }) {
  if (!label) return null;
  return (
    <span className="flex items-center gap-1.5 text-xs text-zinc-400">
      <Icon size={13} className="text-zinc-500" aria-hidden />
      {label}
    </span>
  );
}

export default function AdminMessages() {
  const toast = useToast();
  const [filter, setFilter] = useState("all");
  const { data, loading, error, run } = useApi(
    async () => (await api.get(`/contact?status=${filter}&limit=100`)).data,
    [filter]
  );

  const [deleting, setDeleting] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const setStatus = async (message, status) => {
    try {
      await api.put(`/contact/${message._id}/status`, { status });
      await run();
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await api.del(`/contact/${deleting._id}`);
      toast.success("Message deleted");
      setDeleting(null);
      await run();
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setDeleteLoading(false);
    }
  };

  const messages = data || [];

  return (
    <>
      <SEO title="Admin Messages" description="View contact requests." path="/admin/messages" />
      <AdminPageHeader
        title="Messages"
        description="Project requests sent through the contact form."
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {["all", ...STATUSES].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
              filter === s
                ? "bg-accent text-ink"
                : "border border-white/10 text-zinc-400 hover:border-white/25 hover:text-white"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center py-24">
          <Spinner />
        </div>
      )}

      {error && !loading && (
        <div className="card p-8 text-center text-sm text-red-400">
          Couldn't load messages. Please refresh.
        </div>
      )}

      {!loading && !error && messages.length === 0 && (
        <EmptyState
          title="No messages"
          description="Messages from the contact form will appear here."
        />
      )}

      {!loading && !error && messages.length > 0 && (
        <div className="space-y-4">
          {messages.map((m) => (
            <div key={m._id} className="card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="font-bold">{m.name}</h3>
                    <Badge tone={STATUS_TONES[m.status] || "neutral"}>{m.status}</Badge>
                    <span className="text-xs text-zinc-500">
                      {new Date(m.createdAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
                    <MetaItem icon={Mail} label={m.email} />
                    <MetaItem icon={Phone} label={m.phone} />
                    <MetaItem icon={Building2} label={m.company} />
                    <MetaItem icon={Briefcase} label={m.projectType} />
                    <MetaItem icon={Wallet} label={m.budget} />
                  </div>
                </div>
                <a
                  href={`mailto:${m.email}`}
                  className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-zinc-300 transition-colors hover:border-accent/40 hover:text-accent"
                >
                  Reply by email
                </a>
              </div>

              <p className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-sm leading-relaxed text-zinc-300">
                {m.message}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/[0.06] pt-4">
                <span className="mr-1 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-zinc-500">
                  <CircleDot size={13} aria-hidden />
                  Status:
                </span>
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatus(m, s)}
                    disabled={m.status === s}
                    className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors disabled:opacity-50 ${
                      m.status === s
                        ? "bg-accent/15 text-accent"
                        : "border border-white/10 text-zinc-400 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    {s}
                  </button>
                ))}
                <button
                  onClick={() => setDeleting(m)}
                  className="ml-auto flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/[0.03] px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10"
                >
                  <Trash2 size={13} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        loading={deleteLoading}
        title="Delete message"
        message={`Delete the message from "${deleting?.name}"? This can't be undone.`}
      />
    </>
  );
}