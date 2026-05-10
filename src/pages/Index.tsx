import { Suspense, lazy } from "react";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

import DemoVideo from "@/components/DemoVideo";

// Lazy load components below the fold
const WhatWeDo = lazy(() => import("@/components/WhatWeDo"));
const ScheduleWorkflowAnimation = lazy(() => import("@/components/ScheduleWorkflowAnimation"));
const About = lazy(() => import("@/components/About"));
const Features = lazy(() => import("@/components/Features"));
const HowItWorks = lazy(() => import("@/components/HowItWorks"));
const CTA = lazy(() => import("@/components/CTA"));
const Footer = lazy(() => import("@/components/Footer"));
// Note: WorkflowExamples, DemoSection, and BentoGrid are currently commented out in the layout, 
// but if they are ever enabled, they should also be lazy loaded.

// A minimal fallback to display while chunks are downloading
const SectionFallback = () => <div className="w-full h-32 flex items-center justify-center text-sm text-gray-500"></div>;

const Index = () => {
  return (
    <div className="min-h-screen bg-[#dfdfdf] text-black overflow-x-hidden selection:bg-black selection:text-white relative font-body">
      <Navbar />

      <Hero />

      {/* Demo Video Section */}
      <DemoVideo />

      <Suspense fallback={<SectionFallback />}>

        {/* Integrations — Works With Your Favorite Tools */}
        <WhatWeDo />
        {/* Inside your landing page component: */}
        <ScheduleWorkflowAnimation />

        {/* Social Proof — Trusted by Early Builders */}
        <About />
        {/* Use Cases — 4 cards */}
        <Features />

        {/* How It Works — 3-step explanation */}
        <HowItWorks />

        {/* Final CTA */}
        <CTA />

        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
