import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronRight, Heart, ShieldCheck, ShoppingCart } from "lucide-react";
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
  specs: Spec[];
  inStock: boolean;
  stockQty?: number;
}

const helmets: Product[] = [
  {
    id: 1,
    name: "SBH-40 Full Face",
    brand: "Steelbird",
    price: "₹2,499",
    detail: "ISI Certified • Aerodynamic Shell",
    image: "/assets/generated/helmet-steelbird-sbh40.dim_400x300.jpg",
    inStock: true,
    stockQty: 18,
    specs: [
      { label: "Type", value: "Full Face" },
      { label: "Shell", value: "ABS Plastic" },
      { label: "Sizes", value: "S / M / L / XL" },
      { label: "Certification", value: "ISI (IS:4151)" },
      { label: "Visor", value: "Clear, Anti-Scratch" },
      { label: "Weight", value: "~1.2 kg" },
    ],
  },
  {
    id: 2,
    name: "Edge DX Full Face",
    brand: "Vega",
    price: "₹3,199",
    detail: "ABS Shell • Anti-Scratch Visor",
    image: "/assets/generated/helmet-vega-edge-dx.dim_400x300.jpg",
    inStock: true,
    stockQty: 12,
    specs: [
      { label: "Type", value: "Full Face" },
      { label: "Shell", value: "ABS Plastic" },
      { label: "Sizes", value: "S / M / L / XL / XXL" },
      { label: "Certification", value: "ISI Mark" },
      { label: "Visor", value: "Anti-Scratch, UV Coated" },
      { label: "Weight", value: "~1.3 kg" },
    ],
  },
  {
    id: 3,
    name: "FF320 Street Fighter",
    brand: "LS2",
    price: "₹8,499",
    detail: "Thermoplastic Alloy • DOT Certified",
    image: "/assets/generated/helmet-ls2-ff320.dim_400x300.jpg",
    inStock: true,
    stockQty: 7,
    specs: [
      { label: "Type", value: "Full Face" },
      { label: "Shell", value: "Kinetic Polymer Alloy" },
      { label: "Sizes", value: "XS / S / M / L / XL / XXL" },
      { label: "Certification", value: "DOT / ECE 22.06" },
      { label: "Visor", value: "Pinlock Ready" },
      { label: "Weight", value: "~1.35 kg" },
    ],
  },
  {
    id: 4,
    name: "K6 S ECE 22.06",
    brand: "AGV",
    price: "₹28,999",
    detail: "Carbon Fibre Shell • MIPS Ready",
    image: "/assets/generated/helmet-agv-k6s.dim_400x300.jpg",
    inStock: false,
    specs: [
      { label: "Type", value: "Full Face" },
      { label: "Shell", value: "Carbon Fibre Composite" },
      { label: "Sizes", value: "XS / S / MS / ML / L / XL / XXL" },
      { label: "Certification", value: "ECE 22.06 / DOT" },
      { label: "Visor", value: "Iridium, Pinlock 120 Ready" },
      { label: "Weight", value: "~1.08 kg" },
    ],
  },
  {
    id: 5,
    name: "Streetfighter S Svs",
    brand: "MT Helmets",
    price: "₹11,499",
    detail: "Fiberglass Shell • Quick Release",
    image: "/assets/generated/helmet-mt-streetfighter.dim_400x300.jpg",
    inStock: true,
    stockQty: 5,
    specs: [
      { label: "Type", value: "Full Face" },
      { label: "Shell", value: "Fiberglass" },
      { label: "Sizes", value: "S / M / L / XL / XXL" },
      { label: "Certification", value: "ECE 22.06" },
      { label: "Visor", value: "Quick Release, Pinlock Ready" },
      { label: "Weight", value: "~1.25 kg" },
    ],
  },
  {
    id: 6,
    name: "Elite Pro II",
    brand: "Studds",
    price: "₹1,799",
    detail: "High Impact Polycarbonate",
    image: "/assets/generated/helmet-studds-elite-pro.dim_400x300.jpg",
    inStock: true,
    stockQty: 22,
    specs: [
      { label: "Type", value: "Full Face" },
      { label: "Shell", value: "High Impact Polycarbonate" },
      { label: "Sizes", value: "S / M / L / XL" },
      { label: "Certification", value: "ISI (IS:4151)" },
      { label: "Visor", value: "Clear" },
      { label: "Weight", value: "~1.4 kg" },
    ],
  },
  {
    id: 7,
    name: "Thunder D5 Decor",
    brand: "Steelbird",
    price: "₹1,899",
    detail: "Open Face • UV Protection Visor",
    image: "/assets/generated/helmet-steelbird-thunder.dim_400x300.jpg",
    inStock: true,
    stockQty: 15,
    specs: [
      { label: "Type", value: "Open Face" },
      { label: "Shell", value: "ABS Plastic" },
      { label: "Sizes", value: "S / M / L / XL" },
      { label: "Certification", value: "ISI Mark" },
      { label: "Visor", value: "UV Protection, Smoke Tinted" },
      { label: "Weight", value: "~1.1 kg" },
    ],
  },
  {
    id: 8,
    name: "Viper Half Face",
    brand: "Vega",
    price: "₹2,199",
    detail: "Half Face • ISI Mark • Ventilated",
    image: "/assets/generated/helmet-vega-viper.dim_400x300.jpg",
    inStock: true,
    stockQty: 10,
    specs: [
      { label: "Type", value: "Half Face" },
      { label: "Shell", value: "ABS Plastic" },
      { label: "Sizes", value: "S / M / L / XL" },
      { label: "Certification", value: "ISI (IS:4151)" },
      { label: "Ventilation", value: "Top & Rear Vents" },
      { label: "Weight", value: "~0.9 kg" },
    ],
  },
];

const ridingGloves: Product[] = [
  {
    id: 1,
    name: "Urban Riding Gloves",
    brand: "Cramster",
    price: "₹899",
    detail: "Knuckle Protection • Mesh Back",
    image: "/assets/generated/gloves-cramster-urban.dim_400x300.jpg",
    inStock: true,
    stockQty: 30,
    specs: [
      { label: "Material", value: "Mesh + Microfiber" },
      { label: "Sizes", value: "S / M / L / XL / XXL" },
      { label: "Knuckles", value: "Hard Shell Protectors" },
      { label: "Palm", value: "Synthetic Leather" },
      { label: "Closure", value: "Velcro Wrist Strap" },
      { label: "Best For", value: "Daily City Riding" },
    ],
  },
  {
    id: 2,
    name: "Techbridge Gloves",
    brand: "Alpinestars",
    price: "₹4,499",
    detail: "3D Knit Palm • TPR Protectors",
    image: "/assets/generated/gloves-alpinestars-techbridge.dim_400x300.jpg",
    inStock: true,
    stockQty: 8,
    specs: [
      { label: "Material", value: "3D Knit + Leather" },
      { label: "Sizes", value: "S / M / L / XL / 2XL" },
      { label: "Knuckles", value: "TPR Hard Protectors" },
      { label: "Palm", value: "Clarino Synthetic Palm" },
      { label: "Closure", value: "Stretch Wrist Band" },
      { label: "Best For", value: "Sport & Touring" },
    ],
  },
  {
    id: 3,
    name: "Ranger Gloves",
    brand: "Fox Racing",
    price: "₹3,299",
    detail: "Clarino Palm • D30 Knuckles",
    image: "/assets/generated/gloves-fox-ranger.dim_400x300.jpg",
    inStock: false,
    specs: [
      { label: "Material", value: "Clarino Synthetic" },
      { label: "Sizes", value: "S / M / L / XL / XXL" },
      { label: "Knuckles", value: "D30 Smart Foam" },
      { label: "Palm", value: "Clarino Leather" },
      { label: "Closure", value: "Cuff & Wrist Velcro" },
      { label: "Best For", value: "Off-Road / Adventure" },
    ],
  },
  {
    id: 4,
    name: "Cruise Riding Gloves",
    brand: "Bikerz",
    price: "₹749",
    detail: "Breathable Mesh • Velcro Wrist",
    image: "/assets/generated/gloves-bikerz-cruise.dim_400x300.jpg",
    inStock: true,
    stockQty: 25,
    specs: [
      { label: "Material", value: "Breathable Mesh" },
      { label: "Sizes", value: "S / M / L / XL" },
      { label: "Knuckles", value: "Hard Knuckle Guard" },
      { label: "Palm", value: "Padded Synthetic" },
      { label: "Closure", value: "Velcro Wrist" },
      { label: "Best For", value: "Commuting" },
    ],
  },
  {
    id: 5,
    name: "Track Leather Gloves",
    brand: "Cramster",
    price: "₹1,799",
    detail: "Full Leather • Carbon Knuckles",
    image: "/assets/generated/gloves-cramster-track.dim_400x300.jpg",
    inStock: true,
    stockQty: 14,
    specs: [
      { label: "Material", value: "Full Grain Leather" },
      { label: "Sizes", value: "S / M / L / XL / XXL" },
      { label: "Knuckles", value: "Carbon Fibre Insert" },
      { label: "Palm", value: "Kangaroo Leather Palm" },
      { label: "Closure", value: "Lace-Up + Velcro" },
      { label: "Best For", value: "Track / Sport" },
    ],
  },
  {
    id: 6,
    name: "SP1 Short Gloves",
    brand: "Alpinestars",
    price: "₹6,999",
    detail: "Goatskin Palm • GEL Inserts",
    image: "/assets/generated/gloves-alpinestars-sp1.dim_400x300.jpg",
    inStock: true,
    stockQty: 4,
    specs: [
      { label: "Material", value: "Goatskin Leather" },
      { label: "Sizes", value: "S / M / L / XL / 2XL / 3XL" },
      { label: "Knuckles", value: "Hard Composite Shell" },
      { label: "Palm", value: "GEL Foam Inserts" },
      { label: "Closure", value: "Single Strap Wrist" },
      { label: "Best For", value: "Sport / Race" },
    ],
  },
];

const steeringGuards: Product[] = [
  {
    id: 1,
    name: "Pro Handlebar Guard Set",
    brand: "R2M",
    price: "₹2,199",
    detail: "Universal Fit • ABS Plastic",
    image: "/assets/generated/guard-r2m-pro.dim_400x300.jpg",
    inStock: true,
    stockQty: 20,
    specs: [
      { label: "Material", value: "ABS Plastic" },
      { label: "Bar Fit", value: "22 mm – 28 mm" },
      { label: "Mount", value: "Bolt-On, Universal" },
      { label: "Color", value: "Black" },
      { label: "Weight", value: "~320 g (pair)" },
      { label: "Best For", value: "Street / Commuter" },
    ],
  },
  {
    id: 2,
    name: "Expedition Hand Guard",
    brand: "Enduristan",
    price: "₹4,499",
    detail: "Polycarbonate Shell • Steel Core",
    image: "/assets/generated/guard-enduristan.dim_400x300.jpg",
    inStock: true,
    stockQty: 9,
    specs: [
      { label: "Material", value: "Polycarbonate + Steel" },
      { label: "Bar Fit", value: "22 mm – 28 mm" },
      { label: "Mount", value: "Clamp + End Cap" },
      { label: "Color", value: "Black / Orange" },
      { label: "Weight", value: "~480 g (pair)" },
      { label: "Best For", value: "Adventure / Offroad" },
    ],
  },
  {
    id: 3,
    name: "Adventure Guard Kit",
    brand: "Touratech",
    price: "₹8,999",
    detail: "Aluminium Bar • Neoprene Grip",
    image: "/assets/generated/guard-touratech.dim_400x300.jpg",
    inStock: false,
    specs: [
      { label: "Material", value: "Aluminium + Neoprene" },
      { label: "Bar Fit", value: "22 mm" },
      { label: "Mount", value: "Full-Length Aluminium Rail" },
      { label: "Color", value: "Silver / Black" },
      { label: "Weight", value: "~620 g (pair)" },
      { label: "Best For", value: "Long-Distance Adventure" },
    ],
  },
  {
    id: 4,
    name: "Street Guard Universal",
    brand: "R2M",
    price: "₹1,899",
    detail: "Universal Fit • 22-28mm Bar",
    image: "/assets/generated/guard-r2m-street.dim_400x300.jpg",
    inStock: true,
    stockQty: 17,
    specs: [
      { label: "Material", value: "ABS Plastic" },
      { label: "Bar Fit", value: "22 mm – 28 mm" },
      { label: "Mount", value: "Bolt-On, Universal" },
      { label: "Color", value: "Black / Red" },
      { label: "Weight", value: "~290 g (pair)" },
      { label: "Best For", value: "City / Street" },
    ],
  },
];

const bikeStickers: Product[] = [
  {
    id: 1,
    name: "Tribal Flame Pack",
    brand: "Decal Co.",
    price: "₹299",
    detail: "20 Stickers • Waterproof Vinyl",
    image: "/assets/generated/sticker-tribal-flame.dim_400x300.jpg",
    inStock: true,
    stockQty: 50,
    specs: [
      { label: "Material", value: "Waterproof Vinyl" },
      { label: "Pieces", value: "20 Stickers" },
      { label: "Size", value: "5 cm – 25 cm (varied)" },
      { label: "Finish", value: "Glossy" },
      { label: "Adhesive", value: "Permanent, Weather-Proof" },
      { label: "Best For", value: "Tank / Fairing / Fender" },
    ],
  },
  {
    id: 2,
    name: "Racing Stripes Kit",
    brand: "MotoDecals",
    price: "₹499",
    detail: "Full Length • UV Resistant",
    image: "/assets/generated/sticker-racing-stripes.dim_400x300.jpg",
    inStock: true,
    stockQty: 35,
    specs: [
      { label: "Material", value: "Cast Vinyl" },
      { label: "Pieces", value: "2 Full-Length Strips" },
      { label: "Size", value: "2 m × 5 cm each" },
      { label: "Finish", value: "Matte / Gloss (choice)" },
      { label: "Adhesive", value: "UV & Heat Resistant" },
      { label: "Best For", value: "Tank / Body Panel" },
    ],
  },
  {
    id: 3,
    name: "Custom Name Decals",
    brand: "VinylWorld",
    price: "₹199",
    detail: "Custom Text • Any Color",
    image: "/assets/generated/sticker-custom-name.dim_400x300.jpg",
    inStock: true,
    stockQty: 100,
    specs: [
      { label: "Material", value: "Calendered Vinyl" },
      { label: "Pieces", value: "1 Custom Text Decal" },
      { label: "Size", value: "Up to 30 cm wide" },
      { label: "Finish", value: "Glossy / Matte" },
      { label: "Adhesive", value: "Repositionable then Permanent" },
      { label: "Best For", value: "Personalised Branding" },
    ],
  },
  {
    id: 4,
    name: "Skull & Crossbones Pack",
    brand: "Decal Co.",
    price: "₹349",
    detail: "15 Stickers • Die-Cut Vinyl",
    image: "/assets/generated/sticker-skull-pack.dim_400x300.jpg",
    inStock: true,
    stockQty: 40,
    specs: [
      { label: "Material", value: "Die-Cut Vinyl" },
      { label: "Pieces", value: "15 Stickers" },
      { label: "Size", value: "3 cm – 15 cm (varied)" },
      { label: "Finish", value: "Glossy Black" },
      { label: "Adhesive", value: "Permanent, Waterproof" },
      { label: "Best For", value: "Tank / Helmet / Fairing" },
    ],
  },
  {
    id: 5,
    name: "Superbike Replica Decals",
    brand: "MotoDecals",
    price: "₹799",
    detail: "Brand Replica • OEM Quality",
    image: "/assets/generated/sticker-superbike-replica.dim_400x300.jpg",
    inStock: false,
    specs: [
      { label: "Material", value: "High-Tack Cast Vinyl" },
      { label: "Pieces", value: "Full Kit (8–12 pieces)" },
      { label: "Size", value: "Model-Specific" },
      { label: "Finish", value: "OEM Gloss" },
      { label: "Adhesive", value: "Permanent, Heat-Proof" },
      { label: "Best For", value: "Full Fairing Restoration" },
    ],
  },
  {
    id: 6,
    name: "Glow-in-Dark Sticker Set",
    brand: "NightRide",
    price: "₹599",
    detail: "Photoluminescent • 12 Pieces",
    image: "/assets/generated/sticker-glow-dark.dim_400x300.jpg",
    inStock: true,
    stockQty: 28,
    specs: [
      { label: "Material", value: "Photoluminescent Vinyl" },
      { label: "Pieces", value: "12 Stickers" },
      { label: "Size", value: "4 cm – 12 cm (varied)" },
      { label: "Finish", value: "Glow-in-Dark" },
      { label: "Adhesive", value: "Weather-Resistant Adhesive" },
      { label: "Best For", value: "Night Visibility / Safety" },
    ],
  },
];

interface ProductCardProps {
  product: Product;
  ocidPrefix: string;
  index: number;
  sectionId: string;
  onAddToCart: (product: Product) => void;
}

function ProductCard({
  product,
  ocidPrefix,
  index,
  sectionId,
  onAddToCart,
}: ProductCardProps) {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlistId = `acc-${product.brand.toLowerCase().replace(/\s+/g, "-")}-${product.id}`;
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
        {/* Wishlist heart button */}
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
              type: "accessory",
            })
          }
          className={`absolute top-2 right-2 z-10 w-8 h-8 rounded-sm flex items-center justify-center transition-all duration-200 hover:scale-110 ${
            wishlisted
              ? "bg-red-500/20 border border-red-500/40 text-red-500"
              : "bg-background/80 backdrop-blur-sm border border-border/60 text-muted-foreground hover:text-red-500 hover:border-red-500/40 hover:bg-red-500/10"
          }`}
          aria-label={
            wishlisted
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          data-ocid={`${sectionId}.${index}.toggle`}
        >
          <Heart
            className={`w-4 h-4 transition-all duration-200 ${wishlisted ? "fill-current text-red-500" : ""}`}
          />
        </button>
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
              data-ocid={`${sectionId}.${index}.button`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              Add to Cart
            </Button>
          ) : (
            <Button
              size="sm"
              disabled
              className="bg-muted text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed font-display font-700 tracking-widest uppercase text-xs rounded-sm h-8 px-3"
              data-ocid={`${sectionId}.${index}.button`}
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
  onAddToCart: (product: Product) => void;
}

function ProductSection({
  label,
  heading,
  products,
  ocidSection,
  ocidItemPrefix,
  cols = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
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
            sectionId={ocidItemPrefix}
            index={idx + 1}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
}

export default function AccessoriesPage() {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  function handleAddToCart(product: Product) {
    const priceNum =
      Number.parseFloat(product.price.replace(/[₹,\s]/g, "")) || 0;
    addToCart({
      id: `acc-${product.brand.toLowerCase().replace(/\s+/g, "-")}-${product.id}`,
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
              "repeating-linear-gradient(45deg, oklch(0.72 0.2 35) 0, oklch(0.72 0.2 35) 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="font-display font-600 text-sm tracking-[0.3em] uppercase text-primary mb-4">
            Gear Up Right
          </p>
          <h1 className="font-display font-900 text-5xl sm:text-6xl uppercase leading-none tracking-tight text-foreground mb-4">
            Bike <span className="text-gradient-orange">Accessories</span>
          </h1>
          <p className="font-body text-lg text-muted-foreground max-w-lg leading-relaxed mb-6">
            Helmets, riding gloves, steering guards, and stickers — everything
            to complete your ride in style and safety.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-body">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>ISI & DOT certified safety gear available</span>
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
            <span className="text-foreground">Accessories</span>
          </nav>
        </div>
      </div>

      {/* Page Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="divide-y divide-border">
          <ProductSection
            label="Head Protection"
            heading="Helmets"
            products={helmets}
            ocidSection="accessories.helmets.section"
            ocidItemPrefix="accessories.helmet.item"
            onAddToCart={handleAddToCart}
          />

          <ProductSection
            label="Hand Protection"
            heading="Riding Gloves"
            products={ridingGloves}
            ocidSection="accessories.gloves.section"
            ocidItemPrefix="accessories.glove.item"
            cols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            onAddToCart={handleAddToCart}
          />

          <ProductSection
            label="Handlebar Safety"
            heading="Steering Guards"
            products={steeringGuards}
            ocidSection="accessories.guards.section"
            ocidItemPrefix="accessories.guard.item"
            cols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            onAddToCart={handleAddToCart}
          />

          <ProductSection
            label="Personalize Your Ride"
            heading="Bike Stickers"
            products={bikeStickers}
            ocidSection="accessories.stickers.section"
            ocidItemPrefix="accessories.sticker.item"
            cols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>

      {/* CTA */}
      <section className="bg-card/80 border-t border-border mt-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-3">
            Need Help Choosing?
          </p>
          <h2 className="font-display font-800 text-4xl uppercase tracking-tight text-foreground mb-4">
            Talk to Our Experts
          </h2>
          <p className="text-muted-foreground font-body max-w-md mx-auto mb-8">
            Not sure which gear suits your riding style? Contact us and we'll
            help you find the perfect accessories.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-700 tracking-widest uppercase rounded-sm shadow-glow"
          >
            <Link to="/contact" data-ocid="accessories.primary_button">
              Contact Us
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
