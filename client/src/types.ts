/* ------------------------------------------------------------------ */
/*  Shared TypeScript types matching backend models                   */
/* ------------------------------------------------------------------ */

export interface MerchantWallet {
  address: string;
  chain: string; // "ethereum" | "solana" | "polygon"
}

export interface MerchantVerification {
  isVerified: boolean;
  verifiedBy?: string;
  verifiedAt?: string;
}

export interface MerchantProfile {
  MerchantID: string;
  businessName: string | null;
  businessUrl: string | null;
  phone: string | null;
  email: string | null;
  wallet: MerchantWallet | null;
  verification: MerchantVerification;
  kycVerified: boolean;
  createdAt: string | null;
}

export interface AuthMerchant {
  id: string;
  MerchantID: string;
  businessName: string;
  email: string;
  emailVerified?: boolean;
  kycVerified: boolean;
}

export interface AuthResponse {
  message: string;
  token: string;
  merchant: AuthMerchant;
}

/** PaymentIntent from backend (matches PaymentIntent mongoose model) */
export interface PaymentIntent {
  _id: string;
  merchantId: string;
  amount: string;
  currency: string;
  blockchainTxHash?: string;
  confirmations: number;
  status: "created" | "broadcasted" | "confirmed" | "failed";
  createdAt: string;
  updatedAt: string;
}

/** Transaction model (older model, may still appear) */
export interface Transaction {
  _id: string;
  merchant: string;
  extHash: string;
  amount: number;
  currency: string;
  status: "pending" | "success" | "failed" | "refund";
  chain?: string;
  meta?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

/** API Key status from GET /developer/getKeyStatus */
export interface ApiKeyStatus {
  exists: boolean;
  preview?: string;
  revoked?: boolean;
  createdAt?: string;
}

/** API Key creation response from POST /developer/newKey */
export interface ApiKeyCreateResponse {
  success: boolean;
  apiKey: string; // shown once
}

/** Onboarding form data matching POST /merchant/onboarding */
export interface OnboardingData {
  businessName: string;
  businessUrl: string;
  phone: string;
  wallet: {
    address: string;
    chain: string;
  };
}
