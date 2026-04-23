import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';

const ORANGE = '#FF6B00';
const DARK = '#1a1a2e';
const DARK2 = '#16213e';
const WHITE = '#ffffff';

const MENU_ITEMS = [
  { icon: '📊', label: 'Dashboard', path: '/admin/dashboard' },
  { icon: '🏢', label: 'Add Company', path: '/admin/add-company' },
  { icon: '🚗', label: 'Add Variant', path: '/admin/add-variant' },
  { icon: '🚙', label: 'All Variants', path: '/admin/variants' },
  { icon: '📅', label: 'Bookings', path: '/admin/bookings' },
  { icon: '👥', label: 'Customers', path: '/admin/customers', active: true },
];

const CUSTOMERS = [
  { id: 1, firstname: 'Jafer', lastname: 'Khan', email: 'jafer@example.com', contact: '9876543210', address: 'Mumbai, Maharashtra', license: 'MH-1234-5678', expiry: '2028-12-31', bookings: 1, joined: '2024-01-15' },
  { id: 2, firstname: 'Afzal', lastname: 'Khan', email: 'afzal@example.com', contact: '9876543211', address: 'Pune, Maharashtra', license: 'MH-8765-4321', expiry: '2029-06-30', bookings: 3, joined: '2024-02-20' },
  { id: 3, firstname: 'Customer10', lastname: 'User', email: 'customer10@example.com', contact: '9876543212', address: 'Delhi', license: 'DL-1111-2222', expiry: '2027-03-15', bookings: 2, joined: '2024-03-10' },
];

export default function CustomersPage() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('Customers');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700;800;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const filtered = CUSTOMERS.filter(c =>
    `${c.firstname} ${c.lastname} ${c.email}`.toLowerCase().includes(search.toLowerCase())
  );

  const Sidebar = () => (
    <div style={{ width: sidebarOpen ? '260px' : '70px', background: `linear-gradient(180deg, ${DARK} 0%, ${DARK2} 100%)`, borderRight: `3px solid ${ORANGE}`, display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 200, transition: 'width 0.3s ease', overflow: 'hidden' }}>
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
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Rajdhani', sans-serif", background: '#f4f6fb' }}>
      <Sidebar />
      <div style={{ marginLeft: sidebarOpen ? '260px' : '70px', flex: 1, transition: 'margin-left 0.3s ease' }}>
        <div style={{ position: 'sticky', top: 0, zIndex: 100, background: WHITE, padding: '0 32px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: '#f4f6fb', border: 'none', borderRadius: '10px', padding: '8px 12px', cursor: 'pointer', fontSize: '18px' }}>{sidebarOpen ? '◀' : '▶'}</button>
            <div>
              <div style={{ fontSize: '22px', fontWeight: '900', color: DARK }}>Customers</div>
              <div style={{ fontSize: '13px', color: '#999', fontWeight: '600' }}>{CUSTOMERS.length} registered customers</div>
            </div>
          </div>
          <input placeholder="🔍 Search customers..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ padding: '10px 18px', borderRadius: '10px', border: '2px solid #e0e0e0', fontSize: '14px', fontFamily: "'Rajdhani', sans-serif", fontWeight: '600', outline: 'none', width: '240px' }}
            onFocus={e => e.target.style.borderColor = ORANGE} onBlur={e => e.target.style.borderColor = '#e0e0e0'} />
        </div>

        <div style={{ padding: '32px' }}>
          <div style={{ background: WHITE, borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', overflow: 'hidden', border: '1px solid #f0f0f0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: `linear-gradient(135deg, ${DARK} 0%, ${DARK2} 100%)` }}>
                  {['#', 'Customer', 'Email', 'Contact', 'License', 'Expiry', 'Bookings', 'Joined', 'Action'].map((h, i) => (
                    <th key={i} style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '800', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.5px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <tr key={i} style={{ borderTop: '1px solid #f0f0f0', transition: 'background 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#fafbff'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '14px 16px', fontSize: '14px', fontWeight: '700', color: '#999' }}>{i + 1}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '38px', height: '38px', background: `rgba(255,107,0,0.1)`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>👤</div>
                        <div>
                          <div style={{ fontSize: '15px', fontWeight: '800', color: DARK }}>{c.firstname} {c.lastname}</div>
                          <div style={{ fontSize: '12px', color: '#888' }}>{c.address}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: '600', color: '#444' }}>{c.email}</td>
                    <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: '600', color: '#444' }}>{c.contact}</td>
                    <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: '700', color: ORANGE, fontFamily: 'monospace' }}>{c.license}</td>
                    <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: '600', color: '#666' }}>{c.expiry}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ background: 'rgba(255,107,0,0.1)', color: ORANGE, padding: '4px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: '800' }}>{c.bookings}</span>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: '600', color: '#666' }}>{c.joined}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <button onClick={() => setSelectedCustomer(c)}
                        style={{ background: DARK, color: WHITE, padding: '6px 16px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Rajdhani', sans-serif' " }}>
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

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: WHITE, borderRadius: '20px', padding: '36px', width: '480px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '60px', height: '60px', background: ORANGE, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>👤</div>
              <div>
                <div style={{ fontSize: '22px', fontWeight: '900', color: DARK }}>{selectedCustomer.firstname} {selectedCustomer.lastname}</div>
                <div style={{ fontSize: '13px', color: '#888' }}>{selectedCustomer.email}</div>
              </div>
            </div>
            {[
              { label: '📞 Contact', value: selectedCustomer.contact },
              { label: '🏠 Address', value: selectedCustomer.address },
              { label: '🪪 License', value: selectedCustomer.license },
              { label: '📅 Expiry', value: selectedCustomer.expiry },
              { label: '📋 Total Bookings', value: selectedCustomer.bookings },
              { label: '🗓️ Joined', value: selectedCustomer.joined },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#666' }}>{item.label}</span>
                <span style={{ fontSize: '14px', fontWeight: '700', color: DARK }}>{item.value}</span>
              </div>
            ))}
            <button onClick={() => setSelectedCustomer(null)}
              style={{ width: '100%', background: ORANGE, color: WHITE, padding: '13px', borderRadius: '10px', border: 'none', fontSize: '15px', fontWeight: '800', cursor: 'pointer', fontFamily: "'Rajdhani', sans-serif", marginTop: '20px' }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
