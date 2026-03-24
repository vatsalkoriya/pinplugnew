import { useState, useRef, useEffect } from "react";
import { useAdmin, type Product } from "@/context/AdminContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package, MessageSquare, Plus, LogOut, Trash2, Edit2,
  CheckCircle2, Clock, LayoutDashboard, Loader2, Upload, X, Star,
  FileSpreadsheet, Download,
} from "lucide-react";
import { categories } from "@/data/mockData";
import { toast } from "sonner";
import { uploadImage } from "@/lib/api";
import Papa from "papaparse";
import * as XLSX from "xlsx";

type Tab = "overview" | "products" | "contacts" | "reviews" | "add-product" | "edit-product";

type Review = {
  id: string;
  name: string;
  rating: number;
  message: string;
  createdAt: string;
};

const REVIEWS_KEY = "pinplug_reviews";

function loadReviews(): Review[] {
  try {
    const raw = localStorage.getItem(REVIEWS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Review[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveReviews(reviews: Review[]) {
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
}

export default function AdminDashboardPage() {
  const {
    logout, products, productsLoading,
    addProduct, updateProduct, deleteProduct,
    contacts, contactsLoading, markContacted,
  } = useAdmin();
  const [tab, setTab] = useState<Tab>("overview");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setTab("edit-product");
  };

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
            { id: "reviews" as Tab, icon: Star, label: "Reviews" },
            { id: "add-product" as Tab, icon: Plus, label: "Add Product" },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => {
                setTab(item.id);
                if (item.id !== "edit-product") setEditingProduct(null);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${tab === item.id
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
          {(["overview", "products", "contacts", "reviews", "add-product"] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => {
                setTab(t);
                if (t !== "edit-product") setEditingProduct(null);
              }}
              className={`px-3 py-1 text-xs rounded-md whitespace-nowrap ${tab === t ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground"
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
            {tab === "overview" && (
              <OverviewTab key="overview" products={products} contacts={contacts} setTab={setTab} />
            )}
            {tab === "products" && (
              <ProductsTab
                key="products"
                products={products}
                loading={productsLoading}
                startEdit={startEdit}
                addProduct={addProduct}
                deleteProduct={async (id) => {
                  try {
                    await deleteProduct(id);
                    toast.success("Product deleted");
                  } catch {
                    toast.error("Failed to delete product");
                  }
                }}
              />
            )}
            {tab === "contacts" && (
              <ContactsTab
                key="contacts"
                contacts={contacts}
                loading={contactsLoading}
                markContacted={async (id) => {
                  try {
                    await markContacted(id);
                    toast.success("Marked as contacted");
                  } catch {
                    toast.error("Failed to update");
                  }
                }}
              />
            )}
            {tab === "reviews" && (
              <ReviewsTab key="reviews" />
            )}
            {tab === "add-product" && (
              <AddProductTab
                key="add"
                addProduct={async (p) => {
                  try {
                    await addProduct(p);
                    toast.success("Product added!");
                    setTab("products");
                  } catch {
                    toast.error("Failed to add product");
                  }
                }}
                setTab={setTab}
              />
            )}
            {tab === "edit-product" && editingProduct && (
              <AddProductTab
                key="edit"
                product={editingProduct}
                updateProduct={async (id, p) => {
                  try {
                    await updateProduct(id, p);
                    toast.success("Product updated!");
                    setTab("products");
                    setEditingProduct(null);
                  } catch {
                    toast.error("Failed to update product");
                  }
                }}
                setTab={setTab}
              />
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

// ─── Loading spinner helper ───────────────────────────────────────────────────

function Spinner() {
  return (
    <div className="flex items-center justify-center py-16">
      <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
    </div>
  );
}

// ─── Overview ────────────────────────────────────────────────────────────────

function OverviewTab({
  products, contacts, setTab,
}: {
  products: Product[]; contacts: any[]; setTab: (t: Tab) => void;
}) {
  const newContacts = contacts.filter((c: { status: string }) => c.status === "new").length;
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

// ─── Products tab ─────────────────────────────────────────────────────────────

function ProductsTab({
  products, loading, deleteProduct, startEdit, addProduct,
}: {
  products: Product[]; loading: boolean; deleteProduct: (id: string) => void; startEdit: (product: Product) => void; addProduct: (p: Partial<Product>) => void;
}) {
  const [importing, setImporting] = useState(false);
  const importFileRef = useRef<HTMLInputElement>(null);

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);
    const reader = new FileReader();

    reader.onload = async (evt) => {
      try {
        const bstr = evt.target?.result;
        const extension = file.name.split('.').pop()?.toLowerCase();
        let data: any[] = [];

        if (extension === 'csv') {
          const results = Papa.parse(bstr as string, { header: true, skipEmptyLines: true });
          data = results.data;
        } else {
          const workbook = XLSX.read(bstr, { type: 'binary' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          data = XLSX.utils.sheet_to_json(worksheet);
        }

        if (!data.length) {
          toast.error("No data found in file");
          return;
        }

        toast.info(`Importing ${data.length} products... Please wait.`);

        let successCount = 0;
        for (const item of data) {
          try {
            const name = item.name || item.Name || item.product || item.Product || item["Product Name"] || "";
            if (!name) continue;
            
            const category = item.category || item.Category || item.type || item.Type || "ac";
            const model = item.modelNumber || item.ModelNumber || item.model || item.Model || item.sku || item.SKU || "";
            const price = item.price || item.Price || item.mrp || item.MRP || "";
            const mainImage = item.image || item.Image || item.imageUrl || item.ImageUrl || item.img || "";
            const otherImages = item.images || item.Images || item.otherImages || "";
            const specs = item.specs || item.Specs || item.specifications || item.Specifications || item.features || "";
            const description = item.description || item.Description || item.about || item.About || item.info || item.Info || "";

            await addProduct({
              name,
              category: String(category).toLowerCase().trim().replace(" ", "-"),
              modelNumber: String(model),
              price: String(price),
              image: String(mainImage),
              images: otherImages ? String(otherImages).split(',').map((s: string) => s.trim()).filter(Boolean) : (mainImage ? [String(mainImage)] : []),
              specs: specs ? String(specs).split(',').map((s: string) => s.trim()).filter(Boolean) : [],
              description: String(description),
            });
            successCount++;
          } catch (err) {
            console.error("Failed to import row:", item, err);
          }
        }

        toast.success(`Successfully imported ${successCount} products!`);
      } catch (err) {
        toast.error("Failed to parse file");
        console.error(err);
      } finally {
        setImporting(false);
        if (importFileRef.current) importFileRef.current.value = "";
      }
    };

    if (file.name.endsWith('.csv')) {
      reader.readAsText(file);
    } else {
      reader.readAsBinaryString(file);
    }
  };

  const downloadTemplate = () => {
    const template = [
      { 
        Name: "Voltas AC 1.5 Ton", 
        Category: "ac", 
        ModelNumber: "V123", 
        Price: "35000", 
        Image: "https://example.com/main.jpg", 
        Images: "https://example.com/1.jpg, https://example.com/2.jpg", 
        Specs: "5 Star, Inverter, Copper",
        Description: "High performance AC for efficient cooling."
      }
    ];
    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");
    XLSX.writeFile(wb, "pinplug_product_template.xlsx");
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Products</h1>
          <p className="text-sm text-muted-foreground mt-1">{products.length} products in catalog</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={downloadTemplate}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md border border-border bg-card text-foreground hover:bg-secondary transition-all"
          >
            <Download className="w-3.5 h-3.5" /> Template
          </button>
          <button
            onClick={() => importFileRef.current?.click()}
            disabled={importing}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md border border-border bg-card text-foreground hover:bg-secondary transition-all disabled:opacity-50"
          >
            {importing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileSpreadsheet className="w-3.5 h-3.5" />}
            {importing ? "Importing..." : "Bulk Import"}
          </button>
          <input
            type="file"
            ref={importFileRef}
            onChange={handleImport}
            className="hidden"
            accept=".csv, .xlsx, .xls"
          />
        </div>
      </div>
      <div className="rounded-lg bg-card shadow-card outline-subtle overflow-hidden">
        {loading ? (
          <Spinner />
        ) : products.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-16">No products yet. Add one!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-4 py-3 text-meta font-medium w-12">Image</th>
                  <th className="px-4 py-3 text-meta font-medium">Product</th>
                  <th className="px-4 py-3 text-meta font-medium">Category</th>
                  <th className="px-4 py-3 text-meta font-medium">Model</th>
                  <th className="px-4 py-3 text-meta font-medium">Price</th>
                  <th className="px-4 py-3 text-meta font-medium w-32"></th>
                </tr>
              </thead>
              <tbody className="font-mono-tech tabular-nums">
                {products.map(p => (
                  <tr key={p._id} className="border-b border-border last:border-0 hover:bg-surface transition-colors">
                    <td className="px-4 py-3">
                      <div className="w-10 h-10 rounded bg-muted flex items-center justify-center overflow-hidden border border-border">
                        {p.image ? (
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                        ) : (
                          <Package className="w-5 h-5 text-muted-foreground/30" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-sans text-foreground font-medium">{p.name}</td>
                    <td className="px-4 py-3 text-muted-foreground capitalize">{p.category.replace("-", " ")}</td>
                    <td className="px-4 py-3 text-muted-foreground">{p.modelNumber}</td>
                    <td className="px-4 py-3 text-foreground">{p.price.startsWith("₹") ? p.price : `₹${p.price}`}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => startEdit(p)}
                          className="p-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteProduct(p._id)}
                          className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Contacts tab ─────────────────────────────────────────────────────────────

function ContactsTab({
  contacts, loading, markContacted,
}: {
  contacts: any[]; loading: boolean; markContacted: (id: string) => void;
}) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">Inquiries</h1>
      <p className="text-sm text-muted-foreground mt-1">{contacts.length} customer inquiries</p>
      <div className="mt-6 space-y-3">
        {loading ? (
          <Spinner />
        ) : contacts.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-16">No inquiries yet.</p>
        ) : (
          contacts.map((c: any) => (
            <div key={c._id} className="p-5 rounded-lg bg-card shadow-card outline-subtle">
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
                  <p className="text-sm font-medium text-foreground mt-2">
                    {c.subject}
                    {c.quantity ? <span className="ml-2 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-bold leading-none">Qty: {c.quantity}</span> : null}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{c.message}</p>
                  <p className="text-meta mt-2">{c.date}</p>
                </div>
                {c.status === "new" && (
                  <button
                    onClick={() => markContacted(c._id)}
                    className="text-xs font-medium px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.97] transition-all flex-shrink-0"
                  >
                    Mark Contacted
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}

// ─── Reviews tab ─────────────────────────────────────────────────────────────

function ReviewsTab() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editRating, setEditRating] = useState(5);
  const [editMessage, setEditMessage] = useState("");

  useEffect(() => {
    setReviews(loadReviews());
  }, []);

  useEffect(() => {
    saveReviews(reviews);
  }, [reviews]);

  const startEdit = (review: Review) => {
    setEditingId(review.id);
    setEditName(review.name);
    setEditRating(review.rating);
    setEditMessage(review.message);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditRating(5);
    setEditMessage("");
  };

  const saveEdit = () => {
    if (!editingId || !editName.trim() || !editMessage.trim()) return;
    setReviews(prev =>
      prev.map(r => (r.id === editingId ? { ...r, name: editName.trim(), rating: editRating, message: editMessage.trim() } : r)),
    );
    cancelEdit();
  };

  const deleteReview = (id: string) => {
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">Reviews</h1>
      <p className="text-sm text-muted-foreground mt-1">{reviews.length} review{reviews.length === 1 ? "" : "s"}</p>
      <div className="mt-6 space-y-3">
        {reviews.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-16">No reviews yet.</p>
        ) : (
          reviews.map(r => (
            <div key={r.id} className="p-5 rounded-lg bg-card shadow-card outline-subtle">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {editingId === r.id ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={editName}
                          onChange={e => setEditName(e.target.value)}
                          className="w-full h-10 px-3 text-sm rounded-md border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:outline-none"
                          placeholder="Name"
                        />
                        <select
                          value={editRating}
                          onChange={e => setEditRating(Number(e.target.value))}
                          className="w-full h-10 px-3 text-sm rounded-md border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:outline-none"
                        >
                          {[5, 4, 3, 2, 1].map(val => (
                            <option key={val} value={val}>
                              {val} Star{val > 1 ? "s" : ""}
                            </option>
                          ))}
                        </select>
                      </div>
                      <textarea
                        value={editMessage}
                        onChange={e => setEditMessage(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:outline-none"
                        placeholder="Review message"
                      />
                      <div className="flex items-center gap-2">
                        <button
                          onClick={saveEdit}
                          className="px-4 py-2 text-xs font-medium rounded-md bg-foreground text-background hover:opacity-90 transition"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="px-4 py-2 text-xs font-medium rounded-md border border-border text-foreground hover:bg-secondary transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-foreground">{r.name}</span>
                        <span className="text-xs text-muted-foreground">{r.rating}/5</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{new Date(r.createdAt).toLocaleDateString()}</p>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{r.message}</p>
                    </>
                  )}
                </div>
                {editingId !== r.id && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => startEdit(r)}
                      className="p-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteReview(r.id)}
                      className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}

// ─── Add/Edit product tab ───────────────────────────────────────────────────

function AddProductTab({
  addProduct, updateProduct, product, setTab,
}: {
  addProduct?: (p: any) => void; updateProduct?: (id: string, p: any) => void; product?: Product; setTab: (t: Tab) => void;
}) {
  const isEdit = !!product;
  const [form, setForm] = useState({
    name: product?.name || "",
    category: product?.category || "ac",
    modelNumber: product?.modelNumber || "",
    price: product?.price || "",
    specs: product?.specs?.join(", ") || "",
    description: product?.description || "",
    images: product?.images?.length ? product.images : (product?.image ? [product.image] : []),
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (form.images.length + files.length > 4) {
      toast.error("You can only upload up to 4 images.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setUploading(true);
    try {
      const urls = await Promise.all(files.map(uploadImage));
      setForm(f => ({ ...f, images: [...f.images, ...urls] }));
      toast.success(`${files.length} image(s) uploaded!`);
    } catch {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleAddImageUrl = () => {
    if (!imageUrlInput.trim()) return;
    if (form.images.length >= 4) {
      toast.error("You can only add up to 4 images.");
      return;
    }
    setForm(f => ({ ...f, images: [...f.images, imageUrlInput.trim()] }));
    setImageUrlInput("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.modelNumber.trim() || !form.price.trim()) {
      toast.error("Please fill required fields.");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        category: form.category,
        modelNumber: form.modelNumber,
        price: form.price,
        image: form.images[0] || "",
        images: form.images,
        specs: form.specs.split(",").map(s => s.trim()).filter(Boolean),
        description: form.description,
      };

      if (isEdit && updateProduct && product) {
        await updateProduct(product._id, payload);
      } else if (addProduct) {
        await addProduct(payload);
      }
    } catch (err: any) {
      console.error("Save product error:", err);
      toast.error(err.message || "Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => setTab("products")}
          className="p-1.5 rounded-md text-muted-foreground hover:bg-secondary transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {isEdit ? "Edit Product" : "Add Product"}
        </h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
        <form onSubmit={handleSubmit} className="p-6 rounded-lg bg-card shadow-card outline-subtle space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4 border-b border-border pb-2">Product Form</h2>
          
          <div className="space-y-3">
            <label className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Product Images ({form.images.length}/4)</span>
            </label>
            <div className="flex flex-col gap-4 p-4 rounded-lg bg-surface border border-border">
              <div className="flex flex-wrap gap-4">
                {form.images.map((img, idx) => (
                  <div key={idx} className="w-24 h-24 rounded-lg bg-muted border border-border overflow-hidden flex items-center justify-center relative group">
                    <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => setForm(f => ({ ...f, images: f.images.filter((_, i) => i !== idx) }))}
                      className="absolute top-1 right-1 p-1 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                {form.images.length < 4 && (
                  <div className="w-24 h-24 rounded-lg bg-muted border border-border border-dashed flex items-center justify-center flex-shrink-0 relative">
                    <Package className="w-8 h-8 text-muted-foreground/30" />
                  </div>
                )}
              </div>

              {form.images.length < 4 && (
                <div className="flex flex-col space-y-4 pt-4 border-t border-border">
                  <div className="space-y-2">
                    <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-tight">Option 1: Upload File(s)</p>
                    <button
                      type="button"
                      disabled={uploading}
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-md bg-foreground text-background hover:opacity-90 transition-all disabled:opacity-50"
                    >
                      {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                      {uploading ? "Uploading..." : "Select Images to Upload"}
                    </button>
                    <input
                      type="file"
                      multiple
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*"
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-[10px] uppercase">
                      <span className="bg-surface px-2 text-muted-foreground font-semibold">OR</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-tight">Option 2: Paste URL</p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={imageUrlInput}
                        onChange={e => setImageUrlInput(e.target.value)}
                        className="flex-1 h-9 px-3 text-sm rounded-md border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:outline-none"
                        placeholder="https://example.com/image.jpg"
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddImageUrl();
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleAddImageUrl}
                        className="px-4 h-9 text-xs font-bold uppercase rounded-md bg-secondary text-secondary-foreground hover:opacity-90 transition-all"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div>
            <label className="text-xs font-medium text-foreground mb-1 block">Description</label>
            <textarea
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              className="w-full h-24 px-3 py-2 text-sm rounded-md border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:outline-none resize-none"
              placeholder="Detailed product description..."
              maxLength={2000}
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving || uploading}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-md bg-foreground text-background hover:opacity-90 active:scale-[0.97] transition-all disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : (isEdit ? <Edit2 className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />)}
              {saving ? "Saving..." : (isEdit ? "Update Product" : "Add Product")}
            </button>
            <button
              type="button"
              onClick={() => setTab("products")}
              className="px-5 py-2.5 text-sm font-medium rounded-md border border-border bg-card text-foreground hover:bg-secondary transition-all"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Live Preview section */}
        <div className="hidden xl:flex flex-col space-y-4 sticky top-0 bg-background/50 backdrop-blur-md p-6 rounded-2xl border border-border shadow-elevated">
          <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-2 flex items-center gap-2">
            <LayoutDashboard className="w-4 h-4" /> Live Preview
          </h2>
          <div className="scale-[0.85] origin-top border border-border rounded-xl bg-card overflow-hidden shadow-card">
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <div className="aspect-square bg-surface rounded-xl overflow-hidden flex items-center justify-center border border-border">
                  {form.images[0] ? (
                    <img src={form.images[0]} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <Package className="w-12 h-12 text-muted-foreground/20" />
                  )}
                </div>
                <div className="space-y-4">
                  <span className="inline-block px-2 py-0.5 text-[8px] font-bold uppercase tracking-tighter bg-primary/10 text-primary rounded-full">
                    {categories.find(c => c.id === form.category)?.name || "Category"}
                  </span>
                  <h3 className="text-xl font-black uppercase text-foreground truncate">{form.name || "Product Name"}</h3>
                  <p className="text-[10px] font-mono-tech text-muted-foreground uppercase">{form.modelNumber || "MODEL-XXXX"}</p>
                  <p className="text-2xl font-bold font-mono-tech">{form.price ? (form.price.startsWith("₹") ? form.price : `₹${form.price}`) : "₹XX,XXX"}</p>
                  <div className="flex flex-wrap gap-1">
                    {form.specs.split(',').filter(Boolean).map((s, i) => (
                      <span key={i} className="px-2 py-1 text-[8px] bg-secondary rounded text-muted-foreground whitespace-nowrap">{s.trim()}</span>
                    ))}
                  </div>
                  <div className="pt-4">
                    <div className="w-full h-10 bg-foreground rounded flex items-center justify-center text-background text-[10px] font-black uppercase tracking-widest">Enquire Now</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground italic text-center">This is a live preview of how the product will appear on the storefront.</p>
        </div>
      </div>
    </motion.div>
  );
}