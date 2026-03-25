"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Package, ArrowLeft, Loader2, Minus, Plus, MessageSquare, CheckCircle2 } from "lucide-react";
import { productsApi, contactsApi, type Product } from "@/lib/api";
import { toast } from "sonner";
import { categories } from "@/data/mockData";

export default function ProductDetailsPage() {
  const params = useParams<{ id: string | string[] }>();
  const id = Array.isArray(params?.id) ? params?.id[0] : params?.id;
  const router = useRouter();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Image Selection
  const [selectedImage, setSelectedImage] = useState<string>("");
  
  // Quantity State
  const [quantity, setQuantity] = useState(1);
  
  // Inquiry State
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [submittingInquiry, setSubmittingInquiry] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [inquirySuccess, setInquirySuccess] = useState(false);

  useEffect(() => {
    if (!id) return;
    
    setLoading(true);
    productsApi.getById(id)
      .then(data => {
        setProduct(data);
        const imgs = data.images && data.images.length > 0 ? data.images : (data.image ? [data.image] : []);
        if (imgs.length > 0) {
          setSelectedImage(imgs[0]);
        }
      })
      .catch((err) => {
        console.error("Failed to load product details", err);
        toast.error("Product not found");
        router.push("/products");
      })
      .finally(() => setLoading(false));
  }, [id, router]);

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };
  
  const increaseQuantity = () => {
    if (quantity < 100) setQuantity(prev => prev + 1);
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    
    if (!inquiryForm.name || !inquiryForm.email || !inquiryForm.message) {
      toast.error("Please fill required fields (Name, Email, Message)");
      return;
    }

    setSubmittingInquiry(true);
    try {
      await contactsApi.create({
        name: inquiryForm.name,
        email: inquiryForm.email,
        phone: inquiryForm.phone,
        subject: `Product Inquiry: ${product.name} (Mod: ${product.modelNumber})`,
        message: inquiryForm.message,
        quantity: quantity,
      });
      setInquirySuccess(true);
      toast.success("Inquiry sent successfully!");
      // Reset form on success or allow them to close it
    } catch (err) {
      const error = err as Error;
      console.error(error);
      toast.error("Failed to send inquiry: " + (error.message || "Unknown error"));
    } finally {
      setSubmittingInquiry(false);
    }
  };

  if (loading) {
    return (
      <div className="container max-w-6xl mx-auto px-4 min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground font-mono-tech tracking-wider uppercase text-sm">Loading Product...</p>
      </div>
    );
  }

  if (!product) return null;

  const images = product.images && product.images.length > 0 ? product.images : (product.image ? [product.image] : []);
  const categoryLabel = categories.find(c => c.id === product.category)?.name || product.category.replace("-", " ");

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8 md:py-16 min-h-[80vh]">
      {/* Back navigation */}
      <button 
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Results
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
        
        {/* Left Column: Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-surface rounded-2xl overflow-hidden shadow-card border border-border flex items-center justify-center relative">
            {selectedImage ? (
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
            ) : (
              <Package className="w-24 h-24 text-muted-foreground/20" />
            )}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/5 to-transparent pointer-events-none" />
          </div>

          {images.length > 1 && (
            <div className="flex flex-wrap gap-4 pt-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === img ? "border-primary shadow-elevated opacity-100" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Details */}
        <div className="flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-secondary/80 border border-primary/10">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-bold font-mono-tech uppercase tracking-widest text-primary">
                {categoryLabel}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black text-foreground tracking-tight leading-none mb-4 uppercase">
              {product.name}
            </h1>
            
            <p className="text-sm md:text-base font-mono-tech text-muted-foreground tracking-wide mb-8">
              Model Number: <span className="font-semibold text-foreground">{product.modelNumber}</span>
            </p>

            <div className="mb-8">
              <span className="text-3xl font-semibold font-mono-tech text-foreground tracking-tight">
                {product.price.startsWith("₹") ? product.price : `₹${product.price}`}
              </span>
              <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-semibold">Price Estimate</p>
            </div>

            {/* Specifications */}
            {product.specs.length > 0 && (
              <div className="mb-10">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Core Specifications</h3>
                <div className="flex flex-wrap gap-2">
                  {product.specs.map(spec => (
                    <span
                      key={spec}
                      className="px-4 py-2 text-sm font-semibold rounded-lg bg-surface border border-border text-foreground hover:bg-secondary transition-colors"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {product.description && (
              <div className="mb-10">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Product Overview</h3>
                <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">
                  {product.description}
                </p>
              </div>
            )}

            {/* Actions / Quantity */}
            <div className="bg-surface border border-border p-6 rounded-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
               <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                 
                 <div className="flex items-center justify-between border border-border rounded-xl bg-background overflow-hidden flex-shrink-0 h-14">
                   <button 
                    onClick={decreaseQuantity}
                    className="h-full px-4 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                   >
                     <Minus className="w-4 h-4" />
                   </button>
                   <span className="font-mono-tech font-bold text-foreground w-12 text-center text-lg">{quantity}</span>
                   <button 
                    onClick={increaseQuantity}
                    className="h-full px-4 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                   >
                     <Plus className="w-4 h-4" />
                   </button>
                 </div>

                 <button
                  onClick={() => setShowInquiryForm(true)}
                  className="flex-1 h-14 bg-foreground text-background hover:bg-neutral-800 transition-colors uppercase font-black text-sm tracking-widest rounded-xl inline-flex items-center justify-center gap-2 group shadow-elevated active:scale-95"
                 >
                   Enquire Now
                   <span className="w-5 h-5 rounded-full bg-background/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                     <ArrowLeft className="w-3 h-3 rotate-180" />
                   </span>
                 </button>

               </div>
               <p className="text-xs text-muted-foreground text-center sm:text-left mt-4 font-medium uppercase tracking-wider">
                 Submit an inquiry and we'll reply with accurate availability.
               </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Inquiry Modal */}
      <AnimatePresence>
        {showInquiryForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="w-full max-w-lg bg-card border border-border rounded-2xl shadow-elevated p-6 md:p-8 relative overflow-hidden"
            >
              <button 
                onClick={() => { setShowInquiryForm(false); setInquirySuccess(false); }}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-secondary transition-colors"
              >
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </button>

              {inquirySuccess ? (
                <div className="py-10 flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-black uppercase text-foreground">Inquiry Sent!</h3>
                  <p className="text-muted-foreground text-sm max-w-xs">
                    We've received your request for {quantity} x {product.name}. Our team will contact you shortly.
                  </p>
                  <button
                    onClick={() => { setShowInquiryForm(false); setInquirySuccess(false); }}
                    className="mt-6 px-6 py-2.5 bg-foreground text-background font-bold tracking-wider uppercase text-sm rounded-full hover:bg-neutral-800 transition-colors"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h2 className="text-2xl font-black uppercase text-foreground flex items-center gap-2 mb-2">
                      <MessageSquare className="w-5 h-5 text-primary" /> Send Inquiry
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Requesting <span className="font-bold text-foreground mx-1">{quantity}</span> unit(s) of <span className="font-semibold text-foreground font-mono-tech mx-1 truncate inline-block max-w-[150px] align-bottom">{product.modelNumber}</span>
                    </p>
                  </div>

                  <form onSubmit={handleInquirySubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Full Name *</label>
                      <input 
                        type="text" 
                        required 
                        value={inquiryForm.name}
                        onChange={e => setInquiryForm({...inquiryForm, name: e.target.value})}
                        className="w-full h-11 px-3 py-2 rounded-lg border border-input bg-surface focus:ring-2 focus:ring-primary/20 focus:outline-none text-sm transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Address *</label>
                        <input 
                          type="email" 
                          required 
                          value={inquiryForm.email}
                          onChange={e => setInquiryForm({...inquiryForm, email: e.target.value})}
                          className="w-full h-11 px-3 py-2 rounded-lg border border-input bg-surface focus:ring-2 focus:ring-primary/20 focus:outline-none text-sm transition-all"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Phone Number</label>
                        <input 
                          type="tel" 
                          value={inquiryForm.phone}
                          onChange={e => setInquiryForm({...inquiryForm, phone: e.target.value})}
                          className="w-full h-11 px-3 py-2 rounded-lg border border-input bg-surface focus:ring-2 focus:ring-primary/20 focus:outline-none text-sm transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Message / Comments *</label>
                      <textarea 
                         required 
                         rows={3}
                         value={inquiryForm.message}
                         onChange={e => setInquiryForm({...inquiryForm, message: e.target.value})}
                         placeholder="Any specific requests or questions?"
                         className="w-full px-3 py-3 rounded-lg border border-input bg-surface focus:ring-2 focus:ring-primary/20 focus:outline-none text-sm transition-all resize-none"
                      />
                    </div>
                    
                    <div className="pt-2 flex gap-3">
                      <button
                        type="submit"
                        disabled={submittingInquiry}
                        className="flex-1 h-11 bg-primary text-primary-foreground font-black uppercase text-sm tracking-widest rounded-lg inline-flex items-center justify-center gap-2 shadow-sm hover:opacity-90 transition-all disabled:opacity-50"
                      >
                        {submittingInquiry ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit Inquiry"}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
