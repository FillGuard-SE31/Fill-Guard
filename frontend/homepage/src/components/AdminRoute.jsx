// src/components/AdminRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  // If user is admin, show child routes; otherwise, redirect
  return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AdminRoute;
