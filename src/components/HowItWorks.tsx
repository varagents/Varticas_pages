import { motion } from "framer-motion";
import { Plug, MessageSquare, Zap, CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Plug,
    title: "Connect Your Apps",
    description:
      "Securely connect your tools like Gmail, Google Calendar, Slack, Drive, GitHub, and Notion. One-click OAuth integrations — no code required.",
  },
  {
    number: "02",
    icon: MessageSquare,
    title: "Describe Your Task",
    description:
      "Use natural language to describe any workflow or task. No forms, no builders — just type what you need done.",
    example: {
      command: "/workflow",
      prompt: "Create a meeting with product team tomorrow and send invite.",
    },
  },
  {
    number: "03",
    icon: Zap,
    title: "Varticas Executes",
    description:
      "AI plans the workflow and executes actions across your connected tools automatically.",
    checklist: [
      "Calendar event created",
      "Email sent",
      "Files attached",
    ],
  },
];

export default function HowItWorks() {

  return (
    <section id="how-it-works" className="pt-16 sm:pt-20 md:pt-32 pb-4 md:pb-8 px-4 bg-[#dfdfdf]">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          {/* <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
            <span className="text-sm font-bold text-black font-body">How It Works</span>
          </div> */}
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-7xl tracking-tight text-black mb-5">
            How Varticas Works
          </h2>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-body leading-relaxed">
            From a single prompt to full automation in seconds.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.12 }}
              className="relative p-6 sm:p-8 rounded-[2rem] bg-white border border-gray-200 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              {/* Step number */}
              <span className="text-[3rem] sm:text-[4rem] font-display font-black text-gray-100 leading-none absolute top-5 right-6 sm:top-6 sm:right-8 select-none">
                {step.number}
              </span>

              {/* Icon */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-black flex items-center justify-center mb-5 sm:mb-6">
                <step.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>

              <h3 className="font-display font-bold text-xl sm:text-2xl text-black mb-3 tracking-tight">
                {step.title}
              </h3>
              <p className="text-gray-600 font-body leading-relaxed mb-4">
                {step.description}
              </p>

              {/* Command example for step 2 */}
              {step.example && (
                <div className="mt-auto bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-start gap-2">
                    <span className="font-mono text-xs font-bold text-blue-600 mt-0.5 shrink-0">
                      {step.example.command}
                    </span>
                    <span className="font-mono text-xs text-gray-700 leading-relaxed">
                      {step.example.prompt}
                    </span>
                  </div>
                </div>
              )}

              {/* Checklist for step 3 */}
              {step.checklist && (
                <div className="mt-auto flex flex-col gap-2">
                  {step.checklist.map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.4 + i * 0.15 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                      <span className="text-sm font-semibold text-gray-700 font-body">{item}</span>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>

    </section>
  );
}
