# Bike Online Showroom

## Current State
The app has a full navbar with cart, wishlist, sign in/sign up, and logout buttons. When a user is logged in, only their first name and a separate logout button are shown in the desktop nav. There is no profile dropdown or dedicated profile section.

## Requested Changes (Diff)

### Add
- A profile icon/avatar button next to the hamburger menu (mobile) and in the desktop nav (next to the three-line menu area on mobile, or as a dedicated icon on desktop).
- A profile dropdown panel that opens when the user clicks their name/avatar. The panel shows:
  - User's full name and email at the top
  - Order History link (navigates to `/profile/orders`)
  - Wishlist link (navigates to `/wishlist`)
  - My Cart link (navigates to `/checkout`)
  - Logout button with a logout icon
- A new `/profile/orders` page that shows the user's order history (orders stored in localStorage after checkout).
- On mobile: the profile icon sits right next to (left of) the hamburger three-line menu icon.

### Modify
- Layout.tsx: Replace the standalone user name + logout button with a profile avatar button that opens the dropdown panel.
- OrderSuccessPage / CheckoutPage: Save completed orders to localStorage under a key per user so order history is available.
- The mobile nav should also reflect the profile dropdown instead of showing auth links inline.

### Remove
- The separate standalone logout button from the desktop nav (moved into profile dropdown).
- The separate standalone user name display (moved into profile dropdown header).

## Implementation Plan
1. Create `OrderHistoryContext` or use localStorage directly to store and retrieve orders per user (key: `motoverse_orders_<email>`).
2. Update `CheckoutPage` / `OrderSuccessPage` to save order details to localStorage on successful order.
3. Create `ProfileDropdown` component — a popover/dropdown that contains: name+email header, Order History link, Wishlist link, My Cart link, Logout button.
4. Update `Layout.tsx`:
   - Desktop: Replace user name + logout section with a single profile avatar/icon button that toggles `ProfileDropdown`.
   - Mobile: Add profile icon button immediately left of the hamburger button; clicking it opens the profile dropdown (or navigates to profile links inline).
5. Create `/profile/orders` page (`ProfileOrdersPage.tsx`) that reads orders from localStorage and lists them in reverse-chronological order with order number, date, items, and total.
6. Add route for `/profile/orders` in `App.tsx`.
7. Apply `data-ocid` markers to all new interactive elements.
