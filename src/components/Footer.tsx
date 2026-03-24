import { Link } from "react-router-dom";
import { MapPin, Phone, Clock, Instagram, Youtube, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md overflow-hidden bg-background/60 border border-white/10 flex items-center justify-center">
                <img src="/favicon.png" alt="Pinplug logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-semibold tracking-tight text-foreground">Pinplug</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Precision electronics and professional integration for the modern home.
            </p>
          </div>
          <div>
            <h4 className="text-meta mb-3">Products</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/products?cat=ac" className="hover:text-foreground transition-colors">Air Conditioners</Link></li>
              <li><Link to="/products?cat=refrigerator" className="hover:text-foreground transition-colors">Refrigerators</Link></li>
              <li><Link to="/products?cat=led-tv" className="hover:text-foreground transition-colors">LED TVs</Link></li>
              <li><Link to="/products" className="hover:text-foreground transition-colors">All Products</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-meta mb-3">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/services" className="hover:text-foreground transition-colors">Repair & Maintenance</Link></li>
              <li><Link to="/services" className="hover:text-foreground transition-colors">Smart Home Setup</Link></li>
              <li><Link to="/services" className="hover:text-foreground transition-colors">Technical Support</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-meta mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link to="/reviews" className="hover:text-foreground transition-colors">Reviews</Link></li>
              <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li>
              <li><Link to="/admin" className="hover:text-foreground transition-colors">Admin Portal</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-meta mb-3">Socials</h4>
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Location & Map */}
        <div className="mt-10 pt-8 border-t border-border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-meta text-primary">Visit Our Store</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-sm font-medium text-foreground">Address</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Ganga Marg, CBI Phatak, Jagatpura,<br />
                      Jaipur, Rajasthan 302017
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-sm font-medium text-foreground">Phone</p>
                    <a href="tel:+919256841555" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      092568 41555
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-sm font-medium text-foreground">Hours</p>
                    <p className="text-sm text-muted-foreground">
                      <span className="text-primary font-medium">Open</span> · Closes 10 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="rounded-lg overflow-hidden outline-subtle shadow-card h-56 lg:h-auto">
              <iframe
                title="Pinplug Store Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.5!2d75.87!3d26.83!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDUwJzAwLjAiTiA3NcKwNTInMDAuMCJF!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin&q=Ganga+Marg,+CBI+Phatak,+Jagatpura,+Jaipur,+Rajasthan+302017"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "220px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-xs text-muted-foreground">
          © 2026 Pinplug Private Limited. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
