import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../components/ui/button";
import Logo from "../assets/Logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white/70 backdrop-blur-md border-b border-primary/20 shadow-lg">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-primary font-heading text-2xl font-bold">
          <img src={Logo} alt="Brand Logo" className="h-12 w-12" />
          WrapPay
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-lg font-medium">
          <Link to="/features" className="hover:text-primary transition-colors">Features</Link>
          <Link to="/docs" className="hover:text-primary transition-colors">Developers</Link>
          <Link to="/resources" className="hover:text-primary transition-colors">Resources</Link>
          <Link to="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
        </div>

        {/* Desktop Login Button */}
        <div className="hidden md:block">
          <Link to="/signup">
            <Button variant="ghost" className="bg-primary text-white hover:bg-primary/90 px-6 py-2 font-semibold text-base rounded-lg transition-all duration-200">
              Login
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button onClick={toggleMenu} className="md:hidden text-white hover:text-primary/80 transition">
          {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-transparent border-t border-primary/20 shadow-md"
          >
            <div className="flex flex-col items-center  gap-6 py-6 text-lg font-medium">
              <Link onClick={toggleMenu} to="/features" className="hover:text-primary transition-colors">
                Features
              </Link>
              <Link onClick={toggleMenu} to="/developers" className="hover:text-primary transition-colors">
                Developers
              </Link>
              <Link onClick={toggleMenu} to="/pricing" className="hover:text-primary transition-colors">
                Pricing
              </Link>
              <Link onClick={toggleMenu} to="/contact" className="hover:text-primary transition-colors">
                Contact
              </Link>
              <Link onClick={toggleMenu} to="/signup">
                <Button className="bg-primary text-white hover:bg-primary/90 px-6 py-2 font-semibold text-base rounded-lg">
                  Login
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
