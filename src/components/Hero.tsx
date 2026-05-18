import { useRef, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { trackEvent, trackGetStartedClick } from "@/lib/analytics";
import { openProductCta } from "@/lib/productUrl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
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

const placeholders = [
  "Schedule a product review tomorrow at 10am, send invite to team@company.com, and attach the Q2 deck from Drive",
  "File the bug Sarah mentioned in #dev-standup as a Linear ticket and assign it to the backend team",
  "Every weekday at 8:45am, email me a summary of unread Slack mentions, open Jira tickets, and today's meetings",
  "Find everyone who didn't reply to last week's outreach and send them a follow-up by EOD",
];

export default function Hero() {
  const { user } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [placeholder, setPlaceholder] = useState("");

  // Scroll-triggered icon track
  useEffect(() => {
    if (window.innerWidth < 768) return;
    gsap.to(trackRef.current, {
      xPercent: -40, // More optimized than x: "-40%"
      force3D: true, // Forces GPU acceleration
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5
      }
    });
  }, []);

  // Typewriter placeholder effect
  useEffect(() => {
    let pi = 0, ci = 0, dir = 1;
    let timeout: ReturnType<typeof setTimeout>;

    function tick() {
      const t = placeholders[pi];
      if (dir === 1) {
        ci++;
        setPlaceholder(t.slice(0, ci));
        if (ci >= t.length) { dir = -1; timeout = setTimeout(tick, 1800); return; }
      } else {
        ci -= 2;
        if (ci <= 0) { ci = 0; dir = 1; pi = (pi + 1) % placeholders.length; }
        setPlaceholder(t.slice(0, ci));
      }
      timeout = setTimeout(tick, dir === 1 ? 30 : 18);
    }
    timeout = setTimeout(tick, 800);
    return () => clearTimeout(timeout);
  }, []);

  // ⌘K to focus
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <header
      ref={containerRef}
      role="banner"
      aria-label="Varticas — AI workflow automation hero"
      className={styles.heroContainer}>

      {/* ─── Heading + Subtitle + Buttons + Command Bar ─── */}
      <div className={styles.headingLayer}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className={styles.heroContent}
        >
          <h1 className={styles.display}>
            <span className={styles.nb}>Your boring job is now your</span>
            <br />
            <span className={styles.em}>AI coworker's</span> job.
          </h1>

          <p className={styles.heroSub}>
            Connect Gmail, Slack, Notion, Jira, and <strong>20+ tools</strong>. Type one command.
            Varticas executes the work <strong>automatically </strong>
          </p>

          {/* Social proof row */}
          <div className={styles.socialRow}>
            <span className={styles.avatarStack}>
              <span className={styles.avatar} style={{ background: "linear-gradient(135deg,#FFB07C,#E07856)" }} />
              <span className={styles.avatar} style={{ background: "linear-gradient(135deg,#9DB7FF,#1A56FF)" }} />
              <span className={styles.avatar} style={{ background: "linear-gradient(135deg,#C8F0C0,#16A34A)" }} />
              <span className={styles.avatar} style={{ background: "linear-gradient(135deg,#1A1A1A,#444)" }} />
            </span>
            <span className={styles.socialText}>
              <strong>100+ professionals</strong> · saving 10+ hours a week
            </span>
          </div>

          {/* Command bar */}
          <form
            className={styles.cmdBar}
            aria-label="Describe a workflow to automate with Varticas"
            onSubmit={(e) => {
              e.preventDefault();
              inputRef.current?.blur();
              trackEvent("workflow_command", { source: "hero" });
              trackGetStartedClick("hero_command_bar");
              openProductCta(!!user);
            }}
          >
            <span className={styles.slash}>/workflow</span>
            <label htmlFor="hero-workflow-input" className="sr-only">
              Describe a workflow for Varticas to automate
            </label>
            <input
              ref={inputRef}
              id="hero-workflow-input"
              name="workflow"
              type="text"
              autoComplete="off"
              placeholder={placeholder}
              className={styles.cmdInput}
              aria-label="Describe a workflow"
            />
            <button type="submit" className={styles.cmdPill}>
              Start for free <span className={styles.arr}>→</span>
            </button>
          </form>

          {/* Hints below command bar */}
          <div className={styles.cmdHint}>
            <span className={styles.ck}>No credit card</span>
            <span className={styles.ck}>50 free runs / month</span>
            <span className={styles.ck}>Setup in &lt; 3 min</span>
            {/* <span className={styles.kbdGroup}>
              <kbd className={styles.kbd}>⌘</kbd>
              <kbd className={styles.kbd}>K</kbd>
              {" "}to focus
            </span> */}
          </div>
        </motion.div>
      </div>

      {/* ─── Floating Scrolling Icons (kept as-is) ─── */}
      <div className={styles.backgroundLayer} aria-hidden="true">
        <div className={styles.slantedContainer}>
          <div ref={trackRef} className={styles.track}>
            {scrollingTrack.map((src, i) => {
              const name = (src.split("/").pop() || "")
                .replace(/\.svg$/, "")
                .replace(/-/g, " ");
              return (
                <div key={i} className={styles.iconBox}>
                  <div className={styles.iconInnerShadow} />
                  <img
                    src={src}
                    alt={`${name} integration icon`}
                    loading="lazy"
                    decoding="async"
                    width={48}
                    height={48}
                    className={styles.iconImage}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>


    </header>
  );
}
