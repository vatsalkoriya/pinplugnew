import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { categories } from "@/data/mockData";
import { ArrowRight, Wrench, Cpu, Phone, Shield, Truck, HeadphonesIcon } from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.2, 0, 0, 1] } },
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
            className="max-w-2xl"
          >
            <span className="text-meta text-primary">Pinplug Private Limited</span>
            <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tighter text-foreground leading-[1.1]">
              Precision Electronics.
              <br />
              Professional Integration.
            </h1>
            <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground max-w-lg">
              High-performance hardware and expert technical services for the modern home. 
              From air conditioners to smart home systems — engineered for reliability.
            </p>
            <div className="mt-8 flex gap-3">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.97] transition-all"
              >
                View Products <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
              >
                Request Installation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-border bg-surface">
        <div className="container max-w-6xl mx-auto px-4 py-16">
          <span className="text-meta">Product Categories</span>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">Browse by Category</h2>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3"
          >
            {categories.map(cat => {
              const Icon = cat.icon;
              return (
                <motion.div key={cat.id} variants={item}>
                  <Link
                    to={cat.id === "all" ? "/products" : `/products?cat=${cat.id}`}
                    className="flex flex-col items-center gap-2.5 p-4 rounded-lg bg-card shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all text-center outline-subtle"
                  >
                    <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
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
          <span className="text-meta">Our Services</span>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">Expert Technical Services</h2>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {[
              { icon: Wrench, title: "Repair & Maintenance", desc: "Professional repair services for all major electronics brands with warranty support." },
              { icon: Cpu, title: "Smart Home Integration", desc: "End-to-end smart home setup including automation, voice control, and IoT integration." },
              { icon: Phone, title: "Technical Consultation", desc: "Expert advice on product selection, energy efficiency, and system compatibility." },
            ].map(service => (
              <motion.div key={service.title} variants={item} className="p-6 rounded-lg bg-card shadow-card outline-subtle">
                <service.icon className="w-5 h-5 text-primary mb-3" strokeWidth={1.5} />
                <h3 className="text-base font-medium text-foreground">{service.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                <Link to="/services" className="inline-flex items-center gap-1 mt-4 text-xs font-medium text-primary hover:underline">
                  Learn more <ArrowRight className="w-3 h-3" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-surface">
        <div className="container max-w-6xl mx-auto px-4 py-16">
          <span className="text-meta">Why Pinplug</span>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">Built on Trust</h2>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { icon: Shield, title: "Competitive Prices", desc: "Best-in-class pricing without compromising quality." },
              { icon: HeadphonesIcon, title: "Expert Advice", desc: "Knowledgeable team for informed decisions." },
              { icon: Phone, title: "Customer Service", desc: "Responsive support before and after purchase." },
              { icon: Truck, title: "Fast Delivery", desc: "Reliable shipping across all service areas." },
            ].map(point => (
              <motion.div key={point.title} variants={item} className="p-5 rounded-lg bg-card shadow-card outline-subtle">
                <point.icon className="w-5 h-5 text-primary mb-2" strokeWidth={1.5} />
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
