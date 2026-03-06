import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DocsNavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  "Get started",
  "Payments",
  "Wallets",
  "SDKs & Tools",
  "Infrastructure",
  "API Reference",
];

const DocsNavbar = ({ activeTab, onTabChange }: DocsNavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      {/* Top row */}
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between h-16">
        {/* Left: Brand */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span
            className="text-xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-heading)", color: "#003f3f" }}
          >
            WrapPay
          </span>
          <span className="text-[13px] font-semibold text-[#028181] bg-[#e6faf8] px-2 py-0.5 rounded-md tracking-wide uppercase">
            Docs
          </span>
        </Link>

        {/* Center: Search bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div
            className={`
              relative w-full flex items-center rounded-lg border transition-all duration-200
              ${searchFocused ? "border-[#028181] ring-2 ring-[#028181]/20" : "border-gray-300"}
              bg-gray-50 hover:bg-white
            `}
          >
            <Search className="absolute left-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search documentation..."
              className="w-full pl-9 pr-12 py-2 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <kbd className="absolute right-3 hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[11px] font-medium text-gray-400 bg-gray-200 rounded border border-gray-300">
              /
            </kbd>
          </div>
        </div>

        {/* Right: Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600 shrink-0">
          <Link
            to="/docs"
            className="hover:text-[#028181] transition-colors"
          >
            API Reference
          </Link>
          <Link
            to="/"
            className="hover:text-[#028181] transition-colors"
          >
            Home
          </Link>
          <Link to="/signup">
            <button className="px-4 py-2 bg-[#003f3f] text-white text-sm font-semibold rounded-lg hover:bg-[#005a5a] transition-all shadow-sm">
              Sign up
            </button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-gray-600"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Tab row */}
      <div className="max-w-[1400px] mx-auto px-6 overflow-x-auto scrollbar-hide">
        <nav className="flex items-center gap-1 -mb-px" role="tablist">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                role="tab"
                aria-selected={isActive}
                onClick={() => onTabChange(tab)}
                className={`
                  relative whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors
                  ${
                    isActive
                      ? "text-[#003f3f]"
                      : "text-gray-500 hover:text-gray-800"
                  }
                `}
              >
                {tab}
                {isActive && (
                  <motion.div
                    layoutId="docs-tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#028181] rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            {/* Mobile search */}
            <div className="px-6 pt-4 pb-2">
              <div className="relative flex items-center rounded-lg border border-gray-300 bg-gray-50">
                <Search className="absolute left-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  className="w-full pl-9 pr-4 py-2.5 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                />
              </div>
            </div>

            {/* Mobile tabs */}
            <div className="px-6 py-3 flex flex-col gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    onTabChange(tab);
                    setMobileOpen(false);
                  }}
                  className={`
                    text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors
                    ${
                      activeTab === tab
                        ? "bg-[#e6faf8] text-[#003f3f]"
                        : "text-gray-600 hover:bg-gray-50"
                    }
                  `}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Mobile links */}
            <div className="px-6 pb-4 pt-2 border-t border-gray-100 flex flex-col gap-2">
              <Link
                to="/"
                className="text-sm font-medium text-gray-600 py-2"
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>
              <Link to="/signup" onClick={() => setMobileOpen(false)}>
                <button className="w-full px-4 py-2.5 bg-[#003f3f] text-white text-sm font-semibold rounded-lg">
                  Sign up
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default DocsNavbar;
