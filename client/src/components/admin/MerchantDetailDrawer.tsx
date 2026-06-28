import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Building2,
  Globe,
  Phone,
  Wallet,
  ShieldCheck,
  ShieldX,
  Clock,
  Hash,
  Key,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import type { AdminMerchant, MerchantStatus } from "@/types";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function fmt(date?: string | null): string {
  if (!date) return "—";
  return new Date(date).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function StatusBadge({ status }: { status: MerchantStatus }) {
  const map: Record<MerchantStatus, { bg: string; text: string; dot: string }> = {
    Verified: {
      bg: "bg-emerald-500/10 border border-emerald-500/20",
      text: "text-emerald-400",
      dot: "bg-emerald-400",
    },
    Pending: {
      bg: "bg-amber-500/10 border border-amber-500/20",
      text: "text-amber-400",
      dot: "bg-amber-400",
    },
    Rejected: {
      bg: "bg-red-500/10 border border-red-500/20",
      text: "text-red-400",
      dot: "bg-red-400",
    },
  };

  const s = map[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
}

function DetailRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] uppercase tracking-widest text-white/30 font-medium">{label}</span>
      <span className="text-sm text-white/80 font-mono break-all">{value || "—"}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

interface Props {
  merchant: AdminMerchant | null;
  status: MerchantStatus;
  onClose: () => void;
}

export default function MerchantDetailDrawer({ merchant, status, onClose }: Props) {
  const v = merchant?.verification;

  return (
    <AnimatePresence>
      {merchant && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0b1a1a] border-l border-white/8 z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-[#0b1a1a] border-b border-white/8 px-6 py-4 flex items-start justify-between gap-4 z-10">
              <div>
                <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Merchant Detail</p>
                <h2 className="text-white font-bold text-lg leading-tight">
                  {merchant.businessName}
                </h2>
                <p className="text-white/40 text-sm">{merchant.email?.email}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0 mt-1">
                <StatusBadge status={status} />
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">

              {/* Business Info */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="w-4 h-4 text-[rgb(88,196,186)]" />
                  <h3 className="text-white/70 text-xs font-semibold uppercase tracking-widest">Business Info</h3>
                </div>
                <div className="bg-white/3 rounded-xl border border-white/6 p-4 grid grid-cols-1 gap-3">
                  <DetailRow label="Merchant ID" value={merchant.MerchantID} />
                  <DetailRow label="Business Name" value={merchant.businessName} />
                  <DetailRow label="Business URL" value={merchant.businessUrl} />
                  <DetailRow label="Phone" value={merchant.phone} />
                  <DetailRow label="Joined" value={fmt(merchant.createdAt)} />
                </div>
              </section>

              {/* Contact */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-4 h-4 text-[rgb(88,196,186)]" />
                  <h3 className="text-white/70 text-xs font-semibold uppercase tracking-widest">Contact</h3>
                </div>
                <div className="bg-white/3 rounded-xl border border-white/6 p-4 grid grid-cols-1 gap-3">
                  <DetailRow label="Email" value={merchant.email?.email} />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] uppercase tracking-widest text-white/30 font-medium">Email Verified</span>
                    <span className={`text-sm font-semibold ${merchant.email?.isVerified ? "text-emerald-400" : "text-amber-400"}`}>
                      {merchant.email?.isVerified ? "✓ Verified" : "✗ Not verified"}
                    </span>
                  </div>
                </div>
              </section>

              {/* Wallet */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Wallet className="w-4 h-4 text-[rgb(88,196,186)]" />
                  <h3 className="text-white/70 text-xs font-semibold uppercase tracking-widest">Wallet</h3>
                </div>
                <div className="bg-white/3 rounded-xl border border-white/6 p-4 grid grid-cols-1 gap-3">
                  <DetailRow label="Address" value={merchant.wallet?.address} />
                  <DetailRow label="Chain" value={merchant.wallet?.chain} />
                </div>
              </section>

              {/* Verification */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  {v?.isVerified
                    ? <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    : <ShieldX className="w-4 h-4 text-amber-400" />}
                  <h3 className="text-white/70 text-xs font-semibold uppercase tracking-widest">KYC / Verification</h3>
                </div>
                <div className="bg-white/3 rounded-xl border border-white/6 p-4 grid grid-cols-1 gap-3">
                  <DetailRow label="KYC Status" value={status} />
                  {v?.verifiedAt && <DetailRow label="Verified At" value={fmt(v.verifiedAt)} />}
                  {v?.rejectedAt && <DetailRow label="Rejected At" value={fmt(v.rejectedAt)} />}
                  <DetailRow label="On-chain Registered" value={v?.onChainRegistered ? "Yes" : "No"} />
                  {v?.registrationTxHash && v.registrationTxHash !== "N/A" && (
                    <DetailRow label="Tx Hash" value={v.registrationTxHash} />
                  )}
                  {v?.chain && v.chain !== "N/A" && (
                    <DetailRow label="Chain" value={v.chain} />
                  )}
                </div>
              </section>

              {/* API Key */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Key className="w-4 h-4 text-[rgb(88,196,186)]" />
                  <h3 className="text-white/70 text-xs font-semibold uppercase tracking-widest">API Key</h3>
                </div>
                <div className="bg-white/3 rounded-xl border border-white/6 p-4">
                  {merchant.apiKey ? (
                    <div className="space-y-3">
                      <DetailRow label="Key Preview" value={merchant.apiKey.keyPreview} />
                      <DetailRow label="Created" value={fmt(merchant.apiKey.createdAt)} />
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] uppercase tracking-widest text-white/30 font-medium">Status</span>
                        {merchant.apiKey.revoked ? (
                          <span className="inline-flex items-center gap-1.5 text-red-400 text-sm font-semibold">
                            <AlertCircle className="w-3.5 h-3.5" /> Revoked
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-emerald-400 text-sm font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Active
                          </span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p className="text-white/30 text-sm italic">No API key generated yet</p>
                  )}
                </div>
              </section>

            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
