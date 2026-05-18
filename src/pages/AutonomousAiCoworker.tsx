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

export default function AutonomousAiCoworkerPage() {
  const { user } = useAuth();

  useSeo({
    title:
      "Autonomous AI Coworker — AI Agents That Execute Real Work | Varticas",
    description:
      "Meet your autonomous AI coworker. Unlike chatbots, Varticas agents plan, act, and verify real work across Gmail, Slack, Notion, Jira and 20+ tools — 24/7.",
    canonical: "https://www.varticas.com/autonomous-ai-coworker",
    keywords:
      "autonomous AI coworker, AI agents, AI employee, agentic AI, AI assistant, AI automation",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Autonomous AI Coworker by Varticas",
      url: "https://www.varticas.com/autonomous-ai-coworker",
      description:
        "Autonomous AI coworkers from Varticas plan, execute, and verify real work across your stack — operating like a junior teammate that never sleeps.",
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
            Autonomous AI Coworker
          </span>
          <h1 className="font-display font-black text-5xl md:text-7xl tracking-tight text-black leading-[1.05] mb-6">
            Your AI coworker
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-900">
              that actually works.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto mb-10">
            Not a chatbot. Not a flowchart. A real autonomous AI agent that
            executes work across your stack — plans tasks, calls the right
            tools, retries on failure, and verifies the outcome.
          </p>
          <button
            type="button"
            onClick={() => {
              trackGetStartedClick("autonomous_ai_coworker_hero");
              openProductCta(!!user);
            }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-black hover:bg-gray-900 text-white rounded-full font-bold text-lg transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
          >
            Hire your AI coworker
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
