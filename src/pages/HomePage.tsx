import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { categories } from "@/data/mockData";
import { ArrowRight, Wrench, Cpu, Phone, Shield, Truck, HeadphonesIcon } from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const heroLine = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="border-b border-border overflow-hidden relative min-h-[85vh] flex items-center justify-center">
        {/* Radial gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)/0.08),transparent)]" />
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.15)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.15)_1px,transparent_1px)] bg-[size:48px_48px]" />
        
        {/* Floating orbs */}
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-primary/5 blur-[100px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ opacity: { duration: 1 }, x: { duration: 8, repeat: Infinity, ease: "easeInOut" }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
          style={{ top: "20%", left: "10%" }}
        />
        <motion.div
          className="absolute w-72 h-72 rounded-full bg-primary/3 blur-[80px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, x: [0, -15, 0], y: [0, 20, 0] }}
          transition={{ opacity: { duration: 1, delay: 0.3 }, x: { duration: 7, repeat: Infinity, ease: "easeInOut" }, y: { duration: 9, repeat: Infinity, ease: "easeInOut" } }}
          style={{ bottom: "15%", right: "15%" }}
        />

        <div className="container max-w-6xl mx-auto px-4 py-24 md:py-32 relative text-center">
          <motion.div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-mono-tech uppercase tracking-widest text-primary">
                Pinplug Private Limited
              </span>
            </motion.div>
            
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter text-foreground leading-[1.05]"
            >
              <motion.span
                className="block"
                variants={heroLine}
                initial="hidden"
                animate="show"
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Precision Electronics.
              </motion.span>
              <motion.span
                className="block bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent"
                variants={heroLine}
                initial="hidden"
                animate="show"
                transition={{ duration: 0.6, delay: 0.35 }}
              >
                Professional Integration.
              </motion.span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-6 text-base md:text-lg leading-relaxed text-muted-foreground max-w-xl mx-auto"
            >
              High-performance hardware and expert technical services for the modern home. 
              Engineered for reliability.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="mt-10 flex flex-col sm:flex-row gap-3 justify-center"
            >
              <Link
                to="/products"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.97] transition-all shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
              >
                View Products
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-lg bg-card text-foreground border border-border hover:bg-secondary active:scale-[0.97] transition-all shadow-card"
              >
                Request Installation
              </Link>
            </motion.div>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.85 }}
              className="mt-16 flex items-center justify-center gap-8 md:gap-12"
            >
              {[
                { value: "500+", label: "Products" },
                { value: "10k+", label: "Customers" },
                { value: "24/7", label: "Support" },
              ].map((stat, i) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl md:text-3xl font-semibold font-mono-tech text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1 font-mono-tech uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-border bg-surface">
        <div className="container max-w-6xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-meta">Product Categories</span>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">Browse by Category</h2>
          </motion.div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3"
          >
            {categories.map(cat => {
              const Icon = cat.icon;
              return (
                <motion.div key={cat.id} variants={item}>
                  <Link
                    to={cat.id === "all" ? "/products" : `/products?cat=${cat.id}`}
                    className="group flex flex-col items-center gap-2.5 p-4 rounded-lg bg-card shadow-card hover:shadow-card-hover transition-all text-center outline-subtle hover:-translate-y-1"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                      <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                    </div>
                    <span className="text-xs font-medium text-foreground">{cat.name}</span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-meta">Our Services</span>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">Expert Technical Services</h2>
          </motion.div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {[
              { icon: Wrench, title: "Repair & Maintenance", desc: "Professional repair services for all major electronics brands with warranty support." },
              { icon: Cpu, title: "Smart Home Integration", desc: "End-to-end smart home setup including automation, voice control, and IoT integration." },
              { icon: Phone, title: "Technical Consultation", desc: "Expert advice on product selection, energy efficiency, and system compatibility." },
            ].map(service => (
              <motion.div
                key={service.title}
                variants={item}
                className="group p-6 rounded-lg bg-card shadow-card outline-subtle hover:shadow-card-hover hover:-translate-y-1 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                  <service.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-medium text-foreground">{service.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                <Link to="/services" className="group/link inline-flex items-center gap-1 mt-4 text-xs font-medium text-primary">
                  Learn more <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-surface">
        <div className="container max-w-6xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-meta">Why Pinplug</span>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">Built on Trust</h2>
          </motion.div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { icon: Shield, title: "Competitive Prices", desc: "Best-in-class pricing without compromising quality." },
              { icon: HeadphonesIcon, title: "Expert Advice", desc: "Knowledgeable team for informed decisions." },
              { icon: Phone, title: "Customer Service", desc: "Responsive support before and after purchase." },
              { icon: Truck, title: "Fast Delivery", desc: "Reliable shipping across all service areas." },
            ].map(point => (
              <motion.div
                key={point.title}
                variants={item}
                className="group p-5 rounded-lg bg-card shadow-card outline-subtle hover:shadow-card-hover hover:-translate-y-1 transition-all"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                  <point.icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-medium text-foreground">{point.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{point.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
