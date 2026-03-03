import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "@tanstack/react-router";
import { ClipboardList, Heart, LogOut, ShoppingCart, User } from "lucide-react";
import { useEffect, useRef } from "react";

interface ProfileDropdownProps {
  open: boolean;
  onClose: () => void;
}

interface NavItem {
  label: string;
  icon: React.ReactNode;
  to: string;
  ocid: string;
}

export default function ProfileDropdown({
  open,
  onClose,
}: ProfileDropdownProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open, onClose]);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const handleLogout = () => {
    logout();
    onClose();
    navigate({ to: "/" });
  };

  const navItems: NavItem[] = [
    {
      label: "Order History",
      icon: <ClipboardList className="w-4 h-4 flex-shrink-0" />,
      to: "/profile/orders",
      ocid: "profile.orders.link",
    },
    {
      label: "Wishlist",
      icon: <Heart className="w-4 h-4 flex-shrink-0" />,
      to: "/wishlist",
      ocid: "profile.wishlist.link",
    },
    {
      label: "My Cart",
      icon: <ShoppingCart className="w-4 h-4 flex-shrink-0" />,
      to: "/checkout",
      ocid: "profile.cart.link",
    },
  ];

  if (!open) return null;

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full mt-2 w-64 z-[100] bg-card border border-border rounded-sm shadow-xl animate-fade-in"
      data-ocid="profile.dropdown"
    >
      {/* User Header */}
      <div className="px-4 py-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <span className="font-display font-800 text-sm text-primary-foreground tracking-wider">
            {initials}
          </span>
        </div>
        <div className="min-w-0">
          <p className="font-display font-800 text-sm text-foreground truncate uppercase tracking-wide">
            {user?.name ?? "Guest"}
          </p>
          <p className="font-body text-xs text-muted-foreground truncate">
            {user?.email ?? ""}
          </p>
        </div>
      </div>

      <Separator className="bg-border" />

      {/* Nav Links */}
      <div className="py-2">
        {navItems.map((item) => (
          <button
            key={item.to}
            type="button"
            onClick={() => {
              onClose();
              navigate({ to: item.to as "/" });
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-left font-display font-600 text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
            data-ocid={item.ocid}
          >
            <span className="text-primary">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>

      <Separator className="bg-border" />

      {/* Logout */}
      <div className="py-2">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-left font-display font-700 text-xs tracking-widest uppercase text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors"
          data-ocid="profile.logout.button"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          Log Out
        </button>
      </div>
    </div>
  );
}
