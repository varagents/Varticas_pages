import { Check } from "lucide-react";

export default function Pricing() {
    return (
        <section id="pricing" className="py-32 px-4 relative bg-[#07080A]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-24">
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">Simple pricing.</h2>
                    <p className="text-xl text-gray-400">Start for free. Scale when you need to.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {/* Free Tier */}
                    <div className="p-8 rounded-2xl border border-white/5 bg-[#0F1012] hover:border-white/10 transition-colors flex flex-col">
                        <h3 className="text-xl font-bold mb-2 text-white">Starter</h3>
                        <div className="mb-6"><span className="text-3xl font-bold text-white">$0</span><span className="text-gray-500 text-sm">/mo</span></div>
                        <p className="text-gray-400 mb-8 text-sm leading-relaxed">Perfect for individuals exploring agent automation.</p>

                        <div className="space-y-4 text-sm text-gray-400 mb-8 flex-1">
                            <div className="flex gap-3"><Check className="w-4 h-4 text-gray-600" /> 10 agent tasks/month</div>
                            <div className="flex gap-3"><Check className="w-4 h-4 text-gray-600" /> 3 workflows</div>
                            <div className="flex gap-3"><Check className="w-4 h-4 text-gray-600" /> Community support</div>
                        </div>

                        <button className="w-full py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium text-sm transition-colors border border-white/5">Get Started</button>
                    </div>

                    {/* Pro Tier */}
                    <div className="relative p-8 rounded-2xl border border-green-500/50 bg-[#141517] shadow-[0_0_30px_-10px_rgba(34,197,94,0.2)] flex flex-col transform md:-translate-y-4">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] font-bold px-3 py-0.5 rounded-full tracking-wider uppercase">Most Popular</div>

                        <h3 className="text-xl font-bold mb-2 text-white">Pro</h3>
                        <div className="mb-6 flex items-baseline gap-1">
                            <span className="text-3xl font-bold text-white">$19</span>
                            <span className="text-gray-500 text-sm">/mo</span>
                        </div>
                        <p className="text-gray-300 mb-8 text-sm leading-relaxed">For power users who need serious automation bandwidth.</p>

                        <div className="space-y-4 text-sm text-gray-300 mb-8 flex-1">
                            <div className="flex gap-3"><Check className="w-4 h-4 text-green-500" /> Unlimited agent tasks</div>
                            <div className="flex gap-3"><Check className="w-4 h-4 text-green-500" /> 50 workflows</div>
                            <div className="flex gap-3"><Check className="w-4 h-4 text-green-500" /> Priority support</div>
                            <div className="flex gap-3"><Check className="w-4 h-4 text-green-500" /> Early access</div>
                        </div>

                        <button className="w-full py-2.5 rounded-lg bg-green-500 hover:bg-green-600 text-white font-bold text-sm transition-all shadow-lg hover:shadow-green-500/20">Start Free Trial</button>
                    </div>

                    {/* Enterprise Tier */}
                    <div className="p-8 rounded-2xl border border-white/5 bg-[#0F1012] hover:border-white/10 transition-colors flex flex-col">
                        <h3 className="text-xl font-bold mb-2 text-white">Team</h3>
                        <div className="mb-6"><span className="text-3xl font-bold text-white">Custom</span></div>
                        <p className="text-gray-400 mb-8 text-sm leading-relaxed">For organizations requiring security and control.</p>

                        <div className="space-y-4 text-sm text-gray-400 mb-8 flex-1">
                            <div className="flex gap-3"><Check className="w-4 h-4 text-gray-600" /> SSO & Audit Logs</div>
                            <div className="flex gap-3"><Check className="w-4 h-4 text-gray-600" /> Custom Integrations</div>
                            <div className="flex gap-3"><Check className="w-4 h-4 text-gray-600" /> Dedicated Success Mgr</div>
                        </div>

                        <button className="w-full py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium text-sm transition-colors border border-white/5">Contact Sales</button>
                    </div>
                </div>
            </div>
        </section>
    );
}
