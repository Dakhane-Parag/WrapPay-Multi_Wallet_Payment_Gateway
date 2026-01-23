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
      if (window.scrollY > 90 && window.innerWidth > 900) {
        setShrink(true);
      } else {
        setShrink(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      animate={{
        width: shrink ? "50%" : "90%",
        paddingTop: shrink ? "8px" : "14px",
        paddingBottom: shrink ? "8px" : "14px",
        borderRadius: shrink ? "20px" : "16px",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="
        fixed left-1/2 -translate-x-1/2 top-6 z-50
        bg-gray-400/30
        backdrop-blur-sm backdrop-saturate-150
        border border-white/20
        shadow-[0_0_35px_rgba(255,255,255,0.25)]
        flex items-center justify-between px-6
      "
    >
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-white text-2xl font-bold">
          <img
            src={Logo}
            alt="Brand Logo"
            className={`transition-all duration-300 rounded-full
              ${shrink ? "h-10 w-10" : "h-12 w-12"}
            `}
          />

          <motion.span
            animate={{
              opacity: shrink ? 0 : 1,
              width: shrink ? 0 : "auto",
              marginLeft: shrink ? 0 : 4,
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden whitespace-nowrap"
          >
            WrapPay
          </motion.span>
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
            <motion.button
              animate={{
                borderRadius: shrink ? "999px" : "12px",
                paddingLeft: shrink ? "28px" : "32px",
                paddingRight: shrink ? "28px" : "32px",
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="
                py-3
                 bg-[rgb(88,196,186)]
                hover:bg-[rgb(110,215,205)]
                 text-[#003f3f] font-semibold
                shadow-[0_0_20px_rgba(88,196,186,0.4)]
                transition-all duration-300
                hover:shadow-[0_0_25px_rgba(110,215,180)]
              "
            >
              Login
            </motion.button>
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
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="
              absolute top-full mt-4 right-0 w-full
              sm500:w-64
              bg-black/90
              backdrop-blur-xl
              border border-white/20
              rounded-xl
              shadow-[0_8px_40px_rgba(255,255,255,0.25)]
              lg900:hidden
            "
          >
            <div className="flex flex-col items-center gap-6 py-6 text-lg font-medium text-white">
              <Link onClick={toggleMenu} to="/features">
                Features
              </Link>
              <Link onClick={toggleMenu} to="/developers">
                Developers
              </Link>
              <Link onClick={toggleMenu} to="/pricing">
                Pricing
              </Link>
              <Link onClick={toggleMenu} to="/contact">
                Contact
              </Link>

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
    </motion.nav>
  );
};

export default Navbar;
