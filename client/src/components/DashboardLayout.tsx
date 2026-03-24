import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  KeyRound,
  Menu,
  X,
  LogOut,
  ChevronLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clearToken, clearMerchantData } from "@/lib/api";
import Logo from "@/assets/wrap1.png";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
  { label: "API Keys", icon: KeyRound, to: "/dashboard/api-keys" },
];

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const stored = localStorage.getItem("wrappay_merchant");
  const parsedMerchant = stored ? JSON.parse(stored) : null;
  // Backend may return email as nested object { email, isVerified } or plain string
  const rawEmail = parsedMerchant?.email;
  const merchantEmail: string =
    typeof rawEmail === "object" && rawEmail !== null
      ? (rawEmail.email ?? "")
      : (rawEmail ?? "");

  const handleLogout = () => {
    clearToken();
    clearMerchantData();
    navigate("/login");
  };

  /* ---- Sidebar inner content ---- */
  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6 border-b border-white/10">
        <img src={Logo} alt="WrapPay" className="h-9 w-9 rounded-full" />
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            className="text-lg font-bold text-white whitespace-nowrap overflow-hidden"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            WrapPay
          </motion.span>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 space-y-1 px-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/dashboard"}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group
              ${
                isActive
                  ? "bg-[rgb(88,196,186)]/15 text-[rgb(170,235,230)]"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`
            }
          >
            <item.icon className="w-[18px] h-[18px] shrink-0" />
            {!collapsed && (
              <span className="truncate">{item.label}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-white/10 px-4 py-4">
        {!collapsed && merchantEmail && (
          <p className="text-xs text-white/40 truncate mb-3">{merchantEmail}</p>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-white/50 hover:text-red-400 transition-colors w-full"
        >
          <LogOut className="w-4 h-4" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#060e0e]">
      {/* Desktop Sidebar */}
      <aside
        className={`
          hidden lg:flex flex-col shrink-0 bg-[#0a1a1a] border-r border-white/5
          transition-all duration-300 relative
          ${collapsed ? "w-[72px]" : "w-[240px]"}
        `}
      >
        {sidebarContent}

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-[#0a1a1a] border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition z-10"
        >
          <ChevronLeft
            className={`w-3 h-3 transition-transform ${
              collapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </aside>

      {/* Mobile overlay + drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 w-[240px] h-full bg-[#0a1a1a] z-50 lg:hidden shadow-2xl"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-5 right-4 text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Top Bar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-[#0a1a1a] border-b border-white/5">
          <button
            onClick={() => setMobileOpen(true)}
            className="text-white/70 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span
            className="text-white font-bold text-lg"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            WrapPay
          </span>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
