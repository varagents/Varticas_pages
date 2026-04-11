import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    ArrowLeft,
    Mail,
    Lock,
    Eye,
    // ...existing code...
    EyeOff,
    Loader2,
    Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Login() {
    // ...existing code...
    const { signInWithGoogle, signInWithGithub, signInWithEmail, signUpWithEmail } =
        useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const plan = searchParams.get("plan");

    const [isSignUp, setIsSignUp] = useState(!!plan);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (isSignUp) {
                const { error: signUpError } = await signUpWithEmail(email, password);
                if (signUpError) {
                    setError(signUpError.message);
                } else {
                    setEmailSent(true);
                }
            } else {
                const { error: signInError } = await signInWithEmail(email, password);
                if (signInError) {
                    setError(signInError.message);
                } else {
                    navigate("/auth/callback", { replace: true });
                }
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // ...existing code...
    // ...existing code...
    if (emailSent) {
        return (
            <div className="min-h-screen bg-[#dfdfdf] text-black selection:bg-black selection:text-white font-body">
                <Navbar />
                <div className="pt-36 pb-20 px-4 max-w-md mx-auto text-center">
// ...existing code...
                    // ...existing code...
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-8 rounded-2xl bg-white border border-gray-200 shadow-xl"
                    >
                        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                            <Mail className="w-8 h-8 text-green-500" />
                        </div>
                        <h2 className="text-3xl font-display font-black mb-4">Check your email</h2>
                        <p className="text-gray-600 mb-8 font-medium">
                            We've sent a confirmation link to{" "}
                            <span className="text-black font-medium">{email}</span>. Click it
                            to verify your account.
                        </p>
                        <Button
                            variant="outline"
                            className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 px-4 rounded-xl transition-all shadow-lg"
                            onClick={() => setEmailSent(false)}
                        >
                            Back to login
                        </Button>
                    </motion.div>
                </div>
                <Footer />
            </div>
        );
    }

    // ...existing code...
    return (
        <div className="min-h-screen bg-[#dfdfdf] text-black selection:bg-black selection:text-white font-body">
            <Navbar />

            <div className="pt-36 pb-20 px-4 max-w-md mx-auto relative">
                <Link
                    to={plan ? "/pricing" : "/"}
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-black transition-colors mb-8 group relative z-10 font-bold"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    {plan ? "Back to Pricing" : "Back to Home"}
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl relative z-10"
                >
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-display font-black mb-2 tracking-tight">
                            {isSignUp ? "Create an account" : "Welcome back"}
                        </h1>
                        <p className="text-gray-500 font-medium">
                            {isSignUp
                                ? "Sign up to start automating with Varticas."
                                : "Sign in to your Varticas account."}
                        </p>
                    </div>

                    {/* Plan context badge */}
                    {plan && (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 border border-green-200 mb-6">
                            <Sparkles className="w-3.5 h-3.5 text-green-600" />
                            <span className="text-sm font-semibold text-green-600">
                                {plan === "pro" ? "Pro Plan" : plan === "starter" ? "Starter Plan" : "Team Plan"} selected
                            </span>
                        </div>
                    )}

                    {/* OAuth Buttons */}
                    <div className="space-y-3 mb-6">
                        <button
                            onClick={signInWithGoogle}
                            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-black border border-gray-200 px-4 py-3 rounded-xl transition-all font-bold shadow-sm"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Continue with Google
                        </button>

                        {/* <button
                            onClick={signInWithGithub}
                            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-black border border-gray-200 px-4 py-3 rounded-xl transition-all font-bold shadow-sm"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            Continue with GitHub
                        </button> */}
                    </div>

                    {/* Divider
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-3 bg-white text-gray-400 font-bold">Or continue with email</span>
                        </div>
                    </div> */}

                    {/* Email Form
                    <form onSubmit={handleEmailAuth} className="space-y-4">
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="pl-11 bg-gray-50 border-gray-200 text-black placeholder:text-gray-400 h-14 focus:border-black focus:ring-black rounded-xl font-medium"
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                                className="pl-11 pr-11 bg-gray-50 border-gray-200 text-black placeholder:text-gray-400 h-14 focus:border-black focus:ring-black rounded-xl font-medium"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                            >
                                {showPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2"
                            >
                                {error}
                            </motion.p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 px-4 rounded-xl transition-all shadow-lg flex justify-center items-center gap-2 mt-4"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                isSignUp ? "Create account" : "Sign in"
                            )}
                        </button>
                    </form> */}

                    <p className="mt-8 text-center text-gray-500 text-sm font-medium">
                        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                        <button
                            onClick={() => {
                                setIsSignUp(!isSignUp);
                                setError("");
                            }}
                            className="text-black hover:underline transition-colors font-bold ml-1"
                        >
                            {isSignUp ? "Sign in" : "Sign up"}
                        </button>
                    </p>

                    <p className="mt-8 text-center text-xs text-gray-400 font-medium">
                        By continuing, you agree to our{" "}
                        <Link to="/privacy-policy" className="text-black hover:underline transition-colors font-bold">
                            Privacy Policy
                        </Link>
                        .
                    </p>
                </motion.div>
            </div>

            <Footer />
        </div >
    );
}
