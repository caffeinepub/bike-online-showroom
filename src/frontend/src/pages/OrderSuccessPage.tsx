import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { Link } from "@tanstack/react-router";
import {
  Banknote,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  QrCode,
  ShoppingBag,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { clearPendingOrder, getPendingOrder } from "./CheckoutPage";

function formatPrice(num: number): string {
  return `₹${Number(num).toLocaleString("en-IN")}`;
}

export default function OrderSuccessPage() {
  const { clearCart } = useCart();

  // Snapshot the order on first render before clearing
  const orderRef = useRef(getPendingOrder());

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally run once on mount
  useEffect(() => {
    // Clear cart and pending order after capturing snapshot
    clearCart();
    clearPendingOrder();
  }, []);

  const order = orderRef.current;

  if (!order) {
    return (
      <div className="animate-fade-in container mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center text-center">
        <CheckCircle2 className="w-12 h-12 text-green-500 mb-4" />
        <h1 className="font-display font-900 text-4xl uppercase tracking-tight text-foreground mb-3">
          Order Placed!
        </h1>
        <p className="text-muted-foreground font-body mb-8">
          Your order has been submitted successfully.
        </p>
        <Button
          asChild
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-700 tracking-widest uppercase rounded-sm"
          data-ocid="order-success.primary_button"
        >
          <Link to="/accessories">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  const {
    orderId,
    paymentMethod,
    total,
    name,
    phone,
    address,
    pincode,
    items,
  } = order;

  return (
    <div className="animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-2xl">
        {/* Success Icon */}
        <div className="text-center mb-10" data-ocid="order-success.section">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500/30 mb-5">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <p className="font-display font-600 text-xs tracking-[0.3em] uppercase text-primary mb-2">
            Order Confirmed
          </p>
          <h1 className="font-display font-900 text-4xl sm:text-5xl uppercase tracking-tight text-foreground mb-3">
            Thank You!
          </h1>
          <p className="font-body text-muted-foreground text-lg">
            Your order has been placed successfully.
          </p>
        </div>

        {/* Order Number */}
        <div
          className="bg-primary/5 border border-primary/20 rounded-sm p-5 mb-6 flex items-center justify-between flex-wrap gap-3"
          data-ocid="order-success.card"
        >
          <div>
            <p className="font-display text-[10px] tracking-widest uppercase text-muted-foreground mb-0.5">
              Order Number
            </p>
            <p className="font-display font-900 text-2xl text-primary tracking-widest">
              #{orderId}
            </p>
          </div>
          <div className="text-right">
            <p className="font-display text-[10px] tracking-widest uppercase text-muted-foreground mb-0.5">
              Total Amount
            </p>
            <p className="font-display font-900 text-2xl text-foreground">
              {formatPrice(total)}
            </p>
          </div>
        </div>

        {/* Delivery Details */}
        <div className="bg-card border border-border rounded-sm p-5 mb-5 space-y-2.5">
          <p className="font-display font-700 text-xs tracking-widest uppercase text-muted-foreground flex items-center gap-1.5 mb-3">
            <MapPin className="w-3.5 h-3.5" />
            Delivery Details
          </p>
          <p className="font-body text-sm text-foreground font-700">{name}</p>
          <p className="font-body text-sm text-muted-foreground flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 flex-shrink-0" />
            {phone}
          </p>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            {address}
            {pincode ? ` — ${pincode}` : ""}
          </p>
        </div>

        {/* Payment Instructions */}
        <div className="bg-card border border-border rounded-sm p-5 mb-5 space-y-3">
          <p className="font-display font-700 text-xs tracking-widest uppercase text-muted-foreground flex items-center gap-1.5">
            {paymentMethod === "cod" ? (
              <Banknote className="w-3.5 h-3.5" />
            ) : (
              <QrCode className="w-3.5 h-3.5" />
            )}
            Payment
          </p>

          {paymentMethod === "cod" ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-green-500/15 text-green-500 font-display font-700 text-xs tracking-widest uppercase px-2 py-0.5 rounded-sm">
                  Cash on Delivery
                </span>
              </div>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                Our team will call you at{" "}
                <span className="text-foreground font-600">{phone}</span> to
                confirm your delivery. Please keep{" "}
                <span className="text-primary font-700">
                  {formatPrice(total)}
                </span>{" "}
                ready when your order arrives.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="bg-primary/15 text-primary font-display font-700 text-xs tracking-widest uppercase px-2 py-0.5 rounded-sm">
                  GPay / UPI
                </span>
              </div>
              <div className="bg-background border border-border rounded-sm p-4 space-y-2">
                <p className="font-display font-700 text-xs tracking-widest uppercase text-muted-foreground">
                  Send payment to:
                </p>
                <p className="font-body text-base font-700 text-foreground">
                  ashwinkumar9206@okicici
                </p>
                <p className="font-body text-sm text-muted-foreground">
                  Amount:{" "}
                  <span className="text-primary font-700">
                    {formatPrice(total)}
                  </span>
                </p>
              </div>
              <p className="font-body text-sm text-muted-foreground leading-relaxed flex items-start gap-2">
                <Mail className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  After payment, email your screenshot to{" "}
                  <a
                    href="mailto:ashwinkumar8206@gmail.com"
                    className="text-primary hover:underline"
                  >
                    ashwinkumar8206@gmail.com
                  </a>{" "}
                  with order number{" "}
                  <span className="text-foreground font-700">#{orderId}</span>
                </span>
              </p>
            </div>
          )}
        </div>

        {/* Order Items */}
        {items.length > 0 && (
          <div
            className="bg-card border border-border rounded-sm p-5 mb-8"
            data-ocid="order-success.list"
          >
            <p className="font-display font-700 text-xs tracking-widest uppercase text-muted-foreground flex items-center gap-1.5 mb-4">
              <ShoppingBag className="w-3.5 h-3.5" />
              Items Ordered
            </p>
            <div className="space-y-3">
              {items.map((item, idx) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3"
                  data-ocid={`order-success.item.${idx + 1}`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-sm object-cover bg-muted flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-700 text-xs uppercase tracking-tight text-foreground truncate">
                      {item.name}
                    </p>
                    <p className="font-body text-[10px] text-muted-foreground">
                      {item.brand} × {item.qty}
                    </p>
                  </div>
                  <span className="font-display font-700 text-sm text-primary flex-shrink-0">
                    {formatPrice(item.priceNum * item.qty)}
                  </span>
                </div>
              ))}
              <Separator className="bg-border" />
              <div className="flex justify-between items-center">
                <span className="font-display font-700 text-xs uppercase tracking-wider text-muted-foreground">
                  Total
                </span>
                <span className="font-display font-900 text-lg text-primary">
                  {formatPrice(total)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            asChild
            size="lg"
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-display font-700 tracking-widest uppercase rounded-sm shadow-glow"
            data-ocid="order-success.primary_button"
          >
            <Link to="/accessories">Continue Shopping</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="flex-1 border-border font-display font-700 tracking-widest uppercase rounded-sm"
            data-ocid="order-success.secondary_button"
          >
            <Link to="/">Back to Catalog</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
