import { Check, X, AlertTriangle, Minus } from "lucide-react";

export default function ComparisonTable() {
    return (
        <section className="py-32 px-4 bg-[#07080A]">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-24">
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">Don't settle for manual work.</h2>
                    <p className="text-gray-400">See how Varticas stacks up against the old way.</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="p-6 text-xs text-gray-500 font-mono font-normal border-b border-white/5 uppercase tracking-widest bg-[#07080A]">Feature</th>
                                <th className="p-6 text-xs text-gray-500 font-mono font-normal border-b border-white/5 uppercase tracking-widest text-center bg-[#07080A]">Manual</th>
                                <th className="p-6 text-xs text-gray-500 font-mono font-normal border-b border-white/5 uppercase tracking-widest text-center bg-[#07080A]">Zapier</th>
                                <th className="p-0 border-b border-transparent bg-[#0F1012] rounded-t-xl relative">
                                    <div className="p-6 text-center">
                                        <span className="font-bold text-white text-lg tracking-tight">Varticas</span>
                                        <div className="absolute top-0 left-0 w-full h-0.5 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {[
                                { feature: "Multi-site research", manual: false, zapier: false, varticas: true },
                                { feature: "Visual understanding", manual: true, zapier: false, varticas: true, comingSoon: true },
                                { feature: "Learns from failures", manual: false, zapier: false, varticas: true },
                                { feature: "Works in browser", manual: true, zapier: false, varticas: true },
                                { feature: "No code required", manual: true, zapier: "warn", varticas: true },
                                { feature: "Setup time", manual: "0 min", zapier: "30 min", varticas: "30 sec" },
                            ].map((row, i) => (
                                <tr key={i} className="group">
                                    <td className="p-6 text-gray-400 font-medium text-sm border-b border-white/5">{row.feature}</td>

                                    <td className="p-6 text-center border-b border-white/5">
                                        {typeof row.manual === 'boolean' ? (
                                            row.manual ? <Check className="w-4 h-4 mx-auto text-gray-600" /> : <Minus className="w-4 h-4 mx-auto text-gray-800" />
                                        ) : (
                                            <span className="font-mono text-xs text-gray-500">{row.manual}</span>
                                        )}
                                    </td>

                                    <td className="p-6 text-center border-b border-white/5">
                                        {typeof row.zapier === 'boolean' ? (
                                            row.zapier ? <Check className="w-4 h-4 mx-auto text-gray-600" /> : <Minus className="w-4 h-4 mx-auto text-gray-800" />
                                        ) : row.zapier === 'warn' ? (
                                            <AlertTriangle className="w-4 h-4 mx-auto text-yellow-500/50" />
                                        ) : (
                                            <span className="font-mono text-xs text-gray-500">{row.zapier}</span>
                                        )}
                                    </td>

                                    <td className={`p-6 text-center bg-[#0F1012] border-x border-white/5 ${i === 5 ? 'rounded-b-xl border-b' : ''}`}>
                                        {typeof row.varticas === 'boolean' ? (
                                            <div className="flex flex-col items-center justify-center gap-1">
                                                <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center">
                                                    <Check className="w-3.5 h-3.5 text-green-500" />
                                                </div>
                                                {row.comingSoon && <span className="text-[9px] text-gray-500 font-mono uppercase tracking-wider mt-1">(Soon)</span>}
                                            </div>
                                        ) : (
                                            <span className="font-mono text-green-500 font-bold text-sm">{row.varticas}</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
