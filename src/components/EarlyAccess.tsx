import { motion } from "framer-motion";
import { openVarticasProductInNewTab } from "@/lib/productUrl";
import { ArrowRight, Sparkles, Check } from "lucide-react";

const benefits = [
    "Priority access to all features",
    "10+ tool integrations at launch",
    "Unlimited workflow automations",
    "Direct feedback channel to founders",
];

export default function EarlyAccess() {
    return (
        <section className="py-32 px-4 relative bg-[#dfdfdf] overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 mb-8 shadow-sm">
                            <Sparkles className="w-4 h-4 text-black" />
                            <span className="text-sm text-black font-bold">Join 120+ early users</span>
                        </div>

                        <h2 className="text-5xl md:text-6xl font-display font-black mb-6 tracking-tight text-black leading-[1.1]">
                            Get Early Access to
                            <br />
                            AI Workflow
                        </h2>

                        <p className="text-gray-600 text-xl mb-10 max-w-lg leading-relaxed font-body">
                            Join the Varticas beta and automate apps like Gmail, Notion, Slack
                            and GitHub. Be among the first to experience the future.
                        </p>

                        <div className="space-y-4 mb-12">
                            {benefits.map((benefit) => (
                                <div key={benefit} className="flex items-center gap-4">
                                    <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                    <span className="text-gray-800 font-medium text-lg font-body">{benefit}</span>
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={openVarticasProductInNewTab}
                            className="px-8 py-4 bg-black hover:bg-gray-800 text-white rounded-full font-bold text-lg transition-transform hover:-translate-y-1 shadow-xl flex items-center gap-2"
                        >
                            Get Started
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </motion.div>

                    {/* Right Visual Box */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full bg-white p-1 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-200"
                    >
                        <div className="bg-[#f8f9fa] rounded-[2.3rem] p-8 h-full flex flex-col justify-center">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center">
                                    <Sparkles className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <div className="text-black font-black text-xl font-display leading-none">Workflow Builder</div>
                                    <div className="text-gray-500 font-body mt-1">Drag & drop automation</div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { step: "1", label: "New email from client" },
                                    { step: "2", label: "Extract key details with AI" },
                                    { step: "3", label: "Create task in project board" },
                                    { step: "4", label: "Send Slack notification" },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 + i * 0.1 }}
                                        className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-200 shadow-sm"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-black border border-gray-200 flex-shrink-0">
                                            {item.step}
                                        </div>
                                        <span className="text-gray-800 font-medium font-body">{item.label}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

        </section>
    );
}
