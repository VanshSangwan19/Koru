import SEO from "../components/SEO.jsx";
import Hero from "../components/sections/Hero.jsx";
import ServicesSection from "../components/sections/ServicesSection.jsx";
import ProcessSection from "../components/sections/ProcessSection.jsx";
import PortfolioSection from "../components/sections/PortfolioSection.jsx";
import AboutSection from "../components/sections/AboutSection.jsx";
import WhyKoruSection from "../components/sections/WhyKoruSection.jsx";
import PricingSection from "../components/sections/PricingSection.jsx";
import TestimonialsSection from "../components/sections/TestimonialsSection.jsx";
import FaqSection from "../components/sections/FaqSection.jsx";
import CtaSection from "../components/sections/CtaSection.jsx";

export default function Home() {
  return (
    <>
      <SEO
        title="Koru — Websites that make businesses look better, work smarter, and grow"
        description="Modern, fast, conversion-focused websites for businesses, creators and startups. Built by a freelance web developer who cares about the details."
        path="/"
      />
      <Hero />
      <div className="border-y border-white/[0.06] bg-ink-50">
        <ServicesSection limit={6} />
      </div>
      <ProcessSection />
      <PortfolioSection limit={3} featuredOnly />
      <AboutSection />
      <WhyKoruSection />
      <PricingSection />
      <TestimonialsSection />
      <FaqSection compact />
      <CtaSection />
    </>
  );
}