import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, ArrowRight, Sparkles, Zap, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const tiers = [
    {
        name: "Starter",
        price: "$0",
        period: "/mo",
        description: "Perfect for individuals exploring agent automation.",
        features: [
            "Limited agent tasks",
            "Limited workflows",
            "Community support",
            "Limited MCP integrations in Swagstore",
        ],
        cta: "Get Started",
        ctaLink: "/login?plan=starter",
        highlighted: false,
        icon: Zap,
        checkColor: "text-gray-600",
        borderClass: "border-white/5 hover:border-white/10",
        bgClass: "bg-[#0F1012]",
        buttonClass:
            "bg-white/5 hover:bg-white/10 text-white border border-white/5",
    },
    {
        name: "Pro",
        price: "$20",
        period: "/mo",
        description: "To unlock more connections and workflows",
        features: [
            "Unlimited agent tasks",
            "50 workflows",
            "Priority support",
            "Early access to new features",
            "All MCP integrations in Swagstore",
        ],
        cta: "Start Free Trial",
        ctaLink: "/login?plan=pro",
        highlighted: true,
        icon: Sparkles,
        checkColor: "text-green-500",
        borderClass: "border-green-500/50",
        bgClass: "bg-[#141517]",
        buttonClass:
            "bg-green-500 hover:bg-green-600 text-white font-bold shadow-lg hover:shadow-green-500/20",
    }
];

const faqs = [
    {
        q: "What happens after I sign up?",
        a: "You'll go through a short onboarding to set up your profile. Once complete, you're ready to start automating with Varticas. When the product fully launches, your premium access will be activated automatically.",
    },
    {
        q: "Can I switch plans later?",
        a: "Absolutely. You can upgrade, downgrade, or cancel your plan at any time from your dashboard.",
    },
    {
        q: "Is my data safe?",
        a: "Yes. We use enterprise-grade encryption and comply with GDPR and SOC-2 standards. Your data is never shared with third parties.",
    },
    {
        q: "Do you offer refunds?",
        a: "We offer a 14-day money-back guarantee for all paid plans. No questions asked.",
    },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-[#07080A] text-white overflow-x-hidden selection:bg-brand-red selection:text-white">
            <Navbar />

            {/* Hero */}
            <section className="pt-36 pb-16 px-4 relative">
                {/* Background glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-green-500/5 blur-[150px] rounded-full pointer-events-none" />

                <motion.div
                    className="max-w-4xl mx-auto text-center relative z-10"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 backdrop-blur-md mb-8">
                        <Sparkles className="w-3.5 h-3.5 text-green-500" />
                        <span className="text-sm font-semibold text-green-400">
                            Early Adopter Pricing
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6">
                        Simple pricing.
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
                            Serious power.
                        </span>
                    </h1>

                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Start for free, scale when you need to. Lock in early adopter rates
                        before our public launch.
                    </p>
                </motion.div>
            </section>

            {/* Pricing Cards */}
            <section className="pb-32 px-4 relative">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {tiers.map((tier, i) => (
                        <motion.div
                            key={tier.name}
                            variants={item}
                            className={`relative p-8 rounded-2xl border ${tier.borderClass} ${tier.bgClass} flex flex-col transition-all duration-300 hover:translate-y-[-4px] ${tier.highlighted
                                ? "shadow-[0_0_40px_-10px_rgba(34,197,94,0.25)] md:-translate-y-4"
                                : ""
                                }`}
                        >


                            <div className="flex items-center gap-3 mb-4">
                                <div
                                    className={`p-2 rounded-lg ${tier.highlighted
                                        ? "bg-green-500/10 border border-green-500/20"
                                        : "bg-white/5 border border-white/5"
                                        }`}
                                >
                                    <tier.icon
                                        className={`w-5 h-5 ${tier.highlighted ? "text-green-500" : "text-gray-400"
                                            }`}
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                            </div>

                            <div className="mb-6 flex items-baseline gap-1">
                                <span className="text-4xl font-bold text-white">
                                    {tier.price}
                                </span>
                                {tier.period && (
                                    <span className="text-gray-500 text-sm">{tier.period}</span>
                                )}
                            </div>

                            <p
                                className={`${tier.highlighted ? "text-gray-300" : "text-gray-400"
                                    } mb-8 text-sm leading-relaxed`}
                            >
                                {tier.description}
                            </p>

                            <div
                                className={`space-y-4 text-sm ${tier.highlighted ? "text-gray-300" : "text-gray-400"
                                    } mb-8 flex-1`}
                            >
                                {tier.features.map((feature) => (
                                    <div key={feature} className="flex gap-3 items-start">
                                        <Check
                                            className={`w-4 h-4 mt-0.5 shrink-0 ${tier.checkColor}`}
                                        />
                                        {feature}
                                    </div>
                                ))}
                            </div>

                            <Link
                                to={tier.ctaLink}
                                className={`w-full py-3 rounded-lg font-medium text-sm transition-all text-center block ${tier.buttonClass}`}
                            >
                                {tier.cta}
                                {tier.highlighted && (
                                    <ArrowRight className="w-4 h-4 inline ml-2" />
                                )}
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Feature Comparison */}
            <section className="py-20 px-4 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <motion.h2
                        className="text-3xl md:text-4xl font-display font-bold text-center mb-16"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        Compare plans
                    </motion.h2>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/5">
                                    <th className="text-left py-4 pr-8 text-gray-400 font-medium">
                                        Feature
                                    </th>
                                    <th className="text-center py-4 px-4 text-gray-400 font-medium">
                                        Starter
                                    </th>
                                    <th className="text-center py-4 px-4 text-green-400 font-medium">
                                        Pro
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-400">
                                {[
                                    ["Agent tasks", "Limited", "Unlimited"],
                                    ["Workflows", "Limited", "50"],
                                    ["MCP Integrations", "Limited", "Unlimited"],
                                    ["Support", "Community", "Priority"],
                                    ["Early access", "—", "✓"]
                                ].map(([feature, starter, pro]) => (
                                    <tr key={feature} className="border-b border-white/5">
                                        <td className="py-4 pr-8 text-white font-medium">
                                            {feature}
                                        </td>
                                        <td className="text-center py-4 px-4">{starter}</td>
                                        <td className="text-center py-4 px-4 text-green-400">
                                            {pro}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 px-4 border-t border-white/5">
                <div className="max-w-3xl mx-auto">
                    <motion.h2
                        className="text-3xl md:text-4xl font-display font-bold text-center mb-16"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        Frequently asked questions
                    </motion.h2>

                    <div className="space-y-6">
                        {faqs.map((faq) => (
                            <motion.div
                                key={faq.q}
                                className="p-6 rounded-2xl bg-[#0F1012] border border-white/5 hover:border-white/10 transition-colors"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h3 className="text-white font-bold mb-2">{faq.q}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {faq.a}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-24 px-4 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 blur-[120px] rounded-full pointer-events-none" />

                <motion.div
                    className="max-w-3xl mx-auto text-center relative z-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                        Ready to automate?
                    </h2>
                    <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
                        Join thousands of early adopters and lock in your pricing before our
                        public launch.
                    </p>
                    <Link
                        to="/login?plan=pro"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-green-500/20"
                    >
                        Get Started Now
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </motion.div>
            </section>

            <Footer />
        </div>
    );
}
