/* ------------------------------------------------------------------ */
/*  Centralised API helper — all backend calls go through here        */
/* ------------------------------------------------------------------ */

import type {
  MerchantProfile,
  AuthResponse,
  PaymentIntent,
  ApiKeyStatus,
  ApiKeyCreateResponse,
  OnboardingData,
} from "@/types";

const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:4000";

/* ---------- token helpers ----------------------------------------- */

export const getToken = (): string | null => localStorage.getItem("wrappay_token");

export const setToken = (token: string) => localStorage.setItem("wrappay_token", token);

export const clearToken = () => localStorage.removeItem("wrappay_token");

export const getMerchantId = (): string | null => {
  const raw = localStorage.getItem("wrappay_merchant");
  if (!raw) return null;
  try {
    return JSON.parse(raw).MerchantID ?? null;
  } catch {
    return null;
  }
};

export const setMerchantData = (merchant: Record<string, unknown>) =>
  localStorage.setItem("wrappay_merchant", JSON.stringify(merchant));

export const clearMerchantData = () => localStorage.removeItem("wrappay_merchant");

/* ---------- fetch wrapper ----------------------------------------- */

async function authFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> ?? {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Request failed (${res.status})`);
  }

  return res.json() as Promise<T>;
}

/* ---------- Auth -------------------------------------------------- */

export const loginWithGoogle = (googleToken: string) =>
  authFetch<AuthResponse>("/auth/google", {
    method: "POST",
    body: JSON.stringify({ token: googleToken }),
  });

export const signupWithEmail = (data: {
  businessName: string;
  email: string;
  password: string;
}) =>
  authFetch<{ message: string; merchant: Record<string, unknown> }>(
    "/auth/signup/email",
    { method: "POST", body: JSON.stringify(data) },
  );

export const loginWithEmail = (email: string, password: string) =>
  authFetch<AuthResponse>("/auth/login/email", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

/* ---------- Merchant profile -------------------------------------- */

export const getProfile = () =>
  authFetch<{ merchant: MerchantProfile }>("/merchant/profile");

export const submitOnboarding = (data: OnboardingData) =>
  authFetch<{ message: string; merchant: Record<string, unknown> }>(
    "/merchant/onboarding",
    { method: "POST", body: JSON.stringify(data) },
  );

/* ---------- Payments ---------------------------------------------- */

export const getMerchantPayments = (merchantId: string) =>
  authFetch<PaymentIntent[]>(`/payments/merchant/${merchantId}`);

export const getPaymentById = (id: string) =>
  authFetch<PaymentIntent>(`/payments/${id}`);

/* ---------- API Keys ---------------------------------------------- */

export const getApiKeyStatus = () =>
  authFetch<ApiKeyStatus>("/developer/getKeyStatus");

export const createApiKey = () =>
  authFetch<ApiKeyCreateResponse>("/developer/newKey", { method: "POST" });

export const deleteApiKey = () =>
  authFetch<{ success: boolean }>("/developer/deleteKey", { method: "DELETE" });

/* ================================================================== */
/*  ADMIN                                                             */
/* ================================================================== */

/* ---------- admin token helpers ----------------------------------- */

export const getAdminToken = (): string | null =>
  localStorage.getItem("wrappay_admin_token");

export const setAdminToken = (token: string) =>
  localStorage.setItem("wrappay_admin_token", token);

export const clearAdminToken = () =>
  localStorage.removeItem("wrappay_admin_token");

export const setAdminData = (admin: Record<string, unknown>) =>
  localStorage.setItem("wrappay_admin", JSON.stringify(admin));

export const clearAdminData = () =>
  localStorage.removeItem("wrappay_admin");

/* ---------- admin fetch wrapper ----------------------------------- */

async function adminFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getAdminToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> ?? {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Request failed (${res.status})`);
  }

  return res.json() as Promise<T>;
}

/* ---------- Admin auth -------------------------------------------- */

export const adminSignup = (data: { name: string; email: string; password: string }) =>
  adminFetch<{ message: string }>("/admin/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const adminLogin = (email: string, password: string) =>
  adminFetch<{ message: string; token: string; admin: { id: string; name: string; email: string } }>(
    "/admin/login",
    { method: "POST", body: JSON.stringify({ email, password }) },
  );

/* ---------- Admin actions ----------------------------------------- */

export const adminVerifyMerchant = (merchantId: string) =>
  adminFetch<{ message: string; merchant: Record<string, unknown> }>(
    `/admin/verify/${merchantId}`,
    { method: "PATCH" },
  );

export const adminRevokeKey = (merchantId: string) =>
  adminFetch<{ success: boolean }>("/developer/revokeKey", {
    method: "POST",
    body: JSON.stringify({ merchantId }),
  });
