import { motion } from "framer-motion";
import {
  Bot,
  Workflow,
  Plug2,
  Sparkles,
  Target,
  CheckCircle2,
} from "lucide-react";

/**
 * SEO-rich, crawlable content section.
 *
 * This block is text-heavy on purpose: it gives search engines (and
 * AI indexers like Google's SGE, Perplexity, GPTBot) enough natural-
 * language signal to rank Varticas for the high-intent queries:
 *   "AI workflow automation"
 *   "autonomous AI coworker"
 *   "AI task automation"
 *   "AI agents that execute work"
 *
 * Visual design mirrors the existing premium light theme (white cards,
 * gray-50 surface, blue gradient accents) — no new branding introduced.
 */

const pillars = [
  {
    icon: Workflow,
    title: "AI Workflow Automation",
    body:
      "Varticas turns natural-language prompts into end-to-end automated workflows. Schedule meetings, send emails, file tickets, sync data — across every app you use — without writing a single line of code or building Zapier-style flowcharts.",
    keywords: ["workflow automation", "no-code AI", "agentic workflows"],
  },
  {
    icon: Bot,
    title: "Autonomous AI Coworkers",
    body:
      "Unlike a chatbot, a Varticas AI coworker plans, executes, and verifies real work. It reasons about your tools, makes decisions, retries on failure, and delivers outcomes — operating like a junior teammate who never sleeps.",
    keywords: ["autonomous AI agent", "AI coworker", "AI employee"],
  },
  {
    icon: Plug2,
    title: "Workflow Integrations",
    body:
      "One-click OAuth into Gmail, Google Calendar, Google Drive, Slack, Notion, Jira, Linear, GitHub, ClickUp, Telegram and 20+ more. Varticas reads, writes, and orchestrates across your stack the moment you connect it.",
    keywords: ["AI integrations", "Slack automation", "Gmail automation"],
  },
  {
    icon: Target,
    title: "AI Task Automation",
    body:
      "Delegate repetitive work: inbox triage, follow-ups, status updates, weekly reports, calendar coordination, CRM hygiene. Varticas handles the long tail of small tasks that quietly eat your week.",
    keywords: ["AI task automation", "AI assistant", "AI productivity"],
  },
];

const useCases = [
  {
    title: "Sales & Outreach",
    items: [
      "Identify cold leads in your CRM and send personalised follow-ups",
      "Summarise prospect activity from email + Slack into a daily digest",
      "Auto-create Linear tasks for objections raised in calls",
    ],
  },
  {
    title: "Engineering & Product",
    items: [
      "Convert Slack bug reports into Jira tickets with reproduction steps",
      "Schedule release sync-ups and attach the latest release notes",
      "Post weekly status to #product with PR + ticket metrics",
    ],
  },
  {
    title: "Operations & Founders",
    items: [
      "Triage your inbox every morning and surface what actually needs you",
      "Reconcile calendar events with project deadlines automatically",
      "Generate weekly investor / board updates from raw notes",
    ],
  },
];

export default function SEOContent() {
  return (
    <section
      id="what-is-varticas"
      aria-labelledby="seo-overview-heading"
      className="bg-[#dfdfdf] py-20 md:py-28 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* ─── Intro ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-black/5 shadow-sm mb-6">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
            <span className="text-xs font-bold tracking-wide text-black font-body uppercase">
              What is Varticas
            </span>
          </div>
          <h2
            id="seo-overview-heading"
            className="font-display font-black text-4xl md:text-6xl tracking-tight text-black leading-[1.05] mb-6"
          >
            The AI workflow automation
            <br />
            platform for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-900">
              modern teams.
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-700 font-body leading-relaxed">
            <strong>Varticas</strong> is an AI workflow automation platform powered by
            <strong> autonomous AI coworkers</strong>. Instead of building flowcharts
            or maintaining brittle scripts, you describe what you want in plain
            English — Varticas plans the steps, calls the right tools, and{" "}
            <em>executes real work</em> across Gmail, Slack, Notion, Jira, Linear,
            GitHub, and 20+ more.
          </p>
        </motion.div>

        {/* ─── 4 pillars ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {pillars.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="p-8 md:p-10 rounded-3xl bg-white border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow"
            >
              <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center mb-5">
                <p.icon className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-display font-bold text-2xl md:text-3xl text-black mb-3 tracking-tight">
                {p.title}
              </h3>
              <p className="text-gray-700 font-body leading-relaxed">{p.body}</p>
              <ul className="sr-only">
                {p.keywords.map((k) => (
                  <li key={k}>{k}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        {/* ─── Use Cases ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight text-black mb-4">
            Use cases across your team
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto font-body leading-relaxed">
            Real examples of work that Varticas's AI agents execute every day —
            reliably, in the background, across your full stack.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {useCases.map((u, i) => (
            <motion.article
              key={u.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-7 rounded-3xl bg-white border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            >
              <h3 className="font-display font-bold text-xl text-black mb-5 tracking-tight">
                {u.title}
              </h3>
              <ul className="space-y-3">
                {u.items.map((item) => (
                  <li key={item} className="flex gap-3 items-start text-sm text-gray-700 font-body leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
