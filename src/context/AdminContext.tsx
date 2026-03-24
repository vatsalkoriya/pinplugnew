import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
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

  // Contacts
  contacts: Contact[];
  contactsLoading: boolean;
  markContacted: (id: string) => Promise<void>;
}

// ─── Context ────────────────────────────────────────────────────────────────

const AdminContext = createContext<AdminContextType | null>(null);

// ─── Provider ───────────────────────────────────────────────────────────────

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("pinplug_admin_auth") === "true";
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [contactsLoading, setContactsLoading] = useState(false);

  // ── Fetch data ─────────────────────────────────────────

  // Public products for everyone
  useEffect(() => {
    setProductsLoading(true);
    productsApi
      .getAll()
      .then(setProducts)
      .catch(console.error)
      .finally(() => setProductsLoading(false));
  }, []);

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
    // Admin credentials — stored in .env on the server in production
    const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL ?? "admin@pinplug.com";
    const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASSWORD ?? "admin123";

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
