import { motion } from "framer-motion";
import { Bot, Workflow, Globe, Layers } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "Autonomous Agent Tasks",
    description: "Varticas agents research, navigate, and execute tasks across your tools with zero manual steps (with auto accept on).",
  },
  {
    icon: Workflow,
    title: "Visual Workflow Builder",
    description: "Build multi-step automations. Connect any tool in your stack effortlessly.",
  },
  {
    icon: Globe,
    title: "10+ MCP Connections",
    description: "Native integrations with Gmail, Slack, Notion, GitHub, Jira, Google Sheets, and more.",
  },
  {
    icon: Layers,
    title: "Schedule Workflow",
    description: "Varticas Cron can schedule you workflow on daily, weekly, monthly basis. ",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-32 px-4 relative bg-[#dfdfdf]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="font-display font-black text-6xl md:text-7xl mb-6 tracking-tight text-black">
            Built for production.
          </h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto font-body">
            Enterprise-grade AI automation that scales with your team.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-8">
                <feature.icon className="w-6 h-6 text-black" />
              </div>
              <h3 className="font-display font-bold text-2xl mb-4 text-black leading-tight">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed font-body">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
