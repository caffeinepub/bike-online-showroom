import { useAuth } from "@/context/AuthContext";
import type { SavedOrder } from "@/pages/CheckoutPage";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Banknote,
  ChevronRight,
  ClipboardList,
  QrCode,
  ShoppingBag,
} from "lucide-react";
import { useEffect, useMemo } from "react";

function formatPrice(num: number): string {
  return `₹${Number(num).toLocaleString("en-IN")}`;
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function loadOrders(email: string): SavedOrder[] {
  try {
    const raw = localStorage.getItem(`motoverse_orders_${email}`);
    if (!raw) return [];
    return JSON.parse(raw) as SavedOrder[];
  } catch {
    return [];
  }
}

export default function ProfileOrdersPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate({ to: "/signin" });
    }
  }, [user, navigate]);

  const orders = useMemo(() => (user ? loadOrders(user.email) : []), [user]);

  if (!user) {
    return (
      <div
        className="min-h-[50vh] flex items-center justify-center"
        data-ocid="profile-orders.loading_state"
      >
        <p className="font-display font-700 text-sm tracking-widest uppercase text-muted-foreground">
          Redirecting to sign in…
        </p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <nav className="flex items-center gap-2 text-xs font-display tracking-wider uppercase text-muted-foreground mb-4">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">Order History</span>
          </nav>
          <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-2">
            My Account
          </p>
          <h1 className="font-display font-900 text-4xl uppercase tracking-tight text-foreground flex items-center gap-3">
            <ClipboardList className="w-8 h-8 text-primary" />
            Order History
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-3xl">
        {orders.length === 0 ? (
          <div
            className="flex flex-col items-center text-center py-24"
            data-ocid="profile-orders.empty_state"
          >
            <div className="w-20 h-20 rounded-full border-2 border-border flex items-center justify-center mb-6">
              <ShoppingBag className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="font-display font-800 text-2xl uppercase tracking-tight text-foreground mb-3">
              No Orders Yet
            </h2>
            <p className="text-muted-foreground font-body mb-8 max-w-sm">
              No orders yet. Start shopping!
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/accessories"
                className="inline-flex items-center justify-center h-10 px-6 bg-primary text-primary-foreground hover:bg-primary/90 font-display font-700 tracking-widest uppercase text-sm rounded-sm transition-colors"
                data-ocid="profile-orders.primary_button"
              >
                Browse Accessories
              </Link>
              <Link
                to="/maintenance"
                className="inline-flex items-center justify-center h-10 px-6 border border-border bg-card hover:bg-muted font-display font-700 tracking-widest uppercase text-sm rounded-sm transition-colors"
                data-ocid="profile-orders.secondary_button"
              >
                Browse Maintenance
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-5" data-ocid="profile-orders.list">
            {orders.map((order, idx) => (
              <div
                key={order.orderId}
                className="bg-card border border-border rounded-sm overflow-hidden"
                data-ocid={`profile-orders.item.${idx + 1}`}
              >
                {/* Order Header */}
                <div className="flex items-center justify-between flex-wrap gap-3 px-5 py-4 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-display text-[10px] tracking-widest uppercase text-muted-foreground mb-0.5">
                        Order #
                      </p>
                      <p className="font-display font-900 text-lg text-primary tracking-widest">
                        {order.orderId}
                      </p>
                    </div>
                    <div className="w-px h-10 bg-border" />
                    <div>
                      <p className="font-display text-[10px] tracking-widest uppercase text-muted-foreground mb-0.5">
                        Date
                      </p>
                      <p className="font-body text-sm text-foreground font-600">
                        {formatDate(order.date)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {/* Payment Badge */}
                    <span
                      className={`inline-flex items-center gap-1.5 font-display font-700 text-xs tracking-widest uppercase px-2.5 py-1 rounded-sm ${
                        order.paymentMethod === "cod"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {order.paymentMethod === "cod" ? (
                        <Banknote className="w-3 h-3" />
                      ) : (
                        <QrCode className="w-3 h-3" />
                      )}
                      {order.paymentMethod === "cod" ? "COD" : "GPay/UPI"}
                    </span>
                    {/* Total */}
                    <p className="font-display font-900 text-xl text-foreground">
                      {formatPrice(order.total)}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="px-5 py-4 space-y-2.5">
                  {order.items.map((item, itemIdx) => (
                    <div
                      key={`${order.orderId}-${itemIdx}`}
                      className="flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        <p className="font-display font-700 text-xs uppercase tracking-tight text-foreground truncate">
                          {item.name}
                        </p>
                        <span className="font-body text-[10px] text-muted-foreground flex-shrink-0">
                          × {item.qty}
                        </span>
                      </div>
                      <span className="font-display font-700 text-sm text-primary flex-shrink-0">
                        {formatPrice(item.price * item.qty)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Delivery Address */}
                {order.deliveryAddress && (
                  <div className="px-5 pb-4">
                    <p className="font-display text-[10px] tracking-widest uppercase text-muted-foreground mb-1">
                      Delivered to
                    </p>
                    <p className="font-body text-xs text-muted-foreground">
                      {order.deliveryAddress}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
