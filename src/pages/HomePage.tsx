import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { categories } from "@/data/mockData";
import { ArrowRight, Wrench, Cpu, Phone, Shield, Truck, HeadphonesIcon, ChevronDown, Zap } from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const heroLine = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

// Animated counter component
function AnimatedStat({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, type: "spring", stiffness: 200, damping: 15 }}
      className="text-center relative"
    >
      <motion.p
        className="text-2xl md:text-3xl font-semibold font-mono-tech text-foreground"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: delay + 0.2 }}
      >
        {value}
      </motion.p>
      <motion.p
        className="text-xs text-muted-foreground mt-1 font-mono-tech uppercase tracking-wider"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: delay + 0.35 }}
      >
        {label}
      </motion.p>
    </motion.div>
  );
}

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section ref={heroRef} className="border-b border-border overflow-hidden relative min-h-[90vh] flex items-center justify-center">
        {/* Animated radial gradient */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210 100% 50% / 0.06), transparent)",
              "radial-gradient(ellipse 80% 60% at 50% -10%, hsl(210 100% 50% / 0.1), transparent)",
              "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210 100% 50% / 0.06), transparent)",
            ],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Animated grid lines */}
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.12)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.12)_1px,transparent_1px)] bg-[size:48px_48px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />
        
        {/* Floating orbs with better animation */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]"
          animate={{ x: [0, 30, -10, 0], y: [0, -20, 10, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: "10%", left: "5%" }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-primary/4 blur-[100px]"
          animate={{ x: [0, -20, 15, 0], y: [0, 25, -10, 0], scale: [1, 0.95, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{ bottom: "10%", right: "10%" }}
        />
        {/* Third orb */}
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-primary/3 blur-[80px]"
          animate={{ x: [0, 15, -15, 0], y: [0, -25, 5, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ top: "60%", left: "40%" }}
        />

        {/* Parallax content wrapper */}
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="container max-w-6xl mx-auto px-4 py-24 md:py-32 relative text-center"
        >
          <motion.div className="max-w-3xl mx-auto">
            {/* Animated badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8"
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-primary"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-xs font-mono-tech uppercase tracking-widest text-primary">
                Pinplug Private Limited
              </span>
            </motion.div>
            
            {/* Hero text with letter stagger effect */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter text-foreground leading-[1.05]"
            >
              <motion.span
                className="block overflow-hidden"
                variants={heroLine}
                initial="hidden"
                animate="show"
                transition={{ duration: 0.7, delay: 0.25 }}
              >
                Precision Electronics.
              </motion.span>
              <motion.span
                className="block bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent overflow-hidden"
                variants={heroLine}
                initial="hidden"
                animate="show"
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                Professional Integration.
              </motion.span>
            </motion.h1>
            
            {/* Animated line divider */}
            <motion.div
              className="mx-auto mt-6 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-6 text-base md:text-lg leading-relaxed text-muted-foreground max-w-xl mx-auto"
            >
              High-performance hardware and expert technical services for the modern home. 
              Engineered for reliability.
            </motion.p>
            
            {/* CTA buttons with stagger */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.75 }}
              className="mt-10 flex flex-col sm:flex-row gap-3 justify-center"
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/products"
                  className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-medium rounded-lg bg-primary text-primary-foreground transition-all shadow-[0_0_24px_hsl(var(--primary)/0.35)] hover:shadow-[0_0_32px_hsl(var(--primary)/0.5)]"
                >
                  View Products
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-medium rounded-lg bg-card text-foreground border border-border hover:border-primary/30 hover:bg-primary/5 transition-all shadow-card"
                >
                  <Zap className="w-3.5 h-3.5" />
                  Request Installation
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats with spring animations */}
            <div className="mt-16 flex items-center justify-center gap-8 md:gap-14">
              {[
                { value: "500+", label: "Products" },
                { value: "10k+", label: "Customers" },
                { value: "24/7", label: "Support" },
              ].map((stat, i) => (
                <AnimatedStat key={stat.label} value={stat.value} label={stat.label} delay={0.9 + i * 0.12} />
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-[10px] font-mono-tech uppercase tracking-widest text-muted-foreground">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </motion.div>
        </motion.div>
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
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.div key={cat.id} variants={item}>
                  <Link
                    to={cat.id === "all" ? "/products" : `/products?cat=${cat.id}`}
                    className="group flex flex-col items-center gap-2.5 p-4 rounded-lg bg-card shadow-card hover:shadow-card-hover transition-all text-center outline-subtle hover:-translate-y-1.5 duration-300"
                  >
                    <motion.div
                      className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300"
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                    </motion.div>
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
            ].map((service, i) => (
              <motion.div
                key={service.title}
                variants={item}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group p-6 rounded-lg bg-card shadow-card outline-subtle hover:shadow-elevated transition-shadow duration-300 relative overflow-hidden"
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <motion.div
                    className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all duration-300"
                    whileHover={{ scale: 1.15, rotate: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <service.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="text-base font-medium text-foreground">{service.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                  <Link to="/services" className="group/link inline-flex items-center gap-1 mt-4 text-xs font-medium text-primary">
                    Learn more <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
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
            ].map((point, i) => (
              <motion.div
                key={point.title}
                variants={item}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className="group p-5 rounded-lg bg-card shadow-card outline-subtle hover:shadow-card-hover transition-shadow duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <motion.div
                    className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-all duration-300"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <point.icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="text-sm font-medium text-foreground">{point.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{point.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
