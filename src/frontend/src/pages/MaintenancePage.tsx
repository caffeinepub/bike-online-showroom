import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronRight, Heart, ShoppingCart, Wrench } from "lucide-react";
import { toast } from "sonner";

interface Spec {
  label: string;
  value: string;
}

interface Product {
  id: number;
  name: string;
  brand: string;
  price: string;
  detail: string;
  image: string;
  badge?: string;
  inStock: boolean;
  stockQty?: number;
  specs: Spec[];
}

const engineOils: Product[] = [
  {
    id: 1,
    name: "300V Factory Line",
    brand: "Motul",
    price: "₹1,199",
    detail: "Fully Synthetic • 10W40 • 1L",
    image: "/assets/generated/oil-motul-300v.dim_400x300.jpg",
    badge: "10W40",
    inStock: true,
    stockQty: 24,
    specs: [
      { label: "Grade", value: "10W-40" },
      { label: "Type", value: "Fully Synthetic" },
      { label: "Volume", value: "1 Litre" },
      { label: "API Standard", value: "API SN" },
      { label: "JASO", value: "JASO MA2" },
      { label: "Best For", value: "Sport / Performance Bikes" },
    ],
  },
  {
    id: 2,
    name: "7100 4T Technosynthese",
    brand: "Motul",
    price: "₹899",
    detail: "Semi Synthetic • 20W50 • 1L",
    image: "/assets/generated/oil-motul-7100.dim_400x300.jpg",
    badge: "20W50",
    inStock: true,
    stockQty: 18,
    specs: [
      { label: "Grade", value: "20W-50" },
      { label: "Type", value: "Semi Synthetic" },
      { label: "Volume", value: "1 Litre" },
      { label: "API Standard", value: "API SM" },
      { label: "JASO", value: "JASO MA2" },
      { label: "Best For", value: "All-Round City & Highway" },
    ],
  },
  {
    id: 3,
    name: "Power 1 4T",
    brand: "Castrol",
    price: "₹549",
    detail: "Synthetic • 10W30 • 0.8L",
    image: "/assets/generated/oil-castrol-power1.dim_400x300.jpg",
    badge: "10W30",
    inStock: true,
    stockQty: 35,
    specs: [
      { label: "Grade", value: "10W-30" },
      { label: "Type", value: "Part Synthetic" },
      { label: "Volume", value: "0.8 Litre" },
      { label: "API Standard", value: "API SL" },
      { label: "JASO", value: "JASO MA" },
      { label: "Best For", value: "125cc – 250cc Bikes" },
    ],
  },
  {
    id: 4,
    name: "Activ 4T",
    brand: "Castrol",
    price: "₹349",
    detail: "Mineral • 20W50 • 1L",
    image: "/assets/generated/oil-castrol-activ.dim_400x300.jpg",
    badge: "20W50",
    inStock: true,
    stockQty: 60,
    specs: [
      { label: "Grade", value: "20W-50" },
      { label: "Type", value: "Mineral" },
      { label: "Volume", value: "1 Litre" },
      { label: "API Standard", value: "API SJ" },
      { label: "JASO", value: "JASO MA" },
      { label: "Best For", value: "Commuter & Economy Bikes" },
    ],
  },
  {
    id: 5,
    name: "Advance 4T",
    brand: "Shell",
    price: "₹649",
    detail: "Fully Synthetic • 10W40 • 1L",
    image: "/assets/generated/oil-shell-advance.dim_400x300.jpg",
    badge: "10W40",
    inStock: true,
    stockQty: 20,
    specs: [
      { label: "Grade", value: "10W-40" },
      { label: "Type", value: "Fully Synthetic" },
      { label: "Volume", value: "1 Litre" },
      { label: "API Standard", value: "API SN" },
      { label: "JASO", value: "JASO MA2" },
      { label: "Best For", value: "Sport & Naked Bikes" },
    ],
  },
  {
    id: 6,
    name: "Rimula R4 X",
    brand: "Shell",
    price: "₹899",
    detail: "Heavy Duty • 15W50 • 1L",
    image: "/assets/generated/oil-shell-rimula.dim_400x300.jpg",
    badge: "15W50",
    inStock: false,
    specs: [
      { label: "Grade", value: "15W-50" },
      { label: "Type", value: "Semi Synthetic" },
      { label: "Volume", value: "1 Litre" },
      { label: "API Standard", value: "API CI-4" },
      { label: "JASO", value: "JASO DH-2" },
      { label: "Best For", value: "Heavy-Duty Touring" },
    ],
  },
  {
    id: 7,
    name: "Honda 4-Stroke Oil",
    brand: "Honda",
    price: "₹399",
    detail: "Genuine OEM • 10W30 • 0.8L",
    image: "/assets/generated/oil-honda-4t.dim_400x300.jpg",
    badge: "10W30",
    inStock: true,
    stockQty: 45,
    specs: [
      { label: "Grade", value: "10W-30" },
      { label: "Type", value: "Mineral (OEM)" },
      { label: "Volume", value: "0.8 Litre" },
      { label: "API Standard", value: "API SG" },
      { label: "JASO", value: "JASO MA" },
      { label: "Best For", value: "Honda CBR, Hornet, Activa" },
    ],
  },
  {
    id: 8,
    name: "Yamalube 4S",
    brand: "Yamaha",
    price: "₹449",
    detail: "Genuine OEM • 20W40 • 1L",
    image: "/assets/generated/oil-yamalube-4s.dim_400x300.jpg",
    badge: "20W40",
    inStock: true,
    stockQty: 38,
    specs: [
      { label: "Grade", value: "20W-40" },
      { label: "Type", value: "Mineral (OEM)" },
      { label: "Volume", value: "1 Litre" },
      { label: "API Standard", value: "API SH" },
      { label: "JASO", value: "JASO MA" },
      { label: "Best For", value: "Yamaha MT-15, R15, FZ" },
    ],
  },
  {
    id: 9,
    name: "Gulf Pride 4T Plus",
    brand: "Gulf",
    price: "₹299",
    detail: "Mineral • 20W50 • 1L",
    image: "/assets/generated/oil-gulf-pride.dim_400x300.jpg",
    badge: "20W50",
    inStock: true,
    stockQty: 55,
    specs: [
      { label: "Grade", value: "20W-50" },
      { label: "Type", value: "Mineral" },
      { label: "Volume", value: "1 Litre" },
      { label: "API Standard", value: "API SJ" },
      { label: "JASO", value: "JASO MA" },
      { label: "Best For", value: "Budget Commuter Bikes" },
    ],
  },
  {
    id: 10,
    name: "Gulf Multigrade",
    brand: "Gulf",
    price: "₹499",
    detail: "Semi Synthetic • 10W40 • 1L",
    image: "/assets/generated/oil-gulf-multi.dim_400x300.jpg",
    badge: "10W40",
    inStock: true,
    stockQty: 30,
    specs: [
      { label: "Grade", value: "10W-40" },
      { label: "Type", value: "Semi Synthetic" },
      { label: "Volume", value: "1 Litre" },
      { label: "API Standard", value: "API SM" },
      { label: "JASO", value: "JASO MA2" },
      { label: "Best For", value: "Mid-Range All Bikes" },
    ],
  },
];

const chainLubes: Product[] = [
  {
    id: 1,
    name: "Motorcycle Chain Lube",
    brand: "WD-40 Specialist",
    price: "₹649",
    detail: "360ml • Long Chain Life Formula",
    image: "/assets/generated/lube-wd40-chain.dim_400x300.jpg",
    inStock: true,
    stockQty: 22,
    specs: [
      { label: "Volume", value: "360 ml" },
      { label: "Type", value: "Wet Lube" },
      { label: "Formula", value: "Anti-Fling, Anti-Rust" },
      { label: "Application", value: "Spray Can" },
      { label: "Chain Type", value: "O-Ring / X-Ring / Z-Ring" },
      { label: "Best For", value: "Street & Highway" },
    ],
  },
  {
    id: 2,
    name: "Chain Lube Off-Road",
    brand: "Motul",
    price: "₹549",
    detail: "400ml • Dirt Resistant Film",
    image: "/assets/generated/lube-motul-offroad.dim_400x300.jpg",
    inStock: true,
    stockQty: 15,
    specs: [
      { label: "Volume", value: "400 ml" },
      { label: "Type", value: "Wet Lube" },
      { label: "Formula", value: "Dirt-Resistant Wax Film" },
      { label: "Application", value: "Aerosol Spray" },
      { label: "Chain Type", value: "O-Ring / Non-Sealed" },
      { label: "Best For", value: "Off-Road / Adventure" },
    ],
  },
  {
    id: 3,
    name: "Ebike Chain Lube",
    brand: "Muc-Off",
    price: "₹899",
    detail: "150ml • Ceramic Enhanced",
    image: "/assets/generated/lube-mucoff-ebike.dim_400x300.jpg",
    inStock: true,
    stockQty: 10,
    specs: [
      { label: "Volume", value: "150 ml" },
      { label: "Type", value: "Dry / Ceramic Lube" },
      { label: "Formula", value: "Nano Ceramic Particles" },
      { label: "Application", value: "Drip Bottle" },
      { label: "Chain Type", value: "All Chain Types" },
      { label: "Best For", value: "Low-Mess Clean Drivetrains" },
    ],
  },
  {
    id: 4,
    name: "TF2 Chain Lube",
    brand: "Weldtite",
    price: "₹449",
    detail: "400ml • PTFE Teflon Formula",
    image: "/assets/generated/lube-weldtite-tf2.dim_400x300.jpg",
    inStock: false,
    specs: [
      { label: "Volume", value: "400 ml" },
      { label: "Type", value: "Wet / PTFE Lube" },
      { label: "Formula", value: "Teflon (PTFE) Infused" },
      { label: "Application", value: "Aerosol Spray" },
      { label: "Chain Type", value: "O-Ring / Standard" },
      { label: "Best For", value: "All-Weather Riding" },
    ],
  },
  {
    id: 5,
    name: "Absolute Dry",
    brand: "Rock N Roll",
    price: "₹749",
    detail: "120ml • Zero Mess Dry Lube",
    image: "/assets/generated/lube-rocknroll-dry.dim_400x300.jpg",
    inStock: true,
    stockQty: 8,
    specs: [
      { label: "Volume", value: "120 ml" },
      { label: "Type", value: "Dry Lube" },
      { label: "Formula", value: "Zero Residue, No Fling" },
      { label: "Application", value: "Drip Bottle" },
      { label: "Chain Type", value: "All Chain Types" },
      { label: "Best For", value: "Dry / Dusty Conditions" },
    ],
  },
  {
    id: 6,
    name: "Chain Lube All Road",
    brand: "Motul",
    price: "₹599",
    detail: "400ml • All Weather Protection",
    image: "/assets/generated/lube-motul-allroad.dim_400x300.jpg",
    inStock: true,
    stockQty: 18,
    specs: [
      { label: "Volume", value: "400 ml" },
      { label: "Type", value: "Wet Lube" },
      { label: "Formula", value: "All-Weather Polymer Film" },
      { label: "Application", value: "Aerosol Spray" },
      { label: "Chain Type", value: "O-Ring / X-Ring / Z-Ring" },
      { label: "Best For", value: "Mixed Conditions / Touring" },
    ],
  },
];

const tyres: Product[] = [
  {
    id: 1,
    name: "Zapper-FX",
    brand: "MRF",
    price: "₹1,299",
    detail: "90/90-17 • Tubeless • Front",
    image: "/assets/generated/tyre-mrf-zapper.dim_400x300.jpg",
    badge: "90/90-17",
    inStock: true,
    stockQty: 12,
    specs: [
      { label: "Size", value: "90/90-17" },
      { label: "Position", value: "Front" },
      { label: "Type", value: "Tubeless" },
      { label: "Load Index", value: "49" },
      { label: "Speed Rating", value: "P (150 km/h)" },
      { label: "Best For", value: "100cc – 150cc Commuters" },
    ],
  },
  {
    id: 2,
    name: "Secura Sport",
    brand: "CEAT",
    price: "₹1,499",
    detail: "110/80-17 • Tubeless • Rear",
    image: "/assets/generated/tyre-ceat-secura.dim_400x300.jpg",
    badge: "110/80-17",
    inStock: true,
    stockQty: 9,
    specs: [
      { label: "Size", value: "110/80-17" },
      { label: "Position", value: "Rear" },
      { label: "Type", value: "Tubeless" },
      { label: "Load Index", value: "57" },
      { label: "Speed Rating", value: "S (180 km/h)" },
      { label: "Best For", value: "150cc – 200cc Naked Bikes" },
    ],
  },
  {
    id: 3,
    name: "Pilot Street Radial",
    brand: "Michelin",
    price: "₹4,899",
    detail: "120/70-17 • Radial • High Grip",
    image: "/assets/generated/tyre-michelin-pilot.dim_400x300.jpg",
    badge: "120/70-17",
    inStock: true,
    stockQty: 6,
    specs: [
      { label: "Size", value: "120/70-17" },
      { label: "Position", value: "Front" },
      { label: "Type", value: "Tubeless Radial" },
      { label: "Load Index", value: "58" },
      { label: "Speed Rating", value: "W (270 km/h)" },
      { label: "Best For", value: "300cc – 650cc Sports Bikes" },
    ],
  },
  {
    id: 4,
    name: "Battlax S22",
    brand: "Bridgestone",
    price: "₹6,499",
    detail: "180/55-17 • Radial • Sport",
    image: "/assets/generated/tyre-bridgestone-battlax.dim_400x300.jpg",
    badge: "180/55-17",
    inStock: false,
    specs: [
      { label: "Size", value: "180/55-17" },
      { label: "Position", value: "Rear" },
      { label: "Type", value: "Tubeless Radial" },
      { label: "Load Index", value: "73" },
      { label: "Speed Rating", value: "W (270 km/h)" },
      { label: "Best For", value: "600cc+ Superbikes" },
    ],
  },
  {
    id: 5,
    name: "Diablo Rosso IV",
    brand: "Pirelli",
    price: "₹7,999",
    detail: "160/60-17 • Radial • Track",
    image: "/assets/generated/tyre-pirelli-diablo.dim_400x300.jpg",
    badge: "160/60-17",
    inStock: true,
    stockQty: 4,
    specs: [
      { label: "Size", value: "160/60-17" },
      { label: "Position", value: "Rear" },
      { label: "Type", value: "Tubeless Radial" },
      { label: "Load Index", value: "69" },
      { label: "Speed Rating", value: "W (270 km/h)" },
      { label: "Best For", value: "400cc – 1000cc Track / Sport" },
    ],
  },
  {
    id: 6,
    name: "Alpha Sport",
    brand: "Apollo",
    price: "₹1,899",
    detail: "100/90-17 • Bias Ply • Budget",
    image: "/assets/generated/tyre-apollo-alpha.dim_400x300.jpg",
    badge: "100/90-17",
    inStock: true,
    stockQty: 20,
    specs: [
      { label: "Size", value: "100/90-17" },
      { label: "Position", value: "Front / Rear" },
      { label: "Type", value: "Tubeless Bias-Ply" },
      { label: "Load Index", value: "55" },
      { label: "Speed Rating", value: "P (150 km/h)" },
      { label: "Best For", value: "150cc – 200cc Budget Bikes" },
    ],
  },
  {
    id: 7,
    name: "Revz EX",
    brand: "MRF",
    price: "₹1,799",
    detail: "130/70-17 • Tubeless • Rear",
    image: "/assets/generated/tyre-mrf-revz.dim_400x300.jpg",
    badge: "130/70-17",
    inStock: true,
    stockQty: 14,
    specs: [
      { label: "Size", value: "130/70-17" },
      { label: "Position", value: "Rear" },
      { label: "Type", value: "Tubeless" },
      { label: "Load Index", value: "62" },
      { label: "Speed Rating", value: "S (180 km/h)" },
      { label: "Best For", value: "200cc – 250cc Naked / Sports" },
    ],
  },
  {
    id: 8,
    name: "Pilot Power 3",
    brand: "Michelin",
    price: "₹8,499",
    detail: "200/55-17 • Radial • Hypersport",
    image: "/assets/generated/tyre-michelin-power3.dim_400x300.jpg",
    badge: "200/55-17",
    inStock: false,
    specs: [
      { label: "Size", value: "200/55-17" },
      { label: "Position", value: "Rear" },
      { label: "Type", value: "Tubeless Radial" },
      { label: "Load Index", value: "78" },
      { label: "Speed Rating", value: "W (270 km/h)" },
      { label: "Best For", value: "900cc+ Hypersport Bikes" },
    ],
  },
];

interface ProductCardProps {
  product: Product;
  ocidPrefix: string;
  index: number;
  showBadge?: boolean;
  onAddToCart: (product: Product) => void;
}

function ProductCard({
  product,
  ocidPrefix,
  index,
  showBadge = false,
  onAddToCart,
}: ProductCardProps) {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlistId = `maint-${product.brand.toLowerCase().replace(/\s+/g, "-")}-${product.id}`;
  const wishlisted = isWishlisted(wishlistId);

  return (
    <div
      className="bg-card border border-border rounded-sm overflow-hidden card-hover group flex flex-col"
      data-ocid={`${ocidPrefix}.${index}`}
    >
      {/* Product Image */}
      <div className="h-44 relative overflow-hidden bg-muted flex-shrink-0">
        <img
          src={product.image}
          alt={`${product.brand} ${product.name}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {/* Stock badge on image */}
        <div className="absolute top-2 left-2 z-10">
          {product.inStock ? (
            <span className="bg-green-600 text-white font-display font-700 text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-sm">
              In Stock
            </span>
          ) : (
            <span className="bg-muted text-muted-foreground font-display font-700 text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-sm border border-border">
              Out of Stock
            </span>
          )}
        </div>
        {/* Wishlist heart button (stacked below grade badge if present) */}
        <div className="absolute top-2 right-2 z-10 flex flex-col items-end gap-1.5">
          {showBadge && product.badge && (
            <span className="bg-primary text-primary-foreground font-display font-700 text-xs tracking-widest uppercase px-2 py-1 rounded-sm">
              {product.badge}
            </span>
          )}
          <button
            type="button"
            onClick={() =>
              toggleWishlist({
                id: wishlistId,
                name: product.name,
                brand: product.brand,
                price: product.price,
                image: product.image,
                inStock: product.inStock,
                type: "maintenance",
              })
            }
            className={`w-8 h-8 rounded-sm flex items-center justify-center transition-all duration-200 hover:scale-110 ${
              wishlisted
                ? "bg-red-500/20 border border-red-500/40 text-red-500"
                : "bg-background/80 backdrop-blur-sm border border-border/60 text-muted-foreground hover:text-red-500 hover:border-red-500/40 hover:bg-red-500/10"
            }`}
            aria-label={
              wishlisted
                ? `Remove ${product.name} from wishlist`
                : `Add ${product.name} to wishlist`
            }
            data-ocid={`${ocidPrefix}.${index}.toggle`}
          >
            <Heart
              className={`w-4 h-4 transition-all duration-200 ${wishlisted ? "fill-current text-red-500" : ""}`}
            />
          </button>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex items-center justify-between">
          <Badge className="bg-primary/15 text-primary border-primary/30 font-display font-700 tracking-widest uppercase text-xs w-fit rounded-sm">
            {product.brand}
          </Badge>
          {product.inStock && product.stockQty !== undefined && (
            <span className="text-[10px] font-display font-600 text-muted-foreground tracking-wide">
              {product.stockQty} units left
            </span>
          )}
        </div>
        <div>
          <h3 className="font-display font-700 text-base uppercase tracking-tight text-foreground leading-tight">
            {product.name}
          </h3>
          <p className="text-muted-foreground text-xs font-body mt-1 leading-relaxed">
            {product.detail}
          </p>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 bg-muted/40 rounded-sm p-3 mt-1">
          {product.specs.map((spec) => (
            <div key={spec.label} className="flex flex-col">
              <span className="font-display font-700 text-[10px] tracking-widest uppercase text-muted-foreground leading-tight">
                {spec.label}
              </span>
              <span className="font-body text-xs text-foreground leading-snug mt-0.5">
                {spec.value}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-border">
          <span className="font-display font-800 text-lg text-primary">
            {product.price}
          </span>
          {product.inStock ? (
            <Button
              size="sm"
              onClick={() => onAddToCart(product)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-700 tracking-widest uppercase text-xs rounded-sm h-8 px-3 gap-1.5"
              data-ocid={`${ocidPrefix}.${index}.button`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              Add to Cart
            </Button>
          ) : (
            <Button
              size="sm"
              disabled
              className="bg-muted text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed font-display font-700 tracking-widest uppercase text-xs rounded-sm h-8 px-3"
              data-ocid={`${ocidPrefix}.${index}.button`}
            >
              Notify Me
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

interface SectionProps {
  label: string;
  heading: string;
  products: Product[];
  ocidSection: string;
  ocidItemPrefix: string;
  cols?: string;
  showBadge?: boolean;
  onAddToCart: (product: Product) => void;
}

function ProductSection({
  label,
  heading,
  products,
  ocidSection,
  ocidItemPrefix,
  cols = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  showBadge = false,
  onAddToCart,
}: SectionProps) {
  return (
    <section className="py-12" data-ocid={ocidSection}>
      <div className="mb-8">
        <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-2">
          {label}
        </p>
        <h2 className="font-display font-800 text-4xl uppercase tracking-tight text-foreground">
          {heading}
        </h2>
      </div>
      <div className={`grid ${cols} gap-6`}>
        {products.map((product, idx) => (
          <ProductCard
            key={product.id}
            product={product}
            ocidPrefix={ocidItemPrefix}
            index={idx + 1}
            showBadge={showBadge}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
}

export default function MaintenancePage() {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  function handleAddToCart(product: Product) {
    const priceNum =
      Number.parseFloat(product.price.replace(/[₹,\s]/g, "")) || 0;
    addToCart({
      id: `maint-${product.brand.toLowerCase().replace(/\s+/g, "-")}-${product.id}`,
      name: product.name,
      brand: product.brand,
      price: product.price,
      priceNum,
      image: product.image,
    });
    toast.success(`${product.name} added to cart`, {
      description: `${product.brand} • ${product.price}`,
      action: {
        label: "View Cart",
        onClick: () => {
          navigate({ to: "/checkout" });
        },
      },
    });
  }

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative min-h-[320px] flex items-center overflow-hidden bg-card border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-0" />
        <div
          className="absolute right-0 top-0 w-1/2 h-full opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, oklch(0.72 0.2 35) 0, oklch(0.72 0.2 35) 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="font-display font-600 text-sm tracking-[0.3em] uppercase text-primary mb-4">
            Keep It Running
          </p>
          <h1 className="font-display font-900 text-5xl sm:text-6xl uppercase leading-none tracking-tight text-foreground mb-4">
            Bike <span className="text-gradient-orange">Maintenance</span>
          </h1>
          <p className="font-body text-lg text-muted-foreground max-w-lg leading-relaxed mb-6">
            Engine oils, chain lube, and tyres from the world's top brands —
            everything to keep your bike in peak condition.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-body">
            <Wrench className="w-4 h-4 text-primary" />
            <span>OEM-grade and aftermarket products available</span>
          </div>
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
            <span className="text-foreground">Maintenance</span>
          </nav>
        </div>
      </div>

      {/* Stats Bar */}
      <section className="bg-card border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-3 divide-x divide-border">
            <div className="text-center px-4">
              <p className="font-display font-900 text-3xl text-primary">
                {engineOils.length}
              </p>
              <p className="font-display text-xs tracking-widest uppercase text-muted-foreground mt-1">
                Engine Oils
              </p>
            </div>
            <div className="text-center px-4">
              <p className="font-display font-900 text-3xl text-primary">
                {chainLubes.length}
              </p>
              <p className="font-display text-xs tracking-widest uppercase text-muted-foreground mt-1">
                Chain Lubes
              </p>
            </div>
            <div className="text-center px-4">
              <p className="font-display font-900 text-3xl text-primary">
                {tyres.length}
              </p>
              <p className="font-display text-xs tracking-widest uppercase text-muted-foreground mt-1">
                Tyre Options
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Page Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="divide-y divide-border">
          <ProductSection
            label="Lubrication"
            heading="Engine Oils"
            products={engineOils}
            ocidSection="maintenance.oils.section"
            ocidItemPrefix="maintenance.oil.item"
            cols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
            showBadge={true}
            onAddToCart={handleAddToCart}
          />

          <ProductSection
            label="Drive Train Care"
            heading="Chain Lube"
            products={chainLubes}
            ocidSection="maintenance.lube.section"
            ocidItemPrefix="maintenance.lube.item"
            cols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            onAddToCart={handleAddToCart}
          />

          <ProductSection
            label="Grip & Safety"
            heading="Tyres"
            products={tyres}
            ocidSection="maintenance.tyres.section"
            ocidItemPrefix="maintenance.tyre.item"
            cols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            showBadge={true}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>

      {/* CTA */}
      <section className="bg-card/80 border-t border-border mt-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-3">
            Professional Service
          </p>
          <h2 className="font-display font-800 text-4xl uppercase tracking-tight text-foreground mb-4">
            Need Servicing Advice?
          </h2>
          <p className="text-muted-foreground font-body max-w-md mx-auto mb-8">
            Not sure which oil or tyre fits your bike? Our team can guide you to
            the right product for your model and riding conditions.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-700 tracking-widest uppercase rounded-sm shadow-glow"
          >
            <Link to="/contact" data-ocid="maintenance.primary_button">
              Contact Us
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
