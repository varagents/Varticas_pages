import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Detects Supabase OAuth hash-fragment tokens (e.g. /#access_token=...)
 * and redirects to the auth callback flow. This handles cases where
 * Supabase redirects to the root URL with tokens in the hash.
 */
export default function HashRedirectHandler() {
    const { user, loading, metadata } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const hash = window.location.hash;

        // Check if the hash contains an access_token from Supabase OAuth
        if (hash && hash.includes("access_token=")) {
            // Supabase JS client automatically picks up the hash tokens
            // and establishes the session. We just need to wait for the
            // auth state to update, then redirect.
            const checkAndRedirect = () => {
                if (!loading && user) {
                    // Clear the hash from the URL
                    window.history.replaceState(null, "", window.location.pathname);

                    if (metadata.onboarding_complete) {
                        navigate("/dashboard", { replace: true });
                    } else {
                        navigate("/onboarding", { replace: true });
                    }
                }
            };

            // Small delay to let Supabase process the hash
            const timeout = setTimeout(checkAndRedirect, 500);
            return () => clearTimeout(timeout);
        }
    }, [loading, user, metadata, navigate, location]);

    return null;
}
