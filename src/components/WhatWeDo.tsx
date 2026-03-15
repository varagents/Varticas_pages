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
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="my-8 md:my-10 flex justify-center"
        >
          <div className="relative px-6 md:px-10 py-6 md:py-6 rounded-[2rem] overflow-hidden">
            {/* Liquid / translucent glass background */}
            <div className="absolute inset-0 bg-white/30 backdrop-blur-2xl rounded-[2rem] border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.06)]" />
            {/* Soft blurred blobs for liquid feel */}
            <div className="absolute -top-6 -left-6 w-10 h-10 bg-cyan-300/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-violet-300/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-blue-200/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 flex items-center gap-4 md:gap-5">
              <span className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black text-white flex items-center justify-center text-xl md:text-2xl font-bold font-body shrink-0">
                1
              </span>
              <span className="text-1xl md:text-2xl font-bold text-black font-body tracking-tight">
                Connect Your Apps
              </span>
            </div>
          </div>
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

        {/* Bullet 2 — Command Workflow divider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="my-8 md:my-12 flex justify-center"
        >
          <div className="relative px-6 md:px-12 py-8 md:py-6 rounded-[2rem] overflow-hidden">
            {/* Liquid / translucent glass background */}
            <div className="absolute inset-0 bg-white/30 backdrop-blur-2xl rounded-[2rem] border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.06)]" />
            {/* Soft blurred blobs for liquid feel */}
            <div className="absolute -top-6 -left-6 w-10 h-10 bg-cyan-300/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-violet-300/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-blue-200/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 flex items-center gap-4 md:gap-5">
              <span className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black text-white flex items-center justify-center text-xl md:text-2xl font-bold font-body shrink-0">
                2
              </span>
              <span className="text-1xl md:text-2xl font-bold text-black font-body tracking-tight">
                Command Workflow
              </span>
            </div>
          </div>
        </motion.div>

        {/* Command Workflow — workflow agents image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <img
            src="/workflow-agents.png"
            alt="Create Workflows Agents – As many as you want"
            className="w-full h-auto shadow-2xl"
            style={{ borderRadius: "14px" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
