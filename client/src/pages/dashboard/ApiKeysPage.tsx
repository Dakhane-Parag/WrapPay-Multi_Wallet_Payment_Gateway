import { useState, useEffect } from "react";
import {
  KeyRound,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Copy,
  AlertTriangle,
  X,
  Check,
  Loader2,
  ShieldCheck,
  ShieldX,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getApiKeyStatus, createApiKey, deleteApiKey } from "@/lib/api";
import type { ApiKeyStatus } from "@/types";

const ApiKeysPage = () => {
  const [keyData, setKeyData] = useState<ApiKeyStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [revealed, setRevealed] = useState(false);

  /* Modal states */
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newKey, setNewKey] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  /* Fetch key status */
  const fetchStatus = () => {
    setLoading(true);
    getApiKeyStatus()
      .then((data) => setKeyData(data))
      .catch(() => setKeyData(null))
      .finally(() => setLoading(false));
  };

  useEffect(fetchStatus, []);

  /* Create key */
  const handleCreate = async () => {
    setCreating(true);
    setError("");
    try {
      const res = await createApiKey();
      setNewKey(res.apiKey);
      fetchStatus();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create key");
    } finally {
      setCreating(false);
    }
  };

  /* Delete key */
  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteApiKey();
      setKeyData(null);
      setShowDeleteModal(false);
      setRevealed(false);
    } catch {
      /* silent */
    } finally {
      setDeleting(false);
    }
  };

  /* Copy */
  const copyKey = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-8 max-w-[900px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1
            className="text-2xl md:text-3xl font-bold text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            API Keys
          </h1>
          <p className="text-white/40 text-sm mt-1">
            Manage your WrapPay API keys for payment integration
          </p>
        </div>

        <button
          onClick={() => {
            setNewKey(null);
            setError("");
            setShowCreateModal(true);
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[rgb(88,196,186)] text-[#003f3f] font-semibold text-sm hover:bg-[rgb(110,215,205)] transition-all shadow-[0_0_20px_rgba(88,196,186,0.25)]"
        >
          <Plus className="w-4 h-4" />
          {keyData?.exists ? "Regenerate Key" : "Create New Key"}
        </button>
      </div>

      {/* Key card or empty state */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-[rgb(88,196,186)] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : !keyData?.exists ? (
          /* Empty state */
          <div className="rounded-2xl bg-[#0d1717] border border-white/5 p-12 text-center">
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-5">
              <KeyRound className="w-7 h-7 text-white/20" />
            </div>
            <h3 className="text-lg font-semibold text-white/60 mb-2">
              No API Key Yet
            </h3>
            <p className="text-white/30 text-sm max-w-md mx-auto">
              Generate an API key to start integrating WrapPay into your
              application. The key will only be shown once.
            </p>
          </div>
        ) : (
          /* Key card */
          <div className="rounded-2xl bg-[#0d1717] border border-white/5 overflow-hidden">
            <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[rgb(88,196,186)]/10 flex items-center justify-center">
                  <KeyRound className="w-5 h-5 text-[rgb(88,196,186)]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">
                    API Key
                  </h3>
                  <p className="text-white/30 text-xs">
                    Created{" "}
                    {keyData.createdAt
                      ? new Date(keyData.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "—"}
                  </p>
                </div>
              </div>

              {/* Status badge */}
              {keyData.revoked ? (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold">
                  <ShieldX className="w-3.5 h-3.5" />
                  Revoked
                </span>
              ) : (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgb(88,196,186)]/10 border border-[rgb(88,196,186)]/20 text-[rgb(88,196,186)] text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Active
                </span>
              )}
            </div>

            <div className="px-6 py-5 space-y-4">
              {/* Key preview */}
              <div>
                <label className="text-xs text-white/30 uppercase tracking-wider mb-1.5 block">
                  Key Preview
                </label>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 font-mono text-sm">
                  <span className="text-white/60 flex-1">
                    {revealed
                      ? keyData.preview ?? "•••••••••"
                      : "•••••••••••••••••••"}
                  </span>
                  <button
                    onClick={() => setRevealed(!revealed)}
                    className="text-white/30 hover:text-[rgb(88,196,186)] transition"
                  >
                    {revealed ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                  {revealed && keyData.preview && (
                    <button
                      onClick={() => copyKey(keyData.preview!)}
                      className="text-white/30 hover:text-[rgb(88,196,186)] transition"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/10 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete Key
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Info block */}
      <div className="flex gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-amber-300 text-sm font-medium">
            Keep your API keys secure
          </p>
          <p className="text-amber-300/50 text-xs mt-1">
            Never share your API keys in client-side code, public repositories,
            or exposable places. If you believe a key has been compromised,
            delete and regenerate immediately.
          </p>
        </div>
      </div>

      {/* ===== CREATE MODAL ===== */}
      <AnimatePresence>
        {showCreateModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => {
                if (!newKey) setShowCreateModal(false);
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-[#0d1717] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl">
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                  <h3
                    className="text-lg font-bold text-white"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {newKey ? "Key Generated" : "Generate API Key"}
                  </h3>
                  {!newKey && (
                    <button
                      onClick={() => setShowCreateModal(false)}
                      className="text-white/40 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="px-6 py-5 space-y-4">
                  {!newKey ? (
                    <>
                      <p className="text-white/50 text-sm">
                        This will generate a new API key for your merchant
                        account. Any existing key will be replaced.
                      </p>

                      {error && (
                        <div className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                          {error}
                        </div>
                      )}

                      <div className="flex gap-3 pt-2">
                        <button
                          onClick={() => setShowCreateModal(false)}
                          className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/50 text-sm font-medium hover:bg-white/5 transition"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleCreate}
                          disabled={creating}
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[rgb(88,196,186)] text-[#003f3f] font-semibold text-sm hover:bg-[rgb(110,215,205)] transition disabled:opacity-50"
                        >
                          {creating ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            "Generate"
                          )}
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Key display — shown once */}
                      <div className="flex gap-3 p-3 rounded-xl bg-amber-500/5 border border-amber-500/10">
                        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                        <p className="text-amber-300/70 text-xs">
                          Copy this key now. It will{" "}
                          <span className="text-amber-300 font-semibold">
                            never be shown again!
                          </span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/5 font-mono text-sm">
                        <span className="text-[rgb(88,196,186)] flex-1 break-all text-xs">
                          {newKey}
                        </span>
                        <button
                          onClick={() => copyKey(newKey)}
                          className="shrink-0 p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-[rgb(88,196,186)] transition"
                        >
                          {copied ? (
                            <Check className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          setShowCreateModal(false);
                          setNewKey(null);
                        }}
                        className="w-full py-2.5 rounded-xl bg-[rgb(88,196,186)] text-[#003f3f] font-semibold text-sm hover:bg-[rgb(110,215,205)] transition"
                      >
                        I've saved it — Close
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ===== DELETE CONFIRMATION MODAL ===== */}
      <AnimatePresence>
        {showDeleteModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setShowDeleteModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-[#0d1717] border border-white/10 rounded-2xl w-full max-w-sm shadow-2xl">
                <div className="px-6 py-5 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto">
                    <Trash2 className="w-6 h-6 text-red-400" />
                  </div>

                  <h3 className="text-center text-lg font-bold text-white">
                    Delete API Key?
                  </h3>
                  <p className="text-center text-white/40 text-sm">
                    This action is irreversible. Any integration using this key
                    will stop working immediately.
                  </p>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/50 text-sm font-medium hover:bg-white/5 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      disabled={deleting}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500 text-white font-semibold text-sm hover:bg-red-600 transition disabled:opacity-50"
                    >
                      {deleting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        "Delete"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Copied toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 px-4 py-2 rounded-lg bg-[rgb(88,196,186)] text-[#003f3f] text-sm font-semibold shadow-lg z-[60]"
          >
            Copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ApiKeysPage;
