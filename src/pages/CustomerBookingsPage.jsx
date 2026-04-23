import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getCustomerBookings,
  getId,
  getRole,
  isLoggedIn,
  logout,
  updateBookingStatus,
} from '../services/authService';

const ORANGE = '#FF6B00';
const DARK = '#1a1a2e';
const WHITE = '#ffffff';

function getStatusStyle(status) {
  switch (status) {
    case 'Approved': return { background: '#e0f2fe', color: '#0369a1' };
    case 'Cancelled': return { background: '#fee2e2', color: '#dc2626' };
    case 'Paid & Confirmed': return { background: '#dcfce7', color: '#16a34a' };
    case 'Pending': return { background: '#fef9c3', color: '#ca8a04' };
    default: return { background: '#f3f4f6', color: '#6b7280' };
  }
}

export default function CustomerBookingsPage() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700;800;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    if (!isLoggedIn() || getRole() !== 'CUSTOMER') {
      navigate('/login');
      return;
    }

    loadBookings();
  }, [navigate]);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const response = await getCustomerBookings(Number(getId()));
      setBookings(response.bookings || []);
    } catch (err) {
      console.error('Failed to load bookings', err);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    try {
      const response = await updateBookingStatus(id, 'Cancelled');
      if (response.success) {
        setBookings((current) =>
          current.map((booking) =>
            booking.id === id ? { ...booking, status: 'Cancelled', payment: 'Cancelled' } : booking
          )
        );
      }
    } catch (err) {
      console.error('Failed to cancel booking', err);
    }
  };

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'Rajdhani', sans-serif", background: '#f4f6fb' }}>

      {/* Navbar */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px', height: '70px',
        background: `linear-gradient(135deg, ${DARK} 0%, #16213e 100%)`,
        borderBottom: `3px solid ${ORANGE}`,
      }}>
        <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <span style={{ fontSize: '26px' }}>🚗</span>
          <span style={{ fontSize: '22px', fontWeight: '800', color: WHITE, letterSpacing: '1px' }}>
            Car<span style={{ color: ORANGE }}>Rental</span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          {[
            { label: '📅 My Bookings', path: '/customer/bookings', active: true },
            { label: '👤 My Profile', path: '/customer/profile' },
          ].map((item, i) => (
            <span key={i} onClick={() => navigate(item.path)} style={{
              color: item.active ? ORANGE : 'rgba(255,255,255,0.7)',
              cursor: 'pointer', fontSize: '15px', fontWeight: '700',
              borderBottom: item.active ? `2px solid ${ORANGE}` : '2px solid transparent',
              paddingBottom: '2px',
            }}>{item.label}</span>
          ))}
          <button onClick={() => { logout(); navigate('/login'); }} style={{
            background: 'rgba(255,255,255,0.1)', color: WHITE,
            padding: '8px 20px', borderRadius: '25px', border: '1px solid rgba(255,255,255,0.2)',
            fontSize: '14px', fontWeight: '700', cursor: 'pointer',
            fontFamily: "'Rajdhani', sans-serif",
          }}>🚪 Logout</button>
        </div>
      </nav>

      {/* Content */}
      <div style={{ padding: '100px 40px 60px' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontSize: '32px', fontWeight: '900', color: DARK, marginBottom: '6px' }}>My Bookings 📅</div>
          <div style={{ fontSize: '15px', color: '#888', fontWeight: '600' }}>Track and manage all your car bookings</div>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
          {[
            { label: 'Total Bookings', value: bookings.length, icon: '📅', color: '#4f46e5' },
            { label: 'Pending', value: bookings.filter(b => b.status === 'Pending').length, icon: '⏳', color: '#ca8a04' },
            { label: 'Confirmed', value: bookings.filter(b => b.status === 'Paid & Confirmed' || b.status === 'Approved').length, icon: '✅', color: '#16a34a' },
            { label: 'Cancelled', value: bookings.filter(b => b.status === 'Cancelled').length, icon: '❌', color: '#dc2626' },
          ].map((stat, i) => (
            <div key={i} style={{ background: WHITE, borderRadius: '16px', padding: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', border: '1px solid #f0f0f0' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{stat.icon}</div>
              <div style={{ fontSize: '28px', fontWeight: '900', color: DARK }}>{stat.value}</div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#888' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Bookings Table */}
        <div style={{ background: WHITE, borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', overflow: 'hidden', border: '1px solid #f0f0f0' }}>
          <div style={{ padding: '24px 28px', borderBottom: '2px solid #f0f0f0' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '900', color: DARK }}>All Bookings</h2>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8f9ff' }}>
                  {['Car', 'Booking ID', 'From', 'To', 'Days', 'Price', 'Status', 'Vehicle', 'Payment', 'Action'].map((h, i) => (
                    <th key={i} style={{ padding: '14px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '800', color: '#666', letterSpacing: '0.5px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                  {bookings.map((b, i) => (
                    <tr key={i} style={{ borderTop: '1px solid #f0f0f0', transition: 'background 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#fafbff'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img src={b.img} alt={b.car} style={{ width: '50px', height: '40px', objectFit: 'cover', borderRadius: '8px' }}
                          onError={e => e.target.src = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=80&q=80'} />
                        <span style={{ fontSize: '14px', fontWeight: '700', color: DARK }}>{b.car}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px' }}><span style={{ fontSize: '13px', fontWeight: '700', color: ORANGE, fontFamily: 'monospace', background: 'rgba(255,107,0,0.08)', padding: '3px 8px', borderRadius: '6px' }}>{b.id}</span></td>
                    <td style={{ padding: '14px 16px' }}><span style={{ fontSize: '13px', fontWeight: '600', color: '#666' }}>{b.from}</span></td>
                    <td style={{ padding: '14px 16px' }}><span style={{ fontSize: '13px', fontWeight: '600', color: '#666' }}>{b.to}</span></td>
                    <td style={{ padding: '14px 16px' }}><span style={{ fontSize: '14px', fontWeight: '700', color: DARK }}>{b.days}d</span></td>
                    <td style={{ padding: '14px 16px' }}><span style={{ fontSize: '15px', fontWeight: '800', color: ORANGE }}>₹{b.price.toLocaleString()}</span></td>
                    <td style={{ padding: '14px 16px' }}><span style={{ ...getStatusStyle(b.status), padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', whiteSpace: 'nowrap' }}>{b.status}</span></td>
                    <td style={{ padding: '14px 16px' }}><span style={{ fontSize: '13px', fontWeight: '600', color: '#666' }}>{b.vehicle}</span></td>
                    <td style={{ padding: '14px 16px' }}><span style={{ padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', background: b.payment === 'Paid' ? '#dcfce7' : '#fef9c3', color: b.payment === 'Paid' ? '#16a34a' : '#ca8a04' }}>{b.payment}</span></td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {b.status === 'Pending' && (
                          <button onClick={() => handleCancel(b.id)}
                            style={{ background: '#fee2e2', color: '#dc2626', padding: '6px 14px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Rajdhani', sans-serif" }}>
                            Cancel
                          </button>
                        )}
                        {b.status === 'Approved' && (
                          <button style={{ background: ORANGE, color: WHITE, padding: '6px 14px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Rajdhani', sans-serif" }}>
                            💳 Pay Now
                          </button>
                        )}
                        <button style={{ background: DARK, color: WHITE, padding: '6px 14px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Rajdhani', sans-serif" }}>
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!loading && bookings.length === 0 && (
                  <tr>
                    <td colSpan="10" style={{ padding: '32px', textAlign: 'center', fontSize: '16px', fontWeight: '700', color: '#888' }}>
                      No bookings found yet.
                    </td>
                  </tr>
                )}
                {loading && (
                  <tr>
                    <td colSpan="10" style={{ padding: '32px', textAlign: 'center', fontSize: '16px', fontWeight: '700', color: '#888' }}>
                      Loading your bookings...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Book more button */}
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <button onClick={() => navigate('/')} style={{
            background: `linear-gradient(135deg, ${ORANGE} 0%, #FF8C38 100%)`,
            color: WHITE, padding: '14px 40px', borderRadius: '30px',
            border: 'none', fontSize: '17px', fontWeight: '800',
            fontFamily: "'Rajdhani', sans-serif", cursor: 'pointer',
            letterSpacing: '1px', boxShadow: '0 8px 25px rgba(255,107,0,0.4)',
          }}>
            🚗 Book Another Car
          </button>
        </div>
      </div>
    </div>
  );
}
