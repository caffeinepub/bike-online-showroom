import AuthModal from "@/components/AuthModal";
import ProfileDropdown from "@/components/ProfileDropdown";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Bike,
  Heart,
  LogIn,
  Menu,
  Phone,
  ShoppingCart,
  User,
  UserPlus,
  X,
} from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const {
    totalItems,
    showAuthModal: cartAuthModal,
    setShowAuthModal: setCartAuthModal,
  } = useCart();
  const {
    totalWishlistItems,
    showAuthModal: wishlistAuthModal,
    setShowAuthModal: setWishlistAuthModal,
  } = useWishlist();
  const { user } = useAuth();

  const appId = encodeURIComponent(window.location.hostname || "bike-showroom");

  const handleCloseAuthModal = () => {
    setCartAuthModal(false);
    setWishlistAuthModal(false);
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Auth Modal — always available globally */}
      <AuthModal
        open={cartAuthModal || wishlistAuthModal}
        onClose={handleCloseAuthModal}
      />

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
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className="font-display font-600 text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors [&.active]:text-primary"
                data-ocid="nav.catalog.link"
              >
                Catalog
              </Link>
              <Link
                to="/accessories"
                className="font-display font-600 text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors [&.active]:text-primary"
                data-ocid="nav.accessories.link"
              >
                Accessories
              </Link>
              <Link
                to="/maintenance"
                className="font-display font-600 text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors [&.active]:text-primary"
                data-ocid="nav.maintenance.link"
              >
                Maintenance
              </Link>
              <Link
                to="/contact"
                className="font-display font-600 text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors [&.active]:text-primary"
                data-ocid="nav.contact.link"
              >
                Contact
              </Link>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative inline-flex items-center justify-center w-9 h-9 rounded-sm border border-border bg-card hover:bg-muted hover:text-red-500 transition-colors text-muted-foreground"
                data-ocid="nav.wishlist.button"
                aria-label={`Wishlist${totalWishlistItems > 0 ? ` (${totalWishlistItems} items)` : ""}`}
              >
                <Heart className="w-4 h-4" />
                {totalWishlistItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-display font-800 w-4 h-4 rounded-full flex items-center justify-center leading-none">
                    {totalWishlistItems > 9 ? "9+" : totalWishlistItems}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/checkout"
                className="relative inline-flex items-center justify-center w-9 h-9 rounded-sm border border-border bg-card hover:bg-muted hover:text-primary transition-colors text-muted-foreground"
                data-ocid="nav.cart.button"
                aria-label={`Cart${totalItems > 0 ? ` (${totalItems} items)` : ""}`}
              >
                <ShoppingCart className="w-4 h-4" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[10px] font-display font-800 w-4 h-4 rounded-full flex items-center justify-center leading-none">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </Link>

              {/* Auth section */}
              {user ? (
                /* Profile avatar + dropdown */
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setProfileOpen((prev) => !prev)}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-display font-800 text-sm tracking-wider transition-colors shadow-sm"
                    aria-label="Open profile menu"
                    aria-expanded={profileOpen}
                    data-ocid="nav.user.button"
                  >
                    {initials || <User className="w-4 h-4" />}
                  </button>
                  <ProfileDropdown
                    open={profileOpen}
                    onClose={() => setProfileOpen(false)}
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/signin"
                    className="inline-flex items-center gap-1.5 h-9 px-3 rounded-sm border border-border bg-card hover:bg-muted hover:text-foreground text-muted-foreground font-display font-700 text-xs tracking-widest uppercase transition-colors"
                    data-ocid="nav.signin.link"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="inline-flex items-center gap-1.5 h-9 px-3 rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 font-display font-700 text-xs tracking-widest uppercase transition-colors"
                    data-ocid="nav.signup.link"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    Sign Up
                  </Link>
                </div>
              )}

              <Button
                onClick={() => navigate({ to: "/contact" })}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-700 tracking-widest uppercase text-sm rounded-sm"
              >
                <Phone className="w-4 h-4 mr-2" />
                Inquire Now
              </Button>
            </nav>

            {/* Mobile right controls */}
            <div className="md:hidden flex items-center gap-1">
              {/* Mobile Profile Icon — left of hamburger */}
              {user ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setProfileOpen((prev) => !prev)}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-display font-800 text-sm tracking-wider transition-colors"
                    aria-label="Open profile menu"
                    aria-expanded={profileOpen}
                    data-ocid="nav.user.button"
                  >
                    {initials || <User className="w-4 h-4" />}
                  </button>
                  <ProfileDropdown
                    open={profileOpen}
                    onClose={() => setProfileOpen(false)}
                  />
                </div>
              ) : (
                <Link
                  to="/signin"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-sm border border-border bg-card hover:bg-muted text-muted-foreground transition-colors"
                  aria-label="Sign in"
                  data-ocid="nav.signin.link"
                >
                  <LogIn className="w-4 h-4" />
                </Link>
              )}

              {/* Hamburger */}
              <button
                type="button"
                className="text-foreground p-2"
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
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-card border-t border-border">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="font-display font-600 text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors [&.active]:text-primary"
                data-ocid="nav.catalog.link"
              >
                Catalog
              </Link>
              <Link
                to="/accessories"
                onClick={() => setMobileMenuOpen(false)}
                className="font-display font-600 text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors [&.active]:text-primary"
                data-ocid="nav.accessories.link"
              >
                Accessories
              </Link>
              <Link
                to="/maintenance"
                onClick={() => setMobileMenuOpen(false)}
                className="font-display font-600 text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors [&.active]:text-primary"
                data-ocid="nav.maintenance.link"
              >
                Maintenance
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="font-display font-600 text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors [&.active]:text-primary"
                data-ocid="nav.contact.link"
              >
                Contact
              </Link>
              <Link
                to="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 font-display font-600 text-sm tracking-widest uppercase text-muted-foreground hover:text-red-500 transition-colors"
                data-ocid="nav.wishlist.button"
              >
                <Heart className="w-4 h-4" />
                Wishlist
                {totalWishlistItems > 0 && (
                  <span className="bg-red-500 text-white text-[10px] font-800 w-5 h-5 rounded-full flex items-center justify-center">
                    {totalWishlistItems > 9 ? "9+" : totalWishlistItems}
                  </span>
                )}
              </Link>
              <Link
                to="/checkout"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 font-display font-600 text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
                data-ocid="nav.cart.button"
              >
                <ShoppingCart className="w-4 h-4" />
                Cart
                {totalItems > 0 && (
                  <span className="bg-primary text-primary-foreground text-[10px] font-800 w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </Link>

              {/* Mobile auth — only sign in/up for unauthenticated */}
              {!user && (
                <>
                  <Link
                    to="/signin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 font-display font-700 text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
                    data-ocid="nav.signin.link"
                  >
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 font-display font-700 text-sm tracking-widest uppercase text-primary hover:text-primary/80 transition-colors"
                    data-ocid="nav.signup.link"
                  >
                    <UserPlus className="w-4 h-4" />
                    Sign Up
                  </Link>
                </>
              )}

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
                    to="/accessories"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm font-body"
                  >
                    Accessories
                  </Link>
                </li>
                <li>
                  <Link
                    to="/maintenance"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm font-body"
                  >
                    Maintenance
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
