import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import BetaUserModal from "@/components/BetaUserModal";

const appIcons = [
  "/svgs/atlassian.svg",
  "/svgs/gmail.svg",
  "/svgs/google-calendar.svg",
  "/svgs/google-meet.svg",
  "/svgs/google-sheets.svg",
  "/svgs/google-slides.svg",
  "/svgs/linear.svg",
  "/svgs/slack.svg",
  "/svgs/telegram.svg"
];

const scrollingTrack = [...appIcons, ...appIcons, ...appIcons, ...appIcons];

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Moves the icon track to the left as you scroll down
  const xOffset = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  return (
    <div ref={containerRef} className="relative min-h-[140vh] w-full bg-[#dfdfdf] flex flex-col items-center pt-48 overflow-hidden">

      {/* Massive Tight Black Headline */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 flex flex-col items-center text-center -mb-[120px] md:-mb-[180px] pointer-events-none"
      >
        <h1 className="font-display-hero text-[clamp(4rem,15vw,12rem)] leading-[0.75] text-black w-full mix-blend-normal">
          <span className="block -mb-4 md:-mb-8 tracking-[-0.07em]">Autonomous</span>
          <span className="block tracking-[-0.07em] text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-900 pb-4">Coworker</span>
        </h1>
      </motion.div>

      {/* Main Container for Mockup & Floating Elements */}
      <div className="relative w-full max-w-6xl mt-12 px-6 pb-40 z-10 flex justify-center">

        {/* Diagonal Scrolling App Icons Behind Card */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-visible">
          {/* Slanted Container */}
          <div className="absolute w-[200vw] -rotate-12 translate-y-24 flex flex-col gap-12">

            {/* Scrolling Track */}
            <motion.div
              className="flex gap-8 px-8 items-center justify-start translate-x-[20%]"
              style={{ x: xOffset }}
            >
              {scrollingTrack.map((src, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 bg-white rounded-3xl md:rounded-[2.5rem] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex items-center justify-center relative overflow-hidden group"
                >
                  {/* Inward shadow to give it that app icon feel */}
                  <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),inset_0_-4px_6px_rgba(0,0,0,0.04)] pointer-events-none" />
                  <img src={src} alt="App Icon" className="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-500 group-hover:scale-110" />
                </div>
              ))}
            </motion.div>

          </div>
        </div>

        {/* Apply for Beta Access Button replacing Video */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-20 mt-32 md:mt-40 flex flex-col items-center"
        >
          <button
            onClick={() => setIsModalOpen(true)}
            className="group relative inline-flex items-center justify-center gap-3 bg-black text-white px-8 py-5 rounded-full text-lg font-bold font-body overflow-hidden transition-transform hover:scale-105 hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
          >
            <span>Apply for Beta access</span>
            <div className="bg-white/20 p-2 rounded-full group-hover:bg-white text-white group-hover:text-black transition-colors">
              <ArrowRight className="w-5 h-5" />
            </div>
          </button>
        </motion.div>

        {/* YOU SLEEP VARTICAS DON'T badge */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="absolute -right-4 md:right-[5%] bottom-[25%] md:bottom-[30%] z-30"
        >
          <div className="bg-black text-[#F3ECD8] rounded-3xl px-6 py-6 font-display font-black text-3xl leading-[1.1] tracking-tight shadow-2xl skew-x-[-2deg] rotate-3 hover:rotate-0 transition-transform">
            YOU SLEEP,<br />
            VARTICAS<br />
            DON'T
          </div>
        </motion.div>

        {/* 24/7 Living Coworker badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="absolute -left-4 md:left-[5%] bottom-[45%] md:bottom-[50%] z-30"
        >
          <div className="bg-black text-[#F3ECD8] rounded-3xl px-6 py-6 font-display font-black text-3xl leading-[1.1] tracking-tight shadow-2xl skew-x-[2deg] -rotate-12 hover:rotate-0 transition-transform">
            24/7<br />
            AI  NATIVE<br />
            COWORKER
          </div>
        </motion.div>

      </div>

      <BetaUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
