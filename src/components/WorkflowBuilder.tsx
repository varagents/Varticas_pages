import { ArrowRight, Share2, Plus } from "lucide-react";

// Real Logo Components (SVGs)
const GoogleSheetsLogo = () => (
    <svg viewBox="0 0 87 87" fill="none" className="w-6 h-6">
        <path d="M58.5 0H13.5C6.075 0 0 6.075 0 13.5V73.5C0 80.925 6.075 87 13.5 87H73.5C80.925 87 87 80.925 87 73.5V28.5L58.5 0Z" fill="#0F9D58" />
        <path d="M58.5 0V28.5H87L58.5 0Z" fill="#34A853" />
        <path d="M63 45H24V54H63V45Z" fill="#F1F1F1" />
        <path d="M63 60H24V69H63V60Z" fill="#F1F1F1" />
        <path d="M24 30H48V39H24V30Z" fill="#F1F1F1" />
    </svg>
);

const OpenAIWhiteLogo = () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white">
        <path fill="currentColor" d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729ZM12.72 2.2274a4.5707 4.5707 0 0 1 1.7063.266 5.1098 5.1098 0 0 1 2.3653 2.1157l-1.0772.6373A3.674 3.674 0 0 0 12.72 3.4907v-1.2633Zm-1.8907.41a4.566 4.566 0 0 1 1.7615-1.1245 5.1325 5.1325 0 0 1 1.1396-.129l.0287 1.2536a3.6881 3.6881 0 0 0-1.8596.5398l-1.0702-.5399ZM3.3444 8.7617a4.5516 4.5516 0 0 1 .4969-1.9212A5.1373 5.1373 0 0 1 5.9757 4.793l.5303 1.144a3.7121 3.7121 0 0 0-2.0924 2.8247H3.3444Zm3.6067 11.0805a4.5564 4.5564 0 0 1-1.7663-1.1244 5.142 5.142 0 0 1-1.1396-2.5026l1.251-.0288a3.7025 3.7025 0 0 0 1.8595 2.1584l-.2046 1.4974Zm11.857-1.146a5.1325 5.1325 0 0 1-2.1264 2.053l-.5304-1.146a3.7169 3.7169 0 0 0 2.0925-2.827h1.0772a4.542 4.542 0 0 1-.5129 1.92ZM18.892 5.5677a4.5432 4.5432 0 0 1 .5216 1.9164h-1.0773a3.693 3.693 0 0 0-2.102-2.8126l.5352-1.1462a5.1373 5.1373 0 0 1 2.1225 2.0424Zm-7.6166 12.9238v1.2633a4.5694 4.5694 0 0 1-1.7015-.2629 5.1194 5.1194 0 0 1-2.37-2.1156l1.0772-.6374a3.6881 3.6881 0 0 0 2.9943 1.7526Z" />
    </svg>
);

const GmailLogo = () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6Z" fill="#EA4335" stroke="#EA4335" strokeWidth="2" strokeLinejoin="round" />
        <path d="M2 6L12 13L22 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default function WorkflowBuilder() {
    return (
        <section className="py-24 px-4 bg-[#07080A] relative overflow-hidden text-center">
            {/* Background Beam Animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                <div className="beam right-1/3 top-0 h-[100vh] w-[1px] bg-gradient-to-b from-transparent via-brand-red/20 to-transparent blur-[2px]" style={{ animationDuration: '7s' }} />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-20">
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">The missing operating system for your data.</h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
                        Connect any API, database, or agent. Build workflows visually.
                    </p>
                </div>

                {/* Integration Matrix / Workflow Builder Visualization */}
                <div className="bg-[#0F1012] border border-white/10 rounded-2xl p-8 md:p-12 mb-20 relative overflow-hidden shadow-2xl">

                    {/* Toolbar mockup */}
                    <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-6">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#333]" />
                            <div className="w-3 h-3 rounded-full bg-[#333]" />
                            <div className="w-3 h-3 rounded-full bg-[#333]" />
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                            Workflow_v1.json
                        </div>
                        <div className="w-4" /> {/* Spacer */}
                    </div>

                    {/* Canvas Area */}
                    <div className="relative min-h-[400px] flex items-center justify-center">
                        {/* Dotted Grid */}
                        <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] bg-[size:20px_20px]" />

                        {/* Nodes Container */}
                        <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">

                            {/* Node 1: Input Source */}
                            <div className="w-48 bg-[#1A1B1E] rounded-xl border border-white/5 shadow-xl p-4 flex flex-col items-center gap-4 group hover:border-white/20 transition-all cursor-move hover:scale-105 hover:bg-[#1f2023]">
                                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center border border-white/5">
                                    <GoogleSheetsLogo />
                                </div>
                                <div className="text-center">
                                    <div className="text-sm font-bold text-gray-200">Google Sheets</div>
                                    <div className="text-[10px] text-gray-500 font-mono mt-1">New Row Added</div>
                                </div>
                            </div>

                            {/* Connection Line with Pulse */}
                            <div className="hidden md:block w-24 h-[1px] bg-white/10 relative">
                                <div className="absolute inset-0 bg-brand-red w-full animate-[shimmer_2s_infinite] opacity-50" />
                            </div>

                            {/* Node 2: Logic/Agent */}
                            <div className="w-48 bg-[#1A1B1E] rounded-xl border border-white/5 shadow-xl p-4 flex flex-col items-center gap-4 group hover:border-brand-red/50 transition-all cursor-move hover:scale-105 hover:bg-[#1f2023]">
                                <div className="w-12 h-12 rounded-lg bg-brand-red/10 flex items-center justify-center border border-brand-red/20 shadow-[0_0_15px_rgba(255,99,99,0.2)]">
                                    <OpenAIWhiteLogo />
                                </div>
                                <div className="text-center">
                                    <div className="text-sm font-bold text-gray-200">Enrich Company</div>
                                    <div className="text-[10px] text-gray-500 font-mono mt-1">GPT-4 Agent</div>
                                </div>
                            </div>

                            {/* Connection Line */}
                            <div className="hidden md:block w-24 h-[1px] bg-white/10 relative">
                                <div className="absolute inset-0 bg-brand-orange w-full animate-[shimmer_2s_infinite] opacity-50 delay-100" />
                            </div>

                            {/* Node 3: Output/Action */}
                            <div className="w-48 bg-[#1A1B1E] rounded-xl border border-white/5 shadow-xl p-4 flex flex-col items-center gap-4 group hover:border-red-500/50 transition-all cursor-move hover:scale-105 hover:bg-[#1f2023]">
                                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center border border-white/5">
                                    <GmailLogo />
                                </div>
                                <div className="text-center">
                                    <div className="text-sm font-bold text-gray-200">Gmail</div>
                                    <div className="text-[10px] text-gray-500 font-mono mt-1">Send Email</div>
                                </div>
                            </div>
                        </div>

                        {/* Floating "No Code" Badge */}
                        <div className="absolute bottom-4 right-4 bg-white/5 border border-white/10 text-gray-400 px-3 py-1 rounded text-xs font-mono">
                            NO CODE REQUIRED
                        </div>
                    </div>
                </div>

                {/* Real World Scenarios */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { title: "Sales Team", steps: ["CRM Update", "Generate Report", "Email Manager"] },
                        { title: "Designers", steps: ["Blender Render", "Upload to Drive", "Notify Client"] },
                        { title: "Researchers", steps: ["Daily News Scan", "Summarize", "Post to Slack"] },
                    ].map((card, i) => (
                        <div key={i} className="p-6 rounded-xl bg-[#0F1012] border border-white/5 hover:border-white/10 transition-colors text-left group">
                            <div className="flex items-center gap-3 mb-4">
                                <h4 className="font-semibold text-gray-200">{card.title}</h4>
                            </div>
                            <div className="space-y-3 relative pl-4 border-l border-white/5">
                                {card.steps.map((step, j) => (
                                    <div key={j} className="text-sm text-gray-500 group-hover:text-gray-400 font-mono flex items-center gap-2">
                                        <span className="w-1 h-1 bg-gray-700 rounded-full" /> {step}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
