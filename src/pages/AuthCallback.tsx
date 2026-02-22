import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthCallback() {
    const { user, loading, metadata } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;

        if (user) {
            // If onboarding is complete, go to dashboard; otherwise onboarding
            if (metadata.onboarding_complete) {
                navigate("/dashboard", { replace: true });
            } else {
                navigate("/onboarding", { replace: true });
            }
        } else {
            // No user after callback = something went wrong
            navigate("/login", { replace: true });
        }
    }, [user, loading, metadata, navigate]);

    return (
        <div className="min-h-screen bg-[#07080A] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-400 text-sm">Signing you in...</p>
            </div>
        </div>
    );
}
