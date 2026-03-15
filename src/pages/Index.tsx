import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import WorkflowExamples from "@/components/WorkflowExamples";
import WhatWeDo from "@/components/WhatWeDo";
import About from "@/components/About";
import MarkedTag from "@/components/MarkedTag";
import DemoSection from "@/components/DemoSection";
import BentoGrid from "@/components/BentoGrid";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ScheduleWorkflowAnimation from "@/components/ScheduleWorkflowAnimation";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#dfdfdf] text-black overflow-x-hidden selection:bg-black selection:text-white relative font-body">
      <Navbar />

      <Hero />

      {/* YOU SLEEP / VARTICAS DON'T — marquee divider */}
      <MarkedTag />

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
      {/* Workflow Examples — 3 live prompt examples */}
      {/* <WorkflowExamples /> */}

      {/* Demo — Watch Varticas Execute a Workflow */}
      {/* <DemoSection /> */}

      {/* Workflow Automation showcase */}
      {/* <BentoGrid /> */}

      {/* Final CTA */}
      <CTA />

      <Footer />
    </div>
  );
};

export default Index;
