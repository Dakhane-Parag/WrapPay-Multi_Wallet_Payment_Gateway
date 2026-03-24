import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Globe,
  Phone,
  Wallet,
  Link,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import { submitOnboarding } from "@/lib/api";
import type { OnboardingData } from "@/types";
import Logo from "@/assets/wrap1.png";

const chains = [
  { value: "ethereum", label: "Ethereum" },
  { value: "solana", label: "Solana" },
  { value: "polygon", label: "Polygon" },
];

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<OnboardingData>({
    businessName: "",
    businessUrl: "",
    phone: "",
    wallet: { address: "", chain: "ethereum" },
  });

  const update = (field: string, value: string) => {
    if (field.startsWith("wallet.")) {
      const key = field.split(".")[1];
      setForm((prev) => ({
        ...prev,
        wallet: { ...prev.wallet, [key]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.businessName || !form.wallet.address) {
      setError("Business name and wallet address are required.");
      return;
    }

    setLoading(true);
    try {
      await submitOnboarding(form);
      navigate("/pending-verification");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-[#060e0e] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl"
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <img src={Logo} alt="WrapPay" className="h-10 w-10 rounded-full" />
          <span
            className="text-2xl font-bold text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            WrapPay
          </span>
        </div>

        <h1
          className="text-3xl font-bold text-white mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Complete Your Profile
        </h1>
        <p className="text-white/50 mb-8">
          Tell us about your business so we can verify your merchant account.
        </p>

        {error && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Business Name */}
          <div>
            <label className="flex items-center gap-2 text-sm text-white/70 mb-2">
              <Building2 className="w-4 h-4 text-[rgb(88,196,186)]" />
              Business Name *
            </label>
            <input
              type="text"
              value={form.businessName}
              onChange={(e) => update("businessName", e.target.value)}
              placeholder="Acme Corp"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[rgb(88,196,186)] transition"
            />
          </div>

          {/* Business URL */}
          <div>
            <label className="flex items-center gap-2 text-sm text-white/70 mb-2">
              <Link className="w-4 h-4 text-[rgb(88,196,186)]" />
              Business Website
            </label>
            <input
              type="url"
              value={form.businessUrl}
              onChange={(e) => update("businessUrl", e.target.value)}
              placeholder="https://acme.example"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[rgb(88,196,186)] transition"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="flex items-center gap-2 text-sm text-white/70 mb-2">
              <Phone className="w-4 h-4 text-[rgb(88,196,186)]" />
              Phone Number
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="+911234567890"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[rgb(88,196,186)] transition"
            />
          </div>

          {/* Wallet section */}
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-white/80">
              <Wallet className="w-4 h-4 text-[rgb(88,196,186)]" />
              Payout Wallet *
            </h3>

            <input
              type="text"
              value={form.wallet.address}
              onChange={(e) => update("wallet.address", e.target.value)}
              placeholder="0xabc123... or Solana address"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[rgb(88,196,186)] transition font-mono text-sm"
            />

            <div className="flex gap-2">
              {chains.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => update("wallet.chain", c.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    form.wallet.chain === c.value
                      ? "bg-[rgb(88,196,186)] text-[#003f3f]"
                      : "bg-white/5 text-white/50 hover:text-white hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[rgb(88,196,186)] text-[#003f3f] font-bold text-base hover:bg-[rgb(110,215,205)] transition-all shadow-[0_0_25px_rgba(88,196,186,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Submit & Continue
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default OnboardingPage;
