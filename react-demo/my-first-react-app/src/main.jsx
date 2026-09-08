/*
 * @Description:
 * @Author: Lizhiliang
 * @Date: 2026-09-01 15:57:13
 * @LastEditTime: 2026-09-08 14:11:25
 * @LastEditors: lizhiliang
 * @Usage:
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Hooks from "./components/Hooks.jsx";
import Routerdom from "./views/Router.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Routerdom />
    <Hooks />
    <App />
  </StrictMode>
);
