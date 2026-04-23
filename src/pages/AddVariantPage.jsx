import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ORANGE = '#FF6B00';
const DARK = '#1a1a2e';
const DARK2 = '#16213e';
const WHITE = '#ffffff';

const MENU_ITEMS = [
  { icon: '📊', label: 'Dashboard', path: '/admin/dashboard' },
  { icon: '🏢', label: 'Add Company', path: '/admin/add-company' },
  { icon: '🚗', label: 'Add Variant', path: '/admin/add-variant', active: true },
  { icon: '🚙', label: 'All Variants', path: '/admin/variants' },
  { icon: '📅', label: 'Bookings', path: '/admin/bookings' },
  { icon: '👥', label: 'Customers', path: '/admin/customers' },
];

const inputStyle = {
  width: '100%', padding: '13px 16px', borderRadius: '10px',
  border: '2px solid #e0e0e0', fontSize: '15px',
  fontFamily: "'Rajdhani', sans-serif", fontWeight: '600',
  color: '#333', background: '#fafafa', outline: 'none',
  marginBottom: '18px', boxSizing: 'border-box', transition: 'border-color 0.3s',
};

const labelStyle = {
  display: 'block', fontSize: '14px', fontWeight: '700',
  color: ORANGE, marginBottom: '6px',
  fontFamily: "'Rajdhani', sans-serif", letterSpacing: '0.5px',
};

export default function AddVariantPage() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('Add Variant');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({
    variantName: '', description: '', company: '',
    modelNumber: '', year: '', fuelType: '',
    isAC: '', seatCapacity: '', rentPerDay: '',
  });

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700;800;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = () => {
    if (!form.variantName) { setError('Please enter variant name!'); return; }
    if (!form.company) { setError('Please select company!'); return; }
    if (!form.fuelType) { setError('Please select fuel type!'); return; }
    if (!form.rentPerDay) { setError('Please enter rent per day!'); return; }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(`Variant "${form.variantName}" added successfully!`);
      setForm({ variantName: '', description: '', company: '', modelNumber: '', year: '', fuelType: '', isAC: '', seatCapacity: '', rentPerDay: '' });
      setTimeout(() => setSuccess(''), 3000);
    }, 1000);
  };

  const Sidebar = () => (
    <div style={{
      width: sidebarOpen ? '260px' : '70px',
      background: `linear-gradient(180deg, ${DARK} 0%, ${DARK2} 100%)`,
      borderRight: `3px solid ${ORANGE}`,
      display: 'flex', flexDirection: 'column',
      position: 'fixed', top: 0, left: 0, bottom: 0,
      zIndex: 200, transition: 'width 0.3s ease', overflow: 'hidden',
    }}>
      <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,107,0,0.2)', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        onClick={() => navigate('/')}>
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
            style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '12px', borderRadius: '12px', marginBottom: '4px', cursor: 'pointer',
              background: activeMenu === item.label ? 'rgba(255,107,0,0.15)' : 'transparent',
              border: activeMenu === item.label ? '1px solid rgba(255,107,0,0.3)' : '1px solid transparent',
            }}>
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
        <div style={{
          position: 'sticky', top: 0, zIndex: 100, background: WHITE,
          padding: '0 32px', height: '70px', display: 'flex',
          alignItems: 'center', justifyContent: 'space-between',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)', borderBottom: '1px solid #f0f0f0',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: '#f4f6fb', border: 'none', borderRadius: '10px', padding: '8px 12px', cursor: 'pointer', fontSize: '18px' }}>
              {sidebarOpen ? '◀' : '▶'}
            </button>
            <div>
              <div style={{ fontSize: '22px', fontWeight: '900', color: DARK }}>Add Variant</div>
              <div style={{ fontSize: '13px', color: '#999', fontWeight: '600' }}>Add new car variant to fleet</div>
            </div>
          </div>
        </div>

        <div style={{ padding: '32px' }}>
          <div style={{ background: WHITE, borderRadius: '20px', padding: '36px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #f0f0f0', maxWidth: '900px' }}>
            <div style={{ width: '52px', height: '52px', background: ORANGE, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '18px', boxShadow: '0 8px 20px rgba(255,107,0,0.35)' }}>🚗</div>
            <h2 style={{ fontSize: '24px', fontWeight: '900', color: DARK, marginBottom: '6px' }}>Add Car Variant</h2>
            <p style={{ fontSize: '14px', color: '#999', fontWeight: '600', marginBottom: '28px' }}>Fill in the details to add a new car variant</p>

            {error && <div style={{ background: '#fff0f0', border: '1px solid #ffcccc', color: '#cc0000', padding: '10px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: '600', marginBottom: '18px' }}>⚠️ {error}</div>}
            {success && <div style={{ background: '#f0fff4', border: '1px solid #86efac', color: '#16a34a', padding: '10px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: '600', marginBottom: '18px' }}>✅ {success}</div>}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={labelStyle}>Variant Name</label>
                <input name="variantName" placeholder="e.g. Nexon Pro" value={form.variantName} onChange={handleChange} style={inputStyle}
                  onFocus={e => e.target.style.borderColor = ORANGE} onBlur={e => e.target.style.borderColor = '#e0e0e0'} />
              </div>
              <div>
                <label style={labelStyle}>Model Number</label>
                <input name="modelNumber" placeholder="e.g. Tata-X" value={form.modelNumber} onChange={handleChange} style={inputStyle}
                  onFocus={e => e.target.style.borderColor = ORANGE} onBlur={e => e.target.style.borderColor = '#e0e0e0'} />
              </div>
              <div>
                <label style={labelStyle}>Company</label>
                <select name="company" value={form.company} onChange={handleChange} style={inputStyle}>
                  <option value="">Select Company</option>
                  <option>Tata</option>
                  <option>Mahindra</option>
                  <option>Maruti Suzuki</option>
                  <option>Hyundai</option>
                  <option>Renault</option>
                  <option>Toyota</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Year</label>
                <input name="year" placeholder="e.g. 2023" value={form.year} onChange={handleChange} style={inputStyle}
                  onFocus={e => e.target.style.borderColor = ORANGE} onBlur={e => e.target.style.borderColor = '#e0e0e0'} />
              </div>
              <div>
                <label style={labelStyle}>Fuel Type</label>
                <select name="fuelType" value={form.fuelType} onChange={handleChange} style={inputStyle}>
                  <option value="">Select Fuel Type</option>
                  <option>Petrol</option>
                  <option>Diesel</option>
                  <option>Electric</option>
                  <option>Hybrid</option>
                  <option>CNG</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Is AC</label>
                <select name="isAC" value={form.isAC} onChange={handleChange} style={inputStyle}>
                  <option value="">Select AC Option</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Seat Capacity</label>
                <input name="seatCapacity" placeholder="e.g. 5" value={form.seatCapacity} onChange={handleChange} style={inputStyle}
                  onFocus={e => e.target.style.borderColor = ORANGE} onBlur={e => e.target.style.borderColor = '#e0e0e0'} />
              </div>
              <div>
                <label style={labelStyle}>Rent Per Day (₹)</label>
                <input name="rentPerDay" placeholder="e.g. 2500" value={form.rentPerDay} onChange={handleChange} style={inputStyle}
                  onFocus={e => e.target.style.borderColor = ORANGE} onBlur={e => e.target.style.borderColor = '#e0e0e0'} />
              </div>
            </div>

            <label style={labelStyle}>Variant Description</label>
            <textarea name="description" placeholder="Enter variant description..." value={form.description} onChange={handleChange} rows={3}
              style={{ ...inputStyle, resize: 'none', lineHeight: '1.5' }}
              onFocus={e => e.target.style.borderColor = ORANGE} onBlur={e => e.target.style.borderColor = '#e0e0e0'} />

            <label style={labelStyle}>Variant Image</label>
            <input type="file" accept="image/*" style={{ ...inputStyle, padding: '10px 16px' }} />

            <button onClick={handleAdd} style={{
              width: '100%', background: loading ? '#ccc' : `linear-gradient(135deg, ${ORANGE} 0%, #FF8C38 100%)`,
              color: WHITE, padding: '15px', borderRadius: '12px', border: 'none',
              fontSize: '17px', fontWeight: '800', fontFamily: "'Rajdhani', sans-serif",
              cursor: loading ? 'not-allowed' : 'pointer', letterSpacing: '1px',
              boxShadow: '0 8px 25px rgba(255,107,0,0.4)', marginTop: '8px',
            }}>
              {loading ? '⏳ Adding...' : '🚗 ADD VARIANT'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
