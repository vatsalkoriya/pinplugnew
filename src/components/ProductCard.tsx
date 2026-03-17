import { motion } from "framer-motion";
import type { Product } from "@/data/mockData";
import { Package } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onInquire?: (product: Product) => void;
}

export default function ProductCard({ product, onInquire }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
      className="group relative bg-card p-4 rounded-lg shadow-card hover:shadow-card-hover transition-shadow outline-subtle"
    >
      <div className="aspect-[4/3] bg-surface rounded-md overflow-hidden mb-4 flex items-center justify-center">
        <Package className="w-12 h-12 text-muted-foreground/30" />
      </div>
      <div className="space-y-1.5">
        <span className="text-[10px] font-mono-tech uppercase tracking-widest text-primary">
          {product.category.replace("-", " ")}
        </span>
        <h3 className="text-base font-medium text-foreground leading-tight">{product.name}</h3>
        <p className="text-sm font-mono-tech text-muted-foreground">MOD: {product.modelNumber}</p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {product.specs.map(spec => (
            <span key={spec} className="text-[10px] font-mono-tech px-2 py-0.5 rounded-sm bg-secondary text-muted-foreground">
              {spec}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-3">
          <span className="text-lg font-semibold font-mono-tech text-foreground">{product.price}</span>
          {onInquire && (
            <button
              onClick={() => onInquire(product)}
              className="text-xs font-medium px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.97] transition-all"
            >
              Inquire
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
