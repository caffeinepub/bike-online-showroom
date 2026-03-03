import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { Bike, Menu, Phone, X } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const appId = encodeURIComponent(window.location.hostname || "bike-showroom");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center group-hover:shadow-glow-sm transition-shadow">
                <Bike className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-800 text-xl tracking-wider uppercase text-foreground">
                Moto<span className="text-primary">Verse</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                to="/"
                className="font-display font-600 text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors [&.active]:text-primary"
              >
                Catalog
              </Link>
              <Link
                to="/contact"
                className="font-display font-600 text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors [&.active]:text-primary"
              >
                Contact
              </Link>
              <Button
                onClick={() => navigate({ to: "/contact" })}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-700 tracking-widest uppercase text-sm rounded-sm"
              >
                <Phone className="w-4 h-4 mr-2" />
                Inquire Now
              </Button>
            </nav>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden text-foreground p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-card border-t border-border">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="font-display font-600 text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors [&.active]:text-primary"
              >
                Catalog
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="font-display font-600 text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors [&.active]:text-primary"
              >
                Contact
              </Link>
              <Button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate({ to: "/contact" });
                }}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-700 tracking-widest uppercase text-sm rounded-sm w-full"
              >
                <Phone className="w-4 h-4 mr-2" />
                Inquire Now
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
                  <Bike className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-display font-800 text-xl tracking-wider uppercase">
                  Moto<span className="text-primary">Verse</span>
                </span>
              </div>
              <p className="text-muted-foreground text-sm font-body leading-relaxed">
                Your premier destination for discovering the world's finest
                bikes. From mountain trails to city streets.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-display font-700 text-sm tracking-widest uppercase text-foreground mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm font-body"
                  >
                    Browse Catalog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm font-body"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-display font-700 text-sm tracking-widest uppercase text-foreground mb-4">
                Get In Touch
              </h3>
              <p className="text-muted-foreground text-sm font-body">
                Interested in a bike? Submit an inquiry and our team will get
                back to you within 24 hours.
              </p>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-xs font-body">
              © {new Date().getFullYear()} MotoVerse. All rights reserved.
            </p>
            <p className="text-muted-foreground text-xs font-body flex items-center gap-1">
              Built with <span className="text-primary">♥</span> using{" "}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
