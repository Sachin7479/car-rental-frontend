import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const useBookings = () => useContext(BookingContext);

const INITIAL_BOOKINGS = [
  { id: 'HPAANL3D4', car: 'Tata Nexon Pro', carId: 1, img: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=80&q=80', customer: 'Jafer Khan', customerId: 1, from: '2024-03-23', to: '2024-03-25', days: 3, price: 7500, status: 'Approved', vehicle: 'MH03***728', payment: 'Pending' },
  { id: 'PQTLLUKPU', car: 'Tata Nexon Pro', carId: 1, img: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=80&q=80', customer: 'Afzal Khan', customerId: 2, from: '2024-03-29', to: '2024-03-31', days: 3, price: 7500, status: 'Paid & Confirmed', vehicle: 'MH03***920', payment: 'Paid' },
  { id: '5HCDIGZCY', car: 'Thar', carId: 2, img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=80&q=80', customer: 'Afzal Khan', customerId: 2, from: '2024-03-24', to: '2024-03-25', days: 2, price: 7000, status: 'Cancelled', vehicle: 'NA', payment: 'Pending' },
];

const INITIAL_CUSTOMERS = [
  { id: 1, firstname: 'Jafer', lastname: 'Khan', email: 'jafer@example.com', contact: '9876543210', address: 'Mumbai, Maharashtra', licenseNumber: 'MH-1234-5678', licenseExpiry: '2028-12-31' },
  { id: 2, firstname: 'Afzal', lastname: 'Khan', email: 'afzal@example.com', contact: '9876543211', address: 'Pune, Maharashtra', licenseNumber: 'MH-8765-4321', licenseExpiry: '2029-06-30' },
];

// Logged in customer (id=2 for demo)
const LOGGED_IN_CUSTOMER_ID = 2;

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [customers] = useState(INITIAL_CUSTOMERS);

  // Add new booking (called from CarDetailPage)
  const addBooking = (newBooking) => {
    const id = Math.random().toString(36).substring(2, 10).toUpperCase();
    const booking = {
      ...newBooking,
      id,
      customerId: LOGGED_IN_CUSTOMER_ID,
      customer: 'Afzal Khan',
      status: 'Pending',
      vehicle: 'NA',
      payment: 'Pending',
      img: newBooking.img || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=80&q=80',
    };
    setBookings(prev => [booking, ...prev]);
    return id;
  };

  // Update booking status (called from Admin)
  const updateBookingStatus = (bookingId, newStatus) => {
    setBookings(prev =>
      prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b)
    );
  };

  // Cancel booking (called from Customer)
  const cancelBooking = (bookingId) => {
    setBookings(prev =>
      prev.map(b => b.id === bookingId ? { ...b, status: 'Cancelled' } : b)
    );
  };

  // Get bookings for logged in customer
  const myBookings = bookings.filter(b => b.customerId === LOGGED_IN_CUSTOMER_ID);

  return (
    <BookingContext.Provider value={{
      bookings,
      myBookings,
      customers,
      addBooking,
      updateBookingStatus,
      cancelBooking,
      loggedInCustomerId: LOGGED_IN_CUSTOMER_ID,
    }}>
      {children}
    </BookingContext.Provider>
  );
}
