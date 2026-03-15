"use client";

import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Zap, Calendar, Mail } from "lucide-react";

// Desktop Layout Configuration
const desktopCoords = {
    workflow: { left: 70, top: 155, width: 280 },
    cron: { left: 490, top: 140, width: 140 },
    sched1: { left: 790, top: 60, width: 240 },
    sched2: { left: 790, top: 270, width: 240 }
};

const desktopPaths = {
    wfToCron: "M 350 225 Q 420 150 490 225",
    cronToSched1: "M 630 200 Q 710 120 790 120",
    cronToSched2: "M 630 250 Q 710 330 790 330",
    sched1ToWf: "M 910 60 Q 530 -80 210 155",
    sched2ToWf: "M 910 390 Q 530 500 210 295"
};

// Mobile Layout Configuration
const mobileCoords = {
    workflow: { left: 20, top: 30, width: 280 },
    cron: { left: 100, top: 260, width: 120 },
    sched1: { left: 40, top: 465, width: 240 },
    sched2: { left: 40, top: 605, width: 240 }
};

// Reduced path curvature for mobile
const mobilePaths = {
    wfToCron: "M 160 170 Q 180 215 160 260",
    cronToSched1: "M 160 380 Q 140 422 160 465",
    cronToSched2: "M 160 380 Q 200 490 160 605",
    sched1ToWf: "M 40 520 Q -20 310 20 100",
    sched2ToWf: "M 280 660 Q 320 380 300 100"
};

const useDiagramAnimation = (paths: any) => {
    const textControls = useAnimation();
    const clockControls = useAnimation();
    const pulseControls = useAnimation();
    const card1Controls = useAnimation();
    const card2Controls = useAnimation();
    const icon1Controls = useAnimation();
    const icon2Controls = useAnimation();

    useEffect(() => {
        let isMounted = true;
        const run = async () => {
            // Initial reset
            card1Controls.set({ opacity: 0, scale: 0.95, y: 20 });
            card2Controls.set({ opacity: 0, scale: 0.95, y: 20 });
            textControls.set({ opacity: 0, y: 10 });
            icon1Controls.set({ opacity: 0 });
            icon2Controls.set({ opacity: 0 });
            pulseControls.set({ scale: 1, opacity: 0 });
            clockControls.set({ rotate: 0 });

            while (isMounted) {
                // Step 1: User command appears
                await textControls.start({ opacity: 1, y: 0, transition: { duration: 0.6 } });
                await new Promise(r => setTimeout(r, 600));

                // Step 2: Icons travel from Workflow to CRON
                icon1Controls.set({ offsetPath: `path("${paths.wfToCron}")`, offsetDistance: "0%", opacity: 1 });
                icon2Controls.set({ offsetPath: `path("${paths.wfToCron}")`, offsetDistance: "0%", opacity: 1 });

                icon1Controls.start({ offsetDistance: "100%", transition: { duration: 1.4, ease: "easeInOut" } });
                await new Promise(r => setTimeout(r, 300)); // stagger
                await icon2Controls.start({ offsetDistance: "100%", transition: { duration: 1.4, ease: "easeInOut" } });

                icon1Controls.set({ opacity: 0 });
                icon2Controls.set({ opacity: 0 });

                // Step 3: Clock hand rotates and hits trigger
                await clockControls.start({ rotate: 90 }, { duration: 0.5, ease: "linear" });
                
                // Stronger Cron pulse effect
                pulseControls.start({ scale: [1, 1.3, 1], opacity: [0.6, 0.2, 0], transition: { duration: 0.5 } });
                
                // Continue clock rotation in background
                clockControls.start({ rotate: 360 }, { duration: 2.5, ease: "linear" });

                // Step 4: CRON fires to Schedule 1
                icon1Controls.set({ offsetPath: `path("${paths.cronToSched1}")`, offsetDistance: "0%", opacity: 1 });
                icon1Controls.start({ offsetDistance: "100%", transition: { duration: 1.2, ease: "easeInOut" } });
                await new Promise(r => setTimeout(r, 600)); // wait slightly before showing card
                icon1Controls.set({ opacity: 0 });
                card1Controls.start({ opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } });

                await new Promise(r => setTimeout(r, 400));

                // Step 5: CRON fires to Schedule 2
                icon2Controls.set({ offsetPath: `path("${paths.cronToSched2}")`, offsetDistance: "0%", opacity: 1 });
                icon2Controls.start({ offsetDistance: "100%", transition: { duration: 1.2, ease: "easeInOut" } });
                await new Promise(r => setTimeout(r, 600)); // wait slightly before showing card
                icon2Controls.set({ opacity: 0 });
                card2Controls.start({ opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } });

                await new Promise(r => setTimeout(r, 1200));

                // Step 6: Loop return
                icon1Controls.set({ offsetPath: `path("${paths.sched1ToWf}")`, offsetDistance: "0%", opacity: 1 });
                icon2Controls.set({ offsetPath: `path("${paths.sched2ToWf}")`, offsetDistance: "0%", opacity: 1 });

                icon1Controls.start({ offsetDistance: "100%", transition: { duration: 1.6, ease: "easeInOut" } });
                icon2Controls.start({ offsetDistance: "100%", transition: { duration: 1.6, ease: "easeInOut" } });

                await new Promise(r => setTimeout(r, 800));
                
                // Fade out cards before icons finish returning
                card1Controls.start({ opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.4 } });
                card2Controls.start({ opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.4 } });
                textControls.start({ opacity: 0, y: 5, transition: { duration: 0.4 } });

                await new Promise(r => setTimeout(r, 800)); // finish icon animation

                icon1Controls.set({ opacity: 0 });
                icon2Controls.set({ opacity: 0 });

                // Ensure clock is reset
                clockControls.set({ rotate: 0 });

                await new Promise(r => setTimeout(r, 300)); // pause before restarting loop
            }
        };

        run();

        return () => { isMounted = false; };
    }, [paths, textControls, clockControls, pulseControls, card1Controls, card2Controls, icon1Controls, icon2Controls]);

    return { textControls, clockControls, pulseControls, card1Controls, card2Controls, icon1Controls, icon2Controls };
};

const DiagramBase = ({ className, paths, coords }: any) => {
    const c = useDiagramAnimation(paths);

    return (
        <div className={className}>
            {/* SVG Background Layer for Paths */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                {Object.values(paths).map((d: any, i) => (
                    <path 
                        key={i} 
                        d={d} 
                        fill="none" 
                        stroke="url(#pathGradient)" 
                        strokeWidth="2.5" 
                        strokeDasharray="8 8" 
                        strokeOpacity="0.8"
                        className="animate-[dashMove_1.5s_linear_infinite]"
                    />
                ))}
                <defs>
                    <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4B5563" />
                        <stop offset="50%" stopColor="#1F2937" />
                        <stop offset="100%" stopColor="#4B5563" />
                    </linearGradient>
                </defs>
            </svg>

            {/* CSS for animating dashes to show directional flow */}
            <style>{`
                @keyframes dashMove {
                    from { stroke-dashoffset: 32; }
                    to { stroke-dashoffset: 0; }
                }
            `}</style>

            {/* Traveling Icon 1 (Calendar) */}
            <motion.div
                animate={c.icon1Controls}
                className="absolute top-0 left-0 z-30 flex items-center justify-center -ml-[20px] -mt-[20px] md:-ml-[24px] md:-mt-[24px]"
                style={{ offsetRotate: "0deg", transformOrigin: "center center" }}
            >
                <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-[40px] h-[40px] md:w-[48px] md:h-[48px] bg-white rounded-xl shadow-[0_6px_14px_rgba(0,0,0,0.08)] flex items-center justify-center relative border border-gray-100/50"
                >
                    {/* Soft glow behind the icon */}
                    <div className="absolute inset-0 rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.7)] pointer-events-none hidden md:block" />
                    <img src="/svgs/google-calendar.svg" className="w-[20px] h-[20px] md:w-[24px] md:h-[24px] pointer-events-none relative z-10" alt="Calendar" />
                </motion.div>
            </motion.div>

            {/* Traveling Icon 2 (Gmail) */}
            <motion.div
                animate={c.icon2Controls}
                className="absolute top-0 left-0 z-30 flex items-center justify-center -ml-[20px] -mt-[20px] md:-ml-[24px] md:-mt-[24px]"
                style={{ offsetRotate: "0deg", transformOrigin: "center center" }}
            >
                <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                    className="w-[40px] h-[40px] md:w-[48px] md:h-[48px] bg-white rounded-xl shadow-[0_6px_14px_rgba(0,0,0,0.08)] flex items-center justify-center relative border border-gray-100/50"
                >
                    {/* Soft glow behind the icon */}
                    <div className="absolute inset-0 rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.7)] pointer-events-none hidden md:block" />
                    <img src="/svgs/gmail.svg" className="w-[20px] h-[20px] md:w-[24px] md:h-[24px] pointer-events-none relative z-10" alt="Gmail" />
                </motion.div>
            </motion.div>

            {/* Workflow Command Box */}
            <div
                className="absolute z-10 bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all"
                style={{ ...coords.workflow }}
            >
                <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-gray-800">
                    <div className="p-1.5 bg-blue-50 rounded-md">
                        <Zap className="w-4 h-4 text-blue-500" />
                    </div>
                    Workflow
                </div>
                <motion.div
                    animate={c.textControls}
                    initial={{ opacity: 0, y: 10 }}
                    className="bg-gray-50 rounded-lg p-3 text-[13px] font-mono text-gray-700 border border-gray-100 shadow-inner"
                >
                    <span className="text-blue-600 font-bold">/workflow</span>
                    <br />
                    Schedule meeting tomorrow at 7am and send email invite
                </motion.div>
            </div>

            {/* Center CRON Circle */}
            <div
                className="absolute z-10 flex flex-col items-center justify-center"
                style={{ left: coords.cron.left, top: coords.cron.top, width: coords.cron.width }}
            >
                <div className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex items-center justify-center relative border border-gray-200">
                    {/* Soft Expanding Glow for Trigger */}
                    <motion.div
                        animate={c.pulseControls}
                        initial={{ scale: 1, opacity: 0 }}
                        className="absolute inset-[0px] rounded-full shadow-[0_0_24px_rgba(99,102,241,0.5)] pointer-events-none"
                    />

                    {/* Simple Bold Clock Face */}
                    <div className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-full border-[5px] md:border-[6px] border-black flex items-center justify-center relative bg-white">
                        
                        {/* Static Hour Hand */}
                        <div className="absolute w-[4px] md:w-[5px] h-[22%] bg-black rounded-[2px] origin-top top-[50%] left-[50%] -translate-x-1/2 rotate-[-45deg]" />
                        
                        {/* Rotating Minute Hand */}
                        <motion.div
                            animate={c.clockControls}
                            className="absolute w-[4px] md:w-[5px] h-[35%] bg-black rounded-[2px] origin-bottom top-[15%] left-[50%] -translate-x-1/2"
                        />

                       {/* Central intersection dot */}
                       <div className="absolute w-[5px] h-[5px] md:w-[6px] md:h-[6px] bg-black rounded-full z-10 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2" />
                    </div>
                </div>
                <div className="mt-4 font-bold text-xs tracking-[0.2em] text-gray-500">
                    CRON
                </div>
            </div>

            {/* Schedule 1 Card */}
            <motion.div
                animate={c.card1Controls}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                className="absolute z-10 bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)] w-[240px]"
                style={{ ...coords.sched1 }}
            >
                <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-gray-800">
                    <div className="p-1.5 bg-green-50 rounded-md">
                        <Calendar className="w-4 h-4 text-green-600" />
                    </div>
                    Meeting scheduled
                </div>
                <div className="text-[13px] text-gray-500 leading-relaxed font-medium">
                    Date: <span className="text-gray-800">Tomorrow</span>
                    <br />
                    Time: <span className="text-gray-800">7:00 AM</span>
                </div>
            </motion.div>

            {/* Schedule 2 Card */}
            <motion.div
                animate={c.card2Controls}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                className="absolute z-10 bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)] w-[240px]"
                style={{ ...coords.sched2 }}
            >
                <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-gray-800">
                    <div className="p-1.5 bg-orange-50 rounded-md">
                        <Mail className="w-4 h-4 text-orange-500" />
                    </div>
                    Email reminder
                </div>
                <div className="text-[13px] text-gray-500 leading-relaxed font-medium">
                    Send time: <span className="text-gray-800">6:45 AM</span>
                </div>
            </motion.div>
        </div>
    );
};

export default function ScheduleWorkflowAnimation() {
    return (
        <section className="relative pb-12 md:pb-20 px-4 max-w-7xl mx-auto w-full flex flex-col items-center justify-center overflow-hidden font-sans">
            
            {/* Step 3 Header matches Step 1 & 2 layout perfectly */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="my-8 md:my-12 flex justify-center w-full z-20"
            >
                <div className="relative px-6 md:px-10 py-6 rounded-[2rem] overflow-hidden">
                    <div className="absolute inset-0 bg-white/30 backdrop-blur-2xl rounded-[2rem] border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.06)]" />
                    
                    <div className="relative z-10 flex items-center gap-4 md:gap-5">
                        <span className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black text-white flex items-center justify-center text-xl md:text-2xl font-bold font-body shrink-0">
                            3
                        </span>
                        <span className="text-xl md:text-2xl font-bold text-black font-body tracking-tight">
                            Schedule Tasks
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* Animation Diagram (Responsive Wrappers) */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative w-full max-w-6xl mx-auto flex justify-center shadow-2xl overflow-hidden py-2 md:py-20"
                style={{ 
                    borderRadius: "14px", 
                    backgroundImage: "url('/task scheduler bg.jpeg')", 
                    backgroundSize: "cover", 
                    backgroundPosition: "center" 
                }}
            >
                {/* Light overlay to ensure high contrast for the diagram elements over the bg image */}
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] pointer-events-none" />

                {/* Desktop Version */}
                <div className="hidden md:block relative z-10 w-full flex justify-center">
                    <DiagramBase className="relative w-[1000px] h-[520px]" paths={desktopPaths} coords={desktopCoords} />
                </div>

                {/* Mobile Version */}
                <div className="block md:hidden relative z-10 w-full flex justify-center">
                    <DiagramBase className="relative w-[320px] h-[750px]" paths={mobilePaths} coords={mobileCoords} />
                </div>
            </motion.div>
        </section>
    );
}
