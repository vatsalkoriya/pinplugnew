"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
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
    const load = () => {
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      script.onload = () => {
        // @ts-expect-error - Instagram injects a global for processing embeds
        window.instgrm?.Embeds?.process?.();
      };
      document.body.appendChild(script);
    };
    if ("requestIdleCallback" in window) {
      (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(load);
    } else {
      setTimeout(load, 800);
    }
  }, []);
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
      <section className="border-b border-border overflow-hidden relative min-h-[92vh] flex items-center justify-center bg-black text-white">
        {/* Atmospheric background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_70%_20%,rgba(255,122,24,0.25),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(45%_45%_at_20%_80%,rgba(255,255,255,0.08),transparent_60%)]" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: -8 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="absolute -right-40 top-24 h-64 w-[520px] rounded-[999px] bg-gradient-to-r from-orange-500/70 via-orange-400/60 to-transparent blur-2xl"
          />
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 0.25, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="absolute left-[-10%] bottom-[-10%] h-72 w-[70%] border border-white/10 rounded-[40%] rotate-[-8deg]"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-flex items-center gap-3 rounded-full border border-white/15 px-4 py-2 text-[11px] uppercase tracking-[0.35em] font-black text-white/80"
              >
                Pinplug Private Limited | Jaipur
              </motion.div>

              <motion.h1
                className="mt-6 text-6xl sm:text-7xl md:text-8xl lg:text-[8.5rem] font-black tracking-[-0.06em] leading-[0.85] uppercase"
              >
                <motion.span
                  className="block overflow-hidden"
                  variants={heroLine}
                  initial="hidden"
                  animate="show"
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  The Best
                </motion.span>
                <motion.span
                  className="block overflow-hidden text-orange-500"
                  variants={heroLine}
                  initial="hidden"
                  animate="show"
                  transition={{ duration: 0.7, delay: 0.35 }}
                >
                  Electronics
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55 }}
                className="mt-6 text-base md:text-xl text-white/80 max-w-xl mx-auto lg:mx-0"
              >
                Pinplug Private Limited is Jaipur's leading electronics company. We offer genuine quality appliances, professional integration, and smart home solutions for the modern lifestyle.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                <Link
                    href="/products"
                    prefetch
                    className="inline-flex items-center justify-center rounded-full bg-white text-black px-10 py-4 text-sm md:text-base font-black uppercase tracking-widest transition-all hover:bg-orange-500 hover:text-black"
                  >
                    Shop Now
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                <Link
                    href="/services"
                    prefetch
                    className="inline-flex items-center justify-center rounded-full bg-transparent text-white border border-white/60 px-10 py-4 text-sm md:text-base font-black uppercase tracking-widest transition-all hover:border-orange-500 hover:text-orange-500"
                  >
                    Book Installation
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="relative aspect-[3/4] rounded-[2.5rem] border border-white/15 overflow-hidden">
                <img
                  src="/images/hero-storefront.jpg"
                  alt="Pinplug Private Limited storefront at night with bright neon signs and electronics displays"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute left-6 bottom-6 right-6">
                  <p className="text-xs uppercase tracking-[0.4em] text-white/70">Our Showroom</p>
                  <p className="mt-2 text-2xl font-black text-white">Genuine Quality, Unbeatable Rates</p>
                  <div className="mt-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-orange-500">
                    Visit us <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
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
              className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.div key={cat.id} variants={item}>
                  <Link
                    href={cat.id === "all" ? "/products" : `/products?cat=${cat.id}`}
                    prefetch
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
                  <Link href="/services" prefetch className="group/link inline-flex items-center gap-1 mt-4 text-xs font-medium text-primary">
                    Learn more <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-background">
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

      {/* Visit Us Section (SEO Boost) */}
      <section className="bg-surface border-t border-border">
        <div className="container max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <span className="text-meta text-primary uppercase tracking-widest text-xs font-bold">Visit Our Store</span>
              <h2 className="mt-4 text-3xl md:text-4xl font-black uppercase tracking-tighter text-foreground">
                Pinplug Private Limited <br />
                <span className="text-orange-500">Jaipur, Rajasthan</span>
              </h2>
              <p className="mt-6 text-muted-foreground leading-relaxed max-w-lg">
                We are passionate about connecting people with the latest technology. Our electronics business offers a wide range of products and services designed to make your life easier, more convenient, and more enjoyable. Visit us at our showroom for the best rates and deals.
              </p>
              
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 mt-1 shrink-0 text-orange-500"><Cpu className="w-full h-full" /></div>
                    <div>
                      <h3 className="font-bold uppercase tracking-wider text-xs">Address</h3>
                      <p className="mt-1 text-muted-foreground">
                        Ganga Marg, Cbi Phatak,<br />
                        Jagatpura, Jaipur,<br />
                        Rajasthan 302017
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 mt-1 shrink-0 text-orange-500"><Phone className="w-full h-full" /></div>
                    <div>
                      <h3 className="font-bold uppercase tracking-wider text-xs">Phone</h3>
                      <p className="mt-1 text-muted-foreground">092568 41555</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 mt-1 shrink-0 text-orange-500"><Wrench className="w-full h-full" /></div>
                    <div>
                      <h3 className="font-bold uppercase tracking-wider text-xs">Business Hours</h3>
                      <p className="mt-1 text-muted-foreground">
                        Open Daily<br />
                        10:00 AM - 10:00 PM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-orange-500">
                    <div className="flex items-center gap-1 font-black uppercase tracking-widest text-[10px]">
                      5.0 <div className="flex text-orange-500">★★★★★</div> 36 Reviews
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <Link 
                  href="https://www.google.com/maps/dir//PINPLUG+PRIVATE+LIMITED" 
                  target="_blank"
                  className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-orange-500 hover:text-black transition-all"
                >
                  Get Directions <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            
            <div className="rounded-2xl overflow-hidden border border-border shadow-2xl skew-y-1 lg:skew-y-0 lg:-rotate-2 hover:rotate-0 transition-transform duration-500">
              <img 
                src="/images/hero-storefront.jpg" 
                alt="Pinplug Private Limited Storefront in Jaipur at night" 
                className="w-full h-full object-cover grayscale-0 hover:grayscale-0 transition-all duration-700 aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
