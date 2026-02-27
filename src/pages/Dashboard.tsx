import { Link } from "react-router-dom";
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

export default function Dashboard() {
    const { user, metadata, signOut } = useAuth();
    const [currentPlan, setCurrentPlan] = useState<string | null>(null);
    const [planLoading, setPlanLoading] = useState(true);
    const [proUntil, setProUntil] = useState<string | null>(null);

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

    return (
        <div className="min-h-screen bg-[#07080A] text-white overflow-x-hidden selection:bg-brand-red selection:text-white">
            <Navbar />

            <div className="pt-32 pb-20 px-4 max-w-5xl mx-auto relative">
                {/* Background glow */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-green-500/5 blur-[150px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-red/5 blur-[120px] rounded-full pointer-events-none" />

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
                            <p className="text-gray-400">{user?.email}</p>
                        </div>

                        <Button
                            variant="outline"
                            onClick={handleSignOut}
                            className="bg-white/5 border-white/10 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 text-white transition-all w-fit"
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
                        className={`p-6 rounded-2xl bg-gradient-to-br ${currentPlan === 'pro'
                            ? 'from-[#141517] to-[#0F1012] border-green-500/20'
                            : 'from-[#12161A] to-[#0F1012] border-white/5'
                            } border mb-8 relative overflow-hidden`}
                    >
                        {currentPlan === 'pro' && (
                            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-[60px] rounded-full" />
                        )}
                        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-xl border ${currentPlan === 'pro'
                                    ? 'bg-green-500/10 border-green-500/20'
                                    : 'bg-white/5 border-white/5'
                                    }`}>
                                    <Crown className={`w-6 h-6 ${currentPlan === 'pro' ? 'text-green-500' : 'text-gray-400'}`} />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h2 className="text-xl font-bold text-white">
                                            {planLoading ? "Loading..." : currentPlan === "pro" ? "Pro Member" : "Free Plan"}
                                        </h2>
                                        {!planLoading && currentPlan === "pro" && (
                                            <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider">
                                                Active
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-gray-400 text-sm">
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
                                <Link
                                    to="/pricing"
                                    className="px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold text-sm transition-all shadow-lg hover:shadow-green-500/20 whitespace-nowrap"
                                >
                                    Upgrade to Pro
                                </Link>
                            )}
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Profile Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="p-6 rounded-2xl bg-[#0F1012] border border-white/5 hover:border-white/10 transition-colors"
                        >
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <User className="w-5 h-5 text-gray-400" />
                                Your Profile
                            </h3>
                            <div className="space-y-3 text-sm">
                                {metadata.full_name && (
                                    <div className="flex items-center gap-3 text-gray-400">
                                        <User className="w-4 h-4 shrink-0" />
                                        <span className="text-white">{metadata.full_name}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-3 text-gray-400">
                                    <Mail className="w-4 h-4 shrink-0" />
                                    <span className="text-white">{user?.email}</span>
                                </div>
                                {metadata.company && (
                                    <div className="flex items-center gap-3 text-gray-400">
                                        <Building2 className="w-4 h-4 shrink-0" />
                                        <span className="text-white">{metadata.company}</span>
                                    </div>
                                )}
                                {metadata.role && (
                                    <div className="flex items-center gap-3 text-gray-400">
                                        <Briefcase className="w-4 h-4 shrink-0" />
                                        <span className="text-white">{metadata.role}</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* Product Launch Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="p-6 rounded-2xl bg-[#0F1012] border border-white/5 hover:border-white/10 transition-colors"
                        >
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <Rocket className="w-5 h-5 text-brand-red" />
                                Product Status
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 p-1.5 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                                        <Clock className="w-4 h-4 text-yellow-500" />
                                    </div>
                                    <div>
                                        <p className="text-white font-medium text-sm">
                                            Launching Soon
                                        </p>
                                        <p className="text-gray-500 text-xs mt-1">
                                            We're putting the finishing touches on Varticas. As a
                                            early member, you'll get first access.
                                        </p>
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Sparkles className="w-4 h-4 text-brand-orange" />
                                        <span className="text-sm font-medium text-white">
                                            What's coming
                                        </span>
                                    </div>
                                    <ul className="space-y-1.5 text-xs text-gray-400">
                                        <li>• AI agent task execution</li>
                                        <li>• MCP-powered workflow builder</li>
                                        <li>• Chrome extension</li>
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
                        className="mt-8 flex flex-wrap gap-3"
                    >
                        <Link
                            to="/"
                            className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-sm text-gray-400 hover:text-white transition-all"
                        >
                            ← Back to Homepage
                        </Link>
                        <Link
                            to="/pricing"
                            className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-sm text-gray-400 hover:text-white transition-all"
                        >
                            View Plans
                        </Link>
                        <Link
                            to="/contact"
                            className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-sm text-gray-400 hover:text-white transition-all"
                        >
                            Contact Support
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            <Footer />
        </div>
    );
}
