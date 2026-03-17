import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-primary-foreground" />
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
              <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li>
              <li><Link to="/admin" className="hover:text-foreground transition-colors">Admin Portal</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border text-xs text-muted-foreground">
          © 2026 Pinplug Private Limited. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
