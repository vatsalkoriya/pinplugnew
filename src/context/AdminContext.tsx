import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { products as initialProducts, sampleContacts, type Product, type ContactMessage } from "@/data/mockData";

interface AdminContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  deleteProduct: (id: string) => void;
  contacts: ContactMessage[];
  markContacted: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [productsList, setProductsList] = useState<Product[]>(initialProducts);
  const [contactsList, setContactsList] = useState<ContactMessage[]>(sampleContacts);

  const login = useCallback((email: string, password: string) => {
    // Demo credentials — replace with MongoDB auth
    if (email === "admin@pinplug.com" && password === "admin123") {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => setIsAuthenticated(false), []);

  const addProduct = useCallback((product: Omit<Product, "id">) => {
    setProductsList(prev => [...prev, { ...product, id: Date.now().toString() }]);
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProductsList(prev => prev.filter(p => p.id !== id));
  }, []);

  const markContacted = useCallback((id: string) => {
    setContactsList(prev => prev.map(c => c.id === id ? { ...c, status: "contacted" as const } : c));
  }, []);

  return (
    <AdminContext.Provider value={{ isAuthenticated, login, logout, products: productsList, addProduct, deleteProduct, contacts: contactsList, markContacted }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
