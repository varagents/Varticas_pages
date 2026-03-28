import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
    LogOut,
    Crown,
    Rocket,
    Clock,
    User,
    Mail,
    Building2,
    Briefcase,
    Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { redirectToProductWithSession } from "@/lib/codeService";

export default function Dashboard() {
    const { user, metadata, signOut } = useAuth();
    const navigate = useNavigate();
    const [currentPlan, setCurrentPlan] = useState<string | null>(null);
    const [planLoading, setPlanLoading] = useState(true);
    const [proUntil, setProUntil] = useState<string | null>(null);
    const [isLaunching, setIsLaunching] = useState(false);

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
                if (
                    data.plan === "pro" &&
                    data.pro_until &&
                    new Date(data.pro_until) > new Date()
                ) {
                    setCurrentPlan("pro");
                    setProUntil(data.pro_until);
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

    const handleSignOut = async () => {
        await signOut();
    };

    const handleLaunchApp = async () => {
        if (!user) {
            navigate("/login");
            return;
        }
        setIsLaunching(true);
        try {
            await redirectToProductWithSession();
        } finally {
            setIsLaunching(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#dfdfdf] text-black overflow-x-hidden selection:bg-black selection:text-white">
            <Navbar />

            <div className="pt-32 pb-20 px-4 max-w-5xl mx-auto relative">
                {/* Background glow removed for cleaner light theme */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/40 blur-[150px] rounded-full pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10"
                >
                    {/* Welcome Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-3xl md:text-4xl font-display font-bold">
                                    Welcome back{metadata.full_name ? `, ${metadata.full_name}` : ""}
                                </h1>
                                <span className="text-2xl">👋</span>
                            </div>
                            <p className="text-gray-600 font-body">{user?.email}</p>
                        </div>

                        <Button
                            variant="outline"
                            onClick={handleSignOut}
                            className="bg-white border-black/10 shadow-sm hover:bg-red-50 hover:border-red-200 hover:text-red-600 text-black transition-all w-fit rounded-xl px-5"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Sign Out
                        </Button>
                    </div>

                    {/* Premium/Free Badge Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className={`p-6 md:p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white border ${currentPlan === 'pro'
                            ? 'border-green-500/20'
                            : 'border-black/5'
                            } mb-8 relative overflow-hidden`}
                    >
                        {currentPlan === 'pro' && (
                            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-[60px] rounded-full" />
                        )}
                        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex items-start gap-5">
                                <div className={`p-4 rounded-2xl border ${currentPlan === 'pro'
                                    ? 'bg-green-50 border-green-200'
                                    : 'bg-[#f5f5f5] border-black/5'
                                    }`}>
                                    <Crown className={`w-6 h-6 ${currentPlan === 'pro' ? 'text-green-600' : 'text-gray-500'}`} />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <h2 className="text-xl font-bold font-display text-black">
                                            {planLoading ? "Loading..." : currentPlan === "pro" ? "Pro Member" : "Free Plan"}
                                        </h2>
                                        {!planLoading && currentPlan === "pro" && (
                                            <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider">
                                                Active
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-gray-600 font-body text-sm max-w-md leading-relaxed">
                                        {planLoading ? (
                                            "Fetching your subscription details..."
                                        ) : currentPlan === "pro" ? (
                                            <>
                                                <p>You've unlocked full automation bandwidth and unlimited workflows.</p>
                                                {proUntil && (
                                                    <p className="mt-1 text-green-400/80 font-medium">
                                                        Valid until: {new Date(proUntil).toLocaleString('en-US', {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric',
                                                            hour: 'numeric',
                                                            minute: '2-digit'
                                                        })}
                                                    </p>
                                                )}
                                            </>
                                        ) : (
                                            "You are currently on the Starter plan with limited tasks."
                                        )}
                                    </div>
                                </div>
                            </div>

                            {!planLoading && currentPlan !== "pro" && (
                                <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
                                    <Link
                                        to="/pricing"
                                        className="px-6 py-3 bg-black hover:bg-gray-900 text-white rounded-full font-bold font-body transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)] whitespace-nowrap text-center flex-1 md:flex-none"
                                    >
                                        Upgrade to Pro
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={handleLaunchApp}
                                        disabled={isLaunching}
                                        className="relative overflow-hidden px-6 py-3 rounded-full font-bold font-body whitespace-nowrap text-black bg-[#f5f5f5] hover:bg-[#e5e5e5] border border-black/5 transition-all disabled:opacity-50 flex-1 md:flex-none"
                                    >
                                        <span className="relative z-10">{isLaunching ? "Launching..." : "Launch Varticas"}</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Profile Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="p-6 md:p-8 rounded-[2rem] bg-white border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all"
                        >
                            <h3 className="text-xl font-bold font-display mb-6 flex items-center gap-3">
                                <div className="p-2 bg-[#f5f5f5] rounded-xl"><User className="w-5 h-5 text-black" /></div>
                                Your Profile
                            </h3>
                            <div className="space-y-4 font-body">
                                {metadata.full_name && (
                                    <div className="flex items-center gap-4 text-gray-500">
                                        <User className="w-4 h-4 shrink-0" />
                                        <span className="text-black font-medium">{metadata.full_name}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-4 text-gray-500">
                                    <Mail className="w-4 h-4 shrink-0" />
                                    <span className="text-black font-medium">{user?.email}</span>
                                </div>
                                {metadata.company && (
                                    <div className="flex items-center gap-4 text-gray-500">
                                        <Building2 className="w-4 h-4 shrink-0" />
                                        <span className="text-black font-medium">{metadata.company}</span>
                                    </div>
                                )}
                                {metadata.role && (
                                    <div className="flex items-center gap-4 text-gray-500">
                                        <Briefcase className="w-4 h-4 shrink-0" />
                                        <span className="text-black font-medium">{metadata.role}</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* Product Launch Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="p-6 md:p-8 rounded-[2rem] bg-white border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all"
                        >
                            <h3 className="text-xl font-bold font-display mb-6 flex items-center gap-3">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><Rocket className="w-5 h-5" /></div>
                                Product Status
                            </h3>
                            <div className="space-y-6 font-body">
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 p-2 bg-yellow-100 rounded-xl border border-yellow-200">
                                        <Clock className="w-4 h-4 text-yellow-600" />
                                    </div>
                                    <div>
                                        <p className="text-black font-bold text-base">
                                            Launching Soon
                                        </p>
                                        <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                                            We're putting the finishing touches on Varticas. As a
                                            early member, you'll get first access.
                                        </p>
                                    </div>
                                </div>

                                <div className="p-5 rounded-2xl bg-[#f8f9fa] border border-black/5">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Sparkles className="w-4 h-4 text-yellow-500" />
                                        <span className="text-sm font-bold text-black uppercase tracking-wider">
                                            What's coming
                                        </span>
                                    </div>
                                    <ul className="space-y-2 text-sm text-gray-600">
                                        <li>• AI agent task execution</li>
                                        <li>• MCP-powered workflow builder</li>
                                        <li>• Desktop app for macOS</li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mt-10 flex flex-wrap gap-3"
                    >
                        <Link
                            to="/"
                            className="px-5 py-2.5 rounded-full bg-white shadow-sm border border-black/5 text-sm font-medium text-gray-600 font-body hover:text-black hover:shadow-md transition-all"
                        >
                            ← Back to Homepage
                        </Link>
                        <Link
                            to="/pricing"
                            className="px-5 py-2.5 rounded-full bg-white shadow-sm border border-black/5 text-sm font-medium text-gray-600 font-body hover:text-black hover:shadow-md transition-all"
                        >
                            View Plans
                        </Link>
                        <Link
                            to="/contact"
                            className="px-5 py-2.5 rounded-full bg-white shadow-sm border border-black/5 text-sm font-medium text-gray-600 font-body hover:text-black hover:shadow-md transition-all"
                        >
                            Contact Support
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            <style>{`
                @keyframes splash {
                    0% { transform: translateX(-110%); }
                    100% { transform: translateX(110%); }
                }
            `}</style>

            <Footer />
        </div>
    );
}
