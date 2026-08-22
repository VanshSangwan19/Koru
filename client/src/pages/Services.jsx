import SEO from "../components/SEO.jsx";
import ServicesSection from "../components/sections/ServicesSection.jsx";
import ProcessSection from "../components/sections/ProcessSection.jsx";
import FaqSection from "../components/sections/FaqSection.jsx";
import CtaSection from "../components/sections/CtaSection.jsx";

export default function Services() {
  return (
    <>
      <SEO
        title="Services"
        description="Business websites, landing pages, portfolios, e-commerce, redesigns and custom web apps — built modern, fast and responsive."
        path="/services"
      />
      <div className="pt-32 sm:pt-40">
        <div className="container-page">
          <h1 className="heading-xl max-w-2xl text-balance">
            Services designed around{" "}
            <span className="bg-gradient-to-r from-accent to-accent-soft bg-clip-text text-transparent">
              your business.
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            Every project starts with understanding what you actually need.
            No bloated packages, no unnecessary features — just a website that works.
          </p>
        </div>
      </div>
      <ServicesSection showHeading={false} />
      <ProcessSection />
      <FaqSection />
      <CtaSection
        title="Not sure what you need?"
        description="Tell me where you are and where you want to be. I'll recommend the right approach — even if it means a smaller project."
      />
    </>
  );
}