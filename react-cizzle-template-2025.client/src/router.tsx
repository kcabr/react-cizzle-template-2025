import { RootRoute, Route, Router } from "@tanstack/react-router";
import App from "./App";
import { AboutPage } from "./pages/About";
import { HomePage } from "./pages/Home";
import { Layout } from "./components/Layout";
import { SubscriptionPlans } from "./components/SubscriptionPlans";
import { SubscriptionSuccess } from "./components/SubscriptionSuccess";

// Define the root route with a layout component
const rootRoute = new RootRoute({
  component: Layout,
});

// Define routes
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const weatherRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/weather",
  component: App, // Use the existing App component with Weather logic
});

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

// Add subscription routes
const subscriptionRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/subscription",
  component: SubscriptionPlans,
});

const subscriptionSuccessRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/subscription/success",
  component: SubscriptionSuccess,
});

// Create the route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  weatherRoute,
  aboutRoute,
  subscriptionRoute,
  subscriptionSuccessRoute,
]);

// Create the router
export const router = new Router({
  routeTree,
  defaultPreload: "intent",
});

// Register the router for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
