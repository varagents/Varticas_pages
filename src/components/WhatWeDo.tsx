import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScheduleWorkflowAnimation from "@/components/ScheduleWorkflowAnimation";
const integrations = [
  { name: "Gmail", icon: "/svgs/gmail.svg" },
  { name: "Google Calendar", icon: "/svgs/google-calendar.svg" },
  { name: "Google Drive", icon: "/svgs/google-slides.svg" },
  { name: "Slack", icon: "/svgs/slack.svg" },
  { name: "GitHub", icon: "/svgs/atlassian.svg" },
  { name: "Notion", icon: "/svgs/telegram.svg" },
  { name: "ClickUp", icon: "/svgs/linear.svg" },
  { name: "Linear", icon: "/svgs/google-meet.svg" },
  { name: "Google Sheets", icon: "/svgs/google-sheets.svg" },
];

export default function WhatWeDo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const cardY = useTransform(scrollYProgress, [0, 1], [60, -30]);

  return (
    <section
      ref={sectionRef}
      id="integrations"
      className="relative py-24 md:py-32 px-4 bg-[#dfdfdf]"
    >
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          {/* <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
            <span className="text-sm font-bold text-black font-body">Integrations</span>
          </div> */}
          <h2 className="font-display font-black text-5xl md:text-7xl tracking-tight text-black mb-5">
            Works With Your
            <br />
            Favorite Tools
          </h2>
          {/* <p className="text-gray-600 text-xl max-w-xl mx-auto font-body leading-relaxed">
            Varticas connects to the tools you already use.
          </p> */}
        </motion.div>

        

        {/* Section divider badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="my-8 md:my-10 flex justify-center"
        >
          <div className="relative px-6 md:px-10 py-6 rounded-[2rem] overflow-hidden">
            <div className="absolute inset-0 bg-white/30 backdrop-blur-2xl rounded-[2rem] border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.06)]" />
            <div className="absolute -top-6 -left-6 w-10 h-10 bg-cyan-300/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-violet-300/15 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex items-center gap-4 md:gap-5">
              <span className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black text-white flex items-center justify-center text-xl md:text-2xl font-bold font-body shrink-0">
                1
              </span>
              <span className="text-xl md:text-2xl font-bold text-black font-body tracking-tight">
                Connect Your Apps
              </span>
            </div>
          </div>
        </motion.div>

        {/* SwagStore — Connect your apps */}
        <motion.div
          style={{ y: cardY }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <img
            src="/swagstore.png"
            alt="Connect your apps — SwagStore interface"
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
            <div className="absolute inset-0 bg-white/30 backdrop-blur-2xl rounded-[2rem] border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.06)]" />
            <div className="absolute -top-6 -left-6 w-10 h-10 bg-cyan-300/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-violet-300/15 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex items-center gap-4 md:gap-5">
              <span className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black text-white flex items-center justify-center text-xl md:text-2xl font-bold font-body shrink-0">
                2
              </span>
              <span className="text-xl md:text-2xl font-bold text-black font-body tracking-tight">
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
