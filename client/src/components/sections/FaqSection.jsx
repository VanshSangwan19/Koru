import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

import { FAQS } from "../../lib/constants.js";
import SectionHeading from "../ui/SectionHeading.jsx";

function FaqItem({ faq, index, open, onToggle }) {
  const isOpen = open === index;
  const id = `faq-${index}`;

  return (
    <div className="card overflow-hidden">
      <button
        onClick={() => onToggle(isOpen ? null : index)}
        aria-expanded={isOpen}
        aria-controls={id}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
      >
        <span className="text-sm font-semibold text-white sm:text-base">{faq.q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-300"
        >
          <Plus size={15} aria-hidden />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm leading-relaxed text-zinc-400 sm:px-6">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqSection({ compact = false }) {
  const [open, setOpen] = useState(null);
  const faqs = compact ? FAQS.slice(0, 5) : FAQS;

  return (
    <section className="py-20 sm:py-28">
      <div className="container-page max-w-3xl">
        <SectionHeading
          align="center"
          eyebrow="FAQ"
          title="Common questions."
          description="If your question isn't here, just reach out — I'm happy to answer it."
        />

        <div className="mt-12 space-y-3">
          {faqs.map((faq, i) => (
            <FaqItem key={faq.q} faq={faq} index={i} open={open} onToggle={setOpen} />
          ))}
        </div>
      </div>
    </section>
  );
}