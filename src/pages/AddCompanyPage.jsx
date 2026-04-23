import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ORANGE = '#FF6B00';
const DARK = '#1a1a2e';
const DARK2 = '#16213e';
const WHITE = '#ffffff';

const MENU_ITEMS = [
  { icon: '📊', label: 'Dashboard', path: '/admin/dashboard' },
  { icon: '🏢', label: 'Add Company', path: '/admin/add-company', active: true },
  { icon: '🚗', label: 'Add Variant', path: '/admin/add-variant' },
  { icon: '🚙', label: 'All Variants', path: '/admin/variants' },
  { icon: '📅', label: 'Bookings', path: '/admin/bookings' },
  { icon: '👥', label: 'Customers', path: '/admin/customers' },
];

const inputStyle = {
  width: '100%',
  padding: '13px 16px',
  borderRadius: '10px',
  border: '2px solid #e0e0e0',
  fontSize: '15px',
  fontFamily: "'Rajdhani', sans-serif",
  fontWeight: '600',
  color: '#333',
  background: '#fafafa',
  outline: 'none',
  marginBottom: '18px',
  boxSizing: 'border-box',
  transition: 'border-color 0.3s',
};

const labelStyle = {
  display: 'block',
  fontSize: '14px',
  fontWeight: '700',
  color: ORANGE,
  marginBottom: '6px',
  fontFamily: "'Rajdhani', sans-serif",
  letterSpacing: '0.5px',
};

// Sample companies list
const INITIAL_COMPANIES = [
  { id: 1, name: 'Tata', description: 'Indian multinational automotive company' },
  { id: 2, name: 'Mahindra', description: 'Indian multinational automotive manufacturer' },
  { id: 3, name: 'Maruti Suzuki', description: 'Largest car manufacturer in India' },
  { id: 4, name: 'Hyundai', description: 'South Korean multinational automotive manufacturer' },
  { id: 5, name: 'Renault', description: 'French multinational automobile manufacturer' },
];

export default function AddCompanyPage() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('Add Company');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [companies, setCompanies] = useState(INITIAL_COMPANIES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700;800;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const handleAdd = () => {
    if (!name) { setError('Please enter company name!'); return; }
    if (!description) { setError('Please enter description!'); return; }
    setError('');
    setLoading(true);
    setTimeout(() => {
      const newCompany = {
        id: companies.length + 1,
        name,
        description,
      };
      setCompanies([...companies, newCompany]);
      setName('');
      setDescription('');
      setLoading(false);
      setSuccess(`Company "${newCompany.name}" added successfully!`);
      setTimeout(() => setSuccess(''), 3000);
    }, 1000);
  };

  const handleDelete = (id) => {
    setCompanies(companies.filter(c => c.id !== id));
  };

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
        <div style={{
          padding: '24px 20px',
          borderBottom: '1px solid rgba(255,107,0,0.2)',
          display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer',
        }} onClick={() => navigate('/')}>
          <span style={{ fontSize: '28px', flexShrink: 0 }}>🚗</span>
          {sidebarOpen && (
            <span style={{ fontSize: '20px', fontWeight: '900', color: WHITE, whiteSpace: 'nowrap' }}>
              Car<span style={{ color: ORANGE }}>Rental</span>
            </span>
          )}
        </div>
        {sidebarOpen && (
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '42px', height: '42px', background: ORANGE,
                borderRadius: '12px', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '20px', flexShrink: 0,
              }}>👨‍💼</div>
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
              {sidebarOpen && (
                <span style={{
                  fontSize: '15px',
                  fontWeight: activeMenu === item.label ? '800' : '600',
                  color: activeMenu === item.label ? ORANGE : 'rgba(255,255,255,0.7)',
                  whiteSpace: 'nowrap',
                }}>{item.label}</span>
              )}
            </div>
          ))}
        </div>
        <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div onClick={() => navigate('/login')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '12px', cursor: 'pointer' }}>
            <span style={{ fontSize: '20px', flexShrink: 0 }}>🚪</span>
            {sidebarOpen && <span style={{ fontSize: '15px', fontWeight: '700', color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap' }}>Logout</span>}
          </div>
        </div>
      </div>

      {/* ── MAIN ── */}
      <div style={{ marginLeft: sidebarOpen ? '260px' : '70px', flex: 1, transition: 'margin-left 0.3s ease' }}>
        {/* Topbar */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 100,
          background: WHITE, padding: '0 32px', height: '70px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)', borderBottom: '1px solid #f0f0f0',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ background: '#f4f6fb', border: 'none', borderRadius: '10px', padding: '8px 12px', cursor: 'pointer', fontSize: '18px' }}>
              {sidebarOpen ? '◀' : '▶'}
            </button>
            <div>
              <div style={{ fontSize: '22px', fontWeight: '900', color: DARK }}>Add Company</div>
              <div style={{ fontSize: '13px', color: '#999', fontWeight: '600' }}>Manage car companies</div>
            </div>
          </div>
        </div>

        <div style={{ padding: '32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>

            {/* Add Form */}
            <div style={{
              background: WHITE, borderRadius: '20px',
              padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              border: '1px solid #f0f0f0',
            }}>
              <div style={{
                width: '52px', height: '52px', background: ORANGE,
                borderRadius: '14px', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '24px', marginBottom: '18px',
                boxShadow: '0 8px 20px rgba(255,107,0,0.35)',
              }}>🏢</div>
              <h2 style={{ fontSize: '24px', fontWeight: '900', color: DARK, marginBottom: '6px' }}>Add Company</h2>
              <p style={{ fontSize: '14px', color: '#999', fontWeight: '600', marginBottom: '24px' }}>Add a new car company to the system</p>

              {error && (
                <div style={{
                  background: '#fff0f0', border: '1px solid #ffcccc',
                  color: '#cc0000', padding: '10px 16px', borderRadius: '10px',
                  fontSize: '13px', fontWeight: '600', marginBottom: '18px',
                }}>⚠️ {error}</div>
              )}
              {success && (
                <div style={{
                  background: '#f0fff4', border: '1px solid #86efac',
                  color: '#16a34a', padding: '10px 16px', borderRadius: '10px',
                  fontSize: '13px', fontWeight: '600', marginBottom: '18px',
                }}>✅ {success}</div>
              )}

              <label style={labelStyle}>Company Name</label>
              <input
                placeholder="e.g. Toyota"
                value={name}
                onChange={e => setName(e.target.value)}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = ORANGE}
                onBlur={e => e.target.style.borderColor = '#e0e0e0'}
              />

              <label style={labelStyle}>Description</label>
              <textarea
                placeholder="Enter company description..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={4}
                style={{ ...inputStyle, resize: 'none', lineHeight: '1.5' }}
                onFocus={e => e.target.style.borderColor = ORANGE}
                onBlur={e => e.target.style.borderColor = '#e0e0e0'}
              />

              <button
                onClick={handleAdd}
                style={{
                  width: '100%',
                  background: loading ? '#ccc' : `linear-gradient(135deg, ${ORANGE} 0%, #FF8C38 100%)`,
                  color: WHITE, padding: '15px', borderRadius: '12px',
                  border: 'none', fontSize: '17px', fontWeight: '800',
                  fontFamily: "'Rajdhani', sans-serif", cursor: loading ? 'not-allowed' : 'pointer',
                  letterSpacing: '1px', boxShadow: '0 8px 25px rgba(255,107,0,0.4)',
                }}
              >
                {loading ? '⏳ Adding...' : '🏢 ADD COMPANY'}
              </button>
            </div>

            {/* Companies List */}
            <div style={{
              background: WHITE, borderRadius: '20px',
              padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              border: '1px solid #f0f0f0',
            }}>
              <h2 style={{ fontSize: '22px', fontWeight: '900', color: DARK, marginBottom: '6px' }}>All Companies</h2>
              <p style={{ fontSize: '14px', color: '#999', fontWeight: '600', marginBottom: '20px' }}>
                {companies.length} companies registered
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {companies.map((company) => (
                  <div key={company.id} style={{
                    background: '#f8f9ff', borderRadius: '12px',
                    padding: '16px 18px', border: '1px solid #eef0f8',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    transition: 'transform 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateX(4px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '40px', height: '40px', background: 'rgba(255,107,0,0.1)',
                        borderRadius: '10px', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', fontSize: '20px', flexShrink: 0,
                      }}>🏢</div>
                      <div>
                        <div style={{ fontSize: '16px', fontWeight: '800', color: DARK }}>{company.name}</div>
                        <div style={{ fontSize: '12px', color: '#888', fontWeight: '500' }}>{company.description}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(company.id)}
                      style={{
                        background: '#fee2e2', color: '#dc2626',
                        border: 'none', padding: '6px 14px',
                        borderRadius: '8px', fontSize: '13px',
                        fontWeight: '700', cursor: 'pointer',
                        fontFamily: "'Rajdhani', sans-serif",
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
