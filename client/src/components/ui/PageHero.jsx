import HeroBackdrop from "./HeroBackdrop.jsx";

export default function PageHero({ eyebrow, title, description, visual }) {
  return (
    <div className="relative overflow-hidden pt-32 sm:pt-40">
      <HeroBackdrop />
      <div className="container-page relative grid items-center gap-12 lg:grid-cols-[1fr_380px]">
        <div>
          {eyebrow && <p className="section-title">{eyebrow}</p>}
          <h1 className={`heading-xl max-w-2xl text-balance ${eyebrow ? "mt-4" : ""}`}>
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-xl text-base leading-relaxed text-sage sm:text-lg">
              {description}
            </p>
          )}
        </div>
        {visual && <div className="hidden justify-self-end lg:block">{visual}</div>}
      </div>
    </div>
  );
}
