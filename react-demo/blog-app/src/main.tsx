import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./index.css";

// import App from './App.tsx'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}
    {/* RouterProvider 将路由注入到应用 */}
    <RouterProvider router={router} />
  </StrictMode>
);
