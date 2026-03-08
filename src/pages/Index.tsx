import Hero from "@/components/Hero";
import AboutInfo from "@/components/AboutInfo";
import GoogleIntegrations from "@/components/GoogleIntegrations";
import Navbar from "@/components/Navbar";
import BentoGrid from "@/components/BentoGrid";
import Architecture from "@/components/Architecture";
import WorkflowBuilder from "@/components/WorkflowBuilder";
import SocialProof from "@/components/SocialProof";
import ComparisonTable from "@/components/ComparisonTable";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#07080A] text-white overflow-x-hidden selection:bg-brand-red selection:text-white">
      <Navbar />
      <Hero />
      <AboutInfo />
      <GoogleIntegrations />
      <BentoGrid />
      <Architecture />
      <WorkflowBuilder />
      <SocialProof />
      <ComparisonTable />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
