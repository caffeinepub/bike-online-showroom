# Specification

## Summary
**Goal:** Populate the MotoVerse Showroom bike catalog with three motorcycles (Yamaha R15, KTM Duke 390, Royal Enfield Classic 350) and display their engine capacity and mileage on bike cards and detail pages.

**Planned changes:**
- Seed the Motoko backend with three bikes if the catalog is empty: Yamaha R15 (₹1,80,000, 155cc, 40 km/l), KTM Duke 390 (₹3,10,000, 373cc, 28 km/l), and Royal Enfield Classic 350 (₹1,95,000, 349cc, 35 km/l), each with their respective Unsplash image URLs
- Update bike card and detail page components to display engine capacity and mileage fields alongside price
- Render each bike's image from the URL stored in the backend, replacing any placeholder images

**User-visible outcome:** The catalog page shows all three motorcycles with their photos, prices, engine sizes, and mileage figures; clicking a bike opens the detail page showing the same specs and photo.
