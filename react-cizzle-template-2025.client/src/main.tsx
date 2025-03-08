import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import "./index.css";

// Initialize the router
void router.load();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* @ts-expect-error - Type compatibility between router versions */}
    <RouterProvider router={router} />
  </StrictMode>
);
