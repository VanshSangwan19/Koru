import Reveal from "./Reveal.jsx";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}) {
  const alignment =
    align === "center" ? "mx-auto items-center text-center" : "items-start";

  return (
    <Reveal className={`flex max-w-2xl flex-col gap-4 ${alignment}`}>
      {eyebrow && <p className="section-title">{eyebrow}</p>}
      <h2 className="heading-lg text-balance">{title}</h2>
      {description && <p className="text-base leading-relaxed text-zinc-400 sm:text-lg">{description}</p>}
    </Reveal>
  );
}