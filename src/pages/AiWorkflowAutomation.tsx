import { Suspense, lazy } from "react";
import Navbar from "@/components/Navbar";
import { useSeo } from "@/lib/useSeo";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { trackGetStartedClick } from "@/lib/analytics";
import { openProductCta } from "@/lib/productUrl";

const SEOContent = lazy(() => import("@/components/SEOContent"));
const FAQ = lazy(() => import("@/components/FAQ"));
const Footer = lazy(() => import("@/components/Footer"));

const SectionFallback = () => <div className="w-full h-32" aria-hidden="true" />;

export default function AiWorkflowAutomationPage() {
  const { user } = useAuth();

  useSeo({
    title:
      "AI Workflow Automation — Automate Tasks Across Your Stack | Varticas",
    description:
      "Varticas is an AI workflow automation platform. Describe a task simply and autonomous AI agents execute it across Gmail, Slack, Notion, Jira, and 20+ tools.",
    canonical: "https://www.varticas.com/ai-workflow-automation",
    keywords:
      "AI workflow automation, AI workflows, AI task automation, autonomous workflows, no-code AI, Zapier alternative",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "AI Workflow Automation by Varticas",
      url: "https://www.varticas.com/ai-workflow-automation",
      description:
        "AI workflow automation platform with autonomous AI coworkers — execute work across Gmail, Slack, Notion, Jira, and 20+ tools using natural language.",
      isPartOf: {
        "@type": "WebSite",
        name: "Varticas",
        url: "https://www.varticas.com",
      },
      about: {
        "@type": "SoftwareApplication",
        name: "Varticas",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
      },
    },
  });

  return (
    <div className="min-h-screen bg-[#dfdfdf] text-black overflow-x-hidden selection:bg-black selection:text-white font-body">
      <Navbar />
      <main id="main" role="main">
        <header className="pt-36 pb-16 px-4 max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-black/5 shadow-sm mb-6 text-xs font-bold tracking-wide text-black uppercase">
            AI Workflow Automation
          </span>
          <h1 className="font-display font-black text-5xl md:text-7xl tracking-tight text-black leading-[1.05] mb-6">
            Automate every workflow
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-900">
              with one prompt.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto mb-10">
            Varticas turns natural-language instructions into multi-step,
            multi-app workflows. No flowcharts. No glue code. Just real work,
            executed by autonomous AI coworkers across your entire stack.
          </p>
          <button
            type="button"
            onClick={() => {
              trackGetStartedClick("ai_workflow_automation_hero");
              openProductCta(!!user);
            }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-black hover:bg-gray-900 text-white rounded-full font-bold text-lg transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
          >
            Start automating — free
            <ArrowRight className="w-5 h-5" />
          </button>
        </header>

        <Suspense fallback={<SectionFallback />}>
          <SEOContent />
          <FAQ />
          <Footer />
        </Suspense>
      </main>
    </div>
  );
}
