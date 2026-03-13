import { motion } from "framer-motion";

export default function MarkedTag() {
    return (
        <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-[#dfdfdf] isolate">
            {/* Texture / Noise Overlay */}
            <div
                className="absolute inset-0 z-20 mix-blend-overlay opacity-30 pointer-events-none"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
            ></div>

            {/* Background Blurs */}
            <div className="absolute left-[-10%] top-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] bg-[#ff4a1c] rounded-full blur-[80px] md:blur-[120px] opacity-90 -z-10" />
            <div className="absolute right-[-5%] top-0 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-[#89A8B2] rounded-full blur-[80px] md:blur-[120px] opacity-80 -z-10" />

            {/* Text Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="relative z-30 max-w-6xl mx-auto px-4 w-full flex justify-center items-center h-full"
            >
                <div className="grid grid-cols-2 gap-x-4 md:gap-x-8 gap-y-0 text-[#fdfcf5] font-display font-black text-[14vw] md:text-[9rem] leading-[0.85] tracking-tighter uppercase whitespace-nowrap drop-shadow-sm">
                    <div className="flex flex-col items-end justify-center">
                        <span>YOU</span>
                        <span>VARTICAS</span>
                    </div>
                    <div className="flex flex-col items-start justify-center">
                        <span>SLEEP</span>
                        <span>DONT</span>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
