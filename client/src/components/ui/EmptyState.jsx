import { Inbox } from "lucide-react";

export default function EmptyState({ title = "Nothing here yet", description }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/10 px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5">
        <Inbox size={22} className="text-zinc-500" />
      </div>
      <h3 className="font-semibold text-white">{title}</h3>
      {description && <p className="max-w-sm text-sm text-zinc-500">{description}</p>}
    </div>
  );
}