"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/context/AdminContext";
import { Package, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onInquire?: (product: Product) => void;
  index?: number;
}

export default function ProductCard({ product, onInquire, index = 0 }: ProductCardProps) {
  const images = product.images && product.images.length > 0 ? product.images : (product.image ? [product.image] : []);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIdx((prev) => (prev + 1) % images.length);
  };
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="group relative bg-card p-4 rounded-lg shadow-card hover:shadow-elevated transition-all duration-300 outline-subtle flex flex-col h-full"
    >
      {/* Image area */}
      <div className="aspect-[4/3] bg-surface rounded-md overflow-hidden mb-4 flex items-center justify-center relative group/img">
        {images.length > 0 ? (
           <>
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIdx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  src={images[currentImageIdx]}
                  alt={`${product.name} ${currentImageIdx + 1}`}
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                />
              </AnimatePresence>
              
              {/* Carousel controls */}
              {images.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
                  <button onClick={handlePrev} className="p-1 rounded-full bg-background/80 text-foreground hover:bg-background shadow-sm">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button onClick={handleNext} className="p-1 rounded-full bg-background/80 text-foreground hover:bg-background shadow-sm">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
              
              {/* Dot indicators */}
              {images.length > 1 && (
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
                  {images.map((_, i) => (
                     <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === currentImageIdx ? "bg-primary" : "bg-primary/30"}`} />
                  ))}
                </div>
              )}
           </>
        ) : (
          <Package className="w-12 h-12 text-muted-foreground/20 group-hover:scale-110 group-hover:text-muted-foreground/30 transition-all duration-500" />
        )}
        {/* Shine effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>

      <div className="space-y-1.5">
        <span className="text-[10px] font-mono-tech uppercase tracking-widest text-primary">
          {product.category.replace("-", " ")}
        </span>
        <Link href={`/product/${product._id}`} prefetch>
          <h3 className="text-base font-medium text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm font-mono-tech text-muted-foreground">MOD: {product.modelNumber}</p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {product.specs.map(spec => (
            <span
              key={spec}
              className="text-[10px] font-mono-tech px-2 py-0.5 rounded-sm bg-secondary text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary/80 transition-colors duration-300"
            >
              {spec}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-3">
          <span className="text-lg font-semibold font-mono-tech text-foreground">
            {product.price.startsWith("₹") ? product.price : `₹${product.price}`}
          </span>
          {onInquire && (
            <button
              onClick={() => onInquire(product)}
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.95] transition-all"
            >
              Inquire
              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
