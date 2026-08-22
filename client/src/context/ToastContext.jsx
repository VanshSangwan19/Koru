import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, XCircle, Info } from "lucide-react";

const ToastContext = createContext(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

const COLORS = {
  success: "text-emerald-400",
  error: "text-red-400",
  info: "text-accent",
};

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const dismiss = useCallback((id) => {
    setToasts((t) => t.filter((toast) => toast.id !== id));
    clearTimeout(timers.current[id]);
    delete timers.current[id];
  }, []);

  const push = useCallback((message, type = "info", duration = 4000) => {
    const id = ++idCounter;
    setToasts((t) => [...t.slice(-3), { id, message, type }]);
    timers.current[id] = setTimeout(() => dismiss(id), duration);
  }, [dismiss]);

  const toast = useCallback(
    (message, type) => push(message, type),
    [push]
  );

  const success = useCallback((m) => push(m, "success"), [push]);
  const error = useCallback((m) => push(m, "error"), [push]);

  return (
    <ToastContext.Provider value={{ toast, success, error }}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="pointer-events-none fixed inset-x-0 bottom-5 z-[100] flex flex-col items-center gap-2 px-4"
      >
        <AnimatePresence>
          {toasts.map((t) => {
            const Icon = ICONS[t.type];
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="pointer-events-auto flex items-center gap-3 rounded-xl border border-white/10 bg-ink-200 px-4 py-3 shadow-card"
              >
                <Icon size={18} className={COLORS[t.type]} aria-hidden />
                <p className="text-sm font-medium text-white">{t.message}</p>
                <button
                  onClick={() => dismiss(t.id)}
                  aria-label="Dismiss notification"
                  className="ml-2 text-zinc-500 transition-colors hover:text-white"
                >
                  <XCircle size={16} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}