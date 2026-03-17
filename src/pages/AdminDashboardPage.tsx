import { useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { motion, AnimatePresence } from "framer-motion";
import { Package, MessageSquare, Plus, LogOut, Trash2, CheckCircle2, Clock, LayoutDashboard } from "lucide-react";
import { categories } from "@/data/mockData";
import { toast } from "sonner";

type Tab = "overview" | "products" | "contacts" | "add-product";

export default function AdminDashboardPage() {
  const { logout, products, addProduct, deleteProduct, contacts, markContacted } = useAdmin();
  const [tab, setTab] = useState<Tab>("overview");

  return (
    <div className="min-h-screen flex bg-surface">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar flex-shrink-0 flex flex-col border-r border-sidebar-border hidden md:flex">
        <div className="p-5 border-b border-sidebar-border">
          <span className="text-sm font-semibold text-sidebar-accent-foreground tracking-tight">Pinplug Admin</span>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {[
            { id: "overview" as Tab, icon: LayoutDashboard, label: "Overview" },
            { id: "products" as Tab, icon: Package, label: "Products" },
            { id: "contacts" as Tab, icon: MessageSquare, label: "Inquiries" },
            { id: "add-product" as Tab, icon: Plus, label: "Add Product" },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
                tab === item.id
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent/50"
              }`}
            >
              {tab === item.id && <div className="w-0.5 h-4 bg-sidebar-primary rounded-full -ml-1 mr-1" />}
              <item.icon className="w-4 h-4" strokeWidth={1.5} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-sidebar-border">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-sidebar-foreground hover:text-sidebar-accent-foreground rounded-md transition-colors"
          >
            <LogOut className="w-4 h-4" strokeWidth={1.5} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-sidebar border-b border-sidebar-border">
        <div className="flex items-center justify-between px-4 h-12">
          <span className="text-sm font-semibold text-sidebar-accent-foreground">Pinplug Admin</span>
          <button onClick={logout} className="text-sidebar-foreground"><LogOut className="w-4 h-4" /></button>
        </div>
        <div className="flex gap-1 px-3 pb-2 overflow-x-auto">
          {(["overview", "products", "contacts", "add-product"] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1 text-xs rounded-md whitespace-nowrap ${
                tab === t ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground"
              }`}
            >
              {t === "add-product" ? "Add" : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 overflow-y-auto md:pt-0 pt-24">
        <div className="p-6 md:p-8 max-w-5xl">
          <AnimatePresence mode="wait">
            {tab === "overview" && <OverviewTab key="overview" products={products} contacts={contacts} setTab={setTab} />}
            {tab === "products" && <ProductsTab key="products" products={products} deleteProduct={deleteProduct} />}
            {tab === "contacts" && <ContactsTab key="contacts" contacts={contacts} markContacted={markContacted} />}
            {tab === "add-product" && <AddProductTab key="add" addProduct={addProduct} setTab={setTab} />}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function OverviewTab({ products, contacts, setTab }: { products: any[]; contacts: any[]; setTab: (t: Tab) => void }) {
  const newContacts = contacts.filter((c: any) => c.status === "new").length;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">Dashboard</h1>
      <p className="text-sm text-muted-foreground mt-1">Welcome back to Pinplug admin.</p>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button onClick={() => setTab("products")} className="p-5 rounded-lg bg-card shadow-card outline-subtle text-left hover:shadow-card-hover transition-shadow">
          <span className="text-meta">Total Products</span>
          <p className="mt-2 text-3xl font-semibold font-mono-tech text-foreground">{products.length}</p>
        </button>
        <button onClick={() => setTab("contacts")} className="p-5 rounded-lg bg-card shadow-card outline-subtle text-left hover:shadow-card-hover transition-shadow">
          <span className="text-meta">Total Inquiries</span>
          <p className="mt-2 text-3xl font-semibold font-mono-tech text-foreground">{contacts.length}</p>
        </button>
        <button onClick={() => setTab("contacts")} className="p-5 rounded-lg bg-card shadow-card outline-subtle text-left hover:shadow-card-hover transition-shadow">
          <span className="text-meta">New Inquiries</span>
          <p className="mt-2 text-3xl font-semibold font-mono-tech text-primary">{newContacts}</p>
        </button>
      </div>
    </motion.div>
  );
}

function ProductsTab({ products, deleteProduct }: { products: any[]; deleteProduct: (id: string) => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">Products</h1>
      <p className="text-sm text-muted-foreground mt-1">{products.length} products in catalog</p>
      <div className="mt-6 rounded-lg bg-card shadow-card outline-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-4 py-3 text-meta font-medium">Product</th>
                <th className="px-4 py-3 text-meta font-medium">Category</th>
                <th className="px-4 py-3 text-meta font-medium">Model</th>
                <th className="px-4 py-3 text-meta font-medium">Price</th>
                <th className="px-4 py-3 text-meta font-medium w-16"></th>
              </tr>
            </thead>
            <tbody className="font-mono-tech tabular-nums">
              {products.map(p => (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-surface transition-colors">
                  <td className="px-4 py-3 font-sans text-foreground font-medium">{p.name}</td>
                  <td className="px-4 py-3 text-muted-foreground capitalize">{p.category.replace("-", " ")}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.modelNumber}</td>
                  <td className="px-4 py-3 text-foreground">{p.price}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => { deleteProduct(p.id); toast.success("Product deleted"); }}
                      className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

function ContactsTab({ contacts, markContacted }: { contacts: any[]; markContacted: (id: string) => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">Inquiries</h1>
      <p className="text-sm text-muted-foreground mt-1">{contacts.length} customer inquiries</p>
      <div className="mt-6 space-y-3">
        {contacts.map((c: any) => (
          <div key={c.id} className="p-5 rounded-lg bg-card shadow-card outline-subtle">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-foreground">{c.name}</span>
                  {c.status === "new" ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono-tech uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded-sm">
                      <Clock className="w-2.5 h-2.5" /> New
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono-tech uppercase tracking-widest text-muted-foreground bg-secondary px-2 py-0.5 rounded-sm">
                      <CheckCircle2 className="w-2.5 h-2.5" /> Contacted
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground font-mono-tech">{c.email} · {c.phone}</p>
                <p className="text-sm font-medium text-foreground mt-2">{c.subject}</p>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{c.message}</p>
                <p className="text-meta mt-2">{c.date}</p>
              </div>
              {c.status === "new" && (
                <button
                  onClick={() => { markContacted(c.id); toast.success("Marked as contacted"); }}
                  className="text-xs font-medium px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.97] transition-all flex-shrink-0"
                >
                  Mark Contacted
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function AddProductTab({ addProduct, setTab }: { addProduct: (p: any) => void; setTab: (t: Tab) => void }) {
  const [form, setForm] = useState({
    name: "", category: "ac", modelNumber: "", price: "", specs: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.modelNumber.trim() || !form.price.trim()) {
      toast.error("Please fill required fields.");
      return;
    }
    addProduct({
      name: form.name,
      category: form.category,
      modelNumber: form.modelNumber,
      price: form.price,
      image: "",
      specs: form.specs.split(",").map(s => s.trim()).filter(Boolean),
    });
    toast.success("Product added!");
    setTab("products");
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">Add Product</h1>
      <form onSubmit={handleSubmit} className="mt-6 max-w-lg p-6 rounded-lg bg-card shadow-card outline-subtle space-y-4">
        <div>
          <label className="text-xs font-medium text-foreground mb-1 block">Product Name *</label>
          <input
            type="text"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            className="w-full h-10 px-3 text-sm rounded-md border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:outline-none"
            maxLength={200}
          />
        </div>
        <div>
          <label className="text-xs font-medium text-foreground mb-1 block">Category *</label>
          <select
            value={form.category}
            onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
            className="w-full h-10 px-3 text-sm rounded-md border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:outline-none"
          >
            {categories.filter(c => c.id !== "all").map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-foreground mb-1 block">Model Number *</label>
            <input
              type="text"
              value={form.modelNumber}
              onChange={e => setForm(f => ({ ...f, modelNumber: e.target.value }))}
              className="w-full h-10 px-3 text-sm rounded-md border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:outline-none font-mono-tech"
              maxLength={50}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-foreground mb-1 block">Price *</label>
            <input
              type="text"
              value={form.price}
              onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
              className="w-full h-10 px-3 text-sm rounded-md border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:outline-none font-mono-tech"
              placeholder="₹XX,XXX"
              maxLength={20}
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-foreground mb-1 block">Specs (comma-separated)</label>
          <input
            type="text"
            value={form.specs}
            onChange={e => setForm(f => ({ ...f, specs: e.target.value }))}
            className="w-full h-10 px-3 text-sm rounded-md border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:outline-none"
            placeholder="5 Star, Inverter, 1.5 Ton"
            maxLength={500}
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-md bg-foreground text-background hover:opacity-90 active:scale-[0.97] transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Product
        </button>
      </form>
    </motion.div>
  );
}
