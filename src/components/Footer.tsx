import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-gold-light flex items-center justify-center">
                <span className="font-display text-primary-foreground text-xl font-bold">J</span>
              </div>
              <span className="font-display text-2xl font-semibold text-foreground">
                JewelBridge
              </span>
            </Link>
            <p className="text-muted-foreground text-base leading-relaxed">
              Connecting you with authentic local jewelers. Browse, save, and visit to experience genuine jewelry.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <span className="text-muted-foreground transition-colors">
                  Browse Jewelry
                </span>
              </li>
              <li>
                <span className="text-muted-foreground transition-colors">
                  Categories
                </span>
              </li>
              <li>
                <span className="text-muted-foreground transition-colors">
                  Local Shops
                </span>
              </li>
              <li>
                <span className="text-muted-foreground transition-colors">
                  How It Works
                </span>
              </li>
            </ul>
          </div>

          {/* For Shopkeepers */}
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-4">For Shopkeepers</h4>
            <ul className="space-y-3">
              <li>
                <span className="text-muted-foreground transition-colors">
                  Register Your Shop
                </span>
              </li>
              <li>
                <span className="text-muted-foreground transition-colors">
                  Seller Dashboard
                </span>
              </li>
              <li>
                <span className="text-muted-foreground transition-colors">
                  Pricing
                </span>
              </li>
              <li>
                <span className="text-muted-foreground transition-colors">
                  Support
                </span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Hyderabad, India</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>support@jewelbridge.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2025 JewelBridge. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
