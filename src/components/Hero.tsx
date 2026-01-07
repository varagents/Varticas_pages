import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TerminalCode from "./TerminalCode";
import ArrowNarrowRightIcon from "./ui/ArrowNarrowRightIcon";

const Hero = () => {
  // Target: 1 month from 2025-12-31T21:45:56+05:30 -> 2026-01-31T21:45:56+05:30
  const targetDate = new Date("2026-02-10T21:45:56+05:30").getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const calculate = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        return { days: 0, hours: 0, minutes: 0 };
      }

      return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      };
    };

    setTimeLeft(calculate());
    const interval = setInterval(() => setTimeLeft(calculate()), 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            v1.0 Coming on Feb
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-6"
        >
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-2">
            Coming
          </h1>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gradient">
            Soon.
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10"
        >
          Reinventing Browsing Experience<br />
          <span className="text-primary/40 text-sm">
            Preview will be available on 25th January
          </span>
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-3 px-8 py-3 rounded-full border border-primary/30 bg-primary/5 text-primary text-xl font-medium">
            <a href="https://forms.gle/fkgCnCuRMSgH6YqbA" target="_blank"><span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Join the waitlist</a>
            <ArrowNarrowRightIcon />
          </div>
        </motion.div>
        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mb-16"
        >

          <div className="flex flex-col items-center p-3 sm:p-4 bg-primary/5 rounded-2xl border border-primary/20 backdrop-blur-sm min-w-[80px] sm:min-w-[100px]">
            <span className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 font-mono">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Days</span>
          </div>

          <div className="text-2xl sm:text-3xl font-bold text-primary/30 -mt-4">:</div>

          <div className="flex flex-col items-center p-3 sm:p-4 bg-primary/5 rounded-2xl border border-primary/20 backdrop-blur-sm min-w-[80px] sm:min-w-[100px]">
            <span className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 font-mono">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Hours</span>
          </div>

          <div className="text-2xl sm:text-3xl font-bold text-primary/30 -mt-4">:</div>

          <div className="flex flex-col items-center p-3 sm:p-4 bg-primary/5 rounded-2xl border border-primary/20 backdrop-blur-sm min-w-[80px] sm:min-w-[100px]">
            <span className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 font-mono">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Mins</span>
          </div>
        </motion.div>


      </div>
    </section>
  );
};

export default Hero;
