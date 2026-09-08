// import React from "react";
// import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  // Navigate,
} from "react-router-dom";

import Home from "./Home.jsx";
import About from "./About.jsx";
import Contact from "./Contact.jsx";
import Dashboard from "./router/Dashboard";
import Profile from "./router/Profile";
import Setting from "./router/Setting";
import User from "./router/User.jsx";
const NotFound = () => {
  return <h2>404 Page Not Found</h2>;
};

const Routerdom = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/user/1">User 1</Link>
            </li>
            <li>
              <Link to="/user/2">User 2</Link>
            </li>
            <li>
              <Link to="/404">404Page</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          {/* 基础路由 */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* 嵌套路由 */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Setting />} />
          </Route>
          {/* 动态路由 */}
          <Route path="/user/:userId" element={<User />} />
          {/* 404页面 */}
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Routerdom;
