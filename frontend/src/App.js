import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Layout Components
import Layout from './components/layout/Layout';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

// Main Pages
import Dashboard from './pages/Dashboard';
import Bands from './pages/bands/Bands';
import BandDetails from './pages/bands/BandDetails';
import CreateBand from './pages/bands/CreateBand';
import Rehearsals from './pages/rehearsals/Rehearsals';
import RehearsalDetails from './pages/rehearsals/RehearsalDetails';
import CreateRehearsal from './pages/rehearsals/CreateRehearsal';
import Availability from './pages/availability/Availability';
import Profile from './pages/profile/Profile';
import NotFound from './pages/NotFound';

// Auth related actions
import { checkAuthStatus } from './store/slices/authSlice';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      
      {/* Protected Routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        
        {/* Bands Routes */}
        <Route path="bands" element={<Bands />} />
        <Route path="bands/create" element={<CreateBand />} />
        <Route path="bands/:bandId" element={<BandDetails />} />
        
        {/* Rehearsals Routes */}
        <Route path="rehearsals" element={<Rehearsals />} />
        <Route path="rehearsals/create" element={<CreateRehearsal />} />
        <Route path="rehearsals/:rehearsalId" element={<RehearsalDetails />} />
        
        {/* Availability Route */}
        <Route path="availability" element={<Availability />} />
        
        {/* Profile Route */}
        <Route path="profile" element={<Profile />} />
      </Route>
      
      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
