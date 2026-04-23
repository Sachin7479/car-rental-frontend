import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ORANGE = '#FF6B00';
const DARK = '#1a1a2e';
const DARK2 = '#16213e';
const WHITE = '#ffffff';

const MENU_ITEMS = [
  { icon: '📊', label: 'Dashboard', path: '/admin/dashboard' },
  { icon: '🏢', label: 'Add Company', path: '/admin/add-company' },
  { icon: '🚗', label: 'Add Variant', path: '/admin/add-variant' },
  { icon: '🚙', label: 'All Variants', path: '/admin/variants' },
  { icon: '📅', label: 'Bookings', path: '/admin/bookings', active: true },
  { icon: '👥', label: 'Customers', path: '/admin/customers' },
];

const BOOKINGS = [
  { id: 'HPAANL3D4', car: 'Tata Nexon Pro', img: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=80&q=80', customer: 'Jafer Khan', from: '2024-03-23', to: '2024-03-25', days: 3, price: 7500, status: 'Approved', vehicle: 'MH03***728', payment: 'Pending' },
  { id: '5HCDIGZCY', car: 'Thar', img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=80&q=80', customer: 'Afzal Khan', from: '2024-03-24', to: '2024-03-25', days: 2, price: 7000, status: 'Cancelled', vehicle: 'MH05***671', payment: 'Pending' },
  { id: 'PQTLLUKPU', car: 'Tata Nexon Pro', img: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=80&q=80', customer: 'Afzal Khan', from: '2024-03-29', to: '2024-03-31', days: 3, price: 7500, status: 'Paid & Confirmed', vehicle: 'MH03***920', payment: 'Paid' },
  { id: 'BP0VVCUTP', car: 'Kwid RXE-10', img: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=80&q=80', customer: 'Customer10', from: '2024-04-01', to: '2024-04-03', days: 3, price: 12000, status: 'Pending', vehicle: 'NA', payment: 'Pending' },
  { id: 'WTLIEKVEU', car: 'Kwid RXE-10', img: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=80&q=80', customer: 'Customer10', from: '2024-04-01', to: '2024-04-03', days: 3, price: 12000, status: 'Pending', vehicle: 'NA', payment: 'Pending' },
];

function getStatusStyle(status) {
  switch (status) {
    case 'Approved': return { background: '#e0f2fe', color: '#0369a1' };
    case 'Cancelled': return { background: '#fee2e2', color: '#dc2626' };
    case 'Paid & Confirmed': return { background: '#dcfce7', color: '#16a34a' };
    case 'Pending': return { background: '#fef9c3', color: '#ca8a04' };
    default: return { background: '#f3f4f6', color: '#6b7280' };
  }
}

export default function AllBookingsPage() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('Bookings');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [bookings, setBookings] = useState(BOOKINGS);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700;800;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const handleUpdate = () => {
    if (!newStatus) return;
    setBookings(bookings.map(b =>
      b.id === selectedBooking.id ? { ...b, status: newStatus } : b
    ));
    setShowModal(false);
    setNewStatus('');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Rajdhani', sans-serif", background: '#f4f6fb' }}>

      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? '260px' : '70px',
        background: `linear-gradient(180deg, ${DARK} 0%, ${DARK2} 100%)`,
        borderRight: `3px solid ${ORANGE}`,
        display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, left: 0, bottom: 0,
        zIndex: 200, transition: 'width 0.3s ease', overflow: 'hidden',
      }}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,107,0,0.2)', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <span style={{ fontSize: '28px', flexShrink: 0 }}>🚗</span>
          {sidebarOpen && <span style={{ fontSize: '20px', fontWeight: '900', color: WHITE, whiteSpace: 'nowrap' }}>Car<span style={{ color: ORANGE }}>Rental</span></span>}
        </div>
        {sidebarOpen && (
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '42px', height: '42px', background: ORANGE, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>👨‍💼</div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: '800', color: WHITE }}>Admin User</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontWeight: '600' }}>Super Admin</div>
              </div>
            </div>
          </div>
        )}
        <div style={{ padding: '16px 12px', flex: 1 }}>
          {MENU_ITEMS.map((item, i) => (
            <div key={i} onClick={() => { setActiveMenu(item.label); navigate(item.path); }}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '12px', marginBottom: '4px', cursor: 'pointer', background: activeMenu === item.label ? 'rgba(255,107,0,0.15)' : 'transparent', border: activeMenu === item.label ? '1px solid rgba(255,107,0,0.3)' : '1px solid transparent' }}>
              <span style={{ fontSize: '20px', flexShrink: 0 }}>{item.icon}</span>
              {sidebarOpen && <span style={{ fontSize: '15px', fontWeight: activeMenu === item.label ? '800' : '600', color: activeMenu === item.label ? ORANGE : 'rgba(255,255,255,0.7)', whiteSpace: 'nowrap' }}>{item.label}</span>}
            </div>
          ))}
        </div>
        <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div onClick={() => navigate('/login')} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '12px', cursor: 'pointer' }}>
            <span style={{ fontSize: '20px', flexShrink: 0 }}>🚪</span>
            {sidebarOpen && <span style={{ fontSize: '15px', fontWeight: '700', color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap' }}>Logout</span>}
          </div>
        </div>
      </div>

      {/* Main */}
      <div style={{ marginLeft: sidebarOpen ? '260px' : '70px', flex: 1, transition: 'margin-left 0.3s ease' }}>
        <div style={{ position: 'sticky', top: 0, zIndex: 100, background: WHITE, padding: '0 32px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: '#f4f6fb', border: 'none', borderRadius: '10px', padding: '8px 12px', cursor: 'pointer', fontSize: '18px' }}>{sidebarOpen ? '◀' : '▶'}</button>
            <div>
              <div style={{ fontSize: '22px', fontWeight: '900', color: DARK }}>All Bookings</div>
              <div style={{ fontSize: '13px', color: '#999', fontWeight: '600' }}>{bookings.length} total bookings</div>
            </div>
          </div>
        </div>

        <div style={{ padding: '32px' }}>
          <div style={{ background: WHITE, borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', overflow: 'hidden', border: '1px solid #f0f0f0' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: `linear-gradient(135deg, ${DARK} 0%, ${DARK2} 100%)` }}>
                    {['Car', 'Booking ID', 'Customer', 'From', 'To', 'Days', 'Price', 'Status', 'Payment', 'Action'].map((h, i) => (
                      <th key={i} style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '800', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.5px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
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
                      <td style={{ padding: '14px 16px' }}><span style={{ fontSize: '14px', fontWeight: '600', color: '#444' }}>{b.customer}</span></td>
                      <td style={{ padding: '14px 16px' }}><span style={{ fontSize: '13px', fontWeight: '600', color: '#666' }}>{b.from}</span></td>
                      <td style={{ padding: '14px 16px' }}><span style={{ fontSize: '13px', fontWeight: '600', color: '#666' }}>{b.to}</span></td>
                      <td style={{ padding: '14px 16px' }}><span style={{ fontSize: '14px', fontWeight: '700', color: DARK }}>{b.days}d</span></td>
                      <td style={{ padding: '14px 16px' }}><span style={{ fontSize: '15px', fontWeight: '800', color: ORANGE }}>₹{b.price.toLocaleString()}</span></td>
                      <td style={{ padding: '14px 16px' }}><span style={{ ...getStatusStyle(b.status), padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', whiteSpace: 'nowrap' }}>{b.status}</span></td>
                      <td style={{ padding: '14px 16px' }}><span style={{ padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', background: b.payment === 'Paid' ? '#dcfce7' : '#fef9c3', color: b.payment === 'Paid' ? '#16a34a' : '#ca8a04' }}>{b.payment}</span></td>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          {b.status === 'Pending' && (
                            <button onClick={() => { setSelectedBooking(b); setShowModal(true); }}
                              style={{ background: ORANGE, color: WHITE, padding: '6px 14px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Rajdhani', sans-serif" }}>
                              Update
                            </button>
                          )}
                          <button style={{ background: DARK, color: WHITE, padding: '6px 14px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Rajdhani', sans-serif" }}>
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Update Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: WHITE, borderRadius: '20px', padding: '36px', width: '420px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
            <h3 style={{ fontSize: '22px', fontWeight: '900', color: DARK, marginBottom: '6px' }}>Update Booking Status</h3>
            <p style={{ fontSize: '14px', color: '#999', marginBottom: '24px' }}>Booking ID: <strong>{selectedBooking ? selectedBooking.id : ''}</strong></p>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', color: ORANGE, marginBottom: '8px' }}>Status</label>
            <select value={newStatus} onChange={e => setNewStatus(e.target.value)}
              style={{ width: '100%', padding: '13px 16px', borderRadius: '10px', border: '2px solid #e0e0e0', fontSize: '15px', fontFamily: "'Rajdhani', sans-serif", fontWeight: '600', marginBottom: '24px', outline: 'none', boxSizing: 'border-box' }}>
              <option value="">Select Status</option>
              <option value="Approved">Approved</option>
              <option value="Cancelled">Rejected</option>
            </select>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, background: '#f4f6fb', color: DARK, padding: '13px', borderRadius: '10px', border: 'none', fontSize: '15px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Rajdhani', sans-serif" }}>Close</button>
              <button onClick={handleUpdate} style={{ flex: 2, background: ORANGE, color: WHITE, padding: '13px', borderRadius: '10px', border: 'none', fontSize: '15px', fontWeight: '800', cursor: 'pointer', fontFamily: "'Rajdhani', sans-serif" }}>✅ Update Status</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
