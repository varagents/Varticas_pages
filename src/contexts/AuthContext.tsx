import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { requestOtp, resendOtp, verifyOtp, requestPasswordResetOtp, resendPasswordResetOtp, confirmPasswordReset } from '@/lib/emailAuth';
import type { User, Session } from '@supabase/supabase-js';

interface UserMetadata {
    full_name?: string;
    company?: string;
    role?: string;
    team_size?: string;
    use_case?: string;
    referral_source?: string;
    goals?: string;
    is_premium?: boolean;
    onboarding_complete?: boolean;
    selected_plan?: string;
}

interface AuthContextType {
    user: User | null;
    session: Session | null;
    loading: boolean;
    metadata: UserMetadata;
    signInWithGoogle: () => Promise<void>;
    signInWithGithub: () => Promise<void>;
    signInWithEmail: (email: string, password: string) => Promise<{ error: Error | null }>;
    signUpWithEmail: (email: string, password: string) => Promise<{ error: Error | null }>;
    requestEmailOtp: (mode: 'signup' | 'login', email: string, password: string) => Promise<{ challengeId: string | null; error: Error | null }>;
    resendEmailOtp: (mode: 'signup' | 'login', challengeId: string) => Promise<{ error: Error | null }>;
    verifyEmailOtp: (email: string, password: string, otp: string, challengeId: string) => Promise<{ error: Error | null }>;
    requestResetPasswordOtp: (email: string) => Promise<{ challengeId: string | null; error: Error | null }>;
    resendResetPasswordOtp: (challengeId: string) => Promise<{ error: Error | null }>;
    confirmResetPassword: (email: string, otp: string, challengeId: string, newPassword: string) => Promise<{ error: Error | null }>;
    signOut: () => Promise<void>;
    updateUserMetadata: (data: Partial<UserMetadata>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [metadata, setMetadata] = useState<UserMetadata>({});

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
            setSession(currentSession);
            setUser(currentSession?.user ?? null);
            if (currentSession?.user) {
                setMetadata((currentSession.user.user_metadata as UserMetadata) || {});
            }
            setLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
            setSession(newSession);
            setUser(newSession?.user ?? null);
            if (newSession?.user) {
                setMetadata((newSession.user.user_metadata as UserMetadata) || {});
            }
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signInWithGoogle = useCallback(async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: `${window.location.origin}/auth/callback` },
        });
    }, []);

    const signInWithGithub = useCallback(async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: { redirectTo: `${window.location.origin}/auth/callback` },
        });
    }, []);

    const signInWithEmail = useCallback(async (email: string, password: string) => {
        void email;
        void password;
        return { error: new Error('Direct email/password sign-in is disabled. Use OTP flow.') };
    }, []);

    const signUpWithEmail = useCallback(async (email: string, password: string) => {
        void email;
        void password;
        return { error: new Error('Direct email signup is disabled. Use OTP flow.') };
    }, []);

    const requestEmailOtp = useCallback(
        async (mode: 'signup' | 'login', email: string, password: string) => {
            try {
                const response = await requestOtp(mode, email, password);
                return { challengeId: response.challengeId, error: null };
            } catch (error) {
                return { challengeId: null, error: error as Error };
            }
        },
        []
    );

    const resendEmailOtp = useCallback(
        async (mode: 'signup' | 'login', challengeId: string) => {
            try {
                await resendOtp(mode, challengeId);
                return { error: null };
            } catch (error) {
                return { error: error as Error };
            }
        },
        []
    );

    const verifyEmailOtp = useCallback(
        async (email: string, password: string, otp: string, challengeId: string) => {
            try {
                const response = await verifyOtp(email, password, otp, challengeId);
                const { error } = await supabase.auth.setSession({
                    access_token: response.tokens.access_token,
                    refresh_token: response.tokens.refresh_token,
                });
                return { error: error as Error | null };
            } catch (error) {
                return { error: error as Error };
            }
        },
        []
    );

    const requestResetPasswordOtp = useCallback(async (email: string) => {
        try {
            const response = await requestPasswordResetOtp(email);
            return { challengeId: response.challengeId, error: null };
        } catch (error) {
            return { challengeId: null, error: error as Error };
        }
    }, []);

    const resendResetPasswordOtp = useCallback(async (challengeId: string) => {
        try {
            await resendPasswordResetOtp(challengeId);
            return { error: null };
        } catch (error) {
            return { error: error as Error };
        }
    }, []);

    const confirmResetPassword = useCallback(async (email: string, otp: string, challengeId: string, newPassword: string) => {
        try {
            await confirmPasswordReset(email, otp, challengeId, newPassword);
            return { error: null };
        } catch (error) {
            return { error: error as Error };
        }
    }, []);

    const signOut = useCallback(async () => {
        await supabase.auth.signOut();
        setMetadata({});
    }, []);

    const updateUserMetadata = useCallback(async (data: Partial<UserMetadata>) => {
        const { error } = await supabase.auth.updateUser({ data });
        if (error) throw error;
        setMetadata(prev => ({ ...prev, ...data }));
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                session,
                loading,
                metadata,
                signInWithGoogle,
                signInWithGithub,
                signInWithEmail,
                signUpWithEmail,
                requestEmailOtp,
                resendEmailOtp,
                verifyEmailOtp,
                requestResetPasswordOtp,
                resendResetPasswordOtp,
                confirmResetPassword,
                signOut,
                updateUserMetadata,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
