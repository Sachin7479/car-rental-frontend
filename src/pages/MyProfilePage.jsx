import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getAddress,
  getContact,
  getEmail,
  getFirstname,
  getLastname,
  getLicenseExpiry,
  getLicenseNumber,
  getRole,
  isLoggedIn,
  logout,
} from '../services/authService';

const ORANGE = '#FF6B00';
const DARK = '#1a1a2e';
const WHITE = '#ffffff';

const inputStyle = {
  width: '100%', padding: '13px 16px', borderRadius: '10px',
  border: '2px solid #e0e0e0', fontSize: '15px',
  fontFamily: "'Rajdhani', sans-serif", fontWeight: '600',
  color: '#333', background: '#fafafa', outline: 'none',
  marginBottom: '16px', boxSizing: 'border-box', transition: 'border-color 0.3s',
};

const labelStyle = {
  display: 'block', fontSize: '14px', fontWeight: '700',
  color: ORANGE, marginBottom: '6px',
  fontFamily: "'Rajdhani', sans-serif", letterSpacing: '0.5px',
};

export default function MyProfilePage() {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [success, setSuccess] = useState('');
  const [profile, setProfile] = useState({
    firstname: '',
    lastname: '',
    email: '',
    contact: '',
    address: '',
    licenseNumber: '',
    licenseExpiry: '',
  });

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700;800;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    if (!isLoggedIn() || getRole() !== 'CUSTOMER') {
      navigate('/login');
      return;
    }

    setProfile({
      firstname: getFirstname() || '',
      lastname: getLastname() || '',
      email: getEmail() || '',
      contact: getContact() || '',
      address: getAddress() || '',
      licenseNumber: getLicenseNumber() || '',
      licenseExpiry: getLicenseExpiry() || '',
    });
  }, [navigate]);

  const handleChange = e => setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleSave = () => {
    setEditing(false);
    setSuccess('Profile updated successfully!');
    setTimeout(() => setSuccess(''), 3000);
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
            { label: '📅 My Bookings', path: '/customer/bookings' },
            { label: '👤 My Profile', path: '/customer/profile', active: true },
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
            fontSize: '14px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Rajdhani', sans-serif",
          }}>🚪 Logout</button>
        </div>
      </nav>

      <div style={{ padding: '100px 40px 60px', maxWidth: '900px', margin: '0 auto' }}>

        {/* Profile Header */}
        <div style={{
          background: `linear-gradient(135deg, ${DARK} 0%, #16213e 100%)`,
          borderRadius: '20px', padding: '36px',
          display: 'flex', alignItems: 'center', gap: '28px',
          marginBottom: '28px',
          border: `2px solid rgba(255,107,0,0.2)`,
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(255,107,0,0.08)', border: '1px solid rgba(255,107,0,0.15)' }} />
          <div style={{
            width: '90px', height: '90px', background: ORANGE,
            borderRadius: '20px', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '40px', flexShrink: 0,
            boxShadow: '0 8px 24px rgba(255,107,0,0.4)',
          }}>👤</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '30px', fontWeight: '900', color: WHITE, marginBottom: '4px' }}>
              {profile.firstname} {profile.lastname}
            </div>
            <div style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', marginBottom: '12px' }}>{profile.email}</div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <span style={{ background: 'rgba(255,107,0,0.15)', color: ORANGE, padding: '4px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '700' }}>🚗 Customer</span>
              <span style={{ background: 'rgba(22,163,74,0.15)', color: '#16a34a', padding: '4px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '700' }}>✅ Verified</span>
            </div>
          </div>
          <button onClick={() => setEditing(!editing)} style={{
            background: editing ? '#f0fff4' : ORANGE,
            color: editing ? '#16a34a' : WHITE,
            padding: '10px 24px', borderRadius: '12px', border: 'none',
            fontSize: '15px', fontWeight: '800', cursor: 'pointer',
            fontFamily: "'Rajdhani', sans-serif",
          }}>
            {editing ? '✏️ Editing...' : '✏️ Edit Profile'}
          </button>
        </div>

        {success && (
          <div style={{ background: '#f0fff4', border: '1px solid #86efac', color: '#16a34a', padding: '12px 18px', borderRadius: '10px', fontSize: '14px', fontWeight: '700', marginBottom: '20px' }}>
            ✅ {success}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

          {/* Personal Info */}
          <div style={{ background: WHITE, borderRadius: '20px', padding: '28px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #f0f0f0' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '900', color: DARK, marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid #f0f0f0' }}>
              👤 Personal Information
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
              <div>
                <label style={labelStyle}>First Name</label>
                <input name="firstname" value={profile.firstname} onChange={handleChange} disabled={!editing} style={{ ...inputStyle, background: editing ? '#fafafa' : '#f8f9ff', cursor: editing ? 'text' : 'default' }}
                  onFocus={e => editing && (e.target.style.borderColor = ORANGE)} onBlur={e => e.target.style.borderColor = '#e0e0e0'} />
              </div>
              <div>
                <label style={labelStyle}>Last Name</label>
                <input name="lastname" value={profile.lastname} onChange={handleChange} disabled={!editing} style={{ ...inputStyle, background: editing ? '#fafafa' : '#f8f9ff', cursor: editing ? 'text' : 'default' }}
                  onFocus={e => editing && (e.target.style.borderColor = ORANGE)} onBlur={e => e.target.style.borderColor = '#e0e0e0'} />
              </div>
            </div>
            <label style={labelStyle}>Email ID</label>
            <input name="email" value={profile.email} onChange={handleChange} disabled={!editing} style={{ ...inputStyle, background: editing ? '#fafafa' : '#f8f9ff', cursor: editing ? 'text' : 'default' }}
              onFocus={e => editing && (e.target.style.borderColor = ORANGE)} onBlur={e => e.target.style.borderColor = '#e0e0e0'} />
            <label style={labelStyle}>Contact Number</label>
            <input name="contact" value={profile.contact} onChange={handleChange} disabled={!editing} style={{ ...inputStyle, background: editing ? '#fafafa' : '#f8f9ff', cursor: editing ? 'text' : 'default' }}
              onFocus={e => editing && (e.target.style.borderColor = ORANGE)} onBlur={e => e.target.style.borderColor = '#e0e0e0'} />
            <label style={labelStyle}>Address</label>
            <textarea name="address" value={profile.address} onChange={handleChange} disabled={!editing} rows={3}
              style={{ ...inputStyle, resize: 'none', lineHeight: '1.5', background: editing ? '#fafafa' : '#f8f9ff', cursor: editing ? 'text' : 'default' }}
              onFocus={e => editing && (e.target.style.borderColor = ORANGE)} onBlur={e => e.target.style.borderColor = '#e0e0e0'} />
          </div>

          {/* License Info */}
          <div style={{ background: WHITE, borderRadius: '20px', padding: '28px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #f0f0f0' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '900', color: DARK, marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid #f0f0f0' }}>
              🪪 Driving License
            </h3>

            {/* License Card */}
            <div style={{
              background: `linear-gradient(135deg, #1e3a5f 0%, #0a2240 100%)`,
              borderRadius: '16px', padding: '20px', marginBottom: '20px',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontWeight: '700', letterSpacing: '2px', marginBottom: '16px', textTransform: 'uppercase' }}>Driver License</div>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ width: '50px', height: '60px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>👤</div>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: '900', color: WHITE }}>{profile.firstname} {profile.lastname}</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>{profile.licenseNumber}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>Expires: {profile.licenseExpiry}</div>
                </div>
              </div>
            </div>

            <label style={labelStyle}>License Number</label>
            <input name="licenseNumber" value={profile.licenseNumber} onChange={handleChange} disabled={!editing} style={{ ...inputStyle, background: editing ? '#fafafa' : '#f8f9ff', cursor: editing ? 'text' : 'default' }}
              onFocus={e => editing && (e.target.style.borderColor = ORANGE)} onBlur={e => e.target.style.borderColor = '#e0e0e0'} />
            <label style={labelStyle}>License Expiry Date</label>
            <input type="date" name="licenseExpiry" value={profile.licenseExpiry} onChange={handleChange} disabled={!editing} style={{ ...inputStyle, background: editing ? '#fafafa' : '#f8f9ff', cursor: editing ? 'text' : 'default' }}
              onFocus={e => editing && (e.target.style.borderColor = ORANGE)} onBlur={e => e.target.style.borderColor = '#e0e0e0'} />

            {editing && (
              <button onClick={handleSave} style={{
                width: '100%', background: `linear-gradient(135deg, ${ORANGE} 0%, #FF8C38 100%)`,
                color: WHITE, padding: '14px', borderRadius: '12px', border: 'none',
                fontSize: '16px', fontWeight: '800', cursor: 'pointer',
                fontFamily: "'Rajdhani', sans-serif", boxShadow: '0 8px 25px rgba(255,107,0,0.4)', marginTop: '8px',
              }}>
                💾 SAVE CHANGES
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
