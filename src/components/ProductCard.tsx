import { motion } from "framer-motion";
import type { Product } from "@/data/mockData";
import { Package, ArrowUpRight } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onInquire?: (product: Product) => void;
  index?: number;
}

export default function ProductCard({ product, onInquire, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="group relative bg-card p-4 rounded-lg shadow-card hover:shadow-elevated transition-all duration-300 outline-subtle"
    >
      {/* Image area */}
      <div className="aspect-[4/3] bg-surface rounded-md overflow-hidden mb-4 flex items-center justify-center relative">
        <Package className="w-12 h-12 text-muted-foreground/20 group-hover:scale-110 group-hover:text-muted-foreground/30 transition-all duration-500" />
        {/* Shine effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="space-y-1.5">
        <span className="text-[10px] font-mono-tech uppercase tracking-widest text-primary">
          {product.category.replace("-", " ")}
        </span>
        <h3 className="text-base font-medium text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
          {product.name}
        </h3>
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
          <span className="text-lg font-semibold font-mono-tech text-foreground">{product.price}</span>
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
