import SEO from "../components/SEO.jsx";
import Hero from "../components/sections/Hero.jsx";
import PortfolioSection from "../components/sections/PortfolioSection.jsx";
import ServicesSection from "../components/sections/ServicesSection.jsx";
import AboutSection from "../components/sections/AboutSection.jsx";
import ProcessSection from "../components/sections/ProcessSection.jsx";
import WhyKoruSection from "../components/sections/WhyKoruSection.jsx";
import PricingSection from "../components/sections/PricingSection.jsx";
import TestimonialsSection from "../components/sections/TestimonialsSection.jsx";
import FaqSection from "../components/sections/FaqSection.jsx";
import CtaSection from "../components/sections/CtaSection.jsx";
import { CursorGlow } from "../components/ui/AmbientGlow.jsx";

export default function Home() {
  return (
    <>
      <SEO
        title="Koru — Digital experiences, built with intention"
        description="Koru is an independent digital studio designing and building distinctive websites that help businesses stand out, earn trust, and grow."
        path="/"
      />
      <CursorGlow />
      <Hero />
      <PortfolioSection limit={4} featuredOnly />
      <div className="border-y border-line bg-ink-100">
        <ServicesSection limit={6} />
      </div>
      <AboutSection />
      <ProcessSection />
      <WhyKoruSection />
      <PricingSection />
      <TestimonialsSection />
      <FaqSection compact />
      <CtaSection />
    </>
  );
}
