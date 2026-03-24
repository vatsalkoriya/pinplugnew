import { useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { toast } from "sonner";

export default function AdminLoginPage() {
  const { login } = useAdmin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(email, password);
    if (ok) {
      toast.success("Welcome back!");
    } else {
      toast.error("Invalid credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm p-8 rounded-lg bg-card shadow-elevated outline-subtle"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="w-10 h-10 rounded-lg bg-foreground flex items-center justify-center mb-3">
            <Lock className="w-5 h-5 text-background" />
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">Admin Login</h1>
          <p className="text-xs text-muted-foreground mt-1">Pinplug Dashboard</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-foreground mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full h-10 px-3 text-sm rounded-md border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:outline-none"
              placeholder="admin@pinplug.com"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-foreground mb-1 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full h-10 px-3 text-sm rounded-md border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:outline-none"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full h-10 text-sm font-medium rounded-md bg-foreground text-background hover:opacity-90 active:scale-[0.97] transition-all"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-[10px] text-center text-muted-foreground font-mono-tech">
          Demo: admin@pinplug.com / admin123
        </p>
      </motion.div>
    </div>
  );
}
