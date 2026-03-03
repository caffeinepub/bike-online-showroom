import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Layout from "./components/Layout";
import { Toaster } from "./components/ui/sonner";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import AccessoriesPage from "./pages/AccessoriesPage";
import BikeDetailPage from "./pages/BikeDetailPage";
import CatalogPage from "./pages/CatalogPage";
import CheckoutPage from "./pages/CheckoutPage";
import ContactPage from "./pages/ContactPage";
import ContactSuccessPage from "./pages/ContactSuccessPage";
import MaintenancePage from "./pages/MaintenancePage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import ProfileOrdersPage from "./pages/ProfileOrdersPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import WishlistPage from "./pages/WishlistPage";

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: CatalogPage,
});

const bikeDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/bikes/$bikeId",
  component: BikeDetailPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});

const contactSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact/success",
  component: ContactSuccessPage,
});

const accessoriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/accessories",
  component: AccessoriesPage,
});

const maintenanceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/maintenance",
  component: MaintenancePage,
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: CheckoutPage,
});

const orderSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/order-success",
  component: OrderSuccessPage,
});

const wishlistRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/wishlist",
  component: WishlistPage,
});

const signinRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signin",
  component: SignInPage,
});

const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signup",
  component: SignUpPage,
});

const profileOrdersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile/orders",
  component: ProfileOrdersPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  bikeDetailRoute,
  contactRoute,
  contactSuccessRoute,
  accessoriesRoute,
  maintenanceRoute,
  checkoutRoute,
  orderSuccessRoute,
  wishlistRoute,
  signinRoute,
  signupRoute,
  profileOrdersRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <RouterProvider router={router} />
          <Toaster position="bottom-right" richColors />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
