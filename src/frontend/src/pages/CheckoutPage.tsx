import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { type CartItem, useCart } from "@/context/CartContext";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  Banknote,
  ChevronRight,
  Minus,
  Plus,
  QrCode,
  ShoppingBag,
  ShoppingCart,
  Trash2,
  Truck,
} from "lucide-react";
import { useEffect, useState } from "react";

interface FormData {
  name: string;
  phone: string;
  address: string;
  pincode: string;
  paymentMethod: "cod" | "gpay";
}

interface FormErrors {
  name?: string;
  phone?: string;
  address?: string;
  pincode?: string;
}

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Full name is required";
  if (!data.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (!/^[6-9]\d{9}$/.test(data.phone.replace(/\s/g, ""))) {
    errors.phone = "Enter a valid 10-digit Indian mobile number";
  }
  if (!data.address.trim()) errors.address = "Delivery address is required";
  if (!data.pincode.trim()) {
    errors.pincode = "Pincode is required";
  } else if (!/^\d{6}$/.test(data.pincode.trim())) {
    errors.pincode = "Enter a valid 6-digit pincode";
  }
  return errors;
}

function formatPrice(num: number): string {
  return `₹${num.toLocaleString("en-IN")}`;
}

// Saved order structure for localStorage
export interface SavedOrder {
  orderId: string;
  date: string; // ISO string
  items: { name: string; qty: number; price: number }[];
  total: number;
  paymentMethod: "cod" | "gpay";
  deliveryAddress: string;
}

// In-memory store for passing order details to success page
export interface OrderDetails {
  orderId: string;
  paymentMethod: "cod" | "gpay";
  total: number;
  name: string;
  phone: string;
  address: string;
  pincode: string;
  items: CartItem[];
}

let _pendingOrder: OrderDetails | null = null;

export function getPendingOrder(): OrderDetails | null {
  return _pendingOrder;
}

export function clearPendingOrder() {
  _pendingOrder = null;
}

export default function CheckoutPage() {
  const { items, totalPrice, totalItems, updateQty, removeFromCart } =
    useCart();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate({ to: "/signin" });
    }
  }, [user, navigate]);

  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    address: "",
    pincode: "",
    paymentMethod: "cod",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const update = (key: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key in errors) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Focus first error
      const firstErrorField = Object.keys(validationErrors)[0];
      document.getElementById(firstErrorField)?.focus();
      return;
    }

    const orderId = String(Math.floor(100000 + Math.random() * 900000));
    const orderDetails: OrderDetails = {
      orderId,
      paymentMethod: form.paymentMethod,
      total: totalPrice,
      name: form.name.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      pincode: form.pincode.trim(),
      items: [...items],
    };
    _pendingOrder = orderDetails;

    // Persist order to localStorage for order history
    if (user?.email) {
      const storageKey = `motoverse_orders_${user.email}`;
      let existingOrders: SavedOrder[] = [];
      try {
        const raw = localStorage.getItem(storageKey);
        if (raw) existingOrders = JSON.parse(raw) as SavedOrder[];
      } catch {
        existingOrders = [];
      }
      const savedOrder: SavedOrder = {
        orderId,
        date: new Date().toISOString(),
        items: items.map((item) => ({
          name: item.name,
          qty: item.qty,
          price: item.priceNum,
        })),
        total: totalPrice,
        paymentMethod: form.paymentMethod,
        deliveryAddress: `${form.address.trim()}, ${form.pincode.trim()}`,
      };
      localStorage.setItem(
        storageKey,
        JSON.stringify([savedOrder, ...existingOrders]),
      );
    }

    navigate({ to: "/order-success" });
  };

  if (!user) {
    return (
      <div
        className="min-h-[50vh] flex items-center justify-center"
        data-ocid="checkout.loading_state"
      >
        <p className="font-display font-700 text-sm tracking-widest uppercase text-muted-foreground">
          Redirecting to sign in…
        </p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="animate-fade-in">
        <div className="bg-card border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-2">
              Your Cart
            </p>
            <h1 className="font-display font-900 text-4xl uppercase tracking-tight text-foreground">
              Checkout
            </h1>
          </div>
        </div>
        <div
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center text-center"
          data-ocid="checkout.empty_state"
        >
          <div className="w-20 h-20 rounded-full border-2 border-border flex items-center justify-center mb-6">
            <ShoppingCart className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="font-display font-800 text-2xl uppercase tracking-tight text-foreground mb-3">
            Your cart is empty
          </h2>
          <p className="text-muted-foreground font-body mb-8 max-w-sm">
            Add some accessories or maintenance products to your cart before
            checking out.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-700 tracking-widest uppercase rounded-sm"
              data-ocid="checkout.primary_button"
            >
              <Link to="/accessories">Browse Accessories</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-border font-display font-700 tracking-widest uppercase rounded-sm"
              data-ocid="checkout.secondary_button"
            >
              <Link to="/maintenance">Browse Maintenance</Link>
            </Button>
          </div>
        </div>
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
            <span className="text-foreground">Checkout</span>
          </nav>
          <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-2">
            Order Summary
          </p>
          <h1 className="font-display font-900 text-4xl uppercase tracking-tight text-foreground">
            Checkout
            <span className="text-muted-foreground font-600 text-2xl ml-3">
              ({totalItems} {totalItems === 1 ? "item" : "items"})
            </span>
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Left: Customer Details + Payment */}
            <div className="lg:col-span-3 space-y-6">
              {/* Customer Details */}
              <div className="bg-card border border-border rounded-sm p-6 space-y-5">
                <div className="flex items-center gap-2 pb-4 border-b border-border">
                  <Truck className="w-4 h-4 text-primary" />
                  <h2 className="font-display font-700 text-sm tracking-widest uppercase text-foreground">
                    Delivery Details
                  </h2>
                </div>

                {/* Name */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="name"
                    className="font-display text-xs tracking-widest uppercase text-muted-foreground"
                  >
                    Full Name <span className="text-primary">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Ashwin Kumar"
                    autoComplete="name"
                    className={`bg-background border-border rounded-sm font-body ${errors.name ? "border-destructive" : ""}`}
                    data-ocid="checkout.name.input"
                  />
                  {errors.name && (
                    <p
                      className="text-destructive text-xs font-body flex items-center gap-1"
                      data-ocid="checkout.name.error_state"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="phone"
                    className="font-display text-xs tracking-widest uppercase text-muted-foreground"
                  >
                    Phone Number <span className="text-primary">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="9876543210"
                    autoComplete="tel"
                    className={`bg-background border-border rounded-sm font-body ${errors.phone ? "border-destructive" : ""}`}
                    data-ocid="checkout.phone.input"
                  />
                  {errors.phone && (
                    <p
                      className="text-destructive text-xs font-body flex items-center gap-1"
                      data-ocid="checkout.phone.error_state"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="address"
                    className="font-display text-xs tracking-widest uppercase text-muted-foreground"
                  >
                    Delivery Address <span className="text-primary">*</span>
                  </Label>
                  <Textarea
                    id="address"
                    value={form.address}
                    onChange={(e) => update("address", e.target.value)}
                    placeholder="House/Flat No., Street, Area, Landmark..."
                    rows={3}
                    autoComplete="street-address"
                    className={`bg-background border-border rounded-sm font-body resize-none ${errors.address ? "border-destructive" : ""}`}
                    data-ocid="checkout.address.textarea"
                  />
                  {errors.address && (
                    <p
                      className="text-destructive text-xs font-body flex items-center gap-1"
                      data-ocid="checkout.address.error_state"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* Pincode */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="pincode"
                    className="font-display text-xs tracking-widest uppercase text-muted-foreground"
                  >
                    Pincode <span className="text-primary">*</span>
                  </Label>
                  <Input
                    id="pincode"
                    value={form.pincode}
                    onChange={(e) => update("pincode", e.target.value)}
                    placeholder="600001"
                    maxLength={6}
                    autoComplete="postal-code"
                    className={`bg-background border-border rounded-sm font-body max-w-[160px] ${errors.pincode ? "border-destructive" : ""}`}
                    data-ocid="checkout.pincode.input"
                  />
                  {errors.pincode && (
                    <p
                      className="text-destructive text-xs font-body flex items-center gap-1"
                      data-ocid="checkout.pincode.error_state"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.pincode}
                    </p>
                  )}
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-card border border-border rounded-sm p-6 space-y-5">
                <div className="flex items-center gap-2 pb-4 border-b border-border">
                  <Banknote className="w-4 h-4 text-primary" />
                  <h2 className="font-display font-700 text-sm tracking-widest uppercase text-foreground">
                    Payment Method
                  </h2>
                </div>

                <RadioGroup
                  value={form.paymentMethod}
                  onValueChange={(v) =>
                    update("paymentMethod", v as "cod" | "gpay")
                  }
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                  data-ocid="checkout.payment.select"
                >
                  {/* Cash on Delivery */}
                  <label
                    htmlFor="payment-cod"
                    className={`flex items-start gap-4 p-4 rounded-sm border-2 cursor-pointer transition-colors ${
                      form.paymentMethod === "cod"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-muted-foreground/30"
                    }`}
                    data-ocid="checkout.cod.toggle"
                  >
                    <RadioGroupItem
                      value="cod"
                      id="payment-cod"
                      className="mt-0.5 border-border"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Banknote className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="font-display font-700 text-sm tracking-wide uppercase text-foreground">
                          Cash on Delivery
                        </span>
                      </div>
                      <p className="font-body text-xs text-muted-foreground leading-relaxed">
                        Pay {formatPrice(totalPrice)} when your order arrives
                      </p>
                    </div>
                  </label>

                  {/* GPay / UPI */}
                  <label
                    htmlFor="payment-gpay"
                    className={`flex items-start gap-4 p-4 rounded-sm border-2 cursor-pointer transition-colors ${
                      form.paymentMethod === "gpay"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-muted-foreground/30"
                    }`}
                    data-ocid="checkout.gpay.toggle"
                  >
                    <RadioGroupItem
                      value="gpay"
                      id="payment-gpay"
                      className="mt-0.5 border-border"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <QrCode className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="font-display font-700 text-sm tracking-wide uppercase text-foreground">
                          GPay / UPI
                        </span>
                      </div>
                      <p className="font-body text-xs text-muted-foreground leading-relaxed">
                        Pay now via UPI. Confirm after payment.
                      </p>
                    </div>
                  </label>
                </RadioGroup>

                {/* GPay Instructions */}
                {form.paymentMethod === "gpay" && (
                  <div className="bg-primary/5 border border-primary/20 rounded-sm p-4 space-y-3 animate-fade-in">
                    <div className="flex items-start gap-3">
                      <QrCode className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div className="space-y-2 flex-1">
                        <p className="font-display font-700 text-xs tracking-widest uppercase text-foreground">
                          UPI Payment Instructions
                        </p>
                        <div className="bg-background border border-border rounded-sm px-4 py-2.5 flex items-center justify-between gap-2">
                          <span className="font-body text-sm text-foreground font-600">
                            ashwinkumar9206@okicici
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              navigator.clipboard.writeText(
                                "ashwinkumar9206@okicici",
                              )
                            }
                            className="text-xs font-display font-700 tracking-wider text-primary hover:text-primary/80 uppercase flex-shrink-0"
                          >
                            Copy
                          </button>
                        </div>
                        <p className="font-body text-xs text-muted-foreground">
                          Amount:{" "}
                          <span className="text-primary font-700">
                            {formatPrice(totalPrice)}
                          </span>
                        </p>
                        <p className="font-body text-xs text-muted-foreground leading-relaxed">
                          After payment, email your screenshot to{" "}
                          <a
                            href="mailto:ashwinkumar8206@gmail.com"
                            className="text-primary hover:underline"
                          >
                            ashwinkumar8206@gmail.com
                          </a>{" "}
                          with your order number.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-card border border-border rounded-sm p-5 space-y-4 lg:sticky lg:top-24">
                <div className="flex items-center gap-2 pb-3 border-b border-border">
                  <ShoppingBag className="w-4 h-4 text-primary" />
                  <h2 className="font-display font-700 text-sm tracking-widest uppercase text-foreground">
                    Order Summary
                  </h2>
                </div>

                {/* Cart Items */}
                <div
                  className="space-y-3 max-h-80 overflow-y-auto pr-1"
                  data-ocid="checkout.list"
                >
                  {items.map((item, idx) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0"
                      data-ocid={`checkout.item.${idx + 1}`}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded-sm flex-shrink-0 bg-muted"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-display font-700 text-xs uppercase tracking-tight text-foreground truncate leading-tight">
                          {item.name}
                        </p>
                        <p className="font-body text-[10px] text-muted-foreground mt-0.5">
                          {item.brand}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1 bg-muted rounded-sm">
                            <button
                              type="button"
                              onClick={() => updateQty(item.id, item.qty - 1)}
                              className="w-6 h-6 flex items-center justify-center hover:text-primary transition-colors"
                              aria-label="Decrease quantity"
                              data-ocid={`checkout.item.${idx + 1}.button`}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-display font-700 text-xs w-5 text-center">
                              {item.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQty(item.id, item.qty + 1)}
                              className="w-6 h-6 flex items-center justify-center hover:text-primary transition-colors"
                              aria-label="Increase quantity"
                              data-ocid={`checkout.item.${idx + 1}.secondary_button`}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-display font-700 text-xs text-primary">
                              {formatPrice(item.priceNum * item.qty)}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="text-muted-foreground hover:text-destructive transition-colors"
                              aria-label={`Remove ${item.name}`}
                              data-ocid={`checkout.item.${idx + 1}.delete_button`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="bg-border" />

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-body text-muted-foreground">
                      Subtotal ({totalItems}{" "}
                      {totalItems === 1 ? "item" : "items"})
                    </span>
                    <span className="font-display font-700 text-foreground">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-body text-muted-foreground">
                      Delivery
                    </span>
                    <span className="font-display font-700 text-green-500">
                      Free
                    </span>
                  </div>
                  <Separator className="bg-border" />
                  <div className="flex justify-between items-center">
                    <span className="font-display font-700 text-sm uppercase tracking-wider text-foreground">
                      Total
                    </span>
                    <span className="font-display font-900 text-xl text-primary">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                </div>

                {/* Payment badge */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-body bg-muted/40 rounded-sm px-3 py-2">
                  {form.paymentMethod === "cod" ? (
                    <>
                      <Banknote className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      <span>Pay on delivery</span>
                    </>
                  ) : (
                    <>
                      <QrCode className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      <span>GPay / UPI payment</span>
                    </>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display font-700 tracking-widest uppercase rounded-sm shadow-glow text-sm"
                  data-ocid="checkout.submit_button"
                >
                  Place Order →
                </Button>

                <p className="text-center text-[10px] font-body text-muted-foreground leading-relaxed">
                  By placing this order you agree to our terms. We'll contact
                  you on {form.phone || "your phone number"} to confirm.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
