import { useState } from "react";
import { Plus, Pencil, Trash2, Check, RotateCcw } from "lucide-react";

import SEO from "../../components/SEO.jsx";
import { useApi } from "../../hooks/useApi.js";
import { api } from "../../lib/api.js";
import { useToast } from "../../context/ToastContext.jsx";
import { AdminPageHeader, ConfirmDialog } from "./adminHelpers.jsx";
import Button from "../../components/ui/Button.jsx";
import Modal from "../../components/ui/Modal.jsx";
import Badge from "../../components/ui/Badge.jsx";
import { Input, Textarea } from "../../components/ui/Form.jsx";
import { Spinner } from "../../components/ui/Skeleton.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";

const EMPTY_FORM = { clientName: "", company: "", role: "", message: "", image: "", approved: false };

export default function AdminTestimonials() {
  const toast = useToast();
  const { data, loading, error, run } = useApi(async () => (await api.get("/testimonials")).data);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const openNew = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEdit = (t) => {
    setEditing(t);
    setForm({
      clientName: t.clientName,
      company: t.company || "",
      role: t.role || "",
      message: t.message,
      image: t.image || "",
      approved: t.approved || false,
    });
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.clientName.trim() || !form.message.trim()) {
      toast.error("Client name and message are required");
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        await api.put(`/testimonials/${editing._id}`, form);
        toast.success("Testimonial updated successfully");
      } else {
        await api.post("/testimonials", form);
        toast.success("Testimonial added successfully");
      }
      setModalOpen(false);
      await run();
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await api.del(`/testimonials/${deleting._id}`);
      toast.success("Testimonial deleted");
      setDeleting(null);
      await run();
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setDeleteLoading(false);
    }
  };

  const toggleApproved = async (t) => {
    try {
      await api.put(`/testimonials/${t._id}`, { approved: !t.approved });
      toast.success(t.approved ? "Testimonial hidden" : "Testimonial approved and visible on site");
      await run();
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  const testimonials = data || [];

  return (
    <>
      <SEO title="Admin Testimonials" description="Manage testimonials." path="/admin/testimonials" />
      <AdminPageHeader
        title="Testimonials"
        description="Add real client feedback. Only approved testimonials appear on the site."
        action={
          <Button onClick={openNew}>
            <Plus size={16} />
            Add Testimonial
          </Button>
        }
      />

      {loading && (
        <div className="flex justify-center py-24">
          <Spinner />
        </div>
      )}

      {error && !loading && (
        <div className="card p-8 text-center text-sm text-red-400">
          Couldn't load testimonials. Please refresh.
        </div>
      )}

      {!loading && !error && testimonials.length === 0 && (
        <EmptyState
          title="No testimonials yet"
          description="Add real client feedback as you complete projects. None are invented."
        />
      )}

      {!loading && !error && testimonials.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t._id} className="card flex flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-sm font-bold text-accent">
                    {t.clientName.charAt(0).toUpperCase()}
                  </span>
                  <div>
                    <p className="text-sm font-bold">{t.clientName}</p>
                    <p className="text-xs text-zinc-500">
                      {[t.role, t.company].filter(Boolean).join(" · ") || "—"}
                    </p>
                  </div>
                </div>
                <Badge tone={t.approved ? "success" : "warning"}>
                  {t.approved ? "Approved" : "Pending"}
                </Badge>
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">
                "{t.message}"
              </p>
              <div className="mt-4 flex flex-wrap gap-2 border-t border-white/[0.06] pt-4">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => toggleApproved(t)}
                  className={t.approved ? "text-amber-300" : "text-emerald-400"}
                >
                  {t.approved ? <RotateCcw size={14} /> : <Check size={14} />}
                  {t.approved ? "Unapprove" : "Approve"}
                </Button>
                <Button variant="secondary" size="sm" onClick={() => openEdit(t)}>
                  <Pencil size={14} />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="!border-red-500/30 !bg-red-500/10 !text-red-400 hover:!bg-red-500/20 hover:!text-red-300 hover:!border-red-500/40"
                  onClick={() => setDeleting(t)}
                >
                  <Trash2 size={14} />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit testimonial" : "Add testimonial"}
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Client name *" name="clientName" value={form.clientName} onChange={handleChange} required />
            <Input label="Company" name="company" value={form.company} onChange={handleChange} />
            <Input label="Role" name="role" value={form.role} onChange={handleChange} />
            <Input label="Image URL" name="image" value={form.image} onChange={handleChange} placeholder="https://..." />
          </div>
          <Textarea label="Message *" name="message" value={form.message} onChange={handleChange} required />
          <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-300">
            <input
              type="checkbox"
              name="approved"
              checked={form.approved}
              onChange={handleChange}
              className="h-4 w-4 rounded accent-[#38BDF8]"
            />
            Approved (visible on the site)
          </label>
          <div className="flex justify-end gap-3 border-t border-white/[0.06] pt-5">
            <Button variant="secondary" onClick={() => setModalOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" loading={saving}>
              {editing ? "Save changes" : "Add testimonial"}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        loading={deleteLoading}
        title="Delete testimonial"
        message={`Delete the testimonial from "${deleting?.clientName}"? This can't be undone.`}
      />
    </>
  );
}