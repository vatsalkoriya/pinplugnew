"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { productsApi, contactsApi, type Product, type Contact } from "@/lib/api";

// ─── Types ──────────────────────────────────────────────────────────────────

interface AdminContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;

  // Products
  products: Product[];
  productsLoading: boolean;
  addProduct: (product: Omit<Product, "_id">) => Promise<void>;
  updateProduct: (id: string, product: Partial<Omit<Product, "_id">>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  refreshProducts: () => Promise<void>;

  // Contacts
  contacts: Contact[];
  contactsLoading: boolean;
  markContacted: (id: string) => Promise<void>;
}

// ─── Context ────────────────────────────────────────────────────────────────

const AdminContext = createContext<AdminContextType | null>(null);

// Cache duration: don't re-fetch products if fetched within this window
const CACHE_DURATION_MS = 2 * 60 * 1000; // 2 minutes

// ─── Provider ───────────────────────────────────────────────────────────────

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [contactsLoading, setContactsLoading] = useState(false);

  // Track when products were last fetched to avoid redundant calls
  const lastFetchedAt = useRef<number>(0);
  const isFetching = useRef(false);

  // ── Fetch data ─────────────────────────────────────────

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsAuthenticated(localStorage.getItem("pinplug_admin_auth") === "true");
  }, []);

  const fetchProducts = useCallback(async (force = false) => {
    // Skip if we already have fresh data (unless forced)
    const now = Date.now();
    if (!force && lastFetchedAt.current > 0 && now - lastFetchedAt.current < CACHE_DURATION_MS) {
      return;
    }
    // Skip if already fetching
    if (isFetching.current) return;

    isFetching.current = true;
    setProductsLoading(true);
    try {
      const data = await productsApi.getAll();
      setProducts(data);
      lastFetchedAt.current = Date.now();
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setProductsLoading(false);
      isFetching.current = false;
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Admin-only contacts
  useEffect(() => {
    if (!isAuthenticated) return;

    setContactsLoading(true);
    contactsApi
      .getAll()
      .then(setContacts)
      .catch(console.error)
      .finally(() => setContactsLoading(false));
  }, [isAuthenticated]);

  // ── Auth ──────────────────────────────────────────────────────────────────

  const login = useCallback(async (email: string, password: string) => {
    const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "admin@pinplug.com";
    const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "admin123";

    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      setIsAuthenticated(true);
      localStorage.setItem("pinplug_admin_auth", "true");
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    localStorage.removeItem("pinplug_admin_auth");
    setProducts([]);
    setContacts([]);
    lastFetchedAt.current = 0;
  }, []);

  // ── Product actions ───────────────────────────────────────────────────────

  const addProduct = useCallback(async (product: Omit<Product, "_id">) => {
    const created = await productsApi.create(product);
    setProducts((prev) => [created, ...prev]);
  }, []);

  const deleteProduct = useCallback(async (id: string) => {
    await productsApi.delete(id);
    setProducts((prev) => prev.filter((p) => p._id !== id));
  }, []);

  const updateProduct = useCallback(async (id: string, product: Partial<Omit<Product, "_id">>) => {
    const updated = await productsApi.update(id, product);
    setProducts((prev) => prev.map((p) => (p._id === id ? updated : p)));
  }, []);

  const refreshProducts = useCallback(async () => {
    await fetchProducts(true);
  }, [fetchProducts]);

  // ── Contact actions ───────────────────────────────────────────────────────

  const markContacted = useCallback(async (id: string) => {
    const updated = await contactsApi.markContacted(id);
    setContacts((prev) =>
      prev.map((c) => (c._id === id ? updated : c))
    );
  }, []);

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        products,
        productsLoading,
        addProduct,
        updateProduct,
        deleteProduct,
        refreshProducts,
        contacts,
        contactsLoading,
        markContacted,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}

// Re-export types for convenience
export type { Product, Contact };
