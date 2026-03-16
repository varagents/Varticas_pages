import { motion } from "framer-motion";
import { CalendarDays, Mail, CheckSquare, GitBranch } from "lucide-react";

const useCases = [
  {
    icon: CalendarDays,
    title: "Meeting Automation",
    description:
      "Schedule meetings, send invites, attach documents automatically.",
    color: "bg-blue-50",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
  },
  {
    icon: Mail,
    title: "Email Automation",
    description:
      "Draft emails, send follow-ups, summarize conversations.",
    color: "bg-violet-50",
    iconColor: "text-violet-600",
    iconBg: "bg-violet-100",
  },
  {
    icon: CheckSquare,
    title: "Task Automation",
    description:
      "Create tasks in ClickUp, Linear, or Jira and notify teams in Slack.",
    color: "bg-green-50",
    iconColor: "text-green-600",
    iconBg: "bg-green-100",
  },
  {
    icon: GitBranch,
    title: "Workflow Automation",
    description:
      "Connect multiple apps and execute multi-step workflows from one prompt.",
    color: "bg-orange-50",
    iconColor: "text-orange-600",
    iconBg: "bg-orange-100",
  },
];

export default function Features() {
  return (
    <section id="features" className="pt-8 md:pt-12 pb-8 md:pb-12 px-4 bg-[#dfdfdf]">
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
            <span className="text-sm font-bold text-black font-body">Use Cases</span>
          </div> */}
          <h2 className="font-display font-black text-5xl md:text-7xl tracking-tight text-black mb-5">
            What You Can Do
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-900">
              With Varticas
            </span>
          </h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto font-body leading-relaxed">
            One AI coworker that handles the work across your entire stack.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className={`w-14 h-14 rounded-2xl ${item.iconBg} flex items-center justify-center mb-6`}>
                <item.icon className={`w-6 h-6 ${item.iconColor}`} />
              </div>
              <h3 className="font-display font-bold text-xl mb-3 text-black leading-tight">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed font-body text-sm">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* And many more things */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-14 text-center"
        >
          <p className="text-gray-500 font-body text-xl md:text-2xl font-medium tracking-tight">
            ...and many more things...
          </p>
        </motion.div>
      </div>
    </section>
  );
}
