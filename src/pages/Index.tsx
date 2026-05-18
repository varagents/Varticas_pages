import { Suspense, lazy } from "react";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import DemoVideo from "@/components/DemoVideo";

// Lazy load components below the fold
const WhatWeDo = lazy(() => import("@/components/WhatWeDo"));
const ScheduleWorkflowAnimation = lazy(
  () => import("@/components/ScheduleWorkflowAnimation"),
);
const SEOContent = lazy(() => import("@/components/SEOContent"));
const About = lazy(() => import("@/components/About"));
const Features = lazy(() => import("@/components/Features"));
const HowItWorks = lazy(() => import("@/components/HowItWorks"));
const FAQ = lazy(() => import("@/components/FAQ"));
const CTA = lazy(() => import("@/components/CTA"));
const Footer = lazy(() => import("@/components/Footer"));

// Minimal fallback while chunks are downloading
const SectionFallback = () => (
  <div
    aria-hidden="true"
    className="w-full h-32 flex items-center justify-center text-sm text-gray-500"
  />
);

const Index = () => {
  return (
    <div className="min-h-screen bg-[#dfdfdf] text-black overflow-x-hidden selection:bg-black selection:text-white relative font-body">
      <Navbar />

      {/* Main landing content — single <main> for the document outline */}
      <main id="main" role="main">
        {/* Hero / above-the-fold (semantic <header> inside Hero) */}
        <Hero />

        {/* Demo Video */}
        <DemoVideo />

        <Suspense fallback={<SectionFallback />}>
          {/* Integrations — Works With Your Favorite Tools */}
          <WhatWeDo />

          {/* Scheduling animation */}
          <ScheduleWorkflowAnimation />

          {/* Crawlable SEO content: What is Varticas / Pillars / Use Cases */}
          <SEOContent />

          {/* About + stats */}
          <About />

          {/* Use cases — 4 cards */}
          <Features />

          {/* How It Works — 3-step explanation */}
          <HowItWorks />

          {/* FAQ — schema.org FAQPage rich result */}
          <FAQ />

          {/* Final CTA */}
          <CTA />

          <Footer />
        </Suspense>
      </main>
    </div>
  );
};

export default Index;
