import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, SlidersHorizontal, X } from "lucide-react";

export interface FilterState {
  search: string;
  category: string;
  brand: string;
  priceRange: [number, number];
}

interface BikeFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  categories: string[];
  brands: string[];
}

const MAX_PRICE = 2100000;

const PRICE_PRESETS = [
  { label: "All Prices", min: 0, max: MAX_PRICE },
  { label: "Under ₹1L", min: 0, max: 100000 },
  { label: "₹1L – ₹3L", min: 100000, max: 300000 },
  { label: "₹3L – ₹10L", min: 300000, max: 1000000 },
  { label: "Above ₹10L", min: 1000000, max: MAX_PRICE },
] as const;

function formatINR(value: number): string {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(0)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
  return `₹${value}`;
}

function formatINRFull(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function BikeFilters({
  filters,
  onFiltersChange,
  categories,
  brands,
}: BikeFiltersProps) {
  const [minPrice, maxPrice] = filters.priceRange;

  const isDefaultPrice = minPrice === 0 && maxPrice === MAX_PRICE;

  const hasActiveFilters =
    filters.search !== "" ||
    filters.category !== "" ||
    filters.brand !== "" ||
    !isDefaultPrice;

  const update = (key: keyof FilterState, value: FilterState[typeof key]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const reset = () => {
    onFiltersChange({
      search: "",
      category: "",
      brand: "",
      priceRange: [0, MAX_PRICE],
    });
  };

  const getActivePresetIndex = (): number => {
    for (let i = 0; i < PRICE_PRESETS.length; i++) {
      const p = PRICE_PRESETS[i];
      if (minPrice === p.min && maxPrice === p.max) return i;
    }
    return -1;
  };

  const activePreset = getActivePresetIndex();

  return (
    <div className="bg-card border border-border rounded-sm p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="w-4 h-4 text-primary" />
        <h2 className="font-display font-700 text-sm tracking-widest uppercase text-foreground">
          Filter Bikes
        </h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={reset}
            className="ml-auto text-muted-foreground hover:text-foreground h-7 px-2 text-xs font-display tracking-wider uppercase"
          >
            <X className="w-3 h-3 mr-1" />
            Reset
          </Button>
        )}
      </div>

      {/* Row 1: Search + Category + Brand */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Search */}
        <div className="lg:col-span-2">
          <Label className="text-xs font-display tracking-widest uppercase text-muted-foreground mb-1.5 block">
            Search
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search bikes..."
              value={filters.search}
              onChange={(e) => update("search", e.target.value)}
              className="pl-9 bg-background border-border rounded-sm font-body text-sm"
              data-ocid="filters.search_input"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <Label className="text-xs font-display tracking-widest uppercase text-muted-foreground mb-1.5 block">
            Category
          </Label>
          <Select
            value={filters.category}
            onValueChange={(v) => update("category", v === "all" ? "" : v)}
          >
            <SelectTrigger
              className="bg-background border-border rounded-sm font-body text-sm"
              data-ocid="filters.category.select"
            >
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border rounded-sm">
              <SelectItem value="all" className="font-body">
                All Categories
              </SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat} className="font-body">
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Brand */}
        <div>
          <Label className="text-xs font-display tracking-widest uppercase text-muted-foreground mb-1.5 block">
            Brand
          </Label>
          <Select
            value={filters.brand}
            onValueChange={(v) => update("brand", v === "all" ? "" : v)}
          >
            <SelectTrigger
              className="bg-background border-border rounded-sm font-body text-sm"
              data-ocid="filters.brand.select"
            >
              <SelectValue placeholder="All Brands" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border rounded-sm">
              <SelectItem value="all" className="font-body">
                All Brands
              </SelectItem>
              {brands.map((brand) => (
                <SelectItem key={brand} value={brand} className="font-body">
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Row 2: Price Range Slider */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <Label className="text-xs font-display tracking-widest uppercase text-muted-foreground">
            Price Range
          </Label>
          <span className="text-sm font-display font-600 text-primary">
            {formatINRFull(minPrice)} – {formatINRFull(maxPrice)}
          </span>
        </div>

        <div className="px-1 mb-4">
          <Slider
            min={0}
            max={MAX_PRICE}
            step={25000}
            value={[minPrice, maxPrice]}
            onValueChange={(val) =>
              update("priceRange", [val[0], val[1]] as [number, number])
            }
            className="w-full"
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-muted-foreground font-body">₹0</span>
            <span className="text-xs text-muted-foreground font-body">
              {formatINR(MAX_PRICE)}
            </span>
          </div>
        </div>

        {/* Quick preset chips */}
        <div className="flex flex-wrap gap-2">
          {PRICE_PRESETS.map((preset, i) => {
            const isActive = activePreset === i;
            return (
              <button
                key={preset.label}
                type="button"
                data-ocid={`filters.price.toggle.${i + 1}`}
                onClick={() => update("priceRange", [preset.min, preset.max])}
                className={[
                  "px-3 py-1.5 rounded-sm text-xs font-display font-600 tracking-wider uppercase border transition-all duration-150",
                  isActive
                    ? "bg-primary text-primary-foreground border-primary shadow-glow"
                    : "bg-background text-muted-foreground border-border hover:border-primary hover:text-foreground",
                ].join(" ")}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
