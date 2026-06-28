/* ------------------------------------------------------------------ */
/*  Admin API service layer                                           */
/*  All calls use the admin JWT from localStorage                     */
/* ------------------------------------------------------------------ */

import type { AdminMerchant } from "@/types";

const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:4000";

function getAdminToken(): string | null {
  return localStorage.getItem("wrappay_admin_token");
}

async function adminFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getAdminToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> ?? {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Request failed (${res.status})`);
  }

  return res.json() as Promise<T>;
}

/* ------------------------------------------------------------------ */
/*  Merchant Listing                                                   */
/* ------------------------------------------------------------------ */

/** GET /admin/merchants — fetch all merchants enriched with API key status */
export const adminGetMerchants = (): Promise<{ merchants: AdminMerchant[] }> =>
  adminFetch<{ merchants: AdminMerchant[] }>("/admin/merchants");

/* ------------------------------------------------------------------ */
/*  Merchant Verification                                              */
/* ------------------------------------------------------------------ */

/** PATCH /admin/verify/:merchantId — verify a pending merchant */
export const adminVerifyMerchant = (
  merchantId: string
): Promise<{ message: string; merchant: AdminMerchant }> =>
  adminFetch<{ message: string; merchant: AdminMerchant }>(
    `/admin/verify/${merchantId}`,
    { method: "PATCH" }
  );

/** PATCH /admin/reject/:merchantId — reject a pending merchant */
export const adminRejectMerchant = (
  merchantId: string,
  reason?: string
): Promise<{ message: string; merchant: AdminMerchant }> =>
  adminFetch<{ message: string; merchant: AdminMerchant }>(
    `/admin/reject/${merchantId}`,
    { method: "PATCH", body: JSON.stringify({ reason: reason ?? "Rejected by admin" }) }
  );

/* ------------------------------------------------------------------ */
/*  API Key Management                                                 */
/* ------------------------------------------------------------------ */

/** POST /admin/merchants/:merchantId/revoke-key — admin revokes a merchant's API key */
export const adminRevokeApiKey = (
  merchantId: string
): Promise<{ success: boolean; message: string }> =>
  adminFetch<{ success: boolean; message: string }>(
    `/admin/merchants/${merchantId}/revoke-key`,
    { method: "POST" }
  );
