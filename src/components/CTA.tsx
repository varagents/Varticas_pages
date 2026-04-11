import { ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { openProductCta } from "@/lib/productUrl";

export default function CTA() {
  const { user } = useAuth();

  return (
    <section className="py-40 px-4 relative text-center bg-[#dfdfdf] overflow-hidden">

      {/* Decorative large text behind */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-5">
        <h2 className="font-display font-black text-[17vw] leading-none whitespace-nowrap text-black">
          AUTOMATE
        </h2>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        <h2 className="text-5xl md:text-7xl font-display font-black mb-8 tracking-tight text-black">
          Your work starts
          <br />
          automating today.
        </h2>

        <p className="text-xl text-gray-600 mb-12 max-w-xl mx-auto leading-relaxed font-body">
          Join the early users saving 20+ hours a week.
        </p>

        <button
          type="button"
          onClick={() => openProductCta(!!user)}
          className="px-10 py-5 bg-black hover:bg-gray-800 text-white rounded-full font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-2xl transform hover:-translate-y-1"
        >
          Get Started
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
