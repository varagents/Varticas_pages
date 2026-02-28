import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Detects Supabase OAuth hash-fragment tokens (e.g. /#access_token=...)
 * and redirects to the auth callback flow. This handles cases where
 * Supabase redirects to the root URL with tokens in the hash.
 */
export default function HashRedirectHandler() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const hash = window.location.hash;

        // Prevent infinite redirects if already on the callback route
        if (location.pathname === '/auth/callback') return;

        // Check if the hash contains an access_token from Supabase OAuth
        if (hash && hash.includes("access_token=")) {
            // Immediately navigate to the auth callback route with the hash.
            // This prevents race conditions with Supabase stripping the hash
            // and lets the centralized AuthCallback page handle the loading state.
            navigate(`/auth/callback${hash}`, { replace: true });
        }
    }, [navigate, location]);

    return null;
}
