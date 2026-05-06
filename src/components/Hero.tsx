import { useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { trackEvent } from "@/lib/analytics";
import { openProductCta } from "@/lib/productUrl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import styles from "@/styles/Hero.module.css";

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
  const { user } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth < 768) return; // Disable on mobile for performance and UX reasons
    gsap.to(trackRef.current, {
      x: "-40%",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5
      }
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles.heroContainer}>

      {/* Massive Headline */}
      <div className={styles.headingLayer}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 flex flex-col items-center text-center -mb-[80px] md:-mb-[180px] pointer-events-none"
        >
          <h1 className="font-display-hero text-[clamp(4rem,11vw,12rem)] leading-[0.9] md:leading-[0.75] text-black w-full mix-blend-normal">
            <span className="block -mb-4 md:-mb-8 tracking-[-0.07em]">Autonomous</span>
            <span className="block tracking-[-0.07em] text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-900 pb-4">Coworker</span>
          </h1>
        </motion.div>
      </div>

      {/* Floating Icons */}
      <div className={styles.backgroundLayer}>
        {/* Slanted Container */}
        <div className={styles.slantedContainer}>
          {/* Scrolling Track */}
          <div ref={trackRef} className={styles.track}>
            {scrollingTrack.map((src, i) => (
              <div key={i} className={styles.iconBox}>
                <div className={styles.iconInnerShadow} />
                <img src={src} alt="App Icon" className={styles.iconImage} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card layer */}
      <div className={styles.cardsLayer}>
        {/* Right card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className={styles.rightWrapper}>
          <div className={`${styles.card} ${styles.cardRight}`}>
            CONNECT,<br />
            COMMAND<br />
            CONNECT
          </div>
        </motion.div>

        {/* left card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className={styles.leftWrapper}>
          <div className={`${styles.card} ${styles.cardLeft}`}>
            24/7<br />
            AI  NATIVE<br />
            COWORKER
          </div>
        </motion.div>
      </div>

      {/* Apply for Beta Access Button */}
      <div className={styles.ctaLayer}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={styles.ctaWrapper}>
          <button
            type="button"
            onClick={() => {
              trackEvent("get_varticas_click", { source: "hero" });
              openProductCta(!!user);
            }}
            className={styles.ctaButton}
          >
            <span>Get Started</span>
            <div className={styles.iconWrapper}>
              <ArrowRight className={styles.icon} />
            </div>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
