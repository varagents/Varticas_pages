import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { trackFaqOpen } from "@/lib/analytics";

/**
 * FAQ section with:
 *  - Semantic accordion (radix) — keyboard accessible, ARIA-correct
 *  - schema.org FAQPage JSON-LD injected inline for rich results
 *  - GA4 `faq_open` tracking per question
 *
 * Listed in priority order for the queries we want to rank for.
 */

const faqs: { q: string; a: string }[] = [
  {
    q: "What is an AI coworker?",
    a: "An AI coworker is an autonomous agent that doesn't just chat — it executes real work inside the tools your team already uses. Varticas plans tasks, calls APIs, writes emails, files tickets, schedules meetings, and reports back. Think of it as a junior teammate that operates 24/7 across Gmail, Slack, Notion, Jira, GitHub, and more.",
  },
  {
    q: "How does Varticas automate workflows?",
    a: "You describe what you want in natural language (e.g. \"Every Monday at 9am, summarise last week's Linear tickets and email it to product@\"). Varticas's AI plans the multi-step workflow, picks the right integrations, executes each step, retries on failure, and verifies the outcome — no flowcharts, no scripts, no glue code.",
  },
  {
    q: "Which integrations does Varticas support?",
    a: "Varticas ships native integrations for Gmail, Google Calendar, Google Drive, Google Sheets, Google Slides, Slack, Notion, Jira, Linear, GitHub, ClickUp, Telegram, Google Meet and Atlassian — with 20+ more rolling out monthly. Connect any app in one click via OAuth.",
  },
  {
    q: "Can AI agents execute tasks automatically?",
    a: "Yes. Varticas's autonomous AI agents execute tasks end-to-end without human babysitting. They can run on a schedule (every weekday at 8am), trigger on events (new email from a VIP), or fire on demand (\"do this now\"). Every action is logged so you can review and approve sensitive steps.",
  },
  {
    q: "Is Varticas similar to Zapier or AI agents?",
    a: "Varticas combines the best of both. Zapier requires you to build linear, brittle flowcharts step-by-step. Pure LLM chatbots reason but can't act. Varticas is an agentic platform: you state the goal, the AI plans the workflow dynamically, and autonomous agents execute across your stack — adapting when things change.",
  },
];

export default function FAQ() {
  // Pre-compute JSON-LD once.
  const faqJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: {
          "@type": "Answer",
          text: a,
        },
      })),
    }),
    []
  );

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-[#dfdfdf] py-16 sm:py-20 md:py-28 px-4 border-t border-black/5"
    >
      {/* Inline FAQ schema for Google rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-14"
        >
          <h2
            id="faq-heading"
            className="font-display font-black text-3xl sm:text-4xl md:text-6xl tracking-tight text-black mb-4"
          >
            Frequently asked questions
          </h2>
          <p className="text-gray-600 text-base sm:text-lg font-body leading-relaxed max-w-xl mx-auto">
            Everything you need to know about AI workflow automation and how
            Varticas's autonomous AI coworkers actually work.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-2 md:p-4"
        >
          <Accordion
            type="single"
            collapsible
            className="w-full"
            onValueChange={(value) => {
              if (!value) return;
              const idx = parseInt(value.replace("faq-", ""), 10);
              const item = faqs[idx];
              if (item) trackFaqOpen(item.q);
            }}
          >
            {faqs.map((item, i) => (
              <AccordionItem
                key={item.q}
                value={`faq-${i}`}
                className="border-black/5 last:border-b-0"
              >
                <AccordionTrigger className="px-3 sm:px-4 md:px-5 py-4 sm:py-5 text-left text-sm sm:text-base md:text-lg font-bold font-display text-black hover:no-underline gap-3">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="px-3 sm:px-4 md:px-5 pb-5 text-gray-700 font-body leading-relaxed text-sm sm:text-[15px]">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Visible plain-text fallback for AI / no-JS crawlers
            (radix renders content inside the DOM regardless, but this
            extra block ensures the FAQ text remains discoverable even
            if accordion JS fails to hydrate). */}
        <div className="sr-only" aria-hidden="true">
          <h3>Varticas FAQ — plain text fallback</h3>
          <dl>
            {faqs.map((item) => (
              <div key={item.q}>
                <dt>{item.q}</dt>
                <dd>{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
