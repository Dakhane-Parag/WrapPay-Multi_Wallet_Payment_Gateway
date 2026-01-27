import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/wrapLogo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // background change
      setScrolled(currentScrollY > 10);

      // hide / show navbar
      if (currentScrollY > lastScrollY && currentScrollY > 80 && !menuOpen) {
        setHidden(true); // scrolling down
      } else {
        setHidden(false); // scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, menuOpen]);

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: hidden ? -120 : 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`
        fixed top-0 left-0 w-full z-50
        transition-colors
        ${
          scrolled
            ? "bg-white/80 backdrop-blur-md border-b border-black/5"
            : "bg-transparent"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className={`flex items-center gap-2 text-2xl font-bold transition-colors ${
            scrolled ? "text-[#003f3f]" : "text-white"
          }`}
        >
          <img
            src={Logo}
            alt="Brand Logo"
            className="h-11 w-11 rounded-full"
          />
          <span className="hidden sm500:inline">WrapPay</span>
        </Link>

        {/* Desktop Nav */}
        <div
          className={`hidden lg900:flex items-center gap-10 text-lg font-medium transition-colors ${
            scrolled ? "text-[#003f3f]/80" : "text-white/80"
          }`}
        >
          <Link to="/features" className="hover:text-[#003f3f] transition">
            Features
          </Link>
          <Link to="/docs" className="hover:text-[#003f3f] transition">
            Developers
          </Link>
          <Link to="/resources" className="hover:text-[#003f3f] transition">
            Resources
          </Link>
          <Link to="/pricing" className="hover:text-[#003f3f] transition">
            Pricing
          </Link>
        </div>

        {/* Desktop Login */}
        <div className="hidden lg900:block">
          <Link to="/signup">
            <button
              className="
                px-8 py-3
                bg-[#003f3f]
                hover:bg-[#005f5f]
                text-[#e6fffb] font-semibold
                rounded-xl
                shadow-[0_0_20px_rgba(0,63,63,0.45)]
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
          className={`lg900:hidden transition ${
            scrolled ? "text-[#003f3f]" : "text-white"
          }`}
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
                    px-8 py-3
                    bg-[#003f3f]
                    hover:bg-[#005f5f]
                    text-[#e6fffb] font-semibold
                    rounded-xl
                    shadow-[0_0_20px_rgba(0,63,63,0.45)]
                    transition
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
