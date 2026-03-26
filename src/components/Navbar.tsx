"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
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
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Eagerly prefetch all routes the moment the navbar mounts
  useEffect(() => {
    const routes = ["/", "/products", "/services", "/reviews", "/about", "/contact"];
    routes.forEach(route => router.prefetch(route));
  }, [router]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-black text-white border-b border-white/10"
    >
      <div className="container max-w-full mx-auto flex items-center justify-between h-14 md:h-16 px-6 md:px-12">
        {/* Logo */}
        <Link href="/" prefetch className="flex items-center gap-3 group shrink-0">
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
              const isActive = pathname === link.to;

              if (link.to === "/products") {
                return (
                  <li key={link.to} className="group relative">
                    <Link
                      href={link.to}
                      prefetch
                      className={`flex items-center gap-1 py-5 text-sm font-bold uppercase tracking-wider transition-colors hover:text-white ${
                        isActive ? "text-white border-b-2 border-white" : "text-white/60"
                      }`}
                    >
                      {link.label}
                      <ChevronDown className="w-4 h-4 text-white/40 group-hover:rotate-180 transition-transform duration-300" />
                    </Link>

                    {/* Products Dropdown (Mega menu style) */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-[340px] bg-black border border-white/10 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-200 z-50 p-2 rounded-xl">
                       <div className="flex flex-col gap-1">
                          {categories.map(cat => {
                            const Icon = cat.icon;
                            return (
                              <Link 
                                key={cat.id} 
                                href={cat.id === "all" ? "/products" : `/products?cat=${cat.id}`} 
                                prefetch
                                className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors group/item"
                              >
                                <div className="p-2 bg-white/5 rounded-md group-hover/item:bg-white/10 transition-colors">
                                  <Icon className="w-5 h-5 text-white" />
                                </div>
                                <div className="text-left">
                                  <span className="block text-sm font-bold text-white">{cat.name}</span>
                                  <span className="block text-xs text-white/40 mt-0.5">{cat.description}</span>
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
                    href={link.to}
                    prefetch
                    className={`py-5 text-sm font-bold uppercase tracking-wider transition-colors hover:text-white ${
                      isActive ? "text-white border-b-2 border-white" : "text-white/60"
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
        

        {/* Mobile Nav Toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-white"
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
            className="md:hidden overflow-hidden border-b border-white/10 bg-black"
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
                    href={link.to}
                    prefetch
                    onClick={() => setMobileOpen(false)}
                    className="text-2xl font-black uppercase tracking-tighter text-white"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="mt-4 pt-6 border-t border-white/10"
              >
                
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
