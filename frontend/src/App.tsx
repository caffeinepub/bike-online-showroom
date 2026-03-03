import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import Layout from './components/Layout';
import CatalogPage from './pages/CatalogPage';
import BikeDetailPage from './pages/BikeDetailPage';
import ContactPage from './pages/ContactPage';
import ContactSuccessPage from './pages/ContactSuccessPage';

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: CatalogPage,
});

const bikeDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/bikes/$bikeId',
  component: BikeDetailPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
});

const contactSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact/success',
  component: ContactSuccessPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  bikeDetailRoute,
  contactRoute,
  contactSuccessRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
