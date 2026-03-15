import { motion } from "framer-motion";
import { Plug, Terminal, Workflow } from "lucide-react";

const stats = [
  { value: "10+", label: "Integrated Tools" },
  { value: "10x", label: "Faster Workflows" },
  { value: "24/7", label: "Always Running" },
  { value: "0", label: "Lines of Code Needed" },
];

export default function About() {
  return (
    <section id="about" className="pt-8 pb-12 md:pt-12 md:pb-16 px-4 relative bg-[#dfdfdf]">
      <div className="max-w-6xl mx-auto">

        {/* Header — single column centered */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
            <span className="text-sm font-bold text-black font-body">About Varticas</span>
          </div> */}
          <h2 className="text-5xl md:text-7xl font-display font-black tracking-tight text-black leading-[1.05] mb-6">
            The missing operating system
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-900">
              for your work.
            </span>
          </h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed font-body">
            Varticas is an AI coworker built for modern teams. It connects to the apps you already
            use and executes real work, not just suggestions  directly inside your stack.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1 + index * 0.08 }}
              className="py-8 px-6 bg-white rounded-3xl border border-gray-200 shadow-sm text-center"
            >
              <div className="text-5xl font-display font-black text-black mb-1 tracking-tighter">
                {stat.value}
              </div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider font-body">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

      
      </div>
    </section>
  );
}
