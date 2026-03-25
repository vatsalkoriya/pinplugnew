"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Target, Eye, Heart, Award, Users, Calendar } from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <img src="/images/store-interior.jpg" alt="Pinplug electronics showroom" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>
        <div className="container max-w-6xl mx-auto px-4 py-24 md:py-32 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-mono-tech uppercase tracking-widest text-primary-foreground/60">About Us</span>
            <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter text-primary-foreground leading-[1.05]">
              Connecting People with
              <br />
              <span className="text-primary">Technology</span>
            </h1>
            <p className="mt-5 text-base text-primary-foreground/70 max-w-xl mx-auto leading-relaxed">
              Since our founding, Pinplug Private Limited has been passionate about delivering 
              high-quality electronics and expert services to every home.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-meta text-primary">Our Story</span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
                From a Vision to a Trusted Name
              </h2>
              <div className="mt-5 space-y-4 text-[15px] text-muted-foreground leading-relaxed">
                <p>
                  Pinplug Private Limited was founded with a simple yet powerful mission — to make 
                  premium electronics accessible to every household. What started as a small retail 
                  operation has grown into a comprehensive electronics business offering products 
                  and services that span the entire home.
                </p>
                <p>
                  We believe technology should simplify your life, not complicate it. That's why we 
                  don't just sell products — we provide end-to-end solutions including expert 
                  installation, smart home integration, and ongoing technical support.
                </p>
                <p>
                  Our curated catalog covers everything from air conditioners and refrigerators to 
                  LED TVs and water purification systems. Each product is selected for performance, 
                  durability, and energy efficiency.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="relative"
            >
                <img
                  src="/images/team-work.jpg"
                alt="Pinplug technicians at work"
                className="w-full rounded-lg outline-subtle object-cover aspect-[16/10]"
              />
              <div className="absolute -bottom-4 -left-4 bg-card p-4 rounded-lg shadow-elevated outline-subtle">
                <p className="text-2xl font-semibold font-mono-tech text-foreground">10+</p>
                <p className="text-xs text-muted-foreground">Years of Service</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="border-b border-border bg-surface">
        <div className="container max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="order-2 lg:order-1 flex justify-center"
            >
              <div className="relative">
                <img
                  src="/images/founder-portrait.jpg"
                  alt="Founder of Pinplug"
                  className="w-72 md:w-80 rounded-lg outline-subtle object-cover aspect-[3/4]"
                />
                {/* Decorative frame */}
                <div className="absolute -top-3 -right-3 w-full h-full rounded-lg border-2 border-primary/20 -z-10" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="order-1 lg:order-2"
            >
              <span className="text-meta text-primary">Leadership</span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
                Meet the Founder
              </h2>
              <div className="mt-5 space-y-4 text-[15px] text-muted-foreground leading-relaxed">
                <p>
                  With over a decade of experience in the electronics industry, our founder 
                  envisioned Pinplug as more than just a retail business — it's a bridge between 
                  cutting-edge technology and the everyday consumer.
                </p>
                <p>
                  "I believe every home deserves access to reliable, high-performance electronics 
                  backed by genuine expertise. At Pinplug, we don't just sell products — we build 
                  lasting relationships with our customers through trust and exceptional service."
                </p>
              </div>
              <div className="mt-6 p-4 rounded-lg bg-card shadow-card outline-subtle">
                <p className="text-sm font-medium text-foreground">Founder & CEO</p>
                <p className="text-xs text-muted-foreground mt-0.5">Pinplug Private Limited</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <span className="text-meta text-primary">What Drives Us</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
              Our Mission & Values
            </h2>
          </motion.div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {[
              {
                icon: Target,
                title: "Our Mission",
                desc: "To connect people with the latest technology through a curated selection of high-performance electronics and professional services that make life easier and more enjoyable.",
              },
              {
                icon: Eye,
                title: "Our Vision",
                desc: "To be the most trusted electronics partner for every household — known for reliability, expertise, and an unwavering commitment to customer satisfaction.",
              },
              {
                icon: Heart,
                title: "Our Values",
                desc: "Integrity in every transaction, excellence in every installation, and a genuine passion for helping our customers find the perfect technology solutions.",
              },
            ].map(v => (
              <motion.div
                key={v.title}
                variants={item}
                className="group p-6 rounded-lg bg-card shadow-card outline-subtle hover:shadow-card-hover hover:-translate-y-1 transition-all text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                  <v.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-medium text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-surface">
        <div className="container max-w-6xl mx-auto px-4 py-16">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-5"
          >
            {[
              { icon: Award, value: "500+", label: "Products Available" },
              { icon: Users, value: "10,000+", label: "Happy Customers" },
              { icon: Calendar, value: "10+", label: "Years Experience" },
              { icon: Target, value: "50+", label: "Service Areas" },
            ].map(stat => (
              <motion.div
                key={stat.label}
                variants={item}
                className="p-6 rounded-lg bg-card shadow-card outline-subtle text-center hover:shadow-card-hover transition-shadow"
              >
                <stat.icon className="w-5 h-5 text-primary mx-auto mb-3" strokeWidth={1.5} />
                <p className="text-3xl font-semibold font-mono-tech text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1 font-mono-tech uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-muted-foreground text-sm">Ready to experience the Pinplug difference?</p>
            <div className="mt-4 flex gap-3 justify-center">
              <Link
                href="/products"
                prefetch
                className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.97] transition-all"
              >
                Browse Products <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/contact"
                prefetch
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-md bg-card text-foreground border border-border hover:bg-secondary active:scale-[0.97] transition-all shadow-card"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
