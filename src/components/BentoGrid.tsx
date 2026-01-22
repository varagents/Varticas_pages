import { ShoppingCart, Zap, FileText, ArrowUpRight, Search } from "lucide-react";

// Real Logo SVG Components
const GmailLogo = () => (
    <svg viewBox="0 0 24 24" className="w-7 h-7">
        <path fill="#EA4335" d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
    </svg>
);

const GoogleSheetsLogo = () => (
    <svg viewBox="0 0 24 24" className="w-7 h-7">
        <path fill="#0F9D58" d="M14.727 6.727H14V0H4.91c-.905 0-1.637.732-1.637 1.636v20.728c0 .904.732 1.636 1.636 1.636h14.182c.904 0 1.636-.732 1.636-1.636V6.727h-6zM9.273 19.636H6.545v-1.636h2.728v1.636zm0-3.273H6.545V14.73h2.728v1.636zm0-3.272H6.545v-1.636h2.728v1.636zm8.182 6.545h-5.455v-1.636h5.455v1.636zm0-3.273h-5.455V14.73h5.455v1.636zm0-3.272h-5.455v-1.636h5.455v1.636z" />
        <path fill="#263238" fillOpacity=".2" d="M14.727 6.727l6 6V6.727z" />
        <path fill="#F1F1F1" d="M14.727 0v6.727h6z" />
    </svg>
);

const SlackLogo = () => (
    <svg viewBox="0 0 24 24" className="w-7 h-7">
        <path fill="#E01E5A" d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" />
        <path fill="#36C5F0" d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" />
        <path fill="#2EB67D" d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.27 0a2.528 2.528 0 0 1-2.522 2.521 2.528 2.528 0 0 1-2.521-2.521V2.522A2.528 2.528 0 0 1 15.165 0a2.528 2.528 0 0 1 2.521 2.522v6.312z" />
        <path fill="#ECB22E" d="M15.165 18.956a2.528 2.528 0 0 1 2.521 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.521-2.522v-2.522h2.521zm0-1.27a2.527 2.527 0 0 1-2.521-2.522 2.527 2.527 0 0 1 2.521-2.521h6.313A2.528 2.528 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.521h-6.313z" />
    </svg>
);

export default function BentoGrid() {
    return (
        <section id="features" className="relative py-32 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">Built for production.</h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    Experience the speed. Varticas runs locally and connects to your tools instantly.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[30rem]">

                {/* Card 1: Shopping Research (Large) */}
                <div className="group relative col-span-1 md:col-span-2 rounded-2xl border border-white/10 bg-[#141517] overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-2xl">
                    <div className="relative h-full flex flex-col p-8 z-10">
                        <div className="flex items-center justify-between mb-8">
                            <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                                <ShoppingCart className="w-5 h-5 text-gray-300" />
                            </div>
                            <div className="flex items-center gap-2 text-xs font-mono text-gray-400 bg-white/5 px-2 py-1 rounded border border-white/5">
                                <Zap className="w-3 h-3 text-brand-orange" />
                                Saves 2.5h
                            </div>
                        </div>

                        <h3 className="text-2xl font-display font-bold mb-2">Shopping Research</h3>
                        <p className="text-gray-500 mb-8 max-w-md text-sm">Compare 50 products across 5 sites in 2 minutes. Get a structured summary with price comparisons.</p>

                        {/* Interactive Demo UI Placeholder (Clean Table) */}
                        <div className="flex-1 rounded-t-xl border-t border-l border-r border-white/10 bg-[#0A0A0A] p-4 overflow-hidden relative shadow-inner">
                            {/* Header */}
                            <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
                                <Search className="w-4 h-4 text-gray-600" />
                                <span className="text-xs text-gray-500 font-mono">sony wh-1000xm5 vs bose qc45</span>
                            </div>

                            {/* List Items */}
                            <div className="space-y-1">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className={`flex items-center justify-between p-3 rounded-lg border border-transparent hover:bg-white/5 hover:border-white/5 transition-colors cursor-default ${i === 1 && 'bg-white/5 ring-1 ring-brand-red/50'}`}>
                                        <div className="flex items-center gap-3">
                                            <div className="w-6 h-6 rounded bg-white/10" />
                                            <div>
                                                <div className="text-sm text-gray-200 font-medium">Headphones Model X{i}</div>
                                                <div className="text-[10px] text-gray-500">Amazon • BestBuy</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-mono text-white">$29{i}.00</div>
                                            <div className="text-[10px] text-green-500">In Stock</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 2: Form Filling (Tall) */}
                <div className="group relative col-span-1 row-span-1 rounded-2xl border border-white/10 bg-[#141517] overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-2xl">
                    <div className="relative h-full flex flex-col p-8 z-10">
                        <div className="flex items-center justify-between mb-8">
                            <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                                <FileText className="w-5 h-5 text-gray-300" />
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                        </div>

                        <h3 className="text-2xl font-display font-bold mb-2">Auto-Fill</h3>
                        <p className="text-gray-500 text-sm mb-6">Job applications while you sleep. Applied to 23 jobs overnight.</p>

                        {/* Form UI Demo */}
                        <div className="flex-1 relative bg-[#0A0A0A] rounded-xl border border-white/5 p-4">
                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase text-gray-600 font-bold tracking-wider">Name</label>
                                    <div className="h-8 w-full bg-[#141517] rounded border border-white/5 flex items-center px-3 text-sm text-gray-300">
                                        John Doe
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase text-gray-600 font-bold tracking-wider">Role</label>
                                    <div className="h-8 w-full bg-[#141517] rounded border border-white/5 flex items-center px-3 text-sm text-gray-300">
                                        Senior Engineer
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <div className="w-full py-2 bg-brand-red text-white text-xs font-bold rounded text-center opacity-90">
                                        Submit Application
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 3: Workflow Automation with REAL LOGOS */}
                <div className="group relative col-span-1 md:col-span-3 rounded-2xl border border-white/10 bg-[#141517] overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-2xl min-h-[25rem]">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-red/5 via-transparent to-transparent opacity-50" />

                    <div className="relative h-full flex flex-col md:flex-row items-center p-8 z-10 gap-12">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                                    <Zap className="w-5 h-5 text-brand-orange" />
                                </div>
                                <div className="text-brand-orange font-mono text-xs bg-brand-orange/10 px-2 py-1 rounded border border-brand-orange/20">
                                    Zero Clicks
                                </div>
                            </div>
                            <h3 className="text-3xl font-display font-bold mb-2">Workflow Automation</h3>
                            <p className="text-gray-500 max-w-md">Email → Google Sheet → Slack notification. Connect your tools in a visual pipeline.</p>
                        </div>

                        {/* Pipeline Demo with Real Logos */}
                        <div className="flex-1 w-full h-48 bg-[#0A0A0A] rounded-xl border border-white/5 flex items-center justify-center p-8 relative overflow-hidden">
                            {/* Connector Line */}
                            <div className="absolute top-1/2 left-16 right-16 h-[2px] bg-gradient-to-r from-red-500/50 via-green-500/50 to-purple-500/50 -translate-y-1/2" />

                            {/* Animated Data Dot */}
                            <div className="absolute top-1/2 left-16 w-3 h-3 bg-white rounded-full shadow-[0_0_15px_white,0_0_30px_rgba(255,255,255,0.5)] -translate-y-1/2 animate-[dataflow_3s_ease-in-out_infinite]" />

                            {/* Nodes with Real Logos */}
                            <div className="flex items-center justify-between w-full max-w-lg relative z-10">
                                {/* Gmail Node */}
                                <div className="flex flex-col items-center gap-3 group/node">
                                    <div className="w-16 h-16 rounded-xl border border-white/10 bg-[#1A1B1E] flex items-center justify-center shadow-lg group-hover/node:border-red-500/50 group-hover/node:shadow-red-500/20 transition-all duration-300 hover:-translate-y-1">
                                        <GmailLogo />
                                    </div>
                                    <span className="text-xs font-medium text-gray-400 group-hover/node:text-white transition-colors">Gmail</span>
                                </div>

                                {/* Sheets Node */}
                                <div className="flex flex-col items-center gap-3 group/node">
                                    <div className="w-16 h-16 rounded-xl border border-white/10 bg-[#1A1B1E] flex items-center justify-center shadow-lg group-hover/node:border-green-500/50 group-hover/node:shadow-green-500/20 transition-all duration-300 hover:-translate-y-1">
                                        <GoogleSheetsLogo />
                                    </div>
                                    <span className="text-xs font-medium text-gray-400 group-hover/node:text-white transition-colors">Sheets</span>
                                </div>

                                {/* Slack Node */}
                                <div className="flex flex-col items-center gap-3 group/node">
                                    <div className="w-16 h-16 rounded-xl border border-white/10 bg-[#1A1B1E] flex items-center justify-center shadow-lg group-hover/node:border-purple-500/50 group-hover/node:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1">
                                        <SlackLogo />
                                    </div>
                                    <span className="text-xs font-medium text-gray-400 group-hover/node:text-white transition-colors">Slack</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Keyframes for data flow animation */}
                    <style>{`
                        @keyframes dataflow {
                            0% { left: 4rem; opacity: 0; }
                            10% { opacity: 1; }
                            90% { opacity: 1; }
                            100% { left: calc(100% - 4rem); opacity: 0; }
                        }
                    `}</style>
                </div>

            </div>
        </section>
    );
}
