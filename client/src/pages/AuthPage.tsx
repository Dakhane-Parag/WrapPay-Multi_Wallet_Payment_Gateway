import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/assets/wrap1.png";
import logImage from "@/assets/login.jpg";
// import { GoogleLogin } from '@react-oauth/google';
import { signupWithEmail, loginWithGoogle, setToken, setMerchantData } from "@/lib/api";
import GoogleButton from "@/lib/GoogleAuth";

export default function Signup() {
  const navigate = useNavigate();
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!businessName || !email || !password) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await signupWithEmail({ businessName, email, password });
      setSuccess(res.message || "Account created! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (response: any) => {
    if (!response.credential) {
      setError("Google signup failed: No credential received.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await loginWithGoogle(response.credential);
      setToken(res.token);
      setMerchantData(res.merchant as unknown as Record<string, unknown>);
      // Route based on what the AuthGate would do
      navigate("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Google signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* LEFT: Signup Form */}
      <div className="flex items-center justify-center bg-black/90 px-6">
        <div className="w-full max-w-md text-white">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <img src={Logo} alt="WrapPayments" className="h-10 w-10 rounded-full" />
            <span className="text-2xl font-bold">WrapPayments</span>
          </div>

          <h1 className="text-3xl font-semibold mb-2">
            Create your WrapPayments account
          </h1>
          <p className="text-white/70 mb-8">
            Get started in minutes. No credit card required.
          </p>

          {/* Error */}
          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Business Name */}
            <div className="mb-4">
              <label className="block text-sm mb-2 text-white/80">
                Business Name
              </label>
              <input
                type="text"
                placeholder="Acme Corp"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="
                  w-full px-4 py-3 rounded-xl
                  bg-white/5 border border-white/10
                  text-white placeholder-white/40
                  focus:outline-none focus:ring-2 focus:ring-[rgb(88,196,186)] 
                "
              />
            </div>

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
            <div className="mb-4">
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

            {/* Signup button */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full py-3 rounded-xl mt-2
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
                "Sign up"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-white/10" />
            <span className="px-4 text-sm text-white/40">OR</span>
            <div className="flex-grow h-px bg-white/10" />
          </div>

          {/* OAuth */}
          {/* <div className="flex justify-center mb-6">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError("Google signup failed.")}
              theme="filled_black"
              shape="pill"
            />
          </div> */}
          <GoogleButton isSignup={true} />

          {/* Footer */}
          <p className="text-sm text-white/50 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-[rgb(88,196,186)] hover:underline">
              Log in
            </Link>
          </p>

          <p className="text-xs text-white/40 mt-8 leading-relaxed">
            By signing up, you agree to our{" "}
            <span className="underline cursor-pointer">Terms</span> and{" "}
            <span className="underline cursor-pointer">Privacy Policy</span>.
          </p>

        </div>
      </div>

      {/* RIGHT: Image / Visual */}
      <div className="hidden py-10 lg:block relative">
        <img
          src={logImage}
          alt="Global payments"
          className="absolute inset-0 h-full w-full object-cover "
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
    </div>
  );
}
