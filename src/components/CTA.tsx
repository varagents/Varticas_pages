import { useState } from "react";
import { ArrowRight } from "lucide-react";
import BetaUserModal from "@/components/BetaUserModal";

export default function CTA() {
  const [showBetaModal, setShowBetaModal] = useState(false);

  return (
    <section className="py-40 px-4 relative text-center bg-[#dfdfdf] overflow-hidden">

      {/* Decorative large text behind */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-5">
        <h2 className="font-display font-black text-[20vw] leading-none whitespace-nowrap text-black">
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
          Join the early users saving 20+ hours a week. Limited space in beta.
        </p>

        <button
          onClick={() => setShowBetaModal(true)}
          className="px-10 py-5 bg-black hover:bg-gray-800 text-white rounded-full font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-2xl transform hover:-translate-y-1"
        >
          Apply for Beta Access
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <BetaUserModal
        isOpen={showBetaModal}
        onClose={() => setShowBetaModal(false)}
      />
    </section>
  );
}
