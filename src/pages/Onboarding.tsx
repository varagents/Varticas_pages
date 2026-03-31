import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    ArrowRight,
    ArrowLeft,
    User,
    Briefcase,
    Target,
    Loader2,
    Check,
    Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TOTAL_STEPS = 3;

const teamSizes = [
    "Just me",
    "2-5",
    "6-20",
    "21-100",
    "100+",
];

const useCases = [
    "Web scraping & data extraction",
    "Workflow automation",
    "Research & analysis",
    "Customer support",
    "Sales & outreach",
    "Content creation",
    "Other",
];

const referralSources = [
    "Twitter/X",
    "LinkedIn",
    "Product Hunt",
    "Friend or colleague",
    "Google search",
    "Blog or article",
    "Other",
];

export default function Onboarding() {
    const { user, updateUserMetadata, metadata } = useAuth();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        full_name: user?.user_metadata?.full_name || "",
        company: "",
        role: "",
        team_size: "",
        use_case: "",
        referral_source: "",
        goals: "",
    });

    const updateField = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleNext = () => {
        if (step < TOTAL_STEPS) {
            setStep(step + 1);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleComplete = async () => {
        setLoading(true);
        try {
            await updateUserMetadata({
                ...formData,
                is_premium: true,
                onboarding_complete: true,
                selected_plan: metadata.selected_plan || "pro",
            });
            navigate("/dashboard", { replace: true });
        } catch {
            // Silently handle — user can retry
            setLoading(false);
        }
    };

    const handleSkip = async () => {
        setLoading(true);
        try {
            await updateUserMetadata({
                onboarding_complete: true,
            });
            navigate("/dashboard", { replace: true });
        } catch {
            // Silently handle — user can retry
            setLoading(false);
        }
    };

    const canProceed = () => {
        switch (step) {
            case 1:
                return formData.full_name.trim().length > 0;
            case 2:
                return formData.use_case.length > 0;
            case 3:
                return true;
            default:
                return false;
        }
    };

    const stepIcons = [
        <User className="w-5 h-5" key="user" />,
        <Briefcase className="w-5 h-5" key="briefcase" />,
        <Target className="w-5 h-5" key="target" />,
    ];

    const stepLabels = ["About You", "Your Work", "Your Goals"];

    return (
        <div className="min-h-screen bg-[#dfdfdf] text-black selection:bg-black selection:text-white flex flex-col font-body">
            {/* Header */}
            <div className="pt-8 px-4 relative z-10">
                <div className="max-w-2xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white p-1 shadow-sm flex items-center justify-center">
                            <img src="/vartics.svg" alt="Varticas Logo" className="w-full h-full object-contain" />
                        </div>
                        <span className="font-display font-black text-xl">Varticas</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleSkip}
                            disabled={loading}
                            className="text-sm font-bold text-gray-500 hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Skip for now
                        </button>
                        <div className="flex items-center gap-2 text-sm text-gray-500 font-bold bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
                            Step {step} of {TOTAL_STEPS}
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="px-4 mt-6 relative z-10">
                <div className="max-w-2xl mx-auto shadow-sm bg-white p-4 rounded-3xl border border-gray-200">
                    <div className="flex items-start justify-between relative">
                        {/* Connecting Line background */}
                        <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 rounded-full -z-10 mx-5" />

                        {/* Active Connecting Line */}
                        <div
                            className="absolute top-5 left-0 h-1 bg-green-500 rounded-full -z-10 mx-5 transition-all duration-300"
                            style={{ width: `calc(${((step - 1) / (TOTAL_STEPS - 1)) * 100}% - 40px)` }}
                        />

                        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                            <div key={i} className="flex flex-col items-center gap-2 z-10 w-24">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all shadow-sm ${i + 1 < step
                                        ? "bg-green-500 text-white"
                                        : i + 1 === step
                                            ? "bg-black text-white"
                                            : "bg-gray-100 text-gray-400 border border-gray-200"
                                        }`}
                                >
                                    {i + 1 < step ? (
                                        <Check className="w-5 h-5" />
                                    ) : (
                                        stepIcons[i]
                                    )}
                                </div>
                                <span className={`text-xs font-bold text-center ${i + 1 === step ? "text-black" : "text-gray-500"}`}>
                                    {stepLabels[i]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
                <div className="w-full max-w-lg bg-white p-8 md:p-10 rounded-3xl border border-gray-200 shadow-xl relative">
                    <AnimatePresence mode="wait">
                        {/* Step 1: About You */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-8"
                            >
                                <div>
                                    <h2 className="text-3xl font-black font-display mb-2 tracking-tight">
                                        Welcome to Varticas{" "}
                                        <Sparkles className="w-6 h-6 inline text-black" />
                                    </h2>
                                    <p className="text-gray-500 font-medium">
                                        Let's get to know you so we can personalize your experience.
                                    </p>
                                </div>

                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <Input
                                            value={formData.full_name}
                                            onChange={(e) => updateField("full_name", e.target.value)}
                                            placeholder="John Doe"
                                            className="bg-gray-50 border-gray-200 text-black placeholder:text-gray-400 h-12 focus:border-black focus:ring-black rounded-xl font-medium"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Company / Organization
                                        </label>
                                        <Input
                                            value={formData.company}
                                            onChange={(e) => updateField("company", e.target.value)}
                                            placeholder="Acme Inc."
                                            className="bg-gray-50 border-gray-200 text-black placeholder:text-gray-400 h-12 focus:border-black focus:ring-black rounded-xl font-medium"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Your Role
                                        </label>
                                        <Input
                                            value={formData.role}
                                            onChange={(e) => updateField("role", e.target.value)}
                                            placeholder="Engineering Lead, Product Manager, etc."
                                            className="bg-gray-50 border-gray-200 text-black placeholder:text-gray-400 h-12 focus:border-black focus:ring-black rounded-xl font-medium"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 2: Your Work */}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-8"
                            >
                                <div>
                                    <h2 className="text-3xl font-black font-display mb-2 tracking-tight">
                                        Tell us about your work
                                    </h2>
                                    <p className="text-gray-500 font-medium">
                                        This helps us tailor Varticas to your needs.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-3">
                                            Team Size
                                        </label>
                                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                                            {teamSizes.map((size) => (
                                                <button
                                                    key={size}
                                                    onClick={() => updateField("team_size", size)}
                                                    className={`px-4 py-3 rounded-xl text-sm font-bold transition-all border ${formData.team_size === size
                                                        ? "bg-black text-white border-black shadow-md"
                                                        : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                                                        }`}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-3">
                                            Primary Use Case *
                                        </label>
                                        <div className="space-y-2">
                                            {useCases.map((useCase) => (
                                                <button
                                                    key={useCase}
                                                    onClick={() => updateField("use_case", useCase)}
                                                    className={`w-full text-left px-4 py-3.5 rounded-xl text-sm font-bold transition-all border ${formData.use_case === useCase
                                                        ? "bg-black text-white border-black shadow-md"
                                                        : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                                                        }`}
                                                >
                                                    {useCase}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: Your Goals */}
                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-8"
                            >
                                <div>
                                    <h2 className="text-3xl font-black font-display mb-2 tracking-tight">
                                        Almost there!
                                    </h2>
                                    <p className="text-gray-500 font-medium">
                                        Help us understand how you discovered Varticas and what you
                                        hope to achieve.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-3">
                                            How did you hear about us?
                                        </label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {referralSources.map((source) => (
                                                <button
                                                    key={source}
                                                    onClick={() =>
                                                        updateField("referral_source", source)
                                                    }
                                                    className={`px-4 py-3 rounded-xl text-sm font-bold transition-all border ${formData.referral_source === source
                                                        ? "bg-black text-white border-black shadow-md"
                                                        : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                                                        }`}
                                                >
                                                    {source}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            What's your #1 goal with Varticas?
                                        </label>
                                        <textarea
                                            value={formData.goals}
                                            onChange={(e) => updateField("goals", e.target.value)}
                                            placeholder="e.g., Automate lead research, extract data from competitor websites, streamline reporting..."
                                            rows={4}
                                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-black placeholder:text-gray-400 font-medium text-sm resize-none focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-colors"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                        {step > 1 ? (
                            <Button
                                variant="outline"
                                onClick={handleBack}
                                className="bg-white border-gray-200 hover:bg-gray-50 text-black font-bold h-12 px-6 rounded-xl"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back
                            </Button>
                        ) : (
                            <div />
                        )}

                        {step < TOTAL_STEPS ? (
                            <Button
                                onClick={handleNext}
                                disabled={!canProceed()}
                                className="bg-black hover:bg-gray-800 text-white font-bold h-12 px-8 rounded-xl disabled:opacity-50"
                            >
                                Continue
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        ) : (
                            <Button
                                onClick={handleComplete}
                                disabled={loading}
                                className="bg-green-500 hover:bg-green-600 text-white font-bold h-12 px-8 rounded-xl shadow-lg hover:shadow-green-500/20 disabled:opacity-50"
                            >
                                {loading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        Complete Setup
                                        <Sparkles className="w-4 h-4 ml-2" />
                                    </>
                                )}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            {/* Background elements to add some flavor */}
            <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-black/5 blur-[120px] rounded-full" />
            </div>
        </div>
    );
}
