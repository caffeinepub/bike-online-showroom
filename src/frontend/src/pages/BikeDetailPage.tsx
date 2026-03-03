import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Frame,
  Gauge,
  Palette,
  Phone,
  Weight,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { useGetBike } from "../hooks/useQueries";

const CATEGORY_IMAGES: Record<string, string> = {
  mountain: "/assets/generated/bike-mountain.dim_800x600.png",
  road: "/assets/generated/bike-road.dim_800x600.png",
  electric: "/assets/generated/bike-electric.dim_800x600.png",
  bmx: "/assets/generated/bike-bmx.dim_800x600.png",
};

function getPlaceholderImage(category: string): string {
  const key = category.toLowerCase();
  for (const [k, v] of Object.entries(CATEGORY_IMAGES)) {
    if (key.includes(k)) return v;
  }
  return "/assets/generated/bike-mountain.dim_800x600.png";
}

function formatPrice(price: bigint): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(price));
}

export default function BikeDetailPage() {
  const { bikeId } = useParams({ from: "/bikes/$bikeId" });
  const navigate = useNavigate();
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const bikeIdBigInt = bikeId ? BigInt(bikeId) : null;
  const { data: bike, isLoading, isError } = useGetBike(bikeIdBigInt);

  const photos = bike
    ? bike.photos.length > 0
      ? bike.photos
      : [getPlaceholderImage(bike.category)]
    : [];

  const prevPhoto = () =>
    setActivePhotoIndex((i) => (i - 1 + photos.length) % photos.length);
  const nextPhoto = () => setActivePhotoIndex((i) => (i + 1) % photos.length);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Skeleton className="h-6 w-32 bg-muted mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Skeleton className="aspect-[4/3] w-full bg-muted rounded-sm" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-24 bg-muted" />
            <Skeleton className="h-10 w-3/4 bg-muted" />
            <Skeleton className="h-8 w-32 bg-muted" />
            <Skeleton className="h-20 w-full bg-muted" />
            <Skeleton className="h-12 w-full bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !bike) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
        <h2 className="font-display font-700 text-2xl uppercase text-foreground mb-2">
          Bike Not Found
        </h2>
        <p className="text-muted-foreground font-body mb-6">
          This bike may no longer be available.
        </p>
        <Button
          onClick={() => navigate({ to: "/" })}
          className="bg-primary text-primary-foreground rounded-sm font-display tracking-wider uppercase"
        >
          Back to Catalog
        </Button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm font-body">
            <Link
              to="/"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Catalog
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">{bike.category}</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground font-medium">{bike.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Photo Gallery */}
          <div>
            {/* Main Photo */}
            <div className="relative aspect-[4/3] bg-muted rounded-sm overflow-hidden mb-3 group">
              <img
                src={photos[activePhotoIndex]}
                alt={`${bike.name} view ${activePhotoIndex + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = getPlaceholderImage(
                    bike.category,
                  );
                }}
              />
              {photos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevPhoto}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-background/80 backdrop-blur-sm rounded-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-5 h-5 text-foreground" />
                  </button>
                  <button
                    type="button"
                    onClick={nextPhoto}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-background/80 backdrop-blur-sm rounded-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
                    aria-label="Next"
                  >
                    <ChevronRight className="w-5 h-5 text-foreground" />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {photos.map((_, i) => (
                      <button
                        // biome-ignore lint/suspicious/noArrayIndexKey: photo order is stable
                        key={i}
                        type="button"
                        onClick={() => setActivePhotoIndex(i)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          i === activePhotoIndex
                            ? "bg-primary"
                            : "bg-foreground/40"
                        }`}
                        aria-label={`View ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {photos.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {photos.map((photo, i) => (
                  <button
                    // biome-ignore lint/suspicious/noArrayIndexKey: photo order is stable
                    key={i}
                    type="button"
                    onClick={() => setActivePhotoIndex(i)}
                    className={`flex-shrink-0 w-20 h-16 rounded-sm overflow-hidden border-2 transition-colors ${
                      i === activePhotoIndex
                        ? "border-primary"
                        : "border-border hover:border-muted-foreground"
                    }`}
                  >
                    <img
                      src={photo}
                      alt={`Thumbnail ${i + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          getPlaceholderImage(bike.category);
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bike Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge className="bg-primary text-primary-foreground font-display font-600 tracking-wider uppercase text-xs rounded-sm border-0">
                {bike.category}
              </Badge>
              {bike.engine && (
                <Badge
                  variant="outline"
                  className="border-border font-display font-600 tracking-wider uppercase text-xs rounded-sm"
                >
                  <Zap className="w-3 h-3 mr-1 text-primary" />
                  {bike.engine}
                </Badge>
              )}
            </div>

            <p className="font-display font-600 text-sm tracking-widest uppercase text-muted-foreground mb-1">
              {bike.brand}
            </p>
            <h1 className="font-display font-900 text-4xl sm:text-5xl uppercase tracking-tight text-foreground mb-4 leading-none">
              {bike.name}
            </h1>

            <div className="mb-6">
              <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-1">
                Starting Price
              </p>
              <p className="font-display font-900 text-4xl text-primary">
                {formatPrice(bike.price)}
              </p>
            </div>

            <p className="text-muted-foreground font-body leading-relaxed mb-8">
              {bike.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-700 tracking-widest uppercase rounded-sm shadow-glow flex-1"
              >
                <Link to="/contact" search={{ bikeId: bike.id.toString() }}>
                  <Phone className="w-4 h-4 mr-2" />
                  Inquire About This Bike
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-border font-display font-700 tracking-widest uppercase rounded-sm"
              >
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Link>
              </Button>
            </div>

            {/* Color Options */}
            {bike.colorOptions.length > 0 && (
              <div className="mb-6">
                <p className="font-display font-600 text-xs tracking-widest uppercase text-muted-foreground mb-2 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5" />
                  Available Colors
                </p>
                <div className="flex flex-wrap gap-2">
                  {bike.colorOptions.map((color) => (
                    <span
                      key={color}
                      className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-display tracking-wider uppercase rounded-sm border border-border"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Specifications */}
        {(bike.engine || bike.mileage || bike.weight || bike.frame) && (
          <section className="relative overflow-hidden rounded-sm">
            <img
              src="/assets/generated/section-bg.dim_1920x600.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
            <div className="relative bg-card/90 border border-border rounded-sm p-8">
              <h2 className="font-display font-800 text-2xl uppercase tracking-tight text-foreground mb-6 flex items-center gap-3">
                <span className="w-1 h-6 bg-primary rounded-full inline-block" />
                Specifications
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {bike.engine && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-display font-600 text-xs tracking-widest uppercase text-muted-foreground mb-1">
                        Engine
                      </p>
                      <p className="font-body text-foreground font-medium">
                        {bike.engine}
                      </p>
                    </div>
                  </div>
                )}
                {bike.mileage && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Gauge className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-display font-600 text-xs tracking-widest uppercase text-muted-foreground mb-1">
                        Mileage
                      </p>
                      <p className="font-body text-foreground font-medium">
                        {bike.mileage}
                      </p>
                    </div>
                  </div>
                )}
                {bike.weight && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Weight className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-display font-600 text-xs tracking-widest uppercase text-muted-foreground mb-1">
                        Weight
                      </p>
                      <p className="font-body text-foreground font-medium">
                        {Number(bike.weight)} kg
                      </p>
                    </div>
                  </div>
                )}
                {bike.frame && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Frame className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-display font-600 text-xs tracking-widest uppercase text-muted-foreground mb-1">
                        Frame
                      </p>
                      <p className="font-body text-foreground font-medium">
                        {bike.frame}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
