"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Send, MapPin, Phone, Mail } from "lucide-react";
import { toast } from "sonner";
import { contactsApi } from "@/lib/api";

export default function ContactPage() {
  const searchParams = useSearchParams();
  const prefilledProduct = searchParams.get("product") || "";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: prefilledProduct ? `Inquiry about ${prefilledProduct}` : "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSending(true);
    try {
      await contactsApi.create(form);
      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container max-w-6xl mx-auto px-4 py-10">
        <span className="text-meta">Get in Touch</span>
        <h1 className="mt-3 text-3xl font-semibold tracking-tighter text-foreground">Contact Us</h1>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            onSubmit={handleSubmit}
            className="lg:col-span-2 p-6 rounded-lg bg-card shadow-card outline-subtle space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-foreground mb-1 block">Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full h-10 px-3 text-sm rounded-md border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  maxLength={100}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground mb-1 block">Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full h-10 px-3 text-sm rounded-md border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  maxLength={255}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-foreground mb-1 block">Phone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  className="w-full h-10 px-3 text-sm rounded-md border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground mb-1 block">Subject</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                  className="w-full h-10 px-3 text-sm rounded-md border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  maxLength={200}
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-foreground mb-1 block">Message *</label>
              <textarea
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                rows={5}
                className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:outline-none resize-none"
                maxLength={1000}
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.97] transition-all disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              {sending ? "Sending..." : "Send Message"}
            </button>
          </motion.form>

          {/* Info */}
          <div className="space-y-4">
            {[
              { icon: MapPin, label: "Address", value: "Pinplug Private Limited, India" },
              { icon: Phone, label: "Phone", value: "+91 98765 43210" },
              { icon: Mail, label: "Email", value: "contact@pinplug.com" },
            ].map(info => (
              <div key={info.label} className="p-4 rounded-lg bg-card shadow-card outline-subtle">
                <info.icon className="w-4 h-4 text-primary mb-1.5" strokeWidth={1.5} />
                <span className="text-meta">{info.label}</span>
                <p className="mt-1 text-sm text-foreground">{info.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
