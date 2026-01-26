import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/wrapLogo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav
      className="
        fixed top-0 left-0 w-full z-50
        bg-transparent
        backdrop-blur-sm
        border-b border-white/10
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-white text-2xl font-bold">
          <img
            src={Logo}
            alt="Brand Logo"
            className="h-11 w-11 rounded-full"
          />
          <span className="hidden sm500:inline">WrapPay</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg900:flex items-center gap-10 text-lg font-medium text-white/80">
          <Link to="/features" className="hover:text-white transition">
            Features
          </Link>
          <Link to="/docs" className="hover:text-white transition">
            Developers
          </Link>
          <Link to="/resources" className="hover:text-white transition">
            Resources
          </Link>
          <Link to="/pricing" className="hover:text-white transition">
            Pricing
          </Link>
        </div>

        {/* Desktop Login */}
        <div className="hidden lg900:block">
          <Link to="/signup">
            <button
              className="
                px-8 py-3
                bg-[rgb(88,196,186)]
                hover:bg-[rgb(110,215,205)]
                text-[#003f3f] font-semibold
                rounded-xl
                shadow-[0_0_20px_rgba(88,196,186,0.4)]
                transition
              "
            >
              Login
            </button>
          </Link>
        </div>

        {/* Hamburger */}
        <button
          onClick={toggleMenu}
          className="lg900:hidden text-white hover:text-gray-200 transition"
        >
          {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="
              absolute top-full right-0 w-full
              sm500:w-64
              bg-black/90
              backdrop-blur-xl
              border border-white/20
              rounded-b-xl
              shadow-xl
              lg900:hidden
            "
          >
            <div className="flex flex-col items-center gap-6 py-6 text-lg font-medium text-white">
              <Link onClick={toggleMenu} to="/features">Features</Link>
              <Link onClick={toggleMenu} to="/developers">Developers</Link>
              <Link onClick={toggleMenu} to="/pricing">Pricing</Link>
              <Link onClick={toggleMenu} to="/contact">Contact</Link>

              <Link onClick={toggleMenu} to="/signup">
                <button
                  className="
                    px-8 py-3 bg-[#7c59e6] text-white font-semibold
                    rounded-xl
                    shadow-[0_0_15px_rgba(167,139,250,0.5)]
                    hover:bg-[#a995fc]
                  "
                >
                  Login
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
