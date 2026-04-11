import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, ArrowRight, Sparkles, Zap, Shield, Users, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { openProductCta, VARTICAS_PRODUCT_URL } from "@/lib/productUrl";

const tiers = [
    {
        name: "Starter",
        price: "₹0",
        period: "/mo",
        description: "Perfect for individuals exploring agent automation.",
        features: [
            "Limited usage",
            "50 daily requests",
            "Limited MCP connections",
            "Limited agent tasks",
            "Limited workflows",
            "Community support",
        ],
        cta: "Get Started",
        ctaLink: VARTICAS_PRODUCT_URL,
        highlighted: false,
        icon: Zap,
        checkColor: "text-gray-400",
        borderClass: "border-black/5 hover:border-black/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
        bgClass: "bg-white",
        buttonClass:
            "bg-[#f5f5f5] hover:bg-[#e5e5e5] text-black border border-black/5",
    },
    {
        name: "Pro",
        price: "₹999",
        period: "/mo",
        description: "To unlock more connections and workflows",
        features: [
            "20x more usage",
            "200 daily requests",
            "Unlimited MCP connections",
            "Unlimited agent tasks",
            "Unlimited workflows",
            "Priority support",
        ],
        cta: "Upgrade to Pro",
        ctaLink: "/login?plan=pro",
        highlighted: true,
        icon: Sparkles,
        checkColor: "text-green-500",
        borderClass: "border-green-500/20 shadow-[0_8px_30px_rgb(0,0,0,0.08)]",
        bgClass: "bg-white",
        buttonClass:
            "bg-black hover:bg-gray-900 text-white font-bold shadow-lg",
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "",
        description: "For organizations requiring maximum scale.",
        features: [
            "Custom usage allocation",
            "Custom daily requests",
            "Unlimited MCP connections",
            "Unlimited agent tasks",
            "Unlimited workflows",
            "Instant priority support",
        ],
        cta: "Contact Us",
        ctaLink: "mailto:soumyajit@varticas.com",
        highlighted: false,
        icon: Shield,
        checkColor: "text-yellow-500",
        borderClass: "border-black/5 hover:border-yellow-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
        bgClass: "bg-[#fafafa]",
        buttonClass:
            "bg-black hover:bg-gray-900 text-white font-bold",
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
    const { user, session } = useAuth();
    const navigate = useNavigate();
    const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
    const [currentPlan, setCurrentPlan] = useState<string | null>(null);
    const [planLoading, setPlanLoading] = useState(true);

    useEffect(() => {
        const fetchPlan = async () => {
            if (!user) {
                setPlanLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from("user_plans")
                .select("plan, pro_until")
                .eq("user_id", user.id)
                .single();

            if (!error && data) {
                // Check expiry
                if (
                    data.plan === "pro" &&
                    data.pro_until &&
                    new Date(data.pro_until) > new Date()
                ) {
                    setCurrentPlan("pro");
                } else {
                    setCurrentPlan("free");
                }
            } else {
                setCurrentPlan("free");
            }

            setPlanLoading(false);
        };

        fetchPlan();
    }, [user]);

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            if (window.Razorpay) {
                resolve(true);
                return;
            }
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleProUpgrade = async () => {
        if (!user || !session) {
            openProductCta(false);
            return;
        }

        setLoadingPlan("Pro");
        try {
            const isLoaded = await loadRazorpayScript();
            if (!isLoaded) {
                toast.error("Failed to load Razorpay. Please check your connection.");
                return;
            }

            // 1. Create Order
            const createOrderRes = await fetch(
                `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/payments/create-order`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${session.access_token}`,
                    },
                    body: JSON.stringify({
                        user_id: user.id,
                        amount: 999 * 100, // ₹999
                    }),
                }
            );

            const orderData = await createOrderRes.json();
            if (!createOrderRes.ok) throw new Error(orderData.error || "Failed to create order");

            // 2. Open Razorpay Checkout
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: 999 * 100,
                currency: "INR",
                name: "Varticas",
                description: "Upgrade to Pro",
                order_id: orderData.order_id,
                prefill: {
                    name: user.user_metadata?.full_name || "Varticas User",
                    email: user.email,
                },
                theme: {
                    color: "#22c55e",
                },
                handler: async function (response: any) {
                    try {
                        const verifyRes = await fetch(
                            `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/payments/verify-payment`,
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${session.access_token}`,
                                },
                                body: JSON.stringify({
                                    razorpay_payment_id: response.razorpay_payment_id,
                                    razorpay_order_id: response.razorpay_order_id,
                                    razorpay_signature: response.razorpay_signature,
                                }),
                            }
                        );

                        const verifyData = await verifyRes.json();
                        if (!verifyRes.ok) throw new Error(verifyData.error || "Payment verification failed");

                        toast.success("Your membership has been upgraded to Pro 🎉");
                        navigate("/dashboard");
                    } catch (error: any) {
                        toast.error(error.message || "Payment verification failed");
                    }
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.on("payment.failed", function (response: any) {
                toast.error(response.error.description || "Payment failed");
            });
            rzp.open();

        } catch (error: any) {
            toast.error(error.message || "Something went wrong. Please try again.");
        } finally {
            setLoadingPlan(null);
        }
    };

    // ...existing code...
    return (
        <div className="min-h-screen bg-[#dfdfdf] text-black overflow-x-hidden selection:bg-black selection:text-white">
            <Navbar />

            {/* Hero */}
            <section className="pt-36 pb-16 px-4 relative">
                {/* Background glow removed for light theme cleanup */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/40 blur-[150px] rounded-full pointer-events-none" />

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

                    <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6 text-black">
                        Simple pricing.
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-400">
                            Serious power.
                        </span>
                    </h1>

                    <p className="text-xl text-gray-600 font-body max-w-2xl mx-auto leading-relaxed">
                        Start for free, scale when you need to. Lock in early adopter rates
                        before our public launch.
                    </p>
                </motion.div>
            </section>

            {/* Pricing Cards */}
            <section className="pb-32 px-4 relative">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {tiers.map((tier, i) => (
                        <motion.div
                            key={tier.name}
                            variants={item}
                            className={`relative p-8 rounded-2xl border ${tier.borderClass} ${tier.bgClass} flex h-full min-h-0 flex-col transition-all duration-300 hover:translate-y-[-4px] ${tier.highlighted
                                ? "shadow-[0_0_40px_-10px_rgba(34,197,94,0.25)] md:-translate-y-4"
                                : ""
                                }`}
                        >


                            <div className="flex items-center gap-3 mb-4">
                                <div
                                    className={`p-3 rounded-xl ${tier.highlighted
                                        ? "bg-green-50 border border-green-200"
                                        : "bg-[#f5f5f5] border border-black/5"
                                        }`}
                                >
                                    <tier.icon
                                        className={`w-5 h-5 ${tier.highlighted ? "text-green-600" : "text-gray-500"
                                            }`}
                                    />
                                </div>
                                <h3 className="text-xl font-bold font-display text-black">{tier.name}</h3>
                            </div>

                            <div className="mb-6 flex items-baseline gap-1">
                                <span className="text-4xl font-bold text-black font-display">
                                    {tier.price}
                                </span>
                                {tier.period && (
                                    <span className="text-gray-500 text-sm font-body">{tier.period}</span>
                                )}
                            </div>

                            <p
                                className={`${tier.highlighted ? "text-gray-600" : "text-gray-500"
                                    } mb-6 min-h-[3rem] text-sm leading-relaxed font-body md:min-h-[3.25rem]`}
                            >
                                {tier.description}
                            </p>

                            <div
                                className={`min-h-0 flex-1 space-y-4 text-sm ${tier.highlighted ? "text-gray-700" : "text-gray-600"
                                    } font-body`}
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

                            <div className="mt-auto w-full shrink-0 pt-6">
                            {tier.name === "Pro" ? (
                                currentPlan === "pro" ? (
                                    <button
                                        disabled
                                        className="w-full py-3 rounded-xl font-medium font-body text-sm transition-all text-center block bg-gray-100 text-gray-400 cursor-not-allowed border border-black/5"
                                    >
                                        Pro Mode 🎉
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleProUpgrade}
                                        disabled={loadingPlan === tier.name || planLoading}
                                        className={`w-full py-3 rounded-xl font-medium font-body text-sm transition-all text-center flex items-center justify-center ${tier.buttonClass}`}
                                    >
                                        {loadingPlan === tier.name ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <>
                                                {tier.cta}
                                                {tier.highlighted && (
                                                    <ArrowRight className="w-4 h-4 inline ml-2" />
                                                )}
                                            </>
                                        )}
                                    </button>
                                )
                            ) : tier.name === "Starter" ? (
                                currentPlan === "free" ? (
                                    <button
                                        disabled
                                        className="w-full py-3 rounded-xl font-medium font-body text-sm transition-all text-center block bg-gray-100 text-gray-400 cursor-not-allowed border border-black/5"
                                    >
                                        Free Mode
                                    </button>
                                ) : currentPlan === "pro" ? (
                                    <button
                                        disabled
                                        className="w-full py-3 rounded-xl text-xs font-body transition-all text-center block bg-transparent text-gray-400 cursor-default"
                                    >
                                        Currently on Pro
                                    </button>
                                ) : user ? (
                                    <button
                                        type="button"
                                        onClick={() => openProductCta(true)}
                                        className={`w-full py-3 rounded-lg font-medium text-sm transition-all text-center block ${tier.buttonClass}`}
                                    >
                                        {tier.cta}
                                        {tier.highlighted && (
                                            <ArrowRight className="w-4 h-4 inline ml-2" />
                                        )}
                                    </button>
                                ) : (
                                    <a
                                        href={tier.ctaLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-full py-3 rounded-lg font-medium text-sm transition-all text-center block ${tier.buttonClass}`}
                                    >
                                        {tier.cta}
                                        {tier.highlighted && (
                                            <ArrowRight className="w-4 h-4 inline ml-2" />
                                        )}
                                    </a>
                                )
                            ) : (
                                <a
                                    href={tier.ctaLink}
                                    className={`w-full py-3 rounded-lg font-medium text-sm transition-all text-center block ${tier.buttonClass}`}
                                >
                                    {tier.cta}
                                    {tier.highlighted && (
                                        <ArrowRight className="w-4 h-4 inline ml-2" />
                                    )}
                                </a>
                            )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Explore Button */}
                <div className="mt-16 text-center w-full flex justify-center pb-20">
                    <button
                        type="button"
                        onClick={() => openProductCta(!!user)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-[#f5f5f5] text-black border border-black/5 shadow-sm rounded-full font-medium text-sm transition-all font-body"
                    >
                        Explore Varticas
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </section>

            {/* Feature Comparison */}
            <section className="py-20 px-4 border-t border-black/5">
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
                        <table className="w-full text-sm font-body">
                            <thead>
                                <tr className="border-b border-black/5">
                                    <th className="text-left py-4 pr-8 text-gray-500 font-medium">
                                        Feature
                                    </th>
                                    <th className="text-center py-4 px-4 text-gray-500 font-medium">
                                        Starter
                                    </th>
                                    <th className="text-center py-4 px-4 text-green-600 font-medium">
                                        Pro
                                    </th>
                                    <th className="text-center py-4 px-4 text-yellow-500 font-medium">
                                        Enterprise
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600">
                                {[
                                    ["Token usage", "Limited", "20x more", "Custom"],
                                    ["Agent tasks", "Limited", "Unlimited", "Unlimited"],
                                    ["Workflows", "Limited", "10x more", "Unlimited"],
                                    ["MCP Integrations", "Limited", "Unlimited", "Unlimited"],
                                    ["Support", "Community", "Priority", "Instant Priority"],
                                    ["Theme", "Dark", "Dark", "Customizable"] // Just an example feature where it differs
                                ].map(([feature, starter, pro, enterprise]) => (
                                    <tr key={feature} className="border-b border-black/5">
                                        <td className="py-4 pr-8 text-black font-medium">
                                            {feature}
                                        </td>
                                        <td className="text-center py-4 px-4">{starter}</td>
                                        <td className="text-center py-4 px-4 text-green-600 font-medium">
                                            {pro}
                                        </td>
                                        <td className="text-center py-4 px-4 text-yellow-500 font-medium">
                                            {enterprise}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 px-4 border-t border-black/5">
                <div className="max-w-3xl mx-auto">
                    <motion.h2
                        className="text-3xl md:text-4xl font-display font-bold text-center mb-16 text-black"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        Frequently asked questions
                    </motion.h2>

                    <div className="space-y-6 list-none font-body">
                        {faqs.map((faq) => (
                            <motion.div
                                key={faq.q}
                                className="p-6 md:p-8 rounded-[2rem] bg-white border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h3 className="text-black font-bold mb-3 text-lg">{faq.q}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {faq.a}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-24 px-4 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/40 blur-[120px] rounded-full pointer-events-none" />

                <motion.div
                    className="max-w-3xl mx-auto text-center relative z-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-black">
                        Ready to automate?
                    </h2>
                    <p className="text-lg text-gray-600 font-body mb-8 max-w-xl mx-auto">
                        Join hundreds of early adopters and lock in your pricing now
                    </p>
                    <button
                        type="button"
                        onClick={() => openProductCta(!!user)}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-black hover:bg-gray-900 text-white rounded-full font-bold font-body text-lg transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                    >
                        Get Started Now
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </motion.div>
            </section>

            <Footer />
        </div>
    );
}
