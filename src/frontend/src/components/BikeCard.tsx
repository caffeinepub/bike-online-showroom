import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Gauge, Zap } from "lucide-react";
import type { Bike } from "../backend";
import { normalizeBikeCategory } from "../utils/bikeCategories";

interface BikeCardProps {
  bike: Bike;
}

const CATEGORY_IMAGES: Record<string, string> = {
  "Sports Bikes": "/assets/generated/bike-road.dim_800x600.png",
  "Naked Sports Bikes": "/assets/generated/bike-bmx.dim_800x600.png",
  "Commuter Bikes": "/assets/generated/bike-mountain.dim_800x600.png",
  "Adventure Bikes": "/assets/generated/bike-electric.dim_800x600.png",
};

function getPlaceholderImage(bike: { name: string; category: string }): string {
  const normalized = normalizeBikeCategory(bike);
  return (
    CATEGORY_IMAGES[normalized] ??
    "/assets/generated/bike-mountain.dim_800x600.png"
  );
}

function formatPrice(price: bigint): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(price));
}

export default function BikeCard({ bike }: BikeCardProps) {
  const normalizedCategory = normalizeBikeCategory(bike);
  const imageUrl =
    bike.photos.length > 0 ? bike.photos[0] : getPlaceholderImage(bike);

  return (
    <Link
      to="/bikes/$bikeId"
      params={{ bikeId: bike.id.toString() }}
      className="group block h-full"
      data-ocid="catalog.card"
    >
      <article className="bg-card border border-border rounded-sm overflow-hidden card-hover h-full flex flex-col">
        {/* Image */}
        <div className="relative overflow-hidden aspect-[4/3] bg-muted">
          <img
            src={imageUrl}
            alt={bike.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = getPlaceholderImage(bike);
            }}
          />
          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <Badge className="bg-primary text-primary-foreground font-display font-600 tracking-wider uppercase text-xs rounded-sm border-0">
              {normalizedCategory}
            </Badge>
          </div>
          {/* Engine indicator */}
          {bike.engine && (
            <div className="absolute top-3 right-3">
              <div className="flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded-sm px-2 py-1">
                <Zap className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-display font-600 text-foreground">
                  {bike.engine}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <p className="text-muted-foreground text-xs font-display tracking-widest uppercase mb-1">
                {bike.brand}
              </p>
              <h3 className="font-display font-700 text-lg leading-tight text-foreground group-hover:text-primary transition-colors">
                {bike.name}
              </h3>
            </div>
          </div>

          <p className="text-muted-foreground text-sm font-body line-clamp-2 mb-3 flex-1">
            {bike.description}
          </p>

          {/* Specs row */}
          {(bike.engine || bike.mileage) && (
            <div className="flex items-center gap-3 mb-3 py-2 border-t border-border">
              {bike.engine && (
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Zap className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-body">{bike.engine}</span>
                </div>
              )}
              {bike.mileage && (
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Gauge className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-body">{bike.mileage}</span>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
            <div>
              <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-0.5">
                Starting at
              </p>
              <p className="font-display font-800 text-xl text-primary">
                {formatPrice(bike.price)}
              </p>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground group-hover:text-primary transition-colors">
              <span className="text-xs font-display tracking-wider uppercase">
                View
              </span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
