import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Loader2, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { adminLogin, setAdminToken, setAdminData, getAdminToken } from "@/lib/api";
import Logo from "@/assets/wrap1.png";

export default function AdminLoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* Redirect already-authenticated admins */
  useEffect(() => {
    if (getAdminToken()) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await adminLogin(email, password);
      setAdminToken(res.token);
      setAdminData(res.admin as unknown as Record<string, unknown>);
      navigate("/admin/dashboard", { replace: true });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060e0e] flex items-center justify-center px-4">
      {/* Background ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[rgb(88,196,186)]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-amber-500/3 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-[#0d1717] border border-white/8 rounded-3xl p-8 shadow-2xl">

          {/* Back to main login */}
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-1.5 text-white/40 hover:text-white/70 text-xs transition mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to merchant login
          </button>

          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="relative mb-4">
              <img src={Logo} alt="WrapPay" className="h-14 w-14 rounded-2xl shadow-lg" />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center shadow-lg">
                <Shield className="w-3 h-3 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-heading)" }}>
              Admin Portal
            </h1>
            <p className="text-white/40 text-sm">Sign in to the WrapPay admin dashboard</p>

            {/* Admin badge */}
            <div className="mt-3 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
              🔒 Restricted Access
            </div>
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-white/50 mb-1.5 font-medium">Admin Email</label>
              <input
                id="admin-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@wrappay.com"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(88,196,186)] focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-xs text-white/50 mb-1.5 font-medium">Password</label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(88,196,186)] focus:border-transparent transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              id="admin-login-btn"
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[rgb(88,196,186)] text-[#003f3f] font-bold text-sm hover:bg-[rgb(110,215,205)] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2 shadow-lg shadow-[rgb(88,196,186)]/20"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  Sign in as Admin
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <p className="text-center text-white/20 text-xs mt-6">
            This portal is for authorized administrators only.
            <br />Unauthorized access attempts are logged.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
