import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// --- Bullet Item ---

const bullets = [
  "Connect Your Apps",
  "Command Workflow",
  "Schedule Workflow",
];

// --- Main Component ---

export default function WhatWeDo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const cardY = useTransform(scrollYProgress, [0, 1], [80, -40]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 px-4 bg-[#dfdfdf]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Translucent "What we do" badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/50 backdrop-blur-xl border border-white/40 shadow-sm">
            <span className="text-sm text-black font-bold font-body tracking-wide">
              What we do
            </span>
          </div>
        </motion.div>

        {/* Three Bullets */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 mb-14"
        >
          {bullets.map((bullet, i) => (
            <div key={bullet} className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold font-body">
                {i + 1}
              </span>
              <span className="text-lg font-semibold text-black font-body">
                {bullet}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Connect Your Apps — full image card */}
        <motion.div
          style={{ y: cardY }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <img
            src="/swagstore.png"
            alt="SwagStore – Connect your apps, Command workflow, Automate tasks"
            className="w-full h-auto shadow-2xl"
            style={{ borderRadius: "14px" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
