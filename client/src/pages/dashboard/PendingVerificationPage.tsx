import { useNavigate } from "react-router-dom";
import { Clock, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { clearToken, clearMerchantData } from "@/lib/api";
import Logo from "@/assets/wrap1.png";

const PendingVerificationPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    clearMerchantData();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#060e0e] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <img src={Logo} alt="WrapPay" className="h-10 w-10 rounded-full" />
          <span
            className="text-2xl font-bold text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            WrapPay
          </span>
        </div>

        {/* Pulsing icon */}
        <div className="relative flex items-center justify-center mb-8">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute w-24 h-24 rounded-full bg-[rgb(88,196,186)]/10"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            }}
            className="absolute w-16 h-16 rounded-full bg-[rgb(88,196,186)]/15"
          />
          <div className="relative w-14 h-14 rounded-full bg-[rgb(88,196,186)]/20 flex items-center justify-center">
            <Clock className="w-7 h-7 text-[rgb(88,196,186)]" />
          </div>
        </div>

        <h1
          className="text-2xl md:text-3xl font-bold text-white mb-4"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Account Pending Verification
        </h1>

        <p className="text-white/50 mb-3 leading-relaxed">
          Our team is reviewing your business details. This usually takes{" "}
          <span className="text-white/70 font-medium">24–48 hours</span>.
        </p>

        <p className="text-white/40 text-sm mb-10">
          You'll receive an email once your account is verified and you'll gain
          full access to the merchant dashboard.
        </p>

        {/* Status pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
          </span>
          Under Review
        </div>

        <div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 mx-auto text-sm text-white/40 hover:text-white/70 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PendingVerificationPage;
