import { Zap } from "lucide-react";

// Same SVG components as before but tweaked for light theme
const GmailLogo = () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8">
        <path fill="#EA4335" d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
    </svg>
);

const GoogleSheetsLogo = () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8">
        <path fill="#0F9D58" d="M14.727 6.727H14V0H4.91c-.905 0-1.637.732-1.637 1.636v20.728c0 .904.732 1.636 1.636 1.636h14.182c.904 0 1.636-.732 1.636-1.636V6.727h-6zM9.273 19.636H6.545v-1.636h2.728v1.636zm0-3.273H6.545V14.73h2.728v1.636zm0-3.272H6.545v-1.636h2.728v1.636zm8.182 6.545h-5.455v-1.636h5.455v1.636zm0-3.273h-5.455V14.73h5.455v1.636zm0-3.272h-5.455v-1.636h5.455v1.636z" />
        <path fill="#263238" fillOpacity=".2" d="M14.727 6.727l6 6V6.727z" />
        <path fill="#F1F1F1" d="M14.727 0v6.727h6z" />
    </svg>
);

const SlackLogo = () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8">
        <path fill="#E01E5A" d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" />
        <path fill="#36C5F0" d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" />
        <path fill="#2EB67D" d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.27 0a2.528 2.528 0 0 1-2.522 2.521 2.528 2.528 0 0 1-2.521-2.521V2.522A2.528 2.528 0 0 1 15.165 0a2.528 2.528 0 0 1 2.521 2.522v6.312z" />
        <path fill="#ECB22E" d="M15.165 18.956a2.528 2.528 0 0 1 2.521 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.521-2.522v-2.522h2.521zm0-1.27a2.527 2.527 0 0 1-2.521-2.522 2.527 2.527 0 0 1 2.521-2.521h6.313A2.528 2.528 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.521h-6.313z" />
    </svg>
);

export default function BentoGrid() {
    return (
        <section className="relative py-20 px-4 max-w-7xl mx-auto bg-[#dfdfdf]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[30rem]">
                {/* Workflow Automation Card */}
                <div className="group relative col-span-1 md:col-span-3 rounded-[3rem] border border-gray-200 bg-white overflow-hidden transition-shadow duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] min-h-[25rem] p-1">
                    <div className="relative h-full flex flex-col md:flex-row items-center bg-[#f8f9fa] rounded-[2.8rem] p-10 z-10 gap-16">

                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-white rounded-2xl shadow-sm border border-gray-200">
                                    <Zap className="w-6 h-6 text-black" />
                                </div>
                                <div className="text-black font-bold font-body text-sm bg-gray-200 px-3 py-1.5 rounded-full border border-gray-300">
                                    Zero Clicks
                                </div>
                            </div>
                            <h3 className="text-4xl md:text-5xl font-display font-black mb-4 text-black tracking-tight leading-none">Workflow<br />Automation</h3>
                            <p className="text-gray-600 max-w-sm text-lg font-body leading-relaxed">
                                Email → Google Sheet → Slack. Connect your tools in a visual pipeline that never breaks.
                            </p>
                        </div>

                        {/* Pipeline Demo (Light Theme Version) */}
                        <div className="flex-1 w-full h-64 bg-white rounded-[2rem] border border-gray-200 shadow-sm flex items-center justify-center p-8 relative overflow-hidden">

                            {/* Connector Line */}
                            <div className="absolute top-1/2 left-20 right-20 h-1 bg-gray-200 -translate-y-1/2 rounded-full" />

                            {/* Data Dot Moving */}
                            <div className="absolute top-1/2 left-20 w-4 h-4 bg-black rounded-full shadow-lg -translate-y-1/2 animate-[dataflow_3s_ease-in-out_infinite]" />

                            {/* Nodes */}
                            <div className="flex items-center justify-between w-full max-w-md relative z-10">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-20 h-20 rounded-[1.5rem] border border-gray-200 bg-white flex items-center justify-center shadow-sm">
                                        <GmailLogo />
                                    </div>
                                    <span className="text-sm font-bold text-gray-500 font-body">Gmail</span>
                                </div>

                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-20 h-20 rounded-[1.5rem] border border-gray-200 bg-white flex items-center justify-center shadow-sm">
                                        <GoogleSheetsLogo />
                                    </div>
                                    <span className="text-sm font-bold text-gray-500 font-body">Sheets</span>
                                </div>

                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-20 h-20 rounded-[1.5rem] border border-gray-200 bg-white flex items-center justify-center shadow-sm">
                                        <SlackLogo />
                                    </div>
                                    <span className="text-sm font-bold text-gray-500 font-body">Slack</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <style>{`
                        @keyframes dataflow {
                            0% { left: 5rem; opacity: 0; }
                            10% { opacity: 1; }
                            90% { opacity: 1; }
                            100% { left: calc(100% - 6rem); opacity: 0; }
                        }
                    `}</style>
                </div>
            </div>
        </section>
    );
}
