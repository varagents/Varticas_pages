import { motion } from "framer-motion";
import { useRef } from "react";
import { trackDemoVideoPlay } from "@/lib/analytics";

export default function DemoVideo() {
  const hasFired = useRef(false);

  const handlePlay = () => {
    if (hasFired.current) return;
    hasFired.current = true;
    trackDemoVideoPlay("home_hero_demo");
  };

  return (
    <section
      id="demo"
      aria-labelledby="demo-heading"
      className="relative w-full pt-0 pb-6 sm:py-16 md:py-20 px-4 sm:px-8 bg-[#dfdfdf] flex justify-center items-center overflow-hidden"
    >
      <h2 id="demo-heading" className="sr-only">
        Varticas product demo video
      </h2>

      <div className="max-w-[1000px] w-full mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="rounded-xl overflow-hidden shadow-2xl border border-black/10 bg-[#0f0f0f] relative flex flex-col transform-gpu will-change-transform"
          style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 40px rgba(59, 130, 246, 0.15)" }}
        >
          {/* macOS window title bar */}
          <div className="w-full h-10 bg-[#1e1e1e] border-b border-white/5 flex items-center px-4 gap-2 flex-shrink-0" aria-hidden="true">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>

          <video
            className="w-full h-auto block transform scale-[1.05]"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            src="/demo.mp4"
            poster="/varticas-og-final.png"
            aria-label="Varticas AI coworker product demo"
            onPlay={handlePlay}
          >
            <track kind="captions" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      </div>

      {/* Background glow (cheap radial gradient — no expensive blur) */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-blue-500/5 to-transparent rounded-full pointer-events-none"
      />
    </section>
  );
}
