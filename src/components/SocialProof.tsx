import { useRef, useState, useEffect } from "react";
import { ShoppingCart, FileText, TrendingUp, Search, Mail, Database, Sparkles } from "lucide-react";

export default function SocialProof() {

    const useCases = [
        {
            icon: ShoppingCart,
            title: "Product Research",
            description: "Compare prices across 50+ e-commerce sites in seconds. Find the best deals, track price history, and get instant alerts.",
            user: "Sarah Kim",
            role: "E-commerce Manager",
            color: "text-blue-400",
            bgColor: "bg-blue-500/10"
        },
        {
            icon: FileText,
            title: "Lead Generation",
            description: "Automatically scrape LinkedIn profiles, company websites, and databases. Build qualified lead lists while you sleep.",
            user: "Marcus Johnson",
            role: "Sales Director",
            color: "text-green-400",
            bgColor: "bg-green-500/10"
        },
        {
            icon: TrendingUp,
            title: "Market Analysis",
            description: "Monitor competitor pricing, track industry news, and aggregate market data from multiple sources automatically.",
            user: "Emily Zhang",
            role: "Business Analyst",
            color: "text-purple-400",
            bgColor: "bg-purple-500/10"
        }
    ];

    return (
        <section id="use-cases" className="py-32 relative overflow-hidden bg-[#07080A]">

            {/* Use Cases */}
            <div className="max-w-7xl mx-auto px-4 mb-24">
                <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-6 tracking-tight">Built for every workflow.</h2>
                <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">From research to automation, Varticas handles the repetitive work so you can focus on what matters.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {useCases.map((useCase, i) => (
                        <div key={i} className="p-8 rounded-2xl bg-[#0F1012] border border-white/10 relative group hover:border-white/20 transition-colors flex flex-col">
                            {/* Icon */}
                            <div className={`w-12 h-12 rounded-xl ${useCase.bgColor} border border-white/5 flex items-center justify-center mb-6`}>
                                <useCase.icon className={`w-6 h-6 ${useCase.color}`} />
                            </div>

                            {/* Use Case Title */}
                            <h3 className="text-xl font-bold text-white mb-3">{useCase.title}</h3>

                            {/* Description */}
                            <p className="text-gray-400 mb-6 leading-relaxed text-sm flex-1">
                                {useCase.description}
                            </p>

                            {/* User */}
                            <div className="flex items-center gap-3 pt-6 border-t border-white/5">
                                <div className="w-8 h-8 rounded-full bg-white/10 border border-white/5" />
                                <div>
                                    <div className="font-medium text-white text-sm">{useCase.user}</div>
                                    <div className="text-xs text-gray-500">{useCase.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Improving Agent Badge */}
            <div className="flex justify-center mb-20">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-white/[0.02]">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="font-mono text-xs text-gray-400">
                        Improving agent everyday
                    </span>
                </div>
            </div>

            {/* Coming Soon Marquee - Same style as before with company names */}
            <div className="relative flex flex-col gap-8 opacity-30 hover:opacity-50 transition-all duration-700">
                <div className="flex overflow-hidden gap-24 mask-gradient-x justify-center">
                    <div className="font-display text-2xl font-bold text-brand-orange tracking-widest flex gap-24 items-center animate-pulse">
                        <span className="flex items-center gap-3"><Sparkles className="w-5 h-5" /> COMING SOON</span>
                        <span className="flex items-center gap-3"><Sparkles className="w-5 h-5" /> COMING SOON</span>
                        <span className="flex items-center gap-3"><Sparkles className="w-5 h-5" /> COMING SOON</span>
                        <span className="flex items-center gap-3"><Sparkles className="w-5 h-5" /> COMING SOON</span>
                        <span className="flex items-center gap-3"><Sparkles className="w-5 h-5" /> COMING SOON</span>
                        <span className="flex items-center gap-3"><Sparkles className="w-5 h-5" /> COMING SOON</span>
                        <span className="flex items-center gap-3"><Sparkles className="w-5 h-5" /> COMING SOON</span>
                        <span className="flex items-center gap-3"><Sparkles className="w-5 h-5" /> COMING SOON</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
