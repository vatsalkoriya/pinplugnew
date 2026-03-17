import { Link, useLocation } from "react-router-dom";
import { Zap, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border"
    >
      <div className="container max-w-6xl mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="w-8 h-8 rounded-md bg-primary flex items-center justify-center"
          >
            <Zap className="w-4 h-4 text-primary-foreground" />
          </motion.div>
          <span className="text-lg font-semibold tracking-tight text-foreground">Pinplug</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                location.pathname === link.to
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
              {location.pathname === link.to && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 bg-secondary rounded-md -z-10"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </Link>
          ))}
          <Link
            to="/admin"
            className="ml-4 px-4 py-2 text-sm font-medium rounded-md bg-foreground text-background hover:opacity-90 active:scale-[0.97] transition-all"
          >
            Admin
          </Link>
        </nav>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-foreground"
        >
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X className="w-5 h-5" />
              </motion.div>
            ) : (
              <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <Menu className="w-5 h-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-b border-border bg-background"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-3 py-2 text-sm font-medium rounded-md ${
                      location.pathname === link.to ? "text-foreground bg-secondary" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
              >
                <Link
                  to="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 text-sm font-medium rounded-md bg-foreground text-background mt-2"
                >
                  Admin
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
