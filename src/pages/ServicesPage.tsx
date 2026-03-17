import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Wrench, Cpu, Phone, ArrowRight, CheckCircle2 } from "lucide-react";

const services = [
  {
    icon: Wrench,
    title: "Electronics Repair & Maintenance",
    description: "Professional diagnostics and repair for all major electronics brands. Our certified technicians handle everything from compressor replacements to circuit board repairs.",
    features: ["Multi-brand expertise", "90-day repair warranty", "On-site & workshop service", "Genuine spare parts"],
  },
  {
    icon: Cpu,
    title: "Smart Home Installation & Integration",
    description: "Transform your home with intelligent automation. We design, install, and configure complete smart home ecosystems tailored to your lifestyle.",
    features: ["Voice assistant integration", "Automated climate control", "Security system setup", "Energy monitoring"],
  },
  {
    icon: Phone,
    title: "Technical Support & Consultation",
    description: "Expert guidance for product selection, system design, and troubleshooting. Our specialists help you make informed decisions for optimal performance.",
    features: ["Product recommendations", "Energy efficiency audits", "Compatibility assessment", "Post-installation support"],
  },
];

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <div className="container max-w-6xl mx-auto px-4 py-10">
        <span className="text-meta">Services</span>
        <h1 className="mt-3 text-3xl font-semibold tracking-tighter text-foreground">Technical Services</h1>
        <p className="mt-3 text-[15px] text-muted-foreground max-w-lg leading-relaxed">
          Professional installation, maintenance, and consultation services backed by years of technical expertise.
        </p>

        <div className="mt-10 space-y-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              variants={item}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="p-6 md:p-8 rounded-lg bg-card shadow-card outline-subtle"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <service.icon className="w-6 h-6 text-primary mb-3" strokeWidth={1.5} />
                  <h2 className="text-xl font-medium tracking-tight text-foreground">{service.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 mt-5 px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.97] transition-all"
                  >
                    Request Service <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <div className="md:w-64 space-y-2">
                  <span className="text-meta">Includes</span>
                  {service.features.map(f => (
                    <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
