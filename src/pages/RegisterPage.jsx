import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerCustomer } from '../services/authService';

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

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    contact: '',
    address: '',
    licenseNumber: '',
    licenseExpiry: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1); // step 1 = personal info, step 2 = license info

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700;800;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (!form.firstname) { setError('Please enter first name!'); return; }
    if (!form.lastname) { setError('Please enter last name!'); return; }
    if (!form.email) { setError('Please enter email!'); return; }
    if (!form.password) { setError('Please enter password!'); return; }
    if (form.password !== form.confirmPassword) { setError('Passwords do not match!'); return; }
    if (!form.contact) { setError('Please enter contact number!'); return; }
    setError('');
    setStep(2);
  };

  const handleRegister = async () => {
    if (!form.licenseNumber) { setError('Please enter license number!'); return; }
    if (!form.licenseExpiry) { setError('Please enter license expiry date!'); return; }
    if (!form.address) { setError('Please enter address!'); return; }
    setError('');
    setLoading(true);

    try {
      const response = await registerCustomer({
        firstname: form.firstname,
        lastname: form.lastname,
        email: form.email,
        password: form.password,
        contact: form.contact,
        address: form.address,
        licenseNumber: form.licenseNumber,
        licenseExpiry: form.licenseExpiry,
      });

      if (!response.success) {
        setError(response.message || 'Registration failed!');
        return;
      }

      alert(response.message || 'Registered successfully!');
      navigate('/login');
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Unable to register right now. Please check your backend connection.'
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
    }}>

      {/* ── BACKGROUND ── */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: `url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1800&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(0.4)',
        zIndex: 0,
      }} />
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(26,26,46,0.75) 0%, rgba(255,107,0,0.1) 100%)',
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
            onClick={() => navigate('/login')}
            style={{
              color: WHITE, cursor: 'pointer', fontSize: '14px',
              fontWeight: '700', background: ORANGE,
              padding: '8px 22px', borderRadius: '25px',
            }}
          >
            Login
          </span>
        </div>
      </nav>

      {/* ── MAIN ── */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '90px 20px 40px',
      }}>
        <div style={{
          display: 'flex',
          width: '100%',
          maxWidth: '980px',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
        }}>

          {/* ── LEFT ── */}
          <div style={{
            flex: '0 0 340px',
            background: `linear-gradient(160deg, ${DARK} 0%, #16213e 100%)`,
            padding: '50px 36px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            borderRight: `3px solid ${ORANGE}`,
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* decorative circles */}
            <div style={{
              position: 'absolute', top: '-50px', right: '-50px',
              width: '180px', height: '180px', borderRadius: '50%',
              background: 'rgba(255,107,0,0.08)',
              border: '1px solid rgba(255,107,0,0.15)',
            }} />
            <div style={{
              position: 'absolute', bottom: '-30px', left: '-30px',
              width: '130px', height: '130px', borderRadius: '50%',
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
              JOIN US TODAY
            </div>

            <h2 style={{
              fontSize: '38px', fontWeight: '900',
              color: WHITE, lineHeight: '1.1',
              marginBottom: '14px', letterSpacing: '-0.5px',
            }}>
              Create Your<br />
              <span style={{ color: ORANGE }}>Account</span>
            </h2>

            <p style={{
              fontSize: '14px', color: 'rgba(255,255,255,0.6)',
              lineHeight: '1.7', marginBottom: '30px',
            }}>
              Join thousands of happy customers and start your journey with us today!
            </p>

            {/* steps indicator */}
            <div style={{ marginBottom: '30px' }}>
              <div style={{
                fontSize: '13px', fontWeight: '700',
                color: 'rgba(255,255,255,0.5)',
                marginBottom: '12px', letterSpacing: '1px',
                textTransform: 'uppercase',
              }}>
                Registration Steps
              </div>
              {[
                { num: 1, label: 'Personal Information' },
                { num: 2, label: 'License & Address' },
              ].map(s => (
                <div key={s.num} style={{
                  display: 'flex', alignItems: 'center',
                  gap: '12px', marginBottom: '12px',
                }}>
                  <div style={{
                    width: '32px', height: '32px',
                    borderRadius: '50%',
                    background: step >= s.num ? ORANGE : 'rgba(255,255,255,0.1)',
                    border: `2px solid ${step >= s.num ? ORANGE : 'rgba(255,255,255,0.2)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '14px', fontWeight: '800',
                    color: WHITE,
                    transition: 'all 0.3s',
                    flexShrink: 0,
                  }}>
                    {step > s.num ? '✓' : s.num}
                  </div>
                  <span style={{
                    fontSize: '14px',
                    color: step >= s.num ? WHITE : 'rgba(255,255,255,0.4)',
                    fontWeight: step >= s.num ? '700' : '500',
                    transition: 'color 0.3s',
                  }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* benefits */}
            {[
              { icon: '🚗', text: 'Access 50+ premium cars' },
              { icon: '💰', text: 'Best prices guaranteed' },
              { icon: '📅', text: 'Easy booking management' },
              { icon: '🔐', text: 'Safe & secure platform' },
            ].map((f, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center',
                gap: '10px', marginBottom: '10px',
              }}>
                <span style={{
                  fontSize: '18px',
                  background: 'rgba(255,107,0,0.12)',
                  padding: '5px', borderRadius: '8px',
                }}>
                  {f.icon}
                </span>
                <span style={{
                  fontSize: '13px', color: 'rgba(255,255,255,0.7)',
                  fontWeight: '600',
                }}>
                  {f.text}
                </span>
              </div>
            ))}
          </div>

          {/* ── RIGHT — FORM ── */}
          <div style={{
            flex: 1,
            background: WHITE,
            padding: '50px 44px',
            overflowY: 'auto',
            maxHeight: '90vh',
          }}>

            {/* header */}
            <div style={{
              width: '52px', height: '52px',
              background: ORANGE, borderRadius: '14px',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px', marginBottom: '18px',
              boxShadow: '0 8px 20px rgba(255,107,0,0.35)',
            }}>
              👤
            </div>

            <h3 style={{
              fontSize: '28px', fontWeight: '900',
              color: DARK, marginBottom: '4px',
            }}>
              {step === 1 ? 'Personal Information' : 'License & Address'}
            </h3>
            <p style={{
              fontSize: '14px', color: '#999',
              marginBottom: '24px', fontWeight: '500',
            }}>
              {step === 1 ? 'Step 1 of 2 — Fill your basic details' : 'Step 2 of 2 — Almost done!'}
            </p>

            {/* progress bar */}
            <div style={{
              width: '100%', height: '6px',
              background: '#f0f0f0', borderRadius: '10px',
              marginBottom: '28px', overflow: 'hidden',
            }}>
              <div style={{
                width: step === 1 ? '50%' : '100%',
                height: '100%',
                background: `linear-gradient(90deg, ${ORANGE}, ${ORANGE_LIGHT})`,
                borderRadius: '10px',
                transition: 'width 0.5s ease',
              }} />
            </div>

            {/* error */}
            {error && (
              <div style={{
                background: '#fff0f0', border: '1px solid #ffcccc',
                color: '#cc0000', padding: '10px 16px',
                borderRadius: '10px', fontSize: '13px',
                fontWeight: '600', marginBottom: '18px',
              }}>
                ⚠️ {error}
              </div>
            )}

            {/* ── STEP 1 ── */}
            {step === 1 && (
              <>
                {/* name row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={labelStyle}>First Name</label>
                    <input
                      name="firstname"
                      placeholder="John"
                      value={form.firstname}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = ORANGE}
                      onBlur={e => e.target.style.borderColor = '#e0e0e0'}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Last Name</label>
                    <input
                      name="lastname"
                      placeholder="Doe"
                      value={form.lastname}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = ORANGE}
                      onBlur={e => e.target.style.borderColor = '#e0e0e0'}
                    />
                  </div>
                </div>

                <label style={labelStyle}>Email ID</label>
                <input
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = ORANGE}
                  onBlur={e => e.target.style.borderColor = '#e0e0e0'}
                />

                <label style={labelStyle}>Contact Number</label>
                <input
                  name="contact"
                  type="tel"
                  placeholder="+91 9876543210"
                  value={form.contact}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = ORANGE}
                  onBlur={e => e.target.style.borderColor = '#e0e0e0'}
                />

                <label style={labelStyle}>Password</label>
                <div style={{ position: 'relative', marginBottom: '16px' }}>
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    value={form.password}
                    onChange={handleChange}
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

                <label style={labelStyle}>Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Repeat your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = ORANGE}
                  onBlur={e => e.target.style.borderColor = '#e0e0e0'}
                />

                <button
                  onClick={handleNext}
                  style={{
                    width: '100%',
                    background: `linear-gradient(135deg, ${ORANGE} 0%, ${ORANGE_LIGHT} 100%)`,
                    color: WHITE,
                    padding: '15px',
                    borderRadius: '12px',
                    border: 'none',
                    fontSize: '17px',
                    fontWeight: '800',
                    fontFamily: "'Rajdhani', sans-serif",
                    cursor: 'pointer',
                    letterSpacing: '1px',
                    boxShadow: '0 8px 25px rgba(255,107,0,0.4)',
                    marginBottom: '16px',
                  }}
                  onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
                >
                  NEXT STEP →
                </button>
              </>
            )}

            {/* ── STEP 2 ── */}
            {step === 2 && (
              <>
                <label style={labelStyle}>Driving License Number</label>
                <input
                  name="licenseNumber"
                  placeholder="e.g. ABCD-1234-XYZ"
                  value={form.licenseNumber}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = ORANGE}
                  onBlur={e => e.target.style.borderColor = '#e0e0e0'}
                />

                <label style={labelStyle}>License Expiry Date</label>
                <input
                  name="licenseExpiry"
                  type="date"
                  value={form.licenseExpiry}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = ORANGE}
                  onBlur={e => e.target.style.borderColor = '#e0e0e0'}
                />

                <label style={labelStyle}>Address</label>
                <textarea
                  name="address"
                  placeholder="Enter your full address"
                  value={form.address}
                  onChange={handleChange}
                  rows={3}
                  style={{
                    ...inputStyle,
                    resize: 'none',
                    lineHeight: '1.5',
                  }}
                  onFocus={e => e.target.style.borderColor = ORANGE}
                  onBlur={e => e.target.style.borderColor = '#e0e0e0'}
                />

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => { setStep(1); setError(''); }}
                    style={{
                      flex: 1,
                      background: 'transparent',
                      color: DARK,
                      padding: '15px',
                      borderRadius: '12px',
                      border: `2px solid #e0e0e0`,
                      fontSize: '16px',
                      fontWeight: '800',
                      fontFamily: "'Rajdhani', sans-serif",
                      cursor: 'pointer',
                      letterSpacing: '0.5px',
                    }}
                  >
                    ← BACK
                  </button>

                  <button
                    onClick={handleRegister}
                    style={{
                      flex: 2,
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
                    }}
                  >
                    {loading ? '⏳ Registering...' : '✅ REGISTER'}
                  </button>
                </div>
              </>
            )}

            {/* login link */}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <span style={{ fontSize: '14px', color: '#888', fontWeight: '600' }}>
                {"Already have an account? "}
              </span>
              <span
                onClick={() => navigate('/login')}
                style={{
                  color: ORANGE, fontWeight: '800',
                  cursor: 'pointer', fontSize: '14px',
                  textDecoration: 'underline',
                }}
              >
                Login here
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
