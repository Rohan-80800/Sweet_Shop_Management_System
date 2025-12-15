import {
  Candy,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Facebook
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl gradient-candy flex items-center justify-center shadow-candy">
                <Candy className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-fredoka text-gradient">
                Sweet Haven
              </span>
            </div>
            <p className="text-muted-foreground mb-6">
              Handcrafted sweets made with love. Bringing joy to every bite
              since 2020.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-3 bg-muted hover:bg-primary/10 rounded-full transition-colors group"
              >
                <Instagram className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
              </a>
              <a
                href="#"
                className="p-3 bg-muted hover:bg-primary/10 rounded-full transition-colors group"
              >
                <Twitter className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
              </a>
              <a
                href="#"
                className="p-3 bg-muted hover:bg-primary/10 rounded-full transition-colors group"
              >
                <Facebook className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-fredoka text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#sweets"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Our Sweets
                </a>
              </li>
              <li>
                <a
                  href="#categories"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Categories
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-fredoka text-lg mb-6">Categories</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Chocolates
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Lollipops
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Gummies
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Hard Candy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Cotton Candy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-fredoka text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <span>123 Sweet Street, Candy City</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-5 h-5 text-primary" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary" />
                <span>hello@sweethaven.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 Sweet Haven. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
