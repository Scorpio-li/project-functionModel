/*
 * @Description:
 * @Author: Lizhiliang
 * @Date: 2026-09-08 09:52:25
 * @LastEditTime: 2026-09-08 10:05:05
 * @LastEditors: lizhiliang
 * @Usage:
 */
// Dashboard.js
// import React from 'react';
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <nav>
        <ul>
          <li>
            <Link to="profile">Profile</Link>
          </li>
          <li>
            <Link to="settings">Settings</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Dashboard;
