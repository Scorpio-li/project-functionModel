/*
 * @Description:
 * @Author: Lizhiliang
 * @Date: 2026-09-08 10:01:23
 * @LastEditTime: 2026-09-08 10:01:23
 * @LastEditors: lizhiliang
 * @Usage:
 */
// User.js
// import React from 'react';
import { useParams } from "react-router-dom";

const User = () => {
  const { userId } = useParams();
  return <h2>User ID: {userId}</h2>;
};

export default User;
