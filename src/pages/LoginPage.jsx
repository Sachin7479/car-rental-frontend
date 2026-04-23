import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn, getRole, loginUser, saveToken } from '../services/authService';

const ORANGE = '#FF6B00';
const ORANGE_LIGHT = '#FF8C38';
const DARK = '#1a1a2e';
const WHITE = '#ffffff';

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
  marginBottom: '16px',
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

export default function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState('CUSTOMER');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700;800;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    if (isLoggedIn()) {
      navigate(getRole() === 'ADMIN' ? '/admin/dashboard' : '/');
    }
  }, [navigate]);

  const handleLogin = async () => {
    if (!role) { setError('Please select a role!'); return; }
    if (!email) { setError('Please enter your email!'); return; }
    if (!password) { setError('Please enter your password!'); return; }
    setError('');
    setLoading(true);

    try {
      const response = await loginUser({ role, email, password });

      if (!response.success) {
        setError(response.message || 'Invalid email or password!');
        return;
      }

      saveToken(
        response.token,
        response.role,
        response.name,
        response.id,
        response.email,
        {
          firstname: response.firstname,
          lastname: response.lastname,
          contact: response.contact,
          address: response.address,
          licenseNumber: response.licenseNumber,
          licenseExpiry: response.licenseExpiry,
        }
      );

      navigate(response.role === 'ADMIN' ? '/admin/dashboard' : '/');
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Unable to login right now. Please check your backend connection.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      fontFamily: "'Rajdhani', sans-serif",
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* ── BACKGROUND IMAGE ── */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: `url('https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1800&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(0.45)',
        zIndex: 0,
      }} />

      {/* ── OVERLAY ── */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(26,26,46,0.8) 0%, rgba(255,107,0,0.1) 100%)',
        zIndex: 1,
      }} />

      {/* ── NAVBAR ── */}
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        height: '70px',
        background: 'rgba(26,26,46,0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,107,0,0.2)',
      }}>
        <div
          onClick={() => navigate('/')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
          <span style={{ fontSize: '26px' }}>🚗</span>
          <span style={{
            fontSize: '22px', fontWeight: '800', color: WHITE,
            fontFamily: "'Rajdhani', sans-serif", letterSpacing: '1px',
          }}>
            Car<span style={{ color: ORANGE }}>Rental</span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <span
            onClick={() => navigate('/')}
            style={{ color: '#ccc', cursor: 'pointer', fontSize: '15px', fontWeight: '600' }}
          >
            Home
          </span>
          <span
            onClick={() => navigate('/register')}
            style={{
              color: WHITE, cursor: 'pointer', fontSize: '14px',
              fontWeight: '700', background: ORANGE,
              padding: '8px 22px', borderRadius: '25px',
            }}
          >
            Register
          </span>
        </div>
      </nav>

      {/* ── MAIN CONTENT ── */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '90px 20px 40px',
      }}>
        <div style={{
          display: 'flex',
          width: '100%',
          maxWidth: '950px',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
        }}>

          {/* ── LEFT SIDE ── */}
          <div style={{
            flex: 1,
            background: `linear-gradient(160deg, ${DARK} 0%, #16213e 100%)`,
            padding: '60px 40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            borderRight: `3px solid ${ORANGE}`,
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* decorative circle */}
            <div style={{
              position: 'absolute', top: '-60px', right: '-60px',
              width: '200px', height: '200px',
              borderRadius: '50%',
              background: 'rgba(255,107,0,0.08)',
              border: '1px solid rgba(255,107,0,0.15)',
            }} />
            <div style={{
              position: 'absolute', bottom: '-40px', left: '-40px',
              width: '150px', height: '150px',
              borderRadius: '50%',
              background: 'rgba(255,107,0,0.06)',
              border: '1px solid rgba(255,107,0,0.1)',
            }} />

            <div style={{
              display: 'inline-block',
              background: 'rgba(255,107,0,0.15)',
              color: ORANGE,
              fontSize: '12px', fontWeight: '700',
              letterSpacing: '3px', padding: '6px 16px',
              borderRadius: '20px', marginBottom: '24px',
              width: 'fit-content',
            }}>
              WELCOME BACK
            </div>

            <h2 style={{
              fontSize: '42px', fontWeight: '900',
              color: WHITE, lineHeight: '1.1',
              marginBottom: '16px', letterSpacing: '-0.5px',
            }}>
              Login to<br />
              <span style={{ color: ORANGE }}>CarRental</span>
            </h2>

            <p style={{
              fontSize: '15px', color: 'rgba(255,255,255,0.6)',
              lineHeight: '1.7', marginBottom: '36px',
            }}>
              Access your account to manage bookings, track your rides, and explore our premium fleet.
            </p>

            {/* features */}
            {[
              { icon: '🚗', text: 'Browse 50+ premium cars' },
              { icon: '📅', text: 'Easy booking management' },
              { icon: '💳', text: 'Secure payment system' },
              { icon: '📞', text: '24/7 customer support' },
            ].map((f, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center',
                gap: '12px', marginBottom: '14px',
              }}>
                <span style={{
                  fontSize: '20px',
                  background: 'rgba(255,107,0,0.12)',
                  padding: '6px', borderRadius: '8px',
                }}>
                  {f.icon}
                </span>
                <span style={{
                  fontSize: '14px', color: 'rgba(255,255,255,0.75)',
                  fontWeight: '600',
                }}>
                  {f.text}
                </span>
              </div>
            ))}
          </div>

          {/* ── RIGHT SIDE — FORM ── */}
          <div style={{
            flex: 1,
            background: WHITE,
            padding: '60px 44px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
            {/* header */}
            <div style={{
              width: '56px', height: '56px',
              background: ORANGE,
              borderRadius: '16px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '26px', marginBottom: '20px',
              boxShadow: '0 8px 20px rgba(255,107,0,0.35)',
            }}>
              🔐
            </div>

            <h3 style={{
              fontSize: '30px', fontWeight: '900',
              color: DARK, marginBottom: '6px',
            }}>
              User Login
            </h3>
            <p style={{
              fontSize: '14px', color: '#999',
              marginBottom: '30px', fontWeight: '500',
            }}>
              Enter your credentials to continue
            </p>

            {/* error */}
            {error && (
              <div style={{
                background: '#fff0f0', border: '1px solid #ffcccc',
                color: '#cc0000', padding: '10px 16px',
                borderRadius: '10px', fontSize: '13px',
                fontWeight: '600', marginBottom: '20px',
              }}>
                ⚠️ {error}
              </div>
            )}

            {/* Role Selection */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <button
                onClick={() => { setRole('CUSTOMER'); setError(''); }}
                style={{
                  flex: 1, padding: '12px', borderRadius: '10px', border: 'none',
                  background: role === 'CUSTOMER' ? ORANGE : '#f4f6fb',
                  color: role === 'CUSTOMER' ? WHITE : '#666',
                  fontSize: '15px', fontWeight: '800', cursor: 'pointer',
                  fontFamily: "'Rajdhani', sans-serif",
                  transition: 'all 0.3s',
                  boxShadow: role === 'CUSTOMER' ? '0 4px 15px rgba(255,107,0,0.3)' : 'none'
                }}
              >
                👤 Customer
              </button>
              <button
                onClick={() => { setRole('ADMIN'); setError(''); }}
                style={{
                  flex: 1, padding: '12px', borderRadius: '10px', border: 'none',
                  background: role === 'ADMIN' ? ORANGE : '#f4f6fb',
                  color: role === 'ADMIN' ? WHITE : '#666',
                  fontSize: '15px', fontWeight: '800', cursor: 'pointer',
                  fontFamily: "'Rajdhani', sans-serif",
                  transition: 'all 0.3s',
                  boxShadow: role === 'ADMIN' ? '0 4px 15px rgba(255,107,0,0.3)' : 'none'
                }}
              >
                👨‍💼 Admin
              </button>
            </div>

            {/* Email */}
            <label style={labelStyle}>Email ID</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = ORANGE}
              onBlur={e => e.target.style.borderColor = '#e0e0e0'}
            />

            {/* Password */}
            <label style={labelStyle}>Password</label>
            <div style={{ position: 'relative', marginBottom: '24px' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ ...inputStyle, marginBottom: 0, paddingRight: '48px' }}
                onFocus={e => e.target.style.borderColor = ORANGE}
                onBlur={e => e.target.style.borderColor = '#e0e0e0'}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute', right: '14px', top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer', fontSize: '18px',
                }}
              >
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              style={{
                width: '100%',
                background: loading
                  ? '#ccc'
                  : `linear-gradient(135deg, ${ORANGE} 0%, ${ORANGE_LIGHT} 100%)`,
                color: WHITE,
                padding: '15px',
                borderRadius: '12px',
                border: 'none',
                fontSize: '17px',
                fontWeight: '800',
                fontFamily: "'Rajdhani', sans-serif",
                cursor: loading ? 'not-allowed' : 'pointer',
                letterSpacing: '1px',
                boxShadow: loading ? 'none' : '0 8px 25px rgba(255,107,0,0.4)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                marginBottom: '20px',
              }}
              onMouseEnter={e => {
                if (!loading) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 12px 30px rgba(255,107,0,0.5)';
                }
              }}
              onMouseLeave={e => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 25px rgba(255,107,0,0.4)';
              }}
            >
              {loading ? '⏳ Logging in...' : '🚀 LOGIN'}
            </button>

            {/* divider */}
            <div style={{
              display: 'flex', alignItems: 'center',
              gap: '12px', marginBottom: '20px',
            }}>
              <div style={{ flex: 1, height: '1px', background: '#eee' }} />
              <span style={{ fontSize: '13px', color: '#bbb', fontWeight: '600' }}>OR</span>
              <div style={{ flex: 1, height: '1px', background: '#eee' }} />
            </div>

            {/* Register link */}
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '14px', color: '#888', fontWeight: '600' }}>
                {"Don't have an account? "}
              </span>
              <span
                onClick={() => navigate('/register')}
                style={{
                  color: ORANGE, fontWeight: '800',
                  cursor: 'pointer', fontSize: '14px',
                  textDecoration: 'underline',
                }}
              >
                Register here
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
