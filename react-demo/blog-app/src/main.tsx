import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./index.css";
import { FavoriteProvider } from "./context/FavoriteContext";
// import App from './App.tsx'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}
    {/* RouterProvider 将路由注入到应用 */}
    {/* <RouterProvider router={router} /> */}
    {/* Provider 包裹在最外层，所有组件都能访问 */}
    <FavoriteProvider>
      <RouterProvider router={router} />
    </FavoriteProvider>
  </StrictMode>
);
