import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Component Imports
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Page Imports
import Auth from './pages/auth';
import AdminPanel from './pages/adminPanel';
import Search from './pages/search';
import Results from './pages/results';
import Booking from './pages/bookingStatus';
import UserDashboard from './pages/bookFlight';
import NotFound from './pages/notFound';
import PassengerDetails from './pages/passengerDetails';
import Payment from './pages/payment';
import Success from './pages/success';
import MyBookings from './pages/booking';

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      {/* <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} /> */}
      <Route path="/" element={<Auth />} />

      {/* Protected Routes (Wrapped in Layout) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/search" element={<Search />} />
          <Route path="/results" element={<Results />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/passenger-details" element={<PassengerDetails />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/success" element={<Success />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Route>
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}