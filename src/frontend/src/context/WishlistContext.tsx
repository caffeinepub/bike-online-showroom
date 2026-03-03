import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./AuthContext";

export interface WishlistItem {
  id: string;
  name: string;
  brand: string;
  price: string;
  image: string;
  inStock: boolean;
  type: "bike" | "accessory" | "maintenance";
}

export interface NotifyRequest {
  id: string;
  productId: string;
  productName: string;
  email: string;
  createdAt: string;
}

interface WishlistContextValue {
  items: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  toggleWishlist: (item: WishlistItem) => void;
  isWishlisted: (id: string) => boolean;
  totalWishlistItems: number;
  notifyRequests: NotifyRequest[];
  addNotifyRequest: (req: Omit<NotifyRequest, "id" | "createdAt">) => void;
  hasNotifyRequest: (productId: string) => boolean;
  showAuthModal: boolean;
  setShowAuthModal: (v: boolean) => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

const WISHLIST_KEY = "motoverse_wishlist";
const NOTIFY_KEY = "motoverse_notify_requests";

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>(() =>
    loadFromStorage<WishlistItem[]>(WISHLIST_KEY, []),
  );
  const [notifyRequests, setNotifyRequests] = useState<NotifyRequest[]>(() =>
    loadFromStorage<NotifyRequest[]>(NOTIFY_KEY, []),
  );
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem(NOTIFY_KEY, JSON.stringify(notifyRequests));
  }, [notifyRequests]);

  const addToWishlist = useCallback(
    (item: WishlistItem) => {
      if (!user) {
        setShowAuthModal(true);
        return;
      }
      setItems((prev) => {
        if (prev.some((i) => i.id === item.id)) return prev;
        return [...prev, item];
      });
    },
    [user],
  );

  const removeFromWishlist = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const toggleWishlist = useCallback(
    (item: WishlistItem) => {
      if (!user) {
        setShowAuthModal(true);
        return;
      }
      setItems((prev) => {
        if (prev.some((i) => i.id === item.id)) {
          return prev.filter((i) => i.id !== item.id);
        }
        return [...prev, item];
      });
    },
    [user],
  );

  const isWishlisted = useCallback(
    (id: string) => items.some((i) => i.id === id),
    [items],
  );

  const addNotifyRequest = useCallback(
    (req: Omit<NotifyRequest, "id" | "createdAt">) => {
      const newReq: NotifyRequest = {
        ...req,
        id: `${req.productId}-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      setNotifyRequests((prev) => {
        const filtered = prev.filter((r) => r.productId !== req.productId);
        return [...filtered, newReq];
      });
    },
    [],
  );

  const hasNotifyRequest = useCallback(
    (productId: string) =>
      notifyRequests.some((r) => r.productId === productId),
    [notifyRequests],
  );

  return (
    <WishlistContext.Provider
      value={{
        items,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isWishlisted,
        totalWishlistItems: items.length,
        notifyRequests,
        addNotifyRequest,
        hasNotifyRequest,
        showAuthModal,
        setShowAuthModal,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return ctx;
}
