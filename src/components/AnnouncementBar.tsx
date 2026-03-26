"use client";

import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("announcement-dismissed");
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  const dismiss = () => {
    setIsVisible(false);
    localStorage.setItem("announcement-dismissed", "true");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-black text-white border-b border-white/10 relative overflow-hidden"
        >
          <div className="container max-w-6xl mx-auto flex items-center justify-between py-2 px-4 gap-2">
             <div className="flex-1" />
             <div className="flex items-center gap-3">
                <span className="flex h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.25em] text-white/90">
                    Grand Opening Deal: Up to 40% Off on All Home Appliances!
                </span>
                <span className="flex h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
             </div>
             <div className="flex-1 flex justify-end">
                <button 
                  onClick={dismiss}
                  className="p-1 hover:text-orange-500 transition-colors group"
                  aria-label="Close"
                >
                  <X className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                </button>
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
