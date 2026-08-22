import Modal from "../../components/ui/Modal.jsx";
import Button from "../../components/ui/Button.jsx";

export function AdminPageHeader({ title, description, action }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="heading-lg">{title}</h1>
        {description && <p className="mt-2 text-sm text-zinc-500">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function ConfirmDialog({ open, onClose, onConfirm, title, message, loading }) {
  return (
    <Modal open={open} onClose={onClose} title={title} maxWidth="max-w-sm">
      <p className="text-sm leading-relaxed text-zinc-400">{message}</p>
      <div className="mt-6 flex gap-3">
        <Button variant="secondary" className="flex-1" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          className="flex-1 !border-red-500/30 !bg-red-500/10 !text-red-400 hover:!bg-red-500/20 hover:!text-red-300 hover:!shadow-none"
          onClick={onConfirm}
          loading={loading}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
}