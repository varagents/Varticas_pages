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
        <div className="min-h-screen bg-[#07080A] text-white selection:bg-brand-red selection:text-white flex flex-col">
            {/* Header */}
            <div className="pt-8 px-4">
                <div className="max-w-2xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img
                            src="/logo.png"
                            alt="Varticas"
                            className="w-8 h-8 rounded-lg"
                        />
                        <span className="font-display font-bold text-lg">Varticas</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        Step {step} of {TOTAL_STEPS}
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="px-4 mt-6">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center gap-2 mb-2">
                        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                            <div key={i} className="flex-1 flex items-center gap-2">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${i + 1 < step
                                            ? "bg-green-500 text-white"
                                            : i + 1 === step
                                                ? "bg-brand-red text-white"
                                                : "bg-white/5 text-gray-500"
                                        }`}
                                >
                                    {i + 1 < step ? (
                                        <Check className="w-4 h-4" />
                                    ) : (
                                        stepIcons[i]
                                    )}
                                </div>
                                {i < TOTAL_STEPS - 1 && (
                                    <div
                                        className={`flex-1 h-0.5 rounded transition-all ${i + 1 < step ? "bg-green-500" : "bg-white/5"
                                            }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 px-1">
                        {stepLabels.map((label, i) => (
                            <span
                                key={label}
                                className={i + 1 === step ? "text-white" : ""}
                            >
                                {label}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-lg">
                    <AnimatePresence mode="wait">
                        {/* Step 1: About You */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                            >
                                <div>
                                    <h2 className="text-3xl font-bold font-display mb-2">
                                        Welcome to Varticas{" "}
                                        <Sparkles className="w-6 h-6 inline text-brand-red" />
                                    </h2>
                                    <p className="text-gray-400">
                                        Let's get to know you so we can personalize your experience.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Full Name *
                                        </label>
                                        <Input
                                            value={formData.full_name}
                                            onChange={(e) => updateField("full_name", e.target.value)}
                                            placeholder="John Doe"
                                            className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-12 focus:border-brand-red/50"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Company / Organization
                                        </label>
                                        <Input
                                            value={formData.company}
                                            onChange={(e) => updateField("company", e.target.value)}
                                            placeholder="Acme Inc."
                                            className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-12 focus:border-brand-red/50"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Your Role
                                        </label>
                                        <Input
                                            value={formData.role}
                                            onChange={(e) => updateField("role", e.target.value)}
                                            placeholder="Engineering Lead, Product Manager, etc."
                                            className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 h-12 focus:border-brand-red/50"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 2: Your Work */}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                            >
                                <div>
                                    <h2 className="text-3xl font-bold font-display mb-2">
                                        Tell us about your work
                                    </h2>
                                    <p className="text-gray-400">
                                        This helps us tailor Varticas to your needs.
                                    </p>
                                </div>

                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-3">
                                            Team Size
                                        </label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {teamSizes.map((size) => (
                                                <button
                                                    key={size}
                                                    onClick={() => updateField("team_size", size)}
                                                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${formData.team_size === size
                                                            ? "bg-brand-red text-white border border-brand-red"
                                                            : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
                                                        }`}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-3">
                                            Primary Use Case *
                                        </label>
                                        <div className="space-y-2">
                                            {useCases.map((useCase) => (
                                                <button
                                                    key={useCase}
                                                    onClick={() => updateField("use_case", useCase)}
                                                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${formData.use_case === useCase
                                                            ? "bg-brand-red/10 text-brand-red border border-brand-red/30"
                                                            : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
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
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                            >
                                <div>
                                    <h2 className="text-3xl font-bold font-display mb-2">
                                        Almost there!
                                    </h2>
                                    <p className="text-gray-400">
                                        Help us understand how you discovered Varticas and what you
                                        hope to achieve.
                                    </p>
                                </div>

                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-3">
                                            How did you hear about us?
                                        </label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {referralSources.map((source) => (
                                                <button
                                                    key={source}
                                                    onClick={() =>
                                                        updateField("referral_source", source)
                                                    }
                                                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${formData.referral_source === source
                                                            ? "bg-brand-red text-white border border-brand-red"
                                                            : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
                                                        }`}
                                                >
                                                    {source}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            What's your #1 goal with Varticas?
                                        </label>
                                        <textarea
                                            value={formData.goals}
                                            onChange={(e) => updateField("goals", e.target.value)}
                                            placeholder="e.g., Automate lead research, extract data from competitor websites, streamline reporting..."
                                            rows={4}
                                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 text-sm resize-none focus:border-brand-red/50 focus:outline-none focus:ring-1 focus:ring-brand-red/20"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="flex justify-between items-center mt-10">
                        {step > 1 ? (
                            <Button
                                variant="outline"
                                onClick={handleBack}
                                className="bg-white/5 border-white/10 hover:bg-white/10 text-white"
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
                                className="bg-white hover:bg-gray-100 text-black font-bold px-6"
                            >
                                Continue
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        ) : (
                            <Button
                                onClick={handleComplete}
                                disabled={loading}
                                className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 shadow-lg hover:shadow-green-500/20"
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
        </div>
    );
}
