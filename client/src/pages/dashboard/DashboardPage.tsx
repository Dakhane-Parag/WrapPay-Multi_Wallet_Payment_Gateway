import { useState, useEffect, useMemo } from "react";
import {
  TrendingUp,
  Activity,
  Hash,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ChevronDown,
  Eye,
  X,
  Copy,
  Wallet,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getMerchantPayments, getMerchantId } from "@/lib/api";
import type { PaymentIntent } from "@/types";

/* ------------------------------------------------------------------ */
/*  Date filter helpers                                               */
/* ------------------------------------------------------------------ */
type DateRange = "7d" | "30d" | "90d" | "all";

const dateLabels: Record<DateRange, string> = {
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  "90d": "Last 90 days",
  all: "All time",
};

function filterByRange(payments: PaymentIntent[], range: DateRange) {
  if (range === "all") return payments;
  const days = range === "7d" ? 7 : range === "30d" ? 30 : 90;
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return payments.filter((p) => new Date(p.createdAt) >= cutoff);
}

/* ------------------------------------------------------------------ */
/*  Status badge component                                            */
/* ------------------------------------------------------------------ */
function StatusBadge({ status }: { status: PaymentIntent["status"] }) {
  const styles: Record<string, string> = {
    confirmed: "bg-[rgb(88,196,186)]/15 text-[rgb(88,196,186)] border-[rgb(88,196,186)]/20",
    broadcasted: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    created: "bg-gray-500/15 text-gray-400 border-gray-500/20",
    failed: "bg-red-500/15 text-red-400 border-red-500/20",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[status] ?? styles.created}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Truncate helper                                                   */
/* ------------------------------------------------------------------ */
function truncate(str: string, len = 8) {
  if (!str) return "—";
  if (str.length <= len * 2) return str;
  return `${str.slice(0, len)}...${str.slice(-4)}`;
}

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                         */
/* ------------------------------------------------------------------ */
const DashboardPage = () => {
  const [payments, setPayments] = useState<PaymentIntent[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange>("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState<PaymentIntent | null>(null);
  const [copied, setCopied] = useState(false);

  /* Fetch payments */
  useEffect(() => {
    const merchantId = getMerchantId();
    if (!merchantId) {
      setLoading(false);
      return;
    }

    getMerchantPayments(merchantId)
      .then((data) => setPayments(Array.isArray(data) ? data : []))
      .catch(() => setPayments([]))
      .finally(() => setLoading(false));
  }, []);

  /* Filtered list */
  const filtered = useMemo(() => filterByRange(payments, dateRange), [payments, dateRange]);

  /* Metrics computed from ALL payments */
  const metrics = useMemo(() => {
    const total = payments.length;
    const confirmed = payments.filter((p) => p.status === "confirmed").length;
    const failed = payments.filter((p) => p.status === "failed").length;
    const pending = payments.filter(
      (p) => p.status === "created" || p.status === "broadcasted"
    ).length;
    const totalVolume = payments
      .filter((p) => p.status === "confirmed")
      .reduce((sum, p) => sum + Number(p.amount), 0);
    const now = new Date();
    const thisMonthVolume = payments
      .filter(
        (p) =>
          p.status === "confirmed" &&
          new Date(p.createdAt).getMonth() === now.getMonth() &&
          new Date(p.createdAt).getFullYear() === now.getFullYear()
      )
      .reduce((sum, p) => sum + Number(p.amount), 0);
    const successRate = total > 0 ? ((confirmed / total) * 100).toFixed(1) : "0.0";

    return { totalVolume, thisMonthVolume, total, successRate, pending, failed };
  }, [payments]);

  /* Copy helper */
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  /* ---- Metric item helper ---- */
  const MetricItem = ({
    icon: Icon,
    label,
    value,
    accent,
  }: {
    icon: React.ElementType;
    label: string;
    value: string | number;
    accent?: string;
  }) => (
    <div className="flex items-center gap-4 min-w-0">
      <div
        className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: `${accent ?? "rgb(88,196,186)"}20` }}
      >
        <Icon className="w-5 h-5" style={{ color: accent ?? "rgb(88,196,186)" }} />
      </div>
      <div className="min-w-0">
        <p className="text-[13px] text-white/40 truncate">{label}</p>
        <p className="text-xl font-bold text-white tracking-tight">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 max-w-[1200px] mx-auto">
      {/* Page heading */}
      <div>
        <h1
          className="text-2xl md:text-3xl font-bold text-white"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Dashboard
        </h1>
        <p className="text-white/40 text-sm mt-1">
          Overview of your payment activity
        </p>
      </div>

      {/* ===== METRICS STRIP ===== */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl bg-[#0d1717] border border-white/5 p-6 md:p-8"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          <MetricItem
            icon={TrendingUp}
            label="Total Volume"
            value={`$${metrics.totalVolume.toLocaleString()}`}
          />
          <div className="hidden lg:block w-px bg-white/5 h-14 self-center" />
          <MetricItem
            icon={Activity}
            label="This Month"
            value={`$${metrics.thisMonthVolume.toLocaleString()}`}
          />
          <div className="hidden lg:block w-px bg-white/5 h-14 self-center" />
          <MetricItem
            icon={Hash}
            label="Transactions"
            value={metrics.total}
          />
          <div className="hidden lg:block w-px bg-white/5 h-14 self-center" />
          <MetricItem
            icon={CheckCircle2}
            label="Success Rate"
            value={`${metrics.successRate}%`}
            accent="#34d399"
          />
          <div className="hidden lg:block w-px bg-white/5 h-14 self-center" />
          <MetricItem
            icon={Clock}
            label="Pending"
            value={metrics.pending}
            accent="#fbbf24"
          />
          <div className="hidden lg:block w-px bg-white/5 h-14 self-center" />
          <MetricItem
            icon={AlertTriangle}
            label="Failed"
            value={metrics.failed}
            accent="#f87171"
          />
        </div>
      </motion.div>

      {/* ===== PAYMENT HISTORY ===== */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="rounded-2xl bg-[#0d1717] border border-white/5"
      >
        {/* Header + filter */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
          <h2
            className="text-lg font-bold text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Payment History
          </h2>

          {/* Date range dropdown */}
          <div className="relative">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white/70 hover:text-white hover:bg-white/10 transition"
            >
              {dateLabels[dateRange]}
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  filterOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {filterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="absolute right-0 mt-2 w-44 bg-[#0d1717] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-30"
                >
                  {(Object.keys(dateLabels) as DateRange[]).map((key) => (
                    <button
                      key={key}
                      onClick={() => {
                        setDateRange(key);
                        setFilterOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition ${
                        dateRange === key
                          ? "bg-[rgb(88,196,186)]/10 text-[rgb(88,196,186)]"
                          : "text-white/60 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {dateLabels[key]}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-6 h-6 border-2 border-[rgb(88,196,186)] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-white/30 text-sm">
              No transactions found.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-white/30 text-xs uppercase tracking-wider border-b border-white/5">
                  <th className="text-left px-6 py-3 font-medium">Transaction ID</th>
                  <th className="text-left px-6 py-3 font-medium">Amount</th>
                  <th className="text-left px-6 py-3 font-medium">Currency</th>
                  <th className="text-left px-6 py-3 font-medium hidden md:table-cell">
                    Tx Hash
                  </th>
                  <th className="text-left px-6 py-3 font-medium">Status</th>
                  <th className="text-left px-6 py-3 font-medium hidden sm:table-cell">
                    Date
                  </th>
                  <th className="text-right px-6 py-3 font-medium" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((tx, i) => (
                  <motion.tr
                    key={tx._id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 py-4 font-mono text-white/70 text-xs">
                      {truncate(tx._id, 6)}
                    </td>
                    <td className="px-6 py-4 text-white font-semibold">
                      {Number(tx.amount).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-white/60 uppercase text-xs">
                      {tx.currency || "—"}
                    </td>
                    <td className="px-6 py-4 font-mono text-white/40 text-xs hidden md:table-cell">
                      {truncate(tx.blockchainTxHash ?? "", 6)}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={tx.status} />
                    </td>
                    <td className="px-6 py-4 text-white/40 text-xs hidden sm:table-cell">
                      {new Date(tx.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedTx(tx)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[rgb(88,196,186)] hover:bg-[rgb(88,196,186)]/10 transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Details
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </motion.div>

      {/* ===== CHANGE WALLET BUTTON ===== */}
      <div className="flex justify-end">
        <div className="relative group">
          <button
            disabled
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[rgb(88,196,186)]/30 text-[rgb(88,196,186)]/50 text-sm font-medium cursor-not-allowed"
          >
            <Wallet className="w-4 h-4" />
            Change Wallet
          </button>
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 rounded-lg bg-[#1a2e2e] text-white/70 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Coming soon
          </div>
        </div>
      </div>

      {/* ===== TRANSACTION DETAIL MODAL ===== */}
      <AnimatePresence>
        {selectedTx && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setSelectedTx(null)}
            />
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[440px] bg-[#0d1717] border-l border-white/5 z-50 overflow-y-auto shadow-2xl"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                <h3
                  className="text-lg font-bold text-white"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Transaction Details
                </h3>
                <button
                  onClick={() => setSelectedTx(null)}
                  className="text-white/40 hover:text-white transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Details */}
              <div className="px-6 py-6 space-y-5">
                <DetailRow label="Transaction ID" value={selectedTx._id} mono copyable onCopy={() => copyToClipboard(selectedTx._id)} />
                <DetailRow label="Amount" value={`${Number(selectedTx.amount).toLocaleString()} ${selectedTx.currency || ""}`} />
                <DetailRow label="Currency" value={selectedTx.currency || "—"} />
                <DetailRow label="Status">
                  <StatusBadge status={selectedTx.status} />
                </DetailRow>
                <DetailRow
                  label="Blockchain Tx Hash"
                  value={selectedTx.blockchainTxHash || "Not available"}
                  mono
                  copyable={!!selectedTx.blockchainTxHash}
                  onCopy={() =>
                    selectedTx.blockchainTxHash &&
                    copyToClipboard(selectedTx.blockchainTxHash)
                  }
                />
                <DetailRow
                  label="Confirmations"
                  value={String(selectedTx.confirmations ?? 0)}
                />
                <DetailRow
                  label="Created"
                  value={new Date(selectedTx.createdAt).toLocaleString("en-IN")}
                />
                <DetailRow
                  label="Updated"
                  value={new Date(selectedTx.updatedAt).toLocaleString("en-IN")}
                />
              </div>

              {copied && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="fixed bottom-6 right-6 px-4 py-2 rounded-lg bg-[rgb(88,196,186)] text-[#003f3f] text-sm font-semibold shadow-lg"
                >
                  Copied!
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ---- Detail row sub-component ---- */
function DetailRow({
  label,
  value,
  mono,
  copyable,
  onCopy,
  children,
}: {
  label: string;
  value?: string;
  mono?: boolean;
  copyable?: boolean;
  onCopy?: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs text-white/30 uppercase tracking-wider mb-1">{label}</p>
      {children || (
        <div className="flex items-center gap-2">
          <p
            className={`text-white/80 text-sm break-all ${
              mono ? "font-mono" : ""
            }`}
          >
            {value}
          </p>
          {copyable && onCopy && (
            <button
              onClick={onCopy}
              className="shrink-0 text-white/30 hover:text-[rgb(88,196,186)] transition"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
