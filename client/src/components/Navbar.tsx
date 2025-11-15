import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/wrapLogo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shrink, setShrink] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 90 && window.innerWidth > 900) setShrink(true);
      else setShrink(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      animate={{
        width: shrink ? "60%" : "90%",
        paddingTop: "14px",
        paddingBottom: "14px",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className=" fixed left-1/2 -translate-x-1/2 top-6 z-50
        bg-white/10 
        backdrop-blur-md backdrop-saturate-200
        border border-white/20 
        shadow-[0_0_35px_rgba(255,255,255,0.25)]
        rounded-2xl flex items-center justify-between px-6
      "
    >
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-white text-2xl font-bold">
          <img src={Logo} alt="Brand Logo" className="h-12 w-12 rounded-full" />
          WrapPay
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

        <div className="hidden lg900:block">
          <Link to="/signup">
            <button className="px-8 py-3 bg-[#7c59e6] text-white font-semibold rounded-xl shadow-[0_0_15px_rgba(167,139,250,0.5)] transition-all duration-300 hover:bg-[#a995fc] hover:shadow-[0_0_25px_rgba(196,181,253,0.8)]">
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

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="
              absolute top-full mt-4
              right-0 w-full
              sm500:right-0 sm500:w-64
              bg-black/90 
              backdrop-blur-3xl
              border border-white/20
              rounded-xl 
              shadow-[0_8px_40px_rgba(255,255,255,0.25)]
              lg900:hidden

            "
          >
            <div className="flex flex-col items-center gap-6 py-6 text-lg font-medium text-white">
              <Link onClick={toggleMenu} to="/features" className="hover:text-white/70">
                Features
              </Link>
              <Link onClick={toggleMenu} to="/developers" className="hover:text-white/70">
                Developers
              </Link>
              <Link onClick={toggleMenu} to="/pricing" className="hover:text-white/70">
                Pricing
              </Link>
              <Link onClick={toggleMenu} to="/contact" className="hover:text-white/70">
                Contact
              </Link>

              <Link onClick={toggleMenu} to="/signup">
                <button className="px-8 py-3 bg-[#7c59e6] text-white font-semibold rounded-xl shadow-[0_0_15px_rgba(167,139,250,0.5)] transition-all duration-300 hover:bg-[#a995fc] hover:shadow-[0_0_25px_rgba(196,181,253,0.8)]">
                  Login
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
