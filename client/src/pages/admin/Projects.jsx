import { useState } from "react";
import { Plus, Pencil, Trash2, Star, StarOff } from "lucide-react";

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

const EMPTY_FORM = {
  title: "",
  slug: "",
  category: "",
  description: "",
  longDescription: "",
  problem: "",
  solution: "",
  features: "",
  technologies: "",
  designDecisions: "",
  results: "",
  image: "",
  gallery: "",
  featured: false,
  concept: true,
  status: "published",
};

function toForm(p) {
  return {
    title: p.title || "",
    slug: p.slug || "",
    category: p.category || "",
    description: p.description || "",
    longDescription: p.longDescription || "",
    problem: p.problem || "",
    solution: p.solution || "",
    features: (p.features || []).join("\n"),
    technologies: (p.technologies || []).join("\n"),
    designDecisions: (p.designDecisions || []).join("\n"),
    results: (p.results || []).join("\n"),
    image: p.image || "",
    gallery: (p.gallery || []).join("\n"),
    featured: p.featured || false,
    concept: p.concept ?? true,
    status: p.status || "published",
  };
}

function fromForm(f) {
  const list = (v) =>
    v
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
  return {
    title: f.title,
    slug: f.slug || undefined,
    category: f.category,
    description: f.description,
    longDescription: f.longDescription,
    problem: f.problem,
    solution: f.solution,
    features: list(f.features),
    technologies: list(f.technologies),
    designDecisions: list(f.designDecisions),
    results: list(f.results),
    image: f.image,
    gallery: list(f.gallery),
    featured: f.featured,
    concept: f.concept,
    status: f.status,
  };
}

export default function AdminProjects() {
  const toast = useToast();
  const { data, loading, error, run } = useApi(async () => (await api.get("/projects?limit=50")).data);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null); // null = new
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const openNew = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEdit = (project) => {
    setEditing(project);
    setForm(toForm(project));
    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.category.trim() || !form.description.trim()) {
      toast.error("Title, category and description are required");
      return;
    }

    setSaving(true);
    try {
      const payload = fromForm(form);
      if (editing) {
        await api.put(`/projects/${editing._id}`, payload);
        toast.success("Project updated successfully");
      } else {
        await api.post("/projects", payload);
        toast.success("Project added successfully");
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
      await api.del(`/projects/${deleting._id}`);
      toast.success("Project deleted");
      setDeleting(null);
      await run();
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setDeleteLoading(false);
    }
  };

  const toggleFeatured = async (project) => {
    try {
      await api.put(`/projects/${project._id}`, { featured: !project.featured });
      toast.success(project.featured ? "Removed from featured" : "Marked as featured");
      await run();
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  const projects = data || [];

  return (
    <>
      <SEO title="Admin Projects" description="Manage projects." path="/admin/projects" />
      <AdminPageHeader
        title="Projects"
        description="Add, edit and manage portfolio projects."
        action={
          <Button onClick={openNew}>
            <Plus size={16} />
            Add Project
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
          Couldn't load projects. Please refresh.
        </div>
      )}

      {!loading && !error && projects.length === 0 && (
        <EmptyState
          title="No projects yet"
          description="Add your first project to populate the portfolio."
        />
      )}

      {!loading && !error && projects.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <div key={project._id} className="card flex flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                      {project.category}
                    </span>
                    {project.concept && <Badge tone="neutral">Concept</Badge>}
                    {project.status !== "published" && (
                      <Badge tone="warning">{project.status}</Badge>
                    )}
                  </div>
                  <h3 className="mt-2 font-bold">{project.title}</h3>
                </div>
                <button
                  onClick={() => toggleFeatured(project)}
                  className={`rounded-lg p-2 transition-colors ${
                    project.featured
                      ? "text-amber-400 hover:bg-amber-500/10"
                      : "text-zinc-600 hover:bg-white/5 hover:text-zinc-300"
                  }`}
                  aria-label={project.featured ? "Unmark featured" : "Mark featured"}
                  title={project.featured ? "Unmark featured" : "Mark featured"}
                >
                  {project.featured ? <Star size={18} /> : <StarOff size={18} />}
                </button>
              </div>
              <p className="mt-2 line-clamp-2 flex-1 text-sm text-zinc-400">{project.description}</p>
              <p className="mt-3 text-xs text-zinc-600">
                /work/{project.slug} · {(project.technologies || []).length} technologies
              </p>
              <div className="mt-4 flex gap-2 border-t border-white/[0.06] pt-4">
                <Button variant="secondary" size="sm" onClick={() => openEdit(project)}>
                  <Pencil size={14} />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="!border-red-500/30 !bg-red-500/10 !text-red-400 hover:!bg-red-500/20 hover:!text-red-300 hover:!border-red-500/40"
                  onClick={() => setDeleting(project)}
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
        title={editing ? "Edit project" : "Add project"}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Title *" name="title" value={form.title} onChange={handleChange} required />
            <Input label="Slug" name="slug" value={form.slug} onChange={handleChange} placeholder="auto-generated from title" />
            <Input label="Category *" name="category" value={form.category} onChange={handleChange} placeholder="e.g. E-commerce Website" required />
            <Select
              label="Status"
              name="status"
              value={form.status}
              onChange={handleChange}
              options={["published", "draft", "archived"]}
            />
          </div>

          <Input label="Short description *" name="description" value={form.description} onChange={handleChange} required />
          <Textarea label="Overview (long description)" name="longDescription" value={form.longDescription} onChange={handleChange} />
          <Textarea label="Problem" name="problem" value={form.problem} onChange={handleChange} />
          <Textarea label="Solution" name="solution" value={form.solution} onChange={handleChange} />

          <div className="grid gap-4 sm:grid-cols-2">
            <Textarea label="Features (one per line)" name="features" value={form.features} onChange={handleChange} className="min-h-[100px]" />
            <Textarea label="Technologies (one per line)" name="technologies" value={form.technologies} onChange={handleChange} className="min-h-[100px]" />
            <Textarea label="Design decisions (one per line)" name="designDecisions" value={form.designDecisions} onChange={handleChange} className="min-h-[100px]" />
            <Textarea label="Results / goals (one per line)" name="results" value={form.results} onChange={handleChange} className="min-h-[100px]" />
          </div>

          <Input label="Cover image URL" name="image" value={form.image} onChange={handleChange} placeholder="https://..." />
          <Textarea label="Gallery image URLs (one per line)" name="gallery" value={form.gallery} onChange={handleChange} className="min-h-[80px]" />

          <div className="flex flex-wrap gap-6">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-300">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                className="h-4 w-4 rounded accent-[#38BDF8]"
              />
              Featured
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-300">
              <input
                type="checkbox"
                name="concept"
                checked={form.concept}
                onChange={handleChange}
                className="h-4 w-4 rounded accent-[#38BDF8]"
              />
              Concept project
            </label>
          </div>

          <div className="flex justify-end gap-3 border-t border-white/[0.06] pt-5">
            <Button variant="secondary" onClick={() => setModalOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" loading={saving}>
              {editing ? "Save changes" : "Add project"}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        loading={deleteLoading}
        title="Delete project"
        message={`Are you sure you want to delete "${deleting?.title}"? This can't be undone.`}
      />
    </>
  );
}