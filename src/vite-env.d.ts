/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SUPABASE_URL: string;
    readonly VITE_SUPABASE_ANON_KEY: string;
    readonly VITE_CODE_SERVICE_DEV_URL?: string;
    readonly VITE_CODE_SERVICE_URL?: string;
    readonly VITE_PRODUCT_APP_URL?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

interface Window {
    Razorpay: unknown;
}
