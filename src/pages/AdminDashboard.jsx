import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';

const ORANGE = '#FF6B00';
const ORANGE_LIGHT = '#FF8C38';
const DARK = '#1a1a2e';
const DARK2 = '#16213e';
const WHITE = '#ffffff';

// Sample data - will come from backend later
const STATS = [
  { icon: '🚗', label: 'Total Cars', value: '24', change: '+3 this month', color: '#4f46e5' },
  { icon: '📅', label: 'Total Bookings', value: '128', change: '+12 this week', color: '#0891b2' },
  { icon: '👥', label: 'Total Customers', value: '86', change: '+5 this week', color: '#059669' },
  { icon: '💰', label: 'Total Revenue', value: '₹3.2L', change: '+₹45K this month', color: ORANGE },
];

const RECENT_BOOKINGS = [
  {
    id: 'HPAANL3D4',
    car: 'Tata Nexon Pro',
    customer: 'Jafer Khan',
    from: '2024-03-23',
    to: '2024-03-25',
    days: 3,
    price: 7500,
    status: 'Approved',
  },
  {
    id: '5HCDIGZCY',
    car: 'Thar',
    customer: 'Afzal Khan',
    from: '2024-03-24',
    to: '2024-03-25',
    days: 2,
    price: 7000,
    status: 'Cancelled',
  },
  {
    id: 'PQTLLUKPU',
    car: 'Tata Nexon Pro',
    customer: 'Afzal Khan',
    from: '2024-03-29',
    to: '2024-03-31',
    days: 3,
    price: 7500,
    status: 'Paid & Confirmed',
  },
  {
    id: 'BP0VVCUTP',
    car: 'Kwid RXE-10',
    customer: 'Customer10',
    from: '2024-04-01',
    to: '2024-04-03',
    days: 3,
    price: 12000,
    status: 'Pending',
  },
  {
    id: 'WTLIEKVEU',
    car: 'Kwid RXE-10',
    customer: 'Customer10',
    from: '2024-04-01',
    to: '2024-04-03',
    days: 3,
    price: 12000,
    status: 'Pending',
  },
];

const MENU_ITEMS = [
  { icon: '📊', label: 'Dashboard', path: '/admin/dashboard', active: true },
  { icon: '🏢', label: 'Add Company', path: '/admin/add-company' },
  { icon: '🚗', label: 'Add Variant', path: '/admin/add-variant' },
  { icon: '🚙', label: 'All Variants', path: '/admin/variants' },
  { icon: '📅', label: 'Bookings', path: '/admin/bookings' },
  { icon: '👥', label: 'Customers', path: '/admin/customers' },
];

function getStatusStyle(status) {
  switch (status) {
    case 'Approved':
      return { background: '#e0f2fe', color: '#0369a1' };
    case 'Cancelled':
      return { background: '#fee2e2', color: '#dc2626' };
    case 'Paid & Confirmed':
      return { background: '#dcfce7', color: '#16a34a' };
    case 'Pending':
      return { background: '#fef9c3', color: '#ca8a04' };
    default:
      return { background: '#f3f4f6', color: '#6b7280' };
  }
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700;800;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      fontFamily: "'Rajdhani', sans-serif",
      background: '#f4f6fb',
    }}>

      {/* ── SIDEBAR ── */}
      <div style={{
        width: sidebarOpen ? '260px' : '70px',
        background: `linear-gradient(180deg, ${DARK} 0%, ${DARK2} 100%)`,
        borderRight: `3px solid ${ORANGE}`,
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0, left: 0, bottom: 0,
        zIndex: 200,
        transition: 'width 0.3s ease',
        overflow: 'hidden',
      }}>

        {/* Logo */}
        <div style={{
          padding: '24px 20px',
          borderBottom: '1px solid rgba(255,107,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
        }}
          onClick={() => navigate('/')}
        >
          <span style={{ fontSize: '28px', flexShrink: 0 }}>🚗</span>
          {sidebarOpen && (
            <span style={{
              fontSize: '20px', fontWeight: '900',
              color: WHITE, letterSpacing: '1px',
              whiteSpace: 'nowrap',
            }}>
              Car<span style={{ color: ORANGE }}>Rental</span>
            </span>
          )}
        </div>

        {/* Admin info */}
        {sidebarOpen && (
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '12px',
            }}>
              <div style={{
                width: '42px', height: '42px',
                background: ORANGE, borderRadius: '12px',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '20px',
                flexShrink: 0,
              }}>
                👨‍💼
              </div>
              <div>
                <div style={{
                  fontSize: '15px', fontWeight: '800',
                  color: WHITE,
                }}>
                  Admin User
                </div>
                <div style={{
                  fontSize: '12px', color: 'rgba(255,255,255,0.5)',
                  fontWeight: '600',
                }}>
                  Super Admin
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Menu */}
        <div style={{ padding: '16px 12px', flex: 1 }}>
          {sidebarOpen && (
            <div style={{
              fontSize: '11px', fontWeight: '700',
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '2px', padding: '0 8px',
              marginBottom: '8px', textTransform: 'uppercase',
            }}>
              Main Menu
            </div>
          )}
          {MENU_ITEMS.map((item, i) => (
            <div
              key={i}
              onClick={() => {
                setActiveMenu(item.label);
                navigate(item.path);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                borderRadius: '12px',
                marginBottom: '4px',
                cursor: 'pointer',
                background: activeMenu === item.label
                  ? 'rgba(255,107,0,0.15)'
                  : 'transparent',
                border: activeMenu === item.label
                  ? '1px solid rgba(255,107,0,0.3)'
                  : '1px solid transparent',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                if (activeMenu !== item.label) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                }
              }}
              onMouseLeave={e => {
                if (activeMenu !== item.label) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <span style={{ fontSize: '20px', flexShrink: 0 }}>{item.icon}</span>
              {sidebarOpen && (
                <span style={{
                  fontSize: '15px',
                  fontWeight: activeMenu === item.label ? '800' : '600',
                  color: activeMenu === item.label ? ORANGE : 'rgba(255,255,255,0.7)',
                  whiteSpace: 'nowrap',
                }}>
                  {item.label}
                </span>
              )}
              {sidebarOpen && activeMenu === item.label && (
                <div style={{
                  marginLeft: 'auto',
                  width: '6px', height: '6px',
                  borderRadius: '50%',
                  background: ORANGE,
                  flexShrink: 0,
                }} />
              )}
            </div>
          ))}
        </div>

        {/* Logout */}
        <div style={{
          padding: '16px 12px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div
            onClick={() => { logout(); navigate('/login'); }}
            style={{
              display: 'flex', alignItems: 'center',
              gap: '12px', padding: '12px',
              borderRadius: '12px', cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,0,0,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <span style={{ fontSize: '20px', flexShrink: 0 }}>🚪</span>
            {sidebarOpen && (
              <span style={{
                fontSize: '15px', fontWeight: '700',
                color: 'rgba(255,255,255,0.6)',
                whiteSpace: 'nowrap',
              }}>
                Logout
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{
        marginLeft: sidebarOpen ? '260px' : '70px',
        flex: 1,
        transition: 'margin-left 0.3s ease',
      }}>

        {/* Top Navbar */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 100,
          background: WHITE,
          padding: '0 32px',
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          borderBottom: '1px solid #f0f0f0',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Toggle sidebar */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                background: '#f4f6fb', border: 'none',
                borderRadius: '10px', padding: '8px 12px',
                cursor: 'pointer', fontSize: '18px',
              }}
            >
              {sidebarOpen ? '◀' : '▶'}
            </button>
            <div>
              <div style={{
                fontSize: '22px', fontWeight: '900', color: DARK,
              }}>
                Admin Dashboard
              </div>
              <div style={{
                fontSize: '13px', color: '#999', fontWeight: '600',
              }}>
                Welcome back, Admin! 👋
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              background: '#f4f6fb', borderRadius: '10px',
              padding: '8px 16px', fontSize: '14px',
              color: '#666', fontWeight: '600',
            }}>
              🔔 3 new bookings
            </div>
            <div style={{
              width: '42px', height: '42px',
              background: ORANGE, borderRadius: '12px',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '20px',
              cursor: 'pointer',
            }}>
              👨‍💼
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div style={{ padding: '32px' }}>

          {/* Stats Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
            marginBottom: '32px',
          }}>
            {STATS.map((stat, i) => (
              <div
                key={i}
                style={{
                  background: WHITE,
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                  border: '1px solid #f0f0f0',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
                }}
              >
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'flex-start', marginBottom: '16px',
                }}>
                  <div style={{
                    width: '48px', height: '48px',
                    borderRadius: '12px',
                    background: `${stat.color}15`,
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '24px',
                  }}>
                    {stat.icon}
                  </div>
                  <span style={{
                    fontSize: '11px', fontWeight: '700',
                    color: '#22c55e',
                    background: '#dcfce7',
                    padding: '3px 8px', borderRadius: '20px',
                  }}>
                    ↑ New
                  </span>
                </div>
                <div style={{
                  fontSize: '32px', fontWeight: '900',
                  color: DARK, marginBottom: '4px',
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '14px', fontWeight: '700',
                  color: '#666', marginBottom: '6px',
                }}>
                  {stat.label}
                </div>
                <div style={{
                  fontSize: '12px', color: stat.color,
                  fontWeight: '600',
                }}>
                  {stat.change}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
            marginBottom: '32px',
          }}>
            {[
              { icon: '🏢', label: 'Add Company', path: '/admin/add-company', color: '#4f46e5' },
              { icon: '🚗', label: 'Add Variant', path: '/admin/add-variant', color: '#0891b2' },
              { icon: '📅', label: 'View Bookings', path: '/admin/bookings', color: '#059669' },
              { icon: '👥', label: 'View Customers', path: '/admin/customers', color: ORANGE },
            ].map((action, i) => (
              <div
                key={i}
                onClick={() => navigate(action.path)}
                style={{
                  background: WHITE,
                  borderRadius: '14px',
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
                  border: '1px solid #f0f0f0',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = action.color;
                  e.currentTarget.style.boxShadow = `0 8px 24px ${action.color}20`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#f0f0f0';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.05)';
                }}
              >
                <div style={{
                  width: '44px', height: '44px',
                  borderRadius: '12px',
                  background: `${action.color}15`,
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '22px',
                  flexShrink: 0,
                }}>
                  {action.icon}
                </div>
                <span style={{
                  fontSize: '16px', fontWeight: '800',
                  color: DARK,
                }}>
                  {action.label}
                </span>
              </div>
            ))}
          </div>

          {/* Recent Bookings Table */}
          <div style={{
            background: WHITE,
            borderRadius: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            overflow: 'hidden',
            border: '1px solid #f0f0f0',
          }}>
            {/* Table Header */}
            <div style={{
              padding: '24px 28px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '2px solid #f0f0f0',
            }}>
              <div>
                <h2 style={{
                  fontSize: '20px', fontWeight: '900',
                  color: DARK, marginBottom: '2px',
                }}>
                  📅 Recent Bookings
                </h2>
                <p style={{
                  fontSize: '13px', color: '#999', fontWeight: '600',
                }}>
                  Latest booking requests from customers
                </p>
              </div>
              <button
                onClick={() => navigate('/admin/bookings')}
                style={{
                  background: ORANGE, color: WHITE,
                  padding: '10px 22px', borderRadius: '10px',
                  border: 'none', fontSize: '14px',
                  fontWeight: '700', cursor: 'pointer',
                  fontFamily: "'Rajdhani', sans-serif",
                }}
              >
                View All →
              </button>
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%', borderCollapse: 'collapse',
              }}>
                <thead>
                  <tr style={{ background: '#f8f9ff' }}>
                    {['Car', 'Booking ID', 'Customer', 'From', 'To', 'Days', 'Price', 'Status', 'Action'].map((h, i) => (
                      <th key={i} style={{
                        padding: '14px 16px',
                        textAlign: 'left',
                        fontSize: '12px',
                        fontWeight: '800',
                        color: '#666',
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap',
                      }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {RECENT_BOOKINGS.map((booking, i) => (
                    <tr
                      key={i}
                      style={{
                        borderTop: '1px solid #f0f0f0',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = '#fafbff'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{
                          fontSize: '14px', fontWeight: '700', color: DARK,
                        }}>
                          {booking.car}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{
                          fontSize: '13px', fontWeight: '700',
                          color: ORANGE, fontFamily: 'monospace',
                          background: 'rgba(255,107,0,0.08)',
                          padding: '3px 8px', borderRadius: '6px',
                        }}>
                          {booking.id}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{
                          fontSize: '14px', fontWeight: '600', color: '#444',
                        }}>
                          {booking.customer}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{
                          fontSize: '13px', fontWeight: '600', color: '#666',
                        }}>
                          {booking.from}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{
                          fontSize: '13px', fontWeight: '600', color: '#666',
                        }}>
                          {booking.to}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{
                          fontSize: '14px', fontWeight: '700', color: DARK,
                        }}>
                          {booking.days} days
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{
                          fontSize: '15px', fontWeight: '800', color: ORANGE,
                        }}>
                          ₹{booking.price.toLocaleString()}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{
                          ...getStatusStyle(booking.status),
                          padding: '5px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '700',
                          whiteSpace: 'nowrap',
                        }}>
                          {booking.status}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <button style={{
                          background: DARK, color: WHITE,
                          padding: '6px 16px', borderRadius: '8px',
                          border: 'none', fontSize: '13px',
                          fontWeight: '700', cursor: 'pointer',
                          fontFamily: "'Rajdhani', sans-serif",
                          transition: 'background 0.2s',
                        }}
                          onMouseEnter={e => e.target.style.background = ORANGE}
                          onMouseLeave={e => e.target.style.background = DARK}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
