import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CarDetailPage from './pages/CarDetailPage';
import AdminDashboard from './pages/AdminDashboard';
import AddCompanyPage from './pages/AddCompanyPage';
import AddVariantPage from './pages/AddVariantPage';
import AllBookingsAdminPage from './pages/AllBookingsAdminPage';
import AllVariantsPage from './pages/AllVariantsPage';
import CustomersPage from './pages/CustomersPage';
import CustomerBookingsPage from './pages/CustomerBookingsPage';
import MyProfilePage from './pages/MyProfilePage';

function App() {
  return (
    <BookingProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/car/detail/:id" element={<CarDetailPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add-company" element={<AddCompanyPage />} />
        <Route path="/admin/add-variant" element={<AddVariantPage />} />
        <Route path="/admin/bookings" element={<AllBookingsAdminPage />} />
        <Route path="/admin/variants" element={<AllVariantsPage />} />
        <Route path="/admin/customers" element={<CustomersPage />} />
        <Route path="/customer/bookings" element={<CustomerBookingsPage />} />
        <Route path="/customer/profile" element={<MyProfilePage />} />
      </Routes>
    </BookingProvider>
  );
}

export default App;
