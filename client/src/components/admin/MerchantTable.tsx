import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  KeyRound,
  ChevronRight,
  Loader2,
  RefreshCw,
  Search,
  AlertCircle,
  ShieldOff,
} from "lucide-react";
import type { AdminMerchant, MerchantStatus } from "@/types";
import { adminVerifyMerchant, adminRejectMerchant, adminRevokeApiKey } from "@/api/admin";
import MerchantDetailDrawer from "@/components/admin/MerchantDetailDrawer";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function deriveStatus(m: AdminMerchant): MerchantStatus {
  if (m.verification?.isVerified) return "Verified";
  if (m.verification?.rejectedAt) return "Rejected";
  return "Pending";
}

function fmt(date?: string | null): string {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-IN", { dateStyle: "medium" });
}

/* ------------------------------------------------------------------ */
/*  Status Badge                                                       */
/* ------------------------------------------------------------------ */

function StatusBadge({ status }: { status: MerchantStatus }) {
  const styles: Record<MerchantStatus, string> = {
    Verified: "bg-emerald-500/10 border border-emerald-500/25 text-emerald-400",
    Pending:  "bg-amber-500/10  border border-amber-500/25  text-amber-400",
    Rejected: "bg-red-500/10   border border-red-500/25   text-red-400",
  };
  const dots: Record<MerchantStatus, string> = {
    Verified: "bg-emerald-400",
    Pending:  "bg-amber-400",
    Rejected: "bg-red-400",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${dots[status]}`} />
      {status}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Toast (inline notification)                                        */
/* ------------------------------------------------------------------ */

interface Toast { id: number; type: "success" | "error"; msg: string }

function ToastBar({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: number) => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 items-end pointer-events-none">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium shadow-2xl border ${
              t.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
                : "bg-red-500/10 border-red-500/20 text-red-300"
            }`}
          >
            {t.type === "success" ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
            {t.msg}
            <button onClick={() => onRemove(t.id)} className="ml-1 opacity-60 hover:opacity-100 transition pointer-events-auto">✕</button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Action Button                                                      */
/* ------------------------------------------------------------------ */

function ActionBtn({
  onClick,
  loading,
  disabled,
  icon: Icon,
  label,
  colorClass,
}: {
  onClick: () => void;
  loading: boolean;
  disabled: boolean;
  icon: React.ElementType;
  label: string;
  colorClass: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      title={label}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition
        disabled:opacity-40 disabled:cursor-not-allowed ${colorClass}`}
    >
      {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Icon className="w-3.5 h-3.5" />}
      {label}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Merchant Row                                                       */
/* ------------------------------------------------------------------ */

interface RowProps {
  merchant: AdminMerchant;
  onUpdate: (updated: AdminMerchant) => void;
  onShowDetail: (m: AdminMerchant) => void;
  addToast: (type: "success" | "error", msg: string) => void;
}

function MerchantRow({ merchant, onUpdate, onShowDetail, addToast }: RowProps) {
  const [verifyLoading,  setVerifyLoading]  = useState(false);
  const [rejectLoading,  setRejectLoading]  = useState(false);
  const [revokeLoading,  setRevokeLoading]  = useState(false);

  const status = deriveStatus(merchant);
  const anyLoading = verifyLoading || rejectLoading || revokeLoading;

  const handleVerify = async () => {
    setVerifyLoading(true);
    try {
      const res = await adminVerifyMerchant(merchant._id);
      const updated: AdminMerchant = {
        ...merchant,
        verification: { ...(merchant.verification || {}), isVerified: true, verifiedAt: new Date().toISOString() },
      };
      onUpdate(updated);
      addToast("success", res.message || "Merchant verified!");
    } catch (err) {
      addToast("error", err instanceof Error ? err.message : "Verification failed.");
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleReject = async () => {
    setRejectLoading(true);
    try {
      const res = await adminRejectMerchant(merchant._id);
      const updated: AdminMerchant = {
        ...merchant,
        verification: {
          ...(merchant.verification || {}),
          isVerified: false,
          rejectedAt: new Date().toISOString(),
        },
      };
      onUpdate(updated);
      addToast("success", res.message || "Merchant rejected.");
    } catch (err) {
      addToast("error", err instanceof Error ? err.message : "Rejection failed.");
    } finally {
      setRejectLoading(false);
    }
  };

  const handleRevoke = async () => {
    setRevokeLoading(true);
    try {
      await adminRevokeApiKey(merchant._id);
      const updated: AdminMerchant = {
        ...merchant,
        apiKey: merchant.apiKey ? { ...merchant.apiKey, revoked: true } : null,
      };
      onUpdate(updated);
      addToast("success", "API key revoked.");
    } catch (err) {
      addToast("error", err instanceof Error ? err.message : "Revoke failed.");
    } finally {
      setRevokeLoading(false);
    }
  };

  return (
    <motion.tr
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group"
    >
      {/* Name + email */}
      <td className="px-4 py-3.5">
        <div className="font-medium text-white text-sm">{merchant.businessName}</div>
        <div className="text-white/40 text-xs">{merchant.email?.email}</div>
      </td>

      {/* Status */}
      <td className="px-4 py-3.5">
        <StatusBadge status={status} />
      </td>

      {/* Wallet */}
      <td className="px-4 py-3.5 hidden lg:table-cell">
        {merchant.wallet?.address ? (
          <span className="font-mono text-xs text-white/50 truncate max-w-[120px] block">
            {merchant.wallet.address.slice(0, 8)}…{merchant.wallet.address.slice(-6)}
          </span>
        ) : (
          <span className="text-white/25 text-xs italic">No wallet</span>
        )}
      </td>

      {/* API Key */}
      <td className="px-4 py-3.5 hidden md:table-cell">
        {merchant.apiKey ? (
          <span className={`font-mono text-xs ${merchant.apiKey.revoked ? "text-red-400/70 line-through" : "text-white/60"}`}>
            {merchant.apiKey.keyPreview}
          </span>
        ) : (
          <span className="text-white/25 text-xs italic">None</span>
        )}
      </td>

      {/* Joined */}
      <td className="px-4 py-3.5 hidden xl:table-cell">
        <span className="text-white/40 text-xs">{fmt(merchant.createdAt)}</span>
      </td>

      {/* Actions */}
      <td className="px-4 py-3.5">
        <div className="flex flex-wrap items-center gap-1.5">
          {/* Verify — only for Pending */}
          {status === "Pending" && (
            <ActionBtn
              onClick={handleVerify}
              loading={verifyLoading}
              disabled={anyLoading}
              icon={CheckCircle2}
              label="Verify"
              colorClass="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20"
            />
          )}

          {/* Reject — for Pending only */}
          {status === "Pending" && (
            <ActionBtn
              onClick={handleReject}
              loading={rejectLoading}
              disabled={anyLoading}
              icon={XCircle}
              label="Reject"
              colorClass="bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20"
            />
          )}

          {/* Revoke Key — only if key exists and not already revoked */}
          {merchant.apiKey && !merchant.apiKey.revoked && (
            <ActionBtn
              onClick={handleRevoke}
              loading={revokeLoading}
              disabled={anyLoading}
              icon={ShieldOff}
              label="Revoke Key"
              colorClass="bg-orange-500/10 border border-orange-500/20 text-orange-400 hover:bg-orange-500/20"
            />
          )}

          {/* Revoked badge */}
          {merchant.apiKey?.revoked && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs text-red-400/60 border border-red-500/10 bg-red-500/5">
              <KeyRound className="w-3 h-3" /> Revoked
            </span>
          )}

          {/* View details */}
          <button
            onClick={() => onShowDetail(merchant)}
            className="ml-auto hidden group-hover:inline-flex items-center gap-1 text-xs text-white/40 hover:text-[rgb(88,196,186)] transition"
          >
            Details <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </td>
    </motion.tr>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Merchant Table                                                */
/* ------------------------------------------------------------------ */

interface Props {
  merchants: AdminMerchant[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  onUpdate: (updated: AdminMerchant) => void;
}

export default function MerchantTable({ merchants, loading, error, onRefresh, onUpdate }: Props) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<MerchantStatus | "All">("All");
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [drawerMerchant, setDrawerMerchant] = useState<AdminMerchant | null>(null);

  let toastId = 0;

  const addToast = (type: "success" | "error", msg: string) => {
    const id = ++toastId;
    setToasts(prev => [...prev, { id, type, msg }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  const removeToast = (id: number) => setToasts(prev => prev.filter(t => t.id !== id));

  const filtered = merchants.filter(m => {
    const s = deriveStatus(m);
    const matchStatus = statusFilter === "All" || s === statusFilter;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      m.businessName?.toLowerCase().includes(q) ||
      m.email?.email?.toLowerCase().includes(q) ||
      m.MerchantID?.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const counts: Record<MerchantStatus | "All", number> = {
    All:      merchants.length,
    Pending:  merchants.filter(m => deriveStatus(m) === "Pending").length,
    Verified: merchants.filter(m => deriveStatus(m) === "Verified").length,
    Rejected: merchants.filter(m => deriveStatus(m) === "Rejected").length,
  };

  return (
    <>
      <ToastBar toasts={toasts} onRemove={removeToast} />

      {drawerMerchant && (
        <MerchantDetailDrawer
          merchant={drawerMerchant}
          status={deriveStatus(drawerMerchant)}
          onClose={() => setDrawerMerchant(null)}
        />
      )}

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-4">
        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, email, ID…"
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(88,196,186)] transition"
          />
        </div>

        {/* Status filters */}
        <div className="flex items-center gap-2 flex-wrap">
          {(["All", "Pending", "Verified", "Rejected"] as const).map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                statusFilter === s
                  ? s === "All"        ? "bg-white/10 border-white/20 text-white"
                  : s === "Pending"    ? "bg-amber-500/15 border-amber-500/30 text-amber-400"
                  : s === "Verified"   ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                  :                      "bg-red-500/15 border-red-500/30 text-red-400"
                  : "bg-transparent border-white/8 text-white/40 hover:border-white/20 hover:text-white/70"
              }`}
            >
              {s} <span className="opacity-60">({counts[s]})</span>
            </button>
          ))}

          <button
            onClick={onRefresh}
            disabled={loading}
            className="ml-1 w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition disabled:opacity-40"
            title="Refresh"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-white/8 overflow-hidden bg-[#0d1717]">
        {/* Loading overlay */}
        {loading && (
          <div className="flex items-center justify-center py-16 gap-3 text-white/40">
            <Loader2 className="w-5 h-5 animate-spin text-[rgb(88,196,186)]" />
            <span className="text-sm">Loading merchants…</span>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-red-400/70">
            <AlertCircle className="w-6 h-6" />
            <p className="text-sm">{error}</p>
            <button
              onClick={onRefresh}
              className="text-xs underline text-[rgb(88,196,186)] hover:opacity-80"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-2 text-white/25">
            <Search className="w-6 h-6" />
            <p className="text-sm">
              {merchants.length === 0 ? "No merchants found" : "No merchants match your filters"}
            </p>
          </div>
        )}

        {/* Data */}
        {!loading && !error && filtered.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/8 text-white/30 text-xs uppercase tracking-widest">
                  <th className="px-4 py-3 font-medium">Merchant</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium hidden lg:table-cell">Wallet</th>
                  <th className="px-4 py-3 font-medium hidden md:table-cell">API Key</th>
                  <th className="px-4 py-3 font-medium hidden xl:table-cell">Joined</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence initial={false}>
                  {filtered.map(m => (
                    <MerchantRow
                      key={m._id}
                      merchant={m}
                      onUpdate={updated => onUpdate(updated)}
                      onShowDetail={setDrawerMerchant}
                      addToast={addToast}
                    />
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {!loading && !error && filtered.length > 0 && (
        <p className="text-right text-white/25 text-xs mt-2">
          Showing {filtered.length} of {merchants.length} merchants
        </p>
      )}
    </>
  );
}
