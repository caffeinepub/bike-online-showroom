import { type ReactNode, createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";

export interface CartItem {
  id: string;
  name: string;
  brand: string;
  price: string;
  priceNum: number;
  image: string;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "qty">) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  showAuthModal: boolean;
  setShowAuthModal: (v: boolean) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function parsePriceString(price: string): number {
  // Remove ₹, commas, spaces and parse as float
  const cleaned = price.replace(/[₹,\s]/g, "");
  const num = Number.parseFloat(cleaned);
  return Number.isNaN(num) ? 0 : num;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useAuth();

  const addToCart = (item: Omit<CartItem, "qty">) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      const priceNum =
        item.priceNum > 0 ? item.priceNum : parsePriceString(item.price);
      return [...prev, { ...item, priceNum, qty: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.priceNum * i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        totalItems,
        totalPrice,
        showAuthModal,
        setShowAuthModal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
