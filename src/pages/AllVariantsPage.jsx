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
  { icon: '🚙', label: 'All Variants', path: '/admin/variants', active: true },
  { icon: '📅', label: 'Bookings', path: '/admin/bookings' },
  { icon: '👥', label: 'Customers', path: '/admin/customers' },
];

const VARIANTS = [
  { id: 1, name: 'Tata Nexon Pro', company: 'Tata', model: 'Tata-X', fuel: 'Petrol', seats: 5, year: 2023, isAC: true, rent: 2500, img: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&q=80', vehicles: ['MH03***728', 'MH03***920'] },
  { id: 2, name: 'Mahindra Thar', company: 'Mahindra', model: 'Thar-X', fuel: 'Diesel', seats: 4, year: 2022, isAC: true, rent: 3500, img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&q=80', vehicles: ['MH05***671'] },
  { id: 3, name: 'Maruti Fronx', company: 'Maruti Suzuki', model: 'Fronx-Z', fuel: 'Petrol', seats: 5, year: 2023, isAC: true, rent: 2999, img: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&q=80', vehicles: ['MH04***111'] },
  { id: 4, name: 'Kwid RXE-10', company: 'Renault', model: 'Kwid-X', fuel: 'Petrol', seats: 5, year: 2022, isAC: false, rent: 1499, img: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&q=80', vehicles: ['MH06***222', 'MH06***333', 'MH06***444'] },
];

export default function AllVariantsPage() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('All Variants');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [variants, setVariants] = useState(VARIANTS);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [newRegNumber, setNewRegNumber] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700;800;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const handleAddVehicle = () => {
    if (!newRegNumber) return;
    setVariants(variants.map(v =>
      v.id === selectedVariant.id
        ? { ...v, vehicles: [...v.vehicles, newRegNumber.toUpperCase()] }
        : v
    ));
    setNewRegNumber('');
    setShowModal(false);
  };

  const handleDeleteVehicle = (variantId, regNum) => {
    setVariants(variants.map(v =>
      v.id === variantId
        ? { ...v, vehicles: v.vehicles.filter(r => r !== regNum) }
        : v
    ));
  };

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
              <div style={{ fontSize: '22px', fontWeight: '900', color: DARK }}>All Variants</div>
              <div style={{ fontSize: '13px', color: '#999', fontWeight: '600' }}>{variants.length} car variants</div>
            </div>
          </div>
          <button onClick={() => navigate('/admin/add-variant')} style={{ background: ORANGE, color: WHITE, padding: '10px 22px', borderRadius: '10px', border: 'none', fontSize: '14px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Rajdhani', sans-serif" }}>+ Add Variant</button>
        </div>

        <div style={{ padding: '32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
            {variants.map(v => (
              <div key={v.id} style={{ background: WHITE, borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid #f0f0f0' }}>
                <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                  <img src={v.img} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={e => e.target.src = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&q=80'} />
                  <div style={{ position: 'absolute', top: '12px', right: '12px', background: ORANGE, color: WHITE, padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' }}>
                    ₹{v.rent.toLocaleString()}/day
                  </div>
                </div>
                <div style={{ padding: '20px' }}>
                  <div style={{ fontSize: '20px', fontWeight: '900', color: DARK, marginBottom: '8px' }}>{v.name}</div>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    {[
                      { icon: '⛽', val: v.fuel },
                      { icon: '💺', val: `${v.seats} seats` },
                      { icon: '📅', val: v.year },
                      { icon: '❄️', val: v.isAC ? 'AC' : 'No AC' },
                    ].map((m, i) => (
                      <span key={i} style={{ fontSize: '13px', color: '#666', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {m.icon} {m.val}
                      </span>
                    ))}
                  </div>

                  {/* Vehicles */}
                  <div style={{ background: '#f8f9ff', borderRadius: '12px', padding: '14px', marginBottom: '14px' }}>
                    <div style={{ fontSize: '13px', fontWeight: '800', color: DARK, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      🚙 Registered Vehicles ({v.vehicles.length})
                    </div>
                    {v.vehicles.map((reg, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', background: WHITE, padding: '8px 12px', borderRadius: '8px', border: '1px solid #eee' }}>
                        <span style={{ fontSize: '13px', fontWeight: '700', color: DARK, fontFamily: 'monospace' }}>{reg}</span>
                        <span style={{ fontSize: '11px', background: '#dcfce7', color: '#16a34a', padding: '3px 8px', borderRadius: '10px', fontWeight: '700' }}>Active</span>
                        <button onClick={() => handleDeleteVehicle(v.id, reg)} style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Rajdhani', sans-serif" }}>Delete</button>
                      </div>
                    ))}
                    <button onClick={() => { setSelectedVariant(v); setShowModal(true); }}
                      style={{ width: '100%', background: `rgba(255,107,0,0.1)`, color: ORANGE, border: `1px dashed ${ORANGE}`, padding: '8px', borderRadius: '8px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Rajdhani', sans-serif", marginTop: '6px' }}>
                      + Add Vehicle
                    </button>
                  </div>

                  <button onClick={() => navigate(`/car/detail/${v.id}`)}
                    style={{ width: '100%', background: DARK, color: WHITE, border: 'none', padding: '10px', borderRadius: '10px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Rajdhani', sans-serif" }}>
                    View Detail Page
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Vehicle Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: WHITE, borderRadius: '20px', padding: '36px', width: '420px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
            <h3 style={{ fontSize: '22px', fontWeight: '900', color: DARK, marginBottom: '6px' }}>Add Vehicle</h3>
            <p style={{ fontSize: '14px', color: '#999', marginBottom: '24px' }}>Variant: <strong>{selectedVariant ? selectedVariant.name : ''}</strong></p>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', color: ORANGE, marginBottom: '8px' }}>Registration Number</label>
            <input
              placeholder="e.g. MH03AB1234"
              value={newRegNumber}
              onChange={e => setNewRegNumber(e.target.value)}
              style={{ width: '100%', padding: '13px 16px', borderRadius: '10px', border: '2px solid #e0e0e0', fontSize: '15px', fontFamily: "'Rajdhani', sans-serif", fontWeight: '600', marginBottom: '24px', outline: 'none', boxSizing: 'border-box' }}
              onFocus={e => e.target.style.borderColor = ORANGE}
              onBlur={e => e.target.style.borderColor = '#e0e0e0'}
            />
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, background: '#f4f6fb', color: DARK, padding: '13px', borderRadius: '10px', border: 'none', fontSize: '15px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Rajdhani', sans-serif" }}>Cancel</button>
              <button onClick={handleAddVehicle} style={{ flex: 2, background: ORANGE, color: WHITE, padding: '13px', borderRadius: '10px', border: 'none', fontSize: '15px', fontWeight: '800', cursor: 'pointer', fontFamily: "'Rajdhani', sans-serif" }}>🚙 Add Vehicle</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
