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

/* Shape returned by GET /admin/merchants */
export interface AdminMerchantApiKey {
  keyPreview: string;
  revoked: boolean;
  createdAt: string;
}

export interface AdminMerchantEmail {
  email: string;
  isVerified: boolean;
}

export type MerchantStatus = 'Pending' | 'Verified' | 'Rejected';

export interface AdminMerchant {
  _id: string;
  MerchantID: string;
  businessName: string;
  businessUrl?: string;
  phone?: string;
  email: AdminMerchantEmail;
  wallet?: MerchantWallet;
  verification?: {
    isVerified: boolean;
    verifiedAt?: string;
    rejectedAt?: string;
    onChainRegistered?: boolean;
    registrationTxHash?: string;
    chain?: string;
  };
  apiKey?: AdminMerchantApiKey | null;
  createdAt: string;
  /** Derived client-side */
  status?: MerchantStatus;
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

/** Real on-chain confirmed transaction from GET /tx/merchant/:wallet */
export interface TransactionRecord {
  _id: string;
  merchant: string;       // wallet address
  customer?: string;      // wallet address
  sessionId?: string;
  transactionId?: string; // smart-contract level ID
  txHash: string;         // blockchain tx hash
  amountPaid: string;
  platformFee: string;
  merchantReceived: string;
  currency: string;
  chain: string;
  status: "pending" | "confirmed" | "failed" | "refund";
  createdAt: string;
  updatedAt: string;
}

/** Payment session from GET /session/:id or POST /session/create/new */
export interface PaymentSession {
  sessionId: string;
  merchantId: string;
  businessName: string;
  amount: string;
  currency: string;
  walletAddress: string;
  status: "pending" | "confirmed" | "failed" | "expired";
  expiresAt: string;
}

/** Response from POST /payments/verify */
export interface VerifyPaymentResponse {
  status: "confirmed" | "pending" | "failed" | "failure_recorded" | "error";
  txHash?: string;
  transactionId?: string;
  message?: string;
  payment?: {
    customer: string;
    merchant: string;
    amountPaid: string;
    platformFee: string;
    merchantReceived: string;
  };
}
