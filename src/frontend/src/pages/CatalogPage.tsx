import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { AlertCircle, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import BikeCard from "../components/BikeCard";
import BikeFilters, { type FilterState } from "../components/BikeFilters";
import { useGetAllBikes } from "../hooks/useQueries";
import {
  BIKE_CATEGORIES,
  normalizeBikeCategory,
} from "../utils/bikeCategories";

const MAX_PRICE = 2100000;

const ALL_CATEGORY_TABS = ["All", ...BIKE_CATEGORIES] as const;

export default function CatalogPage() {
  const { data: bikes, isLoading, isError } = useGetAllBikes();

  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "",
    brand: "",
    priceRange: [0, MAX_PRICE],
  });

  const categories = useMemo(() => {
    if (!bikes) return [];
    return [...new Set(bikes.map((b) => normalizeBikeCategory(b)))].sort();
  }, [bikes]);

  const brands = useMemo(() => {
    if (!bikes) return [];
    return [...new Set(bikes.map((b) => b.brand))].sort();
  }, [bikes]);

  const filteredBikes = useMemo(() => {
    if (!bikes) return [];
    return bikes.filter((bike) => {
      if (
        filters.search &&
        !bike.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !bike.brand.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }
      if (
        filters.category &&
        normalizeBikeCategory(bike) !== filters.category
      ) {
        return false;
      }
      if (filters.brand && bike.brand !== filters.brand) return false;
      const [minPrice, maxPrice] = filters.priceRange;
      if (Number(bike.price) < minPrice || Number(bike.price) > maxPrice) {
        return false;
      }
      return true;
    });
  }, [bikes, filters]);

  const handleCategoryTab = (tab: string) => {
    setFilters((prev) => ({
      ...prev,
      category: tab === "All" ? "" : tab,
    }));
  };

  const activeTab = filters.category === "" ? "All" : filters.category;

  const headingLabel = filters.category === "" ? "All Bikes" : filters.category;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[520px] flex items-center overflow-hidden">
        <img
          src="/assets/generated/hero-banner.dim_1920x800.png"
          alt="Hero banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl animate-fade-in">
            <p className="font-display font-600 text-sm tracking-[0.3em] uppercase text-primary mb-4">
              Premium Bike Showroom
            </p>
            <h1 className="font-display font-900 text-5xl sm:text-6xl lg:text-7xl uppercase leading-none tracking-tight text-foreground mb-6">
              Ride Your
              <br />
              <span className="text-gradient-orange">Legend</span>
            </h1>
            <p className="font-body text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
              Discover our curated collection of world-class bikes. From
              mountain trails to city streets — find your perfect ride.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-700 tracking-widest uppercase rounded-sm shadow-glow"
              >
                <a href="#catalog">
                  Browse Collection
                  <ChevronRight className="w-5 h-5 ml-1" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-border text-foreground hover:bg-secondary font-display font-700 tracking-widest uppercase rounded-sm"
              >
                <Link to="/contact">Get In Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-card border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-3 divide-x divide-border">
            <div className="text-center px-4">
              <p className="font-display font-900 text-3xl text-primary">
                {bikes?.length ?? "—"}
              </p>
              <p className="font-display text-xs tracking-widest uppercase text-muted-foreground mt-1">
                Models
              </p>
            </div>
            <div className="text-center px-4">
              <p className="font-display font-900 text-3xl text-primary">
                {brands.length || "—"}
              </p>
              <p className="font-display text-xs tracking-widest uppercase text-muted-foreground mt-1">
                Brands
              </p>
            </div>
            <div className="text-center px-4">
              <p className="font-display font-900 text-3xl text-primary">
                {categories.length || "—"}
              </p>
              <p className="font-display text-xs tracking-widest uppercase text-muted-foreground mt-1">
                Categories
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section
        id="catalog"
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-2">
              Our Collection
            </p>
            <h2 className="font-display font-800 text-4xl uppercase tracking-tight text-foreground">
              {headingLabel}
            </h2>
          </div>
          {!isLoading && (
            <p className="text-muted-foreground text-sm font-body">
              {filteredBikes.length}{" "}
              {filteredBikes.length === 1 ? "bike" : "bikes"} found
            </p>
          )}
        </div>

        {/* Category Tabs */}
        <div className="mb-6 -mx-1">
          <div className="flex gap-2 overflow-x-auto pb-2 px-1 scrollbar-hide snap-x">
            {ALL_CATEGORY_TABS.map((tab, i) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  data-ocid={`catalog.category.tab.${i + 1}`}
                  onClick={() => handleCategoryTab(tab)}
                  className={[
                    "flex-shrink-0 snap-start px-4 py-2 rounded-sm text-sm font-display font-600 tracking-widest uppercase border transition-all duration-200 whitespace-nowrap",
                    isActive
                      ? "bg-primary text-primary-foreground border-primary shadow-glow"
                      : "bg-card text-muted-foreground border-border hover:border-primary hover:text-foreground",
                  ].join(" ")}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <BikeFilters
            filters={filters}
            onFiltersChange={setFilters}
            categories={categories}
            brands={brands}
          />
        </div>

        {/* Error State */}
        {isError && (
          <div
            className="flex flex-col items-center justify-center py-20 text-center"
            data-ocid="catalog.error_state"
          >
            <AlertCircle className="w-12 h-12 text-destructive mb-4" />
            <h3 className="font-display font-700 text-xl uppercase text-foreground mb-2">
              Failed to Load Bikes
            </h3>
            <p className="text-muted-foreground font-body">
              Please try refreshing the page.
            </p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            data-ocid="catalog.loading_state"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
                key={i}
                className="bg-card border border-border rounded-sm overflow-hidden"
              >
                <Skeleton className="aspect-[4/3] w-full bg-muted" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-3 w-20 bg-muted" />
                  <Skeleton className="h-5 w-3/4 bg-muted" />
                  <Skeleton className="h-4 w-full bg-muted" />
                  <Skeleton className="h-4 w-2/3 bg-muted" />
                  <div className="pt-2 border-t border-border">
                    <Skeleton className="h-6 w-24 bg-muted" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && filteredBikes.length === 0 && (
          <div
            className="flex flex-col items-center justify-center py-20 text-center"
            data-ocid="catalog.empty_state"
          >
            <div className="w-16 h-16 bg-muted rounded-sm flex items-center justify-center mb-4">
              <span className="text-3xl">🚲</span>
            </div>
            <h3 className="font-display font-700 text-xl uppercase text-foreground mb-2">
              {bikes && bikes.length > 0
                ? "No Bikes Match Your Filters"
                : "No Bikes Available"}
            </h3>
            <p className="text-muted-foreground font-body mb-6">
              {bikes && bikes.length > 0
                ? "Try adjusting your search or filter criteria."
                : "Check back soon for our latest collection."}
            </p>
            {bikes && bikes.length > 0 && (
              <Button
                onClick={() =>
                  setFilters({
                    search: "",
                    category: "",
                    brand: "",
                    priceRange: [0, MAX_PRICE],
                  })
                }
                variant="outline"
                className="border-border font-display tracking-wider uppercase rounded-sm"
                data-ocid="catalog.secondary_button"
              >
                Clear Filters
              </Button>
            )}
          </div>
        )}

        {/* Bike Grid */}
        {!isLoading && !isError && filteredBikes.length > 0 && (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            data-ocid="catalog.list"
          >
            {filteredBikes.map((bike, idx) => (
              <div
                key={bike.id.toString()}
                data-ocid={`catalog.item.${idx + 1}`}
              >
                <BikeCard bike={bike} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden mt-8">
        <img
          src="/assets/generated/section-bg.dim_1920x600.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative bg-card/80 border-y border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-3">
              Ready to Ride?
            </p>
            <h2 className="font-display font-800 text-4xl sm:text-5xl uppercase tracking-tight text-foreground mb-4">
              Found Your Dream Bike?
            </h2>
            <p className="text-muted-foreground font-body max-w-md mx-auto mb-8">
              Submit an inquiry and our team will get back to you with pricing,
              availability, and test ride options.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-700 tracking-widest uppercase rounded-sm shadow-glow"
            >
              <Link to="/contact">Submit an Inquiry</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
