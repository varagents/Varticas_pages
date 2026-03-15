import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import BetaUserModal from "@/components/BetaUserModal";

const examples = [
  {
    prompt: "Schedule meeting with marketing team tomorrow and send agenda.",
    outputs: [
      "Calendar Event Created",
      "Email Invitation Sent",
    ],
  },
  {
    prompt: "Summarize my inbox and draft replies.",
    outputs: [
      "Inbox Summary Generated",
      "Draft Emails Created",
    ],
  },
  {
    prompt: "Create task in ClickUp and notify Slack channel.",
    outputs: [
      "Task Created",
      "Slack Message Sent",
    ],
  },
];

function ExampleCard({ example, index }: { example: typeof examples[0]; index: number }) {
  const [inView, setInView] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={() => setInView(true)}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, delay: index * 0.12 }}
      className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-5 py-3 bg-gray-50 border-b border-gray-200">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <span className="ml-2 text-xs text-gray-400 font-mono font-semibold">varticas</span>
      </div>

      {/* Prompt */}
      <div className="px-5 py-4">
        <div className="flex items-start gap-3">
          <span className="font-mono text-sm font-bold text-blue-600 mt-0.5 shrink-0">/workflow</span>
          <p className="font-mono text-sm text-gray-800 leading-relaxed">{example.prompt}</p>
        </div>
      </div>

      {/* Outputs */}
      <div className="px-5 pb-5 border-t border-gray-100 pt-4 flex flex-col gap-2.5">
        {example.outputs.map((output, i) => (
          <motion.div
            key={output}
            initial={{ opacity: 0, x: -8 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.2 }}
            className="flex items-center gap-3"
          >
            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
            <span className="text-sm font-semibold text-gray-700 font-body">{output}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function WorkflowExamples() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="workflow-examples" className="py-24 md:py-32 px-4 bg-[#dfdfdf]">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
            <span className="text-sm font-bold text-black font-body">Live Examples</span>
          </div> */}
          <h2 className="font-display font-black text-5xl md:text-7xl tracking-tight text-black mb-5">
            See Varticas
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-900">
              In Action
            </span>
          </h2>
          <p className="text-gray-600 text-xl max-w-xl mx-auto font-body leading-relaxed">
            Real prompts. Real automation. Executed in seconds.
          </p>
        </motion.div>

        {/* Example Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {examples.map((example, index) => (
            <ExampleCard key={index} example={example} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <button
            onClick={() => setIsModalOpen(true)}
            className="group inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full font-bold font-body text-base transition-all hover:scale-105 hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
          >
            Start Automating
            <div className="bg-white/20 p-1.5 rounded-full group-hover:bg-white group-hover:text-black transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </motion.div>
      </div>

      <BetaUserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
