import { ArrowRight, Sparkles } from "lucide-react";

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfGPktKklvIE6gO0_Ln4YE3DJiJVPfEmmDUDI6dRlowr4YuQw/viewform";

export default function CTA() {
  return (
    <section className="py-32 px-4 relative overflow-hidden bg-[#07080A] text-center">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-red/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-brand-red text-sm font-medium mb-8">
          <Sparkles className="w-4 h-4" />
          <span>Limited space in beta</span>
        </div>

        <h2 className="text-4xl md:text-7xl font-display font-bold mb-8 tracking-tight text-white">
          Your work starts <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-brand-orange">automating today.</span>
        </h2>

        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Join the 1,000+ users saving 20+ hours a week. No credit card required.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#E6E6E6] hover:bg-white text-[#2F3031] rounded-lg font-bold text-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all"
          >
            Install Extension
          </a>
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-lg font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all flex items-center gap-2 group"
          >
            Request Early Access
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
