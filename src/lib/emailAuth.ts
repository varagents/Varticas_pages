type AuthMode = "signup" | "login";
type ChallengeFlow = AuthMode | "password_reset";

interface ChallengeResponse {
  challengeId: string;
  flow: ChallengeFlow;
}

interface VerifyOtpResponse {
  tokens: {
    access_token: string;
    refresh_token: string;
    expires_at?: number;
  };
}

interface PasswordResetResponse {
  success: boolean;
  message: string;
}

const EMAIL_AUTH_API_URL =
  import.meta.env.VITE_EMAIL_AUTH_API_URL || "http://localhost:3002";

function buildUrl(path: string): string {
  return `${EMAIL_AUTH_API_URL.replace(/\/+$/, "")}${path}`;
}

async function parseError(response: Response): Promise<Error> {
  try {
    const data = (await response.json()) as { error?: string };
    return new Error(data.error || "Request failed");
  } catch {
    return new Error("Request failed");
  }
}

export async function requestOtp(
  mode: AuthMode,
  email: string,
  password: string,
): Promise<ChallengeResponse> {
  const endpoint =
    mode === "signup"
      ? "/api/email-auth/signup/request-otp"
      : "/api/email-auth/login/request-otp";

  const response = await fetch(buildUrl(endpoint), {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw await parseError(response);
  }

  return (await response.json()) as ChallengeResponse;
}

export async function resendOtp(
  mode: AuthMode,
  challengeId: string,
): Promise<void> {
  const endpoint =
    mode === "signup"
      ? "/api/email-auth/signup/resend-otp"
      : "/api/email-auth/login/resend-otp";

  const response = await fetch(buildUrl(endpoint), {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ challengeId }),
  });

  if (!response.ok) {
    throw await parseError(response);
  }
}

export async function verifyOtp(
  email: string,
  password: string,
  otp: string,
  challengeId: string,
): Promise<VerifyOtpResponse> {
  const response = await fetch(buildUrl("/api/email-auth/verify-otp"), {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, otp, challengeId }),
  });

  if (!response.ok) {
    throw await parseError(response);
  }

  return (await response.json()) as VerifyOtpResponse;
}

export async function requestPasswordResetOtp(
  email: string,
): Promise<ChallengeResponse> {
  const response = await fetch(buildUrl("/api/email-auth/password-reset/request-otp"), {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw await parseError(response);
  }

  return (await response.json()) as ChallengeResponse;
}

export async function resendPasswordResetOtp(
  challengeId: string,
): Promise<void> {
  const response = await fetch(buildUrl("/api/email-auth/password-reset/resend-otp"), {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ challengeId }),
  });

  if (!response.ok) {
    throw await parseError(response);
  }
}

export async function confirmPasswordReset(
  email: string,
  otp: string,
  challengeId: string,
  newPassword: string,
): Promise<PasswordResetResponse> {
  const response = await fetch(buildUrl("/api/email-auth/password-reset/confirm"), {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, otp, challengeId, newPassword }),
  });

  if (!response.ok) {
    throw await parseError(response);
  }

  return (await response.json()) as PasswordResetResponse;
}
