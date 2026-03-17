import { useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
        <span className="text-meta">Catalog</span>
        <h1 className="mt-3 text-3xl font-semibold tracking-tighter text-foreground">Products</h1>

        {/* Filters */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
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
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeCat === cat.id
                    ? "bg-foreground text-background"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} onInquire={handleInquire} />
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="mt-12 text-center text-muted-foreground text-sm">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
}
