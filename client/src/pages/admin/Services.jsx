import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

import SEO from "../../components/SEO.jsx";
import { useApi } from "../../hooks/useApi.js";
import { api } from "../../lib/api.js";
import { useToast } from "../../context/ToastContext.jsx";
import { AdminPageHeader, ConfirmDialog } from "./adminHelpers.jsx";
import Button from "../../components/ui/Button.jsx";
import Modal from "../../components/ui/Modal.jsx";
import Badge from "../../components/ui/Badge.jsx";
import { Input, Textarea, Select } from "../../components/ui/Form.jsx";
import { Spinner } from "../../components/ui/Skeleton.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";

const ICON_OPTIONS = ["Building2", "Target", "Palette", "ShoppingBag", "RefreshCcw", "Code2", "Globe"];

const EMPTY_FORM = { title: "", description: "", icon: "Code2", price: "", featured: false, sortOrder: 0 };

export default function AdminServices() {
  const toast = useToast();
  const { data, loading, error, run } = useApi(async () => (await api.get("/services")).data);

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

  const openEdit = (service) => {
    setEditing(service);
    setForm({
      title: service.title,
      description: service.description,
      icon: service.icon || "Code2",
      price: service.price || "",
      featured: service.featured || false,
      sortOrder: service.sortOrder ?? 0,
    });
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : name === "sortOrder" ? Number(value) : value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      toast.error("Title and description are required");
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        await api.put(`/services/${editing._id}`, form);
        toast.success("Service updated successfully");
      } else {
        await api.post("/services", form);
        toast.success("Service added successfully");
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
      await api.del(`/services/${deleting._id}`);
      toast.success("Service deleted");
      setDeleting(null);
      await run();
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setDeleteLoading(false);
    }
  };

  const services = data || [];

  return (
    <>
      <SEO title="Admin Services" description="Manage services." path="/admin/services" />
      <AdminPageHeader
        title="Services"
        description="Control the services shown on your website."
        action={
          <Button onClick={openNew}>
            <Plus size={16} />
            Add Service
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
          Couldn't load services. Please refresh.
        </div>
      )}

      {!loading && !error && services.length === 0 && (
        <EmptyState title="No services yet" description="Add your first service." />
      )}

      {!loading && !error && services.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <div key={service._id} className="card flex flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-sm font-bold text-accent">
                    {service.icon.charAt(0)}
                  </span>
                  <div>
                    <h3 className="font-bold">{service.title}</h3>
                    <p className="text-xs text-zinc-500">
                      {service.icon}
                      {service.price ? ` · ${service.price}` : ""}
                    </p>
                  </div>
                </div>
                {service.featured && <Badge tone="accent">Featured</Badge>}
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">{service.description}</p>
              <div className="mt-4 flex gap-2 border-t border-white/[0.06] pt-4">
                <Button variant="secondary" size="sm" onClick={() => openEdit(service)}>
                  <Pencil size={14} />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="!border-red-500/30 !bg-red-500/10 !text-red-400 hover:!bg-red-500/20 hover:!text-red-300 hover:!border-red-500/40"
                  onClick={() => setDeleting(service)}
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
        title={editing ? "Edit service" : "Add service"}
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input label="Title *" name="title" value={form.title} onChange={handleChange} required />
          <Textarea label="Description *" name="description" value={form.description} onChange={handleChange} required />
          <div className="grid gap-4 sm:grid-cols-2">
            <Select label="Icon" name="icon" value={form.icon} onChange={handleChange} options={ICON_OPTIONS} />
            <Input label="Price label" name="price" value={form.price} onChange={handleChange} placeholder="e.g. Starting from ₹15,000" />
          </div>
          <div className="flex items-center gap-6">
            <Input
              label="Sort order"
              name="sortOrder"
              type="number"
              value={form.sortOrder}
              onChange={handleChange}
              className="w-28"
            />
            <label className="flex cursor-pointer items-center gap-2 pt-6 text-sm text-zinc-300">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                className="h-4 w-4 rounded accent-[#38BDF8]"
              />
              Featured
            </label>
          </div>
          <div className="flex justify-end gap-3 border-t border-white/[0.06] pt-5">
            <Button variant="secondary" onClick={() => setModalOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" loading={saving}>
              {editing ? "Save changes" : "Add service"}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        loading={deleteLoading}
        title="Delete service"
        message={`Are you sure you want to delete "${deleting?.title}"? This can't be undone.`}
      />
    </>
  );
}