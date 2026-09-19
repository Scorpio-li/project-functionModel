import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../views/HomePage";
import PostPage from "../views/PostPage";

// createBrowserRouter 创建路由实例
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, // index: true 表示 / 路径的默认子路由
        element: <HomePage />,
      },
      {
        path: "post/:id",
        element: <PostPage />,
      },
    ],
  },
]);

export default router;
