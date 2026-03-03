import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { type WishlistItem, useWishlist } from "@/context/WishlistContext";
import { Link, useNavigate } from "@tanstack/react-router";
import { Bell, CheckCircle2, ChevronRight, Heart, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface NotifyDialogProps {
  product: WishlistItem;
}

function NotifyDialog({ product }: NotifyDialogProps) {
  const { addNotifyRequest, hasNotifyRequest } = useWishlist();
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);

  const alreadySet = hasNotifyRequest(product.id);

  if (alreadySet) {
    return (
      <span className="inline-flex items-center gap-1.5 text-[11px] font-display font-700 tracking-widest uppercase text-green-500 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-sm">
        <CheckCircle2 className="w-3.5 h-3.5" />
        Notification Set
      </span>
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    addNotifyRequest({
      productId: product.id,
      productName: product.name,
      email: email.trim(),
    });
    toast.success(
      `You'll be notified at ${email.trim()} when ${product.name} is back in stock`,
    );
    setOpen(false);
    setEmail("");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="border-primary/40 text-primary hover:bg-primary/10 font-display font-700 tracking-widest uppercase text-[11px] rounded-sm h-8 px-3 gap-1.5"
          data-ocid="wishlist.notify.button"
        >
          <Bell className="w-3.5 h-3.5" />
          Notify Me
        </Button>
      </DialogTrigger>
      <DialogContent
        className="bg-card border-border text-foreground max-w-sm rounded-sm"
        data-ocid="wishlist.notify.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display font-800 text-lg uppercase tracking-tight text-foreground">
            Notify Me When In Stock
          </DialogTitle>
          <DialogDescription className="font-body text-sm text-muted-foreground leading-relaxed">
            We'll send you an email when{" "}
            <span className="text-foreground font-600">{product.name}</span> is
            available again.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-1.5">
            <Label
              htmlFor="notify-email"
              className="font-display font-700 text-xs tracking-widest uppercase text-muted-foreground"
            >
              Your Email
            </Label>
            <Input
              id="notify-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-background border-border focus:border-primary font-body text-sm rounded-sm"
              data-ocid="wishlist.notify.input"
            />
          </div>
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setOpen(false)}
              className="font-display font-700 text-xs tracking-widest uppercase rounded-sm"
              data-ocid="wishlist.notify.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-700 tracking-widest uppercase text-xs rounded-sm"
              data-ocid="wishlist.notify.submit_button"
            >
              <Bell className="w-3.5 h-3.5 mr-1.5" />
              Send Notification
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

interface WishlistCardProps {
  item: WishlistItem;
  index: number;
}

function WishlistCard({ item, index }: WishlistCardProps) {
  const { removeFromWishlist } = useWishlist();

  return (
    <div
      className="bg-card border border-border rounded-sm overflow-hidden flex flex-col group card-hover"
      data-ocid={`wishlist.item.${index}`}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-muted flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Remove button */}
        <button
          type="button"
          onClick={() => removeFromWishlist(item.id)}
          className="absolute top-2 right-2 z-10 w-8 h-8 rounded-sm bg-background/80 backdrop-blur-sm border border-border/60 flex items-center justify-center text-muted-foreground hover:text-destructive hover:border-destructive/40 hover:bg-destructive/10 transition-all duration-200"
          aria-label={`Remove ${item.name} from wishlist`}
          data-ocid={`wishlist.delete_button.${index}`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
        {/* Stock badge */}
        <div className="absolute top-2 left-2 z-10">
          {item.inStock ? (
            <span className="bg-green-600 text-white font-display font-700 text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-sm">
              In Stock
            </span>
          ) : (
            <span className="bg-muted text-muted-foreground font-display font-700 text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-sm border border-border">
              Out of Stock
            </span>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <Badge className="bg-primary/15 text-primary border-primary/30 font-display font-700 tracking-widest uppercase text-xs w-fit rounded-sm">
          {item.brand}
        </Badge>
        <div className="flex-1">
          <h3 className="font-display font-700 text-base uppercase tracking-tight text-foreground leading-tight">
            {item.name}
          </h3>
          <span className="font-display font-600 text-xs tracking-widest uppercase text-muted-foreground mt-1 block">
            {item.type === "bike"
              ? "Motorcycle"
              : item.type === "accessory"
                ? "Accessory"
                : "Maintenance"}
          </span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-border mt-auto">
          <span className="font-display font-800 text-lg text-primary">
            {item.price}
          </span>
          {!item.inStock && <NotifyDialog product={item} />}
        </div>
      </div>
    </div>
  );
}

export default function WishlistPage() {
  const { items } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate({ to: "/signin" });
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <div
        className="min-h-[50vh] flex items-center justify-center"
        data-ocid="wishlist.loading_state"
      >
        <p className="font-display font-700 text-sm tracking-widest uppercase text-muted-foreground">
          Redirecting to sign in…
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[280px] flex items-center overflow-hidden bg-card border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-0" />
        <div
          className="absolute right-0 top-0 w-1/2 h-full opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, oklch(0.72 0.2 35) 0, oklch(0.72 0.2 35) 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="font-display font-600 text-sm tracking-[0.3em] uppercase text-primary mb-4">
            Saved Items
          </p>
          <h1 className="font-display font-900 text-5xl sm:text-6xl uppercase leading-none tracking-tight text-foreground mb-4 flex items-center gap-4">
            My{" "}
            <span className="text-gradient-orange inline-flex items-center gap-3">
              Wishlist
              <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-red-500 fill-current" />
            </span>
          </h1>
          <p className="font-body text-lg text-muted-foreground max-w-lg leading-relaxed">
            {items.length > 0
              ? `${items.length} saved item${items.length !== 1 ? "s" : ""} — get notified when out-of-stock items are available.`
              : "Save bikes and products you love, and get notified when they're back in stock."}
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-card/50 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs font-display tracking-wider uppercase text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">Wishlist</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {items.length === 0 ? (
          /* Empty State */
          <div
            className="flex flex-col items-center justify-center py-24 text-center"
            data-ocid="wishlist.empty_state"
          >
            <div className="w-24 h-24 rounded-full bg-card border border-border flex items-center justify-center mb-6">
              <Heart className="w-12 h-12 text-muted-foreground/40" />
            </div>
            <h2 className="font-display font-800 text-3xl uppercase tracking-tight text-foreground mb-3">
              Your Wishlist is Empty
            </h2>
            <p className="text-muted-foreground font-body text-base max-w-sm mb-8 leading-relaxed">
              Tap the heart icon on any bike, accessory, or maintenance product
              to save it here for later.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-700 tracking-widest uppercase rounded-sm shadow-glow"
            >
              <Link to="/" data-ocid="wishlist.primary_button">
                Browse Bikes
              </Link>
            </Button>
          </div>
        ) : (
          /* Items Grid */
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-1">
                  Your Collection
                </p>
                <h2 className="font-display font-800 text-3xl uppercase tracking-tight text-foreground">
                  Saved Items{" "}
                  <span className="text-primary">({items.length})</span>
                </h2>
              </div>
            </div>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              data-ocid="wishlist.list"
            >
              {items.map((item, idx) => (
                <WishlistCard key={item.id} item={item} index={idx + 1} />
              ))}
            </div>

            {/* Out of stock notice */}
            {items.some((i) => !i.inStock) && (
              <div className="mt-10 p-5 bg-primary/5 border border-primary/20 rounded-sm flex items-start gap-3">
                <Bell className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-display font-700 text-sm uppercase tracking-widest text-foreground mb-1">
                    Out-of-Stock Items
                  </p>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    Click{" "}
                    <span className="text-primary font-600">Notify Me</span> on
                    any out-of-stock item and we'll email you as soon as it's
                    back.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
