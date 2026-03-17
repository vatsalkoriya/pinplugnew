import { useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { categories } from "@/data/mockData";
import { useAdmin } from "@/context/AdminContext";
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { products } = useAdmin();
  const activeCat = searchParams.get("cat") || "all";

  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = activeCat === "all" ? products : products.filter(p => p.category === activeCat);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.modelNumber.toLowerCase().includes(q));
    }
    return list;
  }, [products, activeCat, search]);

  const handleInquire = (product: { name: string }) => {
    navigate(`/contact?product=${encodeURIComponent(product.name)}`);
  };

  return (
    <div className="min-h-screen">
      <div className="container max-w-6xl mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="text-meta">Catalog</span>
          <h1 className="mt-3 text-3xl font-semibold tracking-tighter text-foreground">Products</h1>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-6 flex flex-col sm:flex-row gap-3"
        >
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="h-10 px-3 text-sm rounded-md border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:outline-none w-full sm:w-64 transition-shadow"
          />
          <div className="flex flex-wrap gap-1.5">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => navigate(cat.id === "all" ? "/products" : `/products?cat=${cat.id}`)}
                className={`relative px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeCat === cat.id
                    ? "text-background"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {activeCat === cat.id && (
                  <motion.div
                    layoutId="cat-indicator"
                    className="absolute inset-0 bg-foreground rounded-md"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.name}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCat + search}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} onInquire={handleInquire} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 text-center text-muted-foreground text-sm"
          >
            No products found.
          </motion.div>
        )}
      </div>
    </div>
  );
}
