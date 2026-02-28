import { supabase } from "@/lib/supabase";
import axios from "axios";

const CODE_SERVICE_URL = import.meta.env.DEV
  ? import.meta.env.VITE_CODE_SERVICE_DEV_URL || "http://localhost:5001"
  : import.meta.env.VITE_CODE_SERVICE_URL || "https://codeservice.varticas.com";
const DEFAULT_PRODUCT_APP_URL = import.meta.env.DEV
  ? "https://product.varticas.com"
  :  "http://localhost:5001";
const configuredProductUrl = import.meta.env.VITE_PRODUCT_APP_URL;
const PRODUCT_APP_URL =
  configuredProductUrl && configuredProductUrl.includes("codeservice.varticas.com")
    ? DEFAULT_PRODUCT_APP_URL
    : configuredProductUrl || DEFAULT_PRODUCT_APP_URL;
const PRODUCT_AUTH_CALLBACK_PATH = "/auth/callback";

interface CodeServiceResponse {
  success?: boolean;
  message?: string;
  [key: string]: unknown;
}

function trace(step: string, details?: unknown) {
  if (!import.meta.env.DEV) return;
  if (details !== undefined) {
    console.log(`[codeService] ${step}`, details);
    return;
  }
  console.log(`[codeService] ${step}`);
}


async function getSessionOrThrow() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error || !session) {
    throw new Error("You are not logged in. Please sign in again.");
  }
  return session;
}

async function getUserEmailOrThrow() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user?.email) {
    throw new Error("Unable to resolve your account email. Please sign in again.");
  }
  return user.email;
}

export async function applyPromoCode(promocode: string): Promise<CodeServiceResponse> {
  const email = await getUserEmailOrThrow();
  const endpoint = `${CODE_SERVICE_URL}/api/promo/apply`;
  trace("applyPromoCode:start", { endpoint, email, hasPromocode: Boolean(promocode?.trim()) });

  try {
    const response = await axios.post<CodeServiceResponse>(
      endpoint,
      { email, promocode },
      { validateStatus: () => true }
    );
    const data = response.data || {};
    trace("applyPromoCode:response", data);
    trace("applyPromoCode:status", response.status);
    return data;
  } catch (error) {
    if (axios.isAxiosError<CodeServiceResponse>(error)) {
      trace("applyPromoCode:axios-error", {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
      });
      throw new Error(error.response?.data?.message || "Invalid access code.");
    }
    trace("applyPromoCode:error", error);
    throw error;
  }
}

export async function checkPremiumAccess(): Promise<CodeServiceResponse> {
  const session = await getSessionOrThrow();
  const email = await getUserEmailOrThrow();
  const endpoint = `${CODE_SERVICE_URL}/api/premium-feature`;
  trace("checkPremiumAccess:start", { endpoint, email });

  try {
    const response = await axios.post<CodeServiceResponse>(
      endpoint,
      { email },
      {
        validateStatus: () => true,
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    );
    const data = response.data || {};
    trace("checkPremiumAccess:response", { status: response.status, body: data });
    return data;
  } catch (error) {
    if (axios.isAxiosError<CodeServiceResponse>(error)) {
      const message = error.response?.data?.message || "Your plan is expired. Please subscribe.";
      trace("checkPremiumAccess:axios-error", {
        status: error.response?.status,
        message,
      });
      throw new Error(message);
    }
    trace("checkPremiumAccess:error", error);
    throw error;
  }
}

export async function redirectToProductWithSession() {
  const session = await getSessionOrThrow();
  trace("redirectToProductWithSession:start", {
    productUrl: PRODUCT_APP_URL,
    hasAccessToken: Boolean(session.access_token),
  });

  const hash = new URLSearchParams({
    access_token: session.access_token,
    refresh_token: session.refresh_token || "",
    token_type: session.token_type,
    expires_in: String(session.expires_in),
    expires_at: String(session.expires_at),
  });

  const normalizedProductUrl = PRODUCT_APP_URL.replace(/\/+$/, "");
  const redirectTarget = `${normalizedProductUrl}${PRODUCT_AUTH_CALLBACK_PATH}#${hash.toString()}`;
  trace("redirectToProductWithSession:target", redirectTarget);
  window.location.href = redirectTarget;
}
