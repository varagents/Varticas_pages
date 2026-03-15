import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import BetaUserModal from "@/components/BetaUserModal";

export default function DemoSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="demo" className="pt-4 md:pt-8 pb-0 px-4 bg-[#dfdfdf]">
      <div className="max-w-5xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-0"
        >
          {/* <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-gray-200 shadow-sm mb-6">
            <span className="text-sm font-bold text-black font-body">Demo</span>
          </div> */}
          <h2 className="font-display font-black text-5xl md:text-7xl tracking-tight text-black mb-5">
            Watch Varticas
            <br />
            Execute a Workflow
          </h2>
          {/* <p className="text-gray-600 text-xl max-w-xl mx-auto font-body leading-relaxed">
            See how a single prompt turns into real actions across your apps.
          </p> */}
        </motion.div>

        {/* Video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="relative rounded-[2rem] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.15)] border border-gray-200 bg-black"
        >
          <video
            src="/videos/Varticas_shoot.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto block"
          />
        </motion.div>

        {/* CTA below video */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mt-10"
        >
          {/* <button
            onClick={() => setIsModalOpen(true)}
            className="group inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full font-bold font-body text-base transition-all hover:scale-105 hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
          >
            Join Beta
            <div className="bg-white/20 p-1.5 rounded-full group-hover:bg-white group-hover:text-black transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </button> */}
        </motion.div>
      </div>

      <BetaUserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
