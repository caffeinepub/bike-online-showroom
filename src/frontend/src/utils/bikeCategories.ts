export const BIKE_CATEGORIES = [
  "Sports Bikes",
  "Naked Sports Bikes",
  "Commuter Bikes",
  "Adventure Bikes",
] as const;

export type BikeCategory = (typeof BIKE_CATEGORIES)[number];

const CATEGORY_MAP: Record<BikeCategory, string[]> = {
  "Sports Bikes": [
    "Yamaha R15",
    "KTM RC 200",
    "Honda CBR 650R",
    "Kawasaki Ninja 300",
    "BMW S 1000 RR",
    "Suzuki Hayabusa",
  ],
  "Naked Sports Bikes": [
    "KTM Duke 390",
    "Bajaj Pulsar NS200",
    "Yamaha MT-15",
    "Honda Hornet 2.0",
    "BMW G 310 R",
    "Kawasaki Z900",
  ],
  "Commuter Bikes": [
    "Hero Splendor Plus",
    "TVS Raider 125",
    "TVS Apache RTR 160",
    "Suzuki Gixxer SF",
    "Royal Enfield Classic 350",
  ],
  "Adventure Bikes": [
    "Hero Xpulse 200",
    "Bajaj Dominar 400",
    "Royal Enfield Meteor 350",
    "Triumph Speed 400",
  ],
};

export function normalizeBikeCategory(bike: {
  name: string;
  category: string;
}): string {
  const lowerName = bike.name.toLowerCase();
  for (const [category, models] of Object.entries(CATEGORY_MAP)) {
    for (const model of models) {
      if (lowerName.includes(model.toLowerCase())) {
        return category;
      }
    }
  }
  return bike.category;
}
