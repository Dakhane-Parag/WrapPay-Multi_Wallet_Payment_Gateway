import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  loginWithEmail,
  setToken,
  setMerchantData,
  adminLogin,
  setAdminToken,
  setAdminData,
} from "@/lib/api";
import Logo from "@/assets/wrap1.png";
import logImage from "@/assets/login.jpg";

type LoginMode = "merchant" | "admin";

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<LoginMode>("merchant");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "admin") {
        const res = await adminLogin(email, password);
        setAdminToken(res.token);
        setAdminData(res.admin);
        navigate("/admin/dashboard");
      } else {
        const res = await loginWithEmail(email, password);
        setToken(res.token);
        setMerchantData(res.merchant as unknown as Record<string, unknown>);
        navigate("/dashboard");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* LEFT: Login Form */}
      <div className="flex items-center justify-center bg-black/90 px-6">
        <div className="w-full max-w-md text-white">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <img
              src={Logo}
              alt="WrapPayments"
              className="h-10 w-10 rounded-full"
            />
            <span className="text-2xl font-bold">WrapPayments</span>
          </div>

          <h1 className="text-3xl font-semibold mb-2">
            Welcome back
          </h1>
          <p className="text-white/70 mb-6">
            Log in to continue managing your payments.
          </p>

          {/* Mode toggle */}
          <div className="flex mb-6 bg-white/5 rounded-xl p-1 border border-white/10">
            <button
              type="button"
              onClick={() => { setMode("merchant"); setError(""); }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${mode === "merchant"
                  ? "bg-[rgb(88,196,186)] text-[#003f3f] shadow-md"
                  : "text-white/50 hover:text-white"
                }`}
            >
              Merchant
            </button>
            <button
              type="button"
              onClick={() => { setMode("admin"); setError(""); }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${mode === "admin"
                  ? "bg-[rgb(88,196,186)] text-[#003f3f] shadow-md"
                  : "text-white/50 hover:text-white"
                }`}
            >
              Admin
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm mb-2 text-white/80">
                Email address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  w-full px-4 py-3 rounded-xl
                  bg-white/5 border border-white/10
                  text-white placeholder-white/40
                  focus:outline-none focus:ring-2 focus:ring-[rgb(88,196,186)]
                "
              />
            </div>

            {/* Password */}
            <div className="mb-2">
              <label className="block text-sm mb-2 text-white/80">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
                  w-full px-4 py-3 rounded-xl
                  bg-white/5 border border-white/10
                  text-white placeholder-white/40
                  focus:outline-none focus:ring-2 focus:ring-[rgb(88,196,186)]
                "
              />
            </div>

            {/* Forgot password (merchant only) */}
            {mode === "merchant" && (
              <div className="flex justify-end mb-4">
                <Link
                  to="/forgot-password"
                  className="text-sm text-[rgb(88,196,186)] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            )}

            {mode === "admin" && <div className="mb-4" />}

            {/* Login button */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full py-3 rounded-xl
                bg-[#003f3f]
                hover:bg-[#005f5f]
                text-[#e6fffb] font-semibold
                shadow-[0_0_20px_rgba(0,63,63,0.5)]
                transition
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-2
              "
            >
              {loading ? (
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                `Log in as ${mode === "admin" ? "Admin" : "Merchant"}`
              )}
            </button>
          </form>

          {/* Separator + OAuth (merchant only) */}
          {mode === "merchant" && (
            <>
              <div className="flex items-center my-6">
                <div className="flex-grow h-px bg-white/10" />
                <span className="px-4 text-sm text-white/40">OR</span>
                <div className="flex-grow h-px bg-white/10" />
              </div>

              <button
                className="
                  w-full py-3 mb-3 rounded-xl
                  border border-white/15
                  text-white font-medium
                  hover:bg-white/5
                  transition
                  flex items-center justify-center gap-3
                "
              >
                <svg width="18" height="18" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.78 32.91 29.303 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.227 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917Z" />
                  <path fill="#FF3D00" d="M6.306 14.691 12.876 19.51C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.227 4 24 4c-7.682 0-14.38 4.337-17.694 10.691Z" />
                  <path fill="#4CAF50" d="M24 44c5.096 0 9.834-1.949 13.379-5.129l-6.173-5.223C29.169 35.091 26.715 36 24 36c-5.281 0-9.741-3.068-11.282-7.5l-6.497 5.003C9.505 39.556 16.227 44 24 44Z" />
                  <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.02 12.02 0 0 1-4.097 5.648l.003-.002 6.173 5.223C36.941 39.18 44 34 44 24c0-1.341-.138-2.65-.389-3.917Z" />
                </svg>
                Continue with Google
              </button>


            </>
          )}

          {/* Footer */}
          <p className="text-sm text-white/50 mt-6">
            {mode === "merchant" ? (
              <>
                Don't have an account?{" "}
                <Link to="/signup" className="text-[rgb(88,196,186)] hover:underline">
                  Sign up
                </Link>
              </>
            ) : (
              <span className="text-white/40 text-xs">
                Admin accounts are created by existing admins.
              </span>
            )}
          </p>
        </div>
      </div>

      {/* RIGHT: Image / Visual */}
      <div className="hidden py-10 lg:block relative">
        <img
          src={logImage}
          alt="Global payments"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
    </div>
  );
}
