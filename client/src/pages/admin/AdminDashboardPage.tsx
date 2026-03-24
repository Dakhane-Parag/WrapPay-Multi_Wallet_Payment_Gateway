import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  CheckCircle2,
  KeyRound,
  UserPlus,
  LogOut,
  Loader2,
  AlertTriangle,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  adminVerifyMerchant,
  adminRevokeKey,
  adminSignup,
  clearAdminToken,
  clearAdminData,
  getAdminToken,
} from "@/lib/api";
import Logo from "@/assets/wrap1.png";

/* ------------------------------------------------------------------ */
/*  Reusable action card                                              */
/* ------------------------------------------------------------------ */
function ActionCard({
  icon: Icon,
  title,
  description,
  inputLabel,
  inputPlaceholder,
  buttonLabel,
  buttonColor,
  onSubmit,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  inputLabel: string;
  inputPlaceholder: string;
  buttonLabel: string;
  buttonColor: string;
  onSubmit: (value: string) => Promise<string>;
}) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const handle = async () => {
    if (!value.trim()) {
      setResult({ type: "error", msg: `${inputLabel} is required.` });
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const msg = await onSubmit(value.trim());
      setResult({ type: "success", msg });
      setValue("");
    } catch (err: unknown) {
      setResult({ type: "error", msg: err instanceof Error ? err.message : "Action failed." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-[#0d1717] border border-white/5 p-6 space-y-4"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[rgb(88,196,186)]/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-[rgb(88,196,186)]" />
        </div>
        <div>
          <h3 className="text-white font-semibold text-sm">{title}</h3>
          <p className="text-white/40 text-xs">{description}</p>
        </div>
      </div>

      <div>
        <label className="block text-xs text-white/50 mb-1.5">{inputLabel}</label>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={inputPlaceholder}
          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[rgb(88,196,186)] transition"
        />
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`px-4 py-2.5 rounded-xl text-sm flex items-center justify-between ${
              result.type === "success"
                ? "bg-green-500/10 border border-green-500/20 text-green-400"
                : "bg-red-500/10 border border-red-500/20 text-red-400"
            }`}
          >
            <span>{result.msg}</span>
            <button onClick={() => setResult(null)} className="shrink-0 ml-2 hover:opacity-70">
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={handle}
        disabled={loading}
        className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition disabled:opacity-50 disabled:cursor-not-allowed ${buttonColor}`}
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : buttonLabel}
      </button>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Admin Dashboard Page                                              */
/* ------------------------------------------------------------------ */
const AdminDashboardPage = () => {
  const navigate = useNavigate();

  /* Registration form state */
  const [regForm, setRegForm] = useState({ name: "", email: "", password: "" });
  const [regLoading, setRegLoading] = useState(false);
  const [regResult, setRegResult] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  /* Redirect if no admin token */
  if (!getAdminToken()) {
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    clearAdminToken();
    clearAdminData();
    navigate("/login");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regForm.name || !regForm.email || !regForm.password) {
      setRegResult({ type: "error", msg: "All fields are required." });
      return;
    }
    setRegLoading(true);
    setRegResult(null);
    try {
      const res = await adminSignup(regForm);
      setRegResult({ type: "success", msg: res.message || "Admin registered successfully!" });
      setRegForm({ name: "", email: "", password: "" });
    } catch (err: unknown) {
      setRegResult({ type: "error", msg: err instanceof Error ? err.message : "Registration failed." });
    } finally {
      setRegLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060e0e]">
      {/* Top bar */}
      <header className="bg-[#0a1a1a] border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={Logo} alt="WrapPay" className="h-9 w-9 rounded-full" />
          <span
            className="text-lg font-bold text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            WrapPay
          </span>
          <span className="ml-2 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/20 text-amber-400 text-xs font-semibold">
            Admin
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-white/50 hover:text-red-400 transition"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 md:px-8 py-8 space-y-8">
        {/* Heading */}
        <div>
          <h1
            className="text-2xl md:text-3xl font-bold text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Admin Dashboard
          </h1>
          <p className="text-white/40 text-sm mt-1">
            Manage merchants and platform operations
          </p>
        </div>

        {/* Action cards grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Verify Merchant */}
          <ActionCard
            icon={CheckCircle2}
            title="Verify Merchant"
            description="Approve a merchant's KYC verification"
            inputLabel="Merchant ID"
            inputPlaceholder="Enter merchant ObjectId..."
            buttonLabel="Verify Merchant"
            buttonColor="bg-[rgb(88,196,186)] text-[#003f3f] hover:bg-[rgb(110,215,205)]"
            onSubmit={async (merchantId) => {
              const res = await adminVerifyMerchant(merchantId);
              return res.message || "Merchant verified successfully!";
            }}
          />

          {/* Revoke API Key */}
          <ActionCard
            icon={KeyRound}
            title="Revoke API Key"
            description="Revoke a merchant's active API key"
            inputLabel="Merchant ID"
            inputPlaceholder="Enter merchant ID..."
            buttonLabel="Revoke Key"
            buttonColor="bg-red-500 text-white hover:bg-red-600"
            onSubmit={async (merchantId) => {
              await adminRevokeKey(merchantId);
              return "API key revoked successfully!";
            }}
          />
        </div>

        {/* Register New Admin */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl bg-[#0d1717] border border-white/5 p-6"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-[rgb(88,196,186)]/10 flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-[rgb(88,196,186)]" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">Register New Admin</h3>
              <p className="text-white/40 text-xs">Create an account for a new platform admin</p>
            </div>
          </div>

          <AnimatePresence>
            {regResult && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className={`mb-4 px-4 py-2.5 rounded-xl text-sm flex items-center justify-between ${
                  regResult.type === "success"
                    ? "bg-green-500/10 border border-green-500/20 text-green-400"
                    : "bg-red-500/10 border border-red-500/20 text-red-400"
                }`}
              >
                <span>{regResult.msg}</span>
                <button onClick={() => setRegResult(null)} className="shrink-0 ml-2 hover:opacity-70">
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleRegister} className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-white/50 mb-1.5">Name</label>
              <input
                type="text"
                value={regForm.name}
                onChange={(e) => setRegForm((p) => ({ ...p, name: e.target.value }))}
                placeholder="Admin Name"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(88,196,186)] transition"
              />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1.5">Email</label>
              <input
                type="email"
                value={regForm.email}
                onChange={(e) => setRegForm((p) => ({ ...p, email: e.target.value }))}
                placeholder="admin@example.com"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(88,196,186)] transition"
              />
            </div>
            <div>
              <label className="block text-xs text-white/50 mb-1.5">Password</label>
              <input
                type="password"
                value={regForm.password}
                onChange={(e) => setRegForm((p) => ({ ...p, password: e.target.value }))}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(88,196,186)] transition"
              />
            </div>
            <div className="md:col-span-3">
              <button
                type="submit"
                disabled={regLoading}
                className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[rgb(88,196,186)] text-[#003f3f] font-semibold text-sm hover:bg-[rgb(110,215,205)] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {regLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Register Admin"}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Info block */}
        <div className="flex gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-amber-300 text-sm font-medium">Admin actions are permanent</p>
            <p className="text-amber-300/50 text-xs mt-1">
              Verifying a merchant or revoking an API key cannot be undone from this panel.
              Double-check the Merchant ID before performing any action.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardPage;
