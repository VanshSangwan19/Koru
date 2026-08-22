import SEO from "../components/SEO.jsx";
import PortfolioSection from "../components/sections/PortfolioSection.jsx";
import CtaSection from "../components/sections/CtaSection.jsx";

export default function Work() {
  return (
    <>
      <SEO
        title="Work"
        description="Selected concept projects: restaurant, fitness, fashion e-commerce, SaaS, real estate and portfolio websites."
        path="/work"
      />
      <div className="pt-32 sm:pt-40">
        <div className="container-page">
          <h1 className="heading-xl max-w-2xl text-balance">
            A few projects to{" "}
            <span className="bg-gradient-to-r from-accent to-accent-soft bg-clip-text text-transparent">
              show how I work.
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            These are concept projects exploring different industries and goals.
            Each one has a full breakdown of the thinking behind it.
          </p>
        </div>
      </div>
      <PortfolioSection showHeading={false} />
      <CtaSection
        title="Want a project like these?"
        description="Every concept here was built the same way your project would be — designed around a specific business and audience."
      />
    </>
  );
}