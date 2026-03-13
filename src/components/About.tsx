import { motion } from "framer-motion";
import { Plug, Terminal, Workflow } from "lucide-react";

const pillars = [
    {
        icon: Plug,
        title: "Connect",
        description: "Integrate with Gmail, Slack, Notion, GitHub, and 50+ more tools.",
    },
    {
        icon: Terminal,
        title: "Command",
        description: "Give natural language instructions. Varticas builds a plan of action.",
    },
    {
        icon: Workflow,
        title: "Automate",
        description: "Run complex multi-step workflows autonomously.",
    },
];

export default function About() {
    return (
        <section id="about" className="py-32 px-4 relative bg-[#dfdfdf]">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 mb-8 shadow-sm">
                        <span className="text-sm text-black font-bold">About Varticas</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-display font-black mb-8 tracking-tight text-black leading-[1.1]">
                        The missing operating system
                        <br />
                        for your work.
                    </h2>
                    <p className="text-gray-600 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-body">
                        Varticas is an autonomous AI coworker that connects to your tools,
                        understands your commands, and executes workflows.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pillars.map((pillar, index) => (
                        <motion.div
                            key={pillar.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            className="p-10 rounded-[2.5rem] bg-white border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-black flex items-center justify-center mb-8">
                                <pillar.icon className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="font-display text-4xl font-black mb-4 text-black tracking-tight">
                                {pillar.title}
                            </h3>
                            <p className="text-gray-600 text-lg leading-relaxed font-body">
                                {pillar.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Stats */}
                <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { value: "10+", label: "Integrations" },
                        { value: "50+", label: "Beta users" },
                        { value: "10x", label: "Faster workflows" },
                        { value: "24/7", label: "Always running" },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="text-5xl md:text-6xl font-display font-black text-black mb-2 tracking-tighter">{stat.value}</div>
                            <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
