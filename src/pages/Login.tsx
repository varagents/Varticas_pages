import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Sparkles,
} from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
  const {
    signInWithGoogle,
    requestEmailOtp,
    resendEmailOtp,
    verifyEmailOtp,
    requestResetPasswordOtp,
    resendResetPasswordOtp,
    confirmResetPassword,
  } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const plan = searchParams.get("plan");

  const [isSignUp, setIsSignUp] = useState(!!plan);
  const [isForgotPasswordMode, setIsForgotPasswordMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [challengeId, setChallengeId] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendingOtp, setResendingOtp] = useState(false);

  const authMode = useMemo(() => (isSignUp ? "signup" : "login"), [isSignUp]);
  const isOtpStep = Boolean(challengeId);

  const resetFormState = () => {
    setOtp("");
    setChallengeId(null);
    setError("");
    setSuccess("");
  };

  const handleModeToggle = () => {
    setIsSignUp(prev => !prev);
    setIsForgotPasswordMode(false);
    resetFormState();
  };

  const handleForgotPasswordMode = () => {
    setIsSignUp(false);
    setIsForgotPasswordMode(true);
    setPassword("");
    setShowPassword(false);
    resetFormState();
  };

  const exitForgotPasswordMode = () => {
    setIsForgotPasswordMode(false);
    setPassword("");
    setShowPassword(false);
    resetFormState();
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (isForgotPasswordMode) {
        if (!isOtpStep) {
          const { challengeId: newChallengeId, error: requestError } =
            await requestResetPasswordOtp(email.trim());

          if (requestError || !newChallengeId) {
            setError(requestError?.message || "Could not send password reset OTP");
            return;
          }

          setChallengeId(newChallengeId);
          setSuccess("OTP sent to your email. Enter OTP and set your new password.");
          return;
        }

        const { error: resetError } = await confirmResetPassword(
          email.trim(),
          otp.trim(),
          challengeId!,
          password,
        );

        if (resetError) {
          setError(resetError.message);
          return;
        }

        setSuccess("Password reset successful. You can now sign in with your new password.");
        setIsForgotPasswordMode(false);
        setChallengeId(null);
        setOtp("");
        setPassword("");
        return;
      }

      if (!isOtpStep) {
        const { challengeId: newChallengeId, error: requestError } =
          await requestEmailOtp(authMode, email.trim(), password);

        if (requestError || !newChallengeId) {
          setError(requestError?.message || "Could not send OTP");
          return;
        }

        setChallengeId(newChallengeId);
        return;
      }

      const { error: verifyError } = await verifyEmailOtp(
        email.trim(),
        password,
        otp.trim(),
        challengeId!,
      );

      if (verifyError) {
        setError(verifyError.message);
        return;
      }

      navigate("/auth/callback", { replace: true });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!challengeId) return;
    setError("");
    setSuccess("");
    setResendingOtp(true);

    try {
      const { error: resendError } = isForgotPasswordMode
        ? await resendResetPasswordOtp(challengeId)
        : await resendEmailOtp(authMode, challengeId);
      if (resendError) {
        setError(resendError.message);
      } else {
        setSuccess("OTP resent successfully.");
      }
    } catch {
      setError("Could not resend OTP. Please try again.");
    } finally {
      setResendingOtp(false);
    }
  };

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
              {isForgotPasswordMode
                ? "Reset your password"
                : isSignUp
                  ? "Create an account"
                  : "Welcome back"}
            </h1>
            <p className="text-gray-500 font-medium">
              {isForgotPasswordMode
                ? "Get an OTP and set a new password for your account."
                : isSignUp
                  ? "Sign up to start automating with Varticas."
                  : "Sign in to your Varticas account."}
            </p>
          </div>

          {plan && !isForgotPasswordMode && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 border border-green-200 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-green-600" />
              <span className="text-sm font-semibold text-green-600">
                {plan === "pro"
                  ? "Pro Plan"
                  : plan === "starter"
                    ? "Starter Plan"
                    : "Team Plan"}{" "}
                selected
              </span>
            </div>
          )}

          {!isForgotPasswordMode && (
            <>
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
              </div>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white text-gray-400 font-bold">
                    Or continue with email
                  </span>
                </div>
              </div>
            </>
          )}

          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                disabled={isOtpStep}
                className="pl-11 bg-gray-50 border-gray-200 text-black placeholder:text-gray-400 h-14 focus:border-black focus:ring-black rounded-xl font-medium"
              />
            </div>

            {(!isForgotPasswordMode || isOtpStep) && (
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder={isForgotPasswordMode ? "New Password" : "Password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  minLength={8}
                  disabled={!isForgotPasswordMode && isOtpStep}
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
            )}

            {!isSignUp && !isOtpStep && !isForgotPasswordMode && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleForgotPasswordMode}
                  className="text-sm text-gray-600 hover:text-black hover:underline font-semibold"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {isOtpStep && (
              <>
                <p className="text-xs text-gray-500 font-medium">
                  Enter the OTP sent to <span className="font-bold">{email}</span>.
                </p>
                <Input
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  required
                  className="bg-gray-50 border-gray-200 text-black placeholder:text-gray-400 h-14 focus:border-black focus:ring-black rounded-xl font-medium"
                />
              </>
            )}

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2"
              >
                {error}
              </motion.p>
            )}

            {success && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-700 text-sm bg-green-100 border border-green-200 rounded-lg px-3 py-2"
              >
                {success}
              </motion.p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 px-4 rounded-xl transition-all shadow-lg flex justify-center items-center gap-2 mt-4"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : isForgotPasswordMode ? (
                isOtpStep ? "Set New Password" : "Send Reset OTP"
              ) : isOtpStep ? (
                "Verify OTP"
              ) : isSignUp ? (
                "Send Signup OTP"
              ) : (
                "Send Login OTP"
              )}
            </Button>

            {isOtpStep && (
              <Button
                type="button"
                variant="outline"
                onClick={handleResendOtp}
                disabled={resendingOtp}
                className="w-full"
              >
                {resendingOtp ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Resend OTP"
                )}
              </Button>
            )}
          </form>

          {isForgotPasswordMode ? (
            <p className="mt-8 text-center text-gray-500 text-sm font-medium">
              Remembered your password?
              <button
                onClick={exitForgotPasswordMode}
                className="text-black hover:underline transition-colors font-bold ml-1"
              >
                Back to sign in
              </button>
            </p>
          ) : (
            <p className="mt-8 text-center text-gray-500 text-sm font-medium">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={handleModeToggle}
                className="text-black hover:underline transition-colors font-bold ml-1"
              >
                {isSignUp ? "Sign in" : "Sign up"}
              </button>
            </p>
          )}

          <p className="mt-8 text-center text-xs text-gray-400 font-medium">
            By continuing, you agree to our{" "}
            <Link
              to="/privacy-policy"
              className="text-black hover:underline transition-colors font-bold"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
