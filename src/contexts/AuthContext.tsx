import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
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
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        return { error: error as Error | null };
    }, []);

    const signUpWithEmail = useCallback(async (email: string, password: string) => {
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
        });
        return { error: error as Error | null };
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
