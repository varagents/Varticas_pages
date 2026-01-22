import { Shield, Lock, Eye, Server, Database, CheckCircle } from "lucide-react";

export default function Architecture() {
    return (
        <section className="relative py-32 px-4 bg-[#07080A] overflow-hidden">
            {/* Grid Pattern Background - Subtle */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-20">
                    <h2 className="text-xs font-mono text-brand-red mb-4 tracking-wider uppercase flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
                        Security First
                    </h2>
                    <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 tracking-tight">Your data stays yours.</h3>
                    <p className="text-gray-400 max-w-xl text-lg">We never store, access, or sell your data. Everything runs locally on your device.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Security Shield Visualization */}
                    <div className="relative aspect-square md:aspect-video lg:aspect-square bg-[#0F1012] rounded-2xl border border-white/10 p-8 flex items-center justify-center overflow-hidden shadow-2xl">
                        {/* Central Shield */}
                        <div className="relative z-10 flex flex-col items-center">
                            {/* Animated Shield Icon */}
                            <div className="relative">
                                <div className="absolute inset-0 bg-brand-red/20 blur-[60px] rounded-full animate-pulse" />
                                <div className="relative w-32 h-32 rounded-2xl bg-gradient-to-br from-brand-red/20 to-brand-orange/10 border border-brand-red/30 flex items-center justify-center shadow-2xl">
                                    <Shield className="w-16 h-16 text-brand-red" />
                                </div>
                            </div>

                            {/* Security Labels orbiting */}
                            <div className="absolute inset-0 w-full h-full">
                                {/* Top Label */}
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#1A1B1E] rounded-lg border border-white/10 flex items-center gap-2 animate-float">
                                    <Lock className="w-3 h-3 text-green-500" />
                                    <span className="text-[10px] font-mono text-gray-400">End-to-End Encrypted</span>
                                </div>

                                {/* Left Label */}
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#1A1B1E] rounded-lg border border-white/10 flex items-center gap-2 animate-float [animation-delay:0.5s]">
                                    <Eye className="w-3 h-3 text-brand-orange" />
                                    <span className="text-[10px] font-mono text-gray-400">No Tracking</span>
                                </div>

                                {/* Right Label */}
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#1A1B1E] rounded-lg border border-white/10 flex items-center gap-2 animate-float [animation-delay:1s]">
                                    <Server className="w-3 h-3 text-blue-500" />
                                    <span className="text-[10px] font-mono text-gray-400">Local First</span>
                                </div>

                                {/* Bottom Label */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#1A1B1E] rounded-lg border border-white/10 flex items-center gap-2 animate-float [animation-delay:1.5s]">
                                    <Database className="w-3 h-3 text-purple-500" />
                                    <span className="text-[10px] font-mono text-gray-400">Zero Data Storage</span>
                                </div>
                            </div>
                        </div>

                        {/* Connecting Lines */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                            <line x1="50%" y1="20%" x2="50%" y2="35%" stroke="#FF6363" strokeWidth="1" strokeDasharray="4 4" />
                            <line x1="20%" y1="50%" x2="35%" y2="50%" stroke="#FF6363" strokeWidth="1" strokeDasharray="4 4" />
                            <line x1="65%" y1="50%" x2="80%" y2="50%" stroke="#FF6363" strokeWidth="1" strokeDasharray="4 4" />
                            <line x1="50%" y1="65%" x2="50%" y2="80%" stroke="#FF6363" strokeWidth="1" strokeDasharray="4 4" />
                        </svg>
                    </div>

                    {/* Right: Security Features */}
                    <div className="space-y-10">
                        {/* Feature 1 */}
                        <div className="group">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="w-10 h-10 rounded-xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center">
                                    <Database className="w-5 h-5 text-brand-red" />
                                </div>
                                <h4 className="text-xl font-bold text-white">Zero Data Retention</h4>
                            </div>
                            <p className="text-gray-400 leading-relaxed pl-14">We <span className="text-white font-semibold">never store</span> your browsing data, credentials, or personal information. All processing happens locally on your machine.</p>
                        </div>

                        {/* Feature 2 */}
                        <div className="group">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                                    <Lock className="w-5 h-5 text-green-500" />
                                </div>
                                <h4 className="text-xl font-bold text-white">End-to-End Encryption</h4>
                            </div>
                            <p className="text-gray-400 leading-relaxed pl-14">All communications are encrypted with <span className="text-white font-semibold">AES-256</span>. Your data never leaves your device unprotected.</p>
                        </div>

                        {/* Feature 3 */}
                        <div className="group">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="w-10 h-10 rounded-xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center">
                                    <Eye className="w-5 h-5 text-brand-orange" />
                                </div>
                                <h4 className="text-xl font-bold text-white">No Tracking or Analytics</h4>
                            </div>
                            <p className="text-gray-400 leading-relaxed pl-14">We don't use cookies, tracking pixels, or any analytics that monitor your behavior. <span className="text-white font-semibold">Your privacy is absolute.</span></p>
                        </div>


                    </div>
                </div>
            </div>
        </section>
    );
}
