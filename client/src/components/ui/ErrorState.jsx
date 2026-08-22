import { AlertTriangle } from "lucide-react";

import Button from "./Button.jsx";

export default function ErrorState({
  message = "Something went wrong while loading this content.",
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-ink-100 px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
        <AlertTriangle size={22} className="text-red-400" />
      </div>
      <p className="max-w-md text-sm text-zinc-400">{message}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}