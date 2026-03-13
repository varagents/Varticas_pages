import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Features from "@/components/Features";
import About from "@/components/About";

import BentoGrid from "@/components/BentoGrid";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import MarkedTag from "@/components/MarkedTag";

// Removed ThreeBackground as it doesn't align with the clean minimal light theme screenshot
const Index = () => {
  return (
    <div className="min-h-screen bg-[#dfdfdf] text-black overflow-x-hidden selection:bg-black selection:text-white relative font-body">
      <Navbar />
      <Hero />

      {/* Marked Tag Section */}
      <MarkedTag />

      <Features />
      <About />

      <BentoGrid />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
