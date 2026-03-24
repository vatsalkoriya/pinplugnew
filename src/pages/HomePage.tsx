import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { categories } from "@/data/mockData";
import { ArrowRight, Wrench, Cpu, Phone, Shield, Truck, HeadphonesIcon, ChevronDown } from "lucide-react";

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



export default function HomePage() {
  useEffect(() => {
    const existing = document.querySelector('script[src="https://www.instagram.com/embed.js"]');
    if (existing) {
      // @ts-expect-error - Instagram injects a global for processing embeds
      window.instgrm?.Embeds?.process?.();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = () => {
      // @ts-expect-error - Instagram injects a global for processing embeds
      window.instgrm?.Embeds?.process?.();
    };
    document.body.appendChild(script);
  }, []);
  const heroImages = ["/hero-1.jpg", "/hero-2.jpeg", "/hero-3.png"];
  const slideDuration = 4;
  const transitionDuration = 0.6;
  const slideCount = heroImages.length;
  const totalDuration = slideCount * (slideDuration + transitionDuration);
  const hold = slideDuration / totalDuration;
  const move = transitionDuration / totalDuration;
  const trackImages = [...heroImages, ...heroImages];
  const slidePositions: string[] = ["0vw"];
  const slideTimes: number[] = [0];
  let t = 0;
  for (let i = 0; i < slideCount; i += 1) {
    t += hold;
    slidePositions.push(`-${i * 100}vw`);
    slideTimes.push(t);
    t += move;
    slidePositions.push(`-${(i + 1) * 100}vw`);
    slideTimes.push(t);
  }
  const categoryImages: Record<string, string> = {
    ac: "https://plus.unsplash.com/premium_photo-1679943423706-570c6462f9a4?q=80&w=705&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    refrigerator: "https://images.unsplash.com/photo-1722603929403-de9e80c46a9a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "washing-machine": "https://media.istockphoto.com/id/1137138120/photo/photo-of-white-washing-machine-with-soft-and-fresh-bright-towels-on-top-standing-isolated.jpg?s=2048x2048&w=is&k=20&c=xoTDvPAfL8RGxtxjr0Zmkjjyj98c3W48X1Ixac37u2w=",
    "led-tv": "https://images.unsplash.com/photo-1601944177325-f8867652837f?q=80&w=1177&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    geyser: "https://media.istockphoto.com/id/1324171754/photo/3d-render-of-a-white-electric-water-heater-digital-illustration-of-a-boiler-for-your-business.jpg?s=2048x2048&w=is&k=20&c=kyvat7Cp11XOu7Frh5T5exYv-seskzoAVIYLtpO5jXU=",
    ro: "https://images.unsplash.com/photo-1669211659110-3f3db4119b65?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    all: "https://images.unsplash.com/photo-1565211604822-2641d0b081a6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="border-b border-border overflow-hidden relative min-h-[90vh] flex items-center justify-center">
        {/* Background image slider with highly optimized animations */}
        <div className="absolute inset-0 overflow-hidden bg-black">
          <motion.div
            className="absolute inset-0 flex will-change-transform"
            style={{ width: `${trackImages.length * 100}vw` }}
            animate={{ x: slidePositions }}
            transition={{
              duration: totalDuration,
              repeat: Infinity,
              ease: "easeInOut",
              times: slideTimes,
            }}
          >
            {trackImages.map((src, index) => (
              <div
                key={`${src}-${index}`}
                className="w-screen h-full bg-cover bg-center bg-no-repeat flex-none transform-gpu"
                style={{ backgroundImage: `url(${src})`, transform: "translateZ(0)" }}
              />
            ))}
          </motion.div>
        </div>

        {/* Content wrapper */}
        <div className="absolute inset-0 bg-black/30 z-[5] pointer-events-none" />
        <motion.div className="container mx-auto px-4 relative flex flex-col items-center justify-center text-center z-10 w-full h-full pt-10">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            {/* Subheadline/Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-4 md:mb-6 uppercase tracking-[0.2em] font-black text-white/90 text-sm md:text-base"
            >
              Pinplug Private Limited
            </motion.div>
            
            {/* Nike-style Hero Text */}
            <motion.h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black tracking-tighter text-white leading-[0.85] uppercase"
              style={{ textShadow: "0 8px 32px rgba(0,0,0,0.5)" }}
            >
              <motion.span
                className="block overflow-hidden"
                variants={heroLine}
                initial="hidden"
                animate="show"
                transition={{ duration: 0.7, delay: 0.25 }}
              >
                Unleash
              </motion.span>
              <motion.span
                className="block overflow-hidden"
                variants={heroLine}
                initial="hidden"
                animate="show"
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                Power
              </motion.span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 text-lg md:text-2xl text-white font-medium max-w-2xl mx-auto leading-tight"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
            >
              Performance-driven appliances for the modern home. Go beyond the standard.
            </motion.p>
            
            {/* Nike-style CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.75 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center rounded-full bg-white text-black px-10 py-4 text-base md:text-lg font-bold transition-all hover:bg-neutral-200"
                >
                  Shop Now
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center rounded-full bg-transparent text-white border-2 border-white px-10 py-4 text-base md:text-lg font-bold transition-all hover:bg-white hover:text-black"
                >
                  Book Installation
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        
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
              className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.div key={cat.id} variants={item}>
                  <Link
                    to={cat.id === "all" ? "/products" : `/products?cat=${cat.id}`}
                    className="group flex flex-col gap-4 p-5 rounded-xl bg-card shadow-card hover:shadow-card-hover transition-all text-left outline-subtle hover:-translate-y-1.5 duration-300"
                  >
                    <div className="aspect-[16/10] w-full rounded-lg overflow-hidden bg-muted/40 border border-border">
                      {categoryImages[cat.id] ? (
                        <img
                          src={categoryImages[cat.id]}
                          alt={cat.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-muted/40 to-muted/10" />
                      )}
                    </div>
                    <div className="flex items-center gap-2.5">
                      <motion.div
                        className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300"
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      >
                        <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                      </motion.div>
                      <span className="text-sm font-medium text-foreground">{cat.name}</span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Reels */}
      <section className="border-b border-border bg-surface">
        <div className="container max-w-6xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-meta">Reels</span>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">Pinplug in Action</h2>
            <p className="mt-3 text-sm text-muted-foreground max-w-2xl">
              Quick looks at installations, showroom highlights, and customer stories.
            </p>
          </motion.div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl overflow-hidden outline-subtle bg-card shadow-card">
              <blockquote
                className="instagram-media"
                data-instgrm-permalink="https://www.instagram.com/p/DQlwFYSExJV/"
                data-instgrm-version="14"
                style={{ margin: 0, width: "100%" }}
              />
            </div>
            <div className="rounded-2xl overflow-hidden outline-subtle bg-card shadow-card">
              <blockquote
                className="instagram-media"
                data-instgrm-permalink="https://www.instagram.com/p/DQ3pSRdE3sO/"
                data-instgrm-version="14"
                style={{ margin: 0, width: "100%" }}
              />
            </div>
          </div>
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
