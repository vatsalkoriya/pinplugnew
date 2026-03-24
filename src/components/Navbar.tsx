import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { categories } from "@/data/mockData";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/services", label: "Services" },
  { to: "/reviews", label: "Reviews" },
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
      className="sticky top-0 z-50 bg-background border-b border-border"
    >
      <div className="container max-w-6xl mx-auto flex items-center justify-between h-14 md:h-16 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="w-9 h-9 overflow-hidden flex items-center justify-center rounded-md"
          >
            <img src="/favicon.png" alt="Pinplug logo" className="w-full h-full object-contain" />
          </motion.div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center justify-center flex-1 ml-8">
          <ul className="flex items-center gap-8">
            {navLinks.map(link => {
              const isActive = location.pathname === link.to;

              if (link.to === "/products") {
                return (
                  <li key={link.to} className="group relative">
                    <Link
                      to={link.to}
                      className={`flex items-center gap-1 py-5 text-sm font-bold uppercase tracking-wider transition-colors hover:text-foreground ${
                        isActive ? "text-foreground border-b-2 border-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {link.label}
                      <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:rotate-180 transition-transform duration-300" />
                    </Link>

                    {/* Products Dropdown (Mega menu style) */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-[340px] bg-background border border-border shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-200 z-50 p-2 rounded-xl">
                       <div className="flex flex-col gap-1">
                          {categories.map(cat => {
                            const Icon = cat.icon;
                            return (
                              <Link 
                                key={cat.id} 
                                to={cat.id === "all" ? "/products" : `/products?cat=${cat.id}`} 
                                className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent transition-colors group/item"
                              >
                                <div className="p-2 bg-muted rounded-md group-hover/item:bg-background transition-colors">
                                  <Icon className="w-5 h-5 text-foreground" />
                                </div>
                                <div className="text-left">
                                  <span className="block text-sm font-bold text-foreground">{cat.name}</span>
                                  <span className="block text-xs text-muted-foreground mt-0.5">{cat.description}</span>
                                </div>
                              </Link>
                            );
                          })}
                       </div>
                    </div>
                  </li>
                );
              }

              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`py-5 text-sm font-bold uppercase tracking-wider transition-colors hover:text-foreground ${
                      isActive ? "text-foreground border-b-2 border-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right Nav Options */}
        <div className="hidden md:flex items-center justify-end gap-4 shrink-0">
          <Link
            to="/admin"
            className="px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-full bg-foreground text-background hover:bg-neutral-800 transition-colors"
          >
            Admin
          </Link>
        </div>

        {/* Mobile Nav Toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-foreground"
        >
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <Menu className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Nav Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-b border-border bg-background"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
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
                    className="text-2xl font-black uppercase tracking-tighter text-foreground"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="mt-4 pt-6 border-t border-border"
              >
                <Link
                  to="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex px-6 py-3 text-sm font-bold uppercase tracking-wider rounded-full bg-foreground text-background"
                >
                  Admin Portal
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
