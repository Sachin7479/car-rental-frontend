import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn, getRole, logout } from '../services/authService';

// ── inline styles ──────────────────────────────────────────────
const ORANGE = '#FF6B00';
const ORANGE_LIGHT = '#FF8C38';
const DARK = '#1a1a2e';
const WHITE = '#ffffff';

const styles = {
  // ── NAVBAR ──
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 40px',
    height: '70px',
    background: 'rgba(26,26,46,0.85)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(255,107,0,0.25)',
  },
  navLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textDecoration: 'none',
  },
  navLogoText: {
    fontSize: '22px',
    fontWeight: '800',
    color: WHITE,
    fontFamily: "'Rajdhani', sans-serif",
    letterSpacing: '1px',
  },
  navLogoSpan: { color: ORANGE },
  navLinks: {
    display: 'flex',
    gap: '30px',
    alignItems: 'center',
  },
  navLink: {
    color: '#ccc',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: '500',
    fontFamily: "'Rajdhani', sans-serif",
    letterSpacing: '0.5px',
    transition: 'color 0.3s',
    cursor: 'pointer',
  },
  navBtn: {
    background: ORANGE,
    color: WHITE,
    padding: '8px 22px',
    borderRadius: '25px',
    border: 'none',
    fontSize: '14px',
    fontWeight: '700',
    fontFamily: "'Rajdhani', sans-serif",
    cursor: 'pointer',
    letterSpacing: '0.5px',
    transition: 'background 0.3s, transform 0.2s',
  },

  // ── HERO ──
  hero: {
    position: 'relative',
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
  },
  heroBg: {
    position: 'absolute',
    inset: 0,
    backgroundImage: `url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1800&q=80')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'brightness(0.55)',
    transform: 'scale(1.05)',
    transition: 'transform 8s ease',
  },
  heroOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(120deg, rgba(26,26,46,0.75) 40%, rgba(255,107,0,0.15) 100%)',
  },
  heroContent: {
    position: 'relative',
    zIndex: 2,
    padding: '0 80px',
    maxWidth: '650px',
  },
  heroBadge: {
    display: 'inline-block',
    background: ORANGE,
    color: WHITE,
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '3px',
    padding: '6px 18px',
    borderRadius: '20px',
    fontFamily: "'Rajdhani', sans-serif",
    marginBottom: '20px',
  },
  heroH1: {
    fontSize: '68px',
    fontWeight: '900',
    color: WHITE,
    fontFamily: "'Rajdhani', sans-serif",
    lineHeight: '1.05',
    marginBottom: '20px',
    letterSpacing: '-1px',
  },
  heroSpan: { color: ORANGE },
  heroP: {
    fontSize: '18px',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: '36px',
    fontFamily: "'Rajdhani', sans-serif",
    lineHeight: '1.6',
    fontWeight: '400',
  },
  heroBtns: { display: 'flex', gap: '16px', alignItems: 'center' },
  heroBtn1: {
    background: ORANGE,
    color: WHITE,
    padding: '14px 36px',
    borderRadius: '30px',
    border: 'none',
    fontSize: '16px',
    fontWeight: '700',
    fontFamily: "'Rajdhani', sans-serif",
    cursor: 'pointer',
    letterSpacing: '1px',
    boxShadow: '0 8px 25px rgba(255,107,0,0.45)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  heroBtn2: {
    background: 'transparent',
    color: WHITE,
    padding: '14px 36px',
    borderRadius: '30px',
    border: '2px solid rgba(255,255,255,0.5)',
    fontSize: '16px',
    fontWeight: '700',
    fontFamily: "'Rajdhani', sans-serif",
    cursor: 'pointer',
    letterSpacing: '1px',
    transition: 'border-color 0.3s, color 0.3s',
  },
  heroStats: {
    position: 'absolute',
    bottom: '40px',
    left: '80px',
    right: '80px',
    zIndex: 2,
    display: 'flex',
    gap: '50px',
  },
  heroStat: { textAlign: 'center' },
  heroStatNum: {
    display: 'block',
    fontSize: '32px',
    fontWeight: '900',
    color: ORANGE,
    fontFamily: "'Rajdhani', sans-serif",
  },
  heroStatLabel: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.7)',
    fontFamily: "'Rajdhani', sans-serif",
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },

  // ── SEARCH SECTION ──
  searchSection: {
    background: WHITE,
    padding: '40px 80px',
    boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
  },
  searchTitle: {
    textAlign: 'center',
    fontSize: '28px',
    fontWeight: '800',
    color: DARK,
    fontFamily: "'Rajdhani', sans-serif",
    marginBottom: '24px',
    letterSpacing: '0.5px',
  },
  searchTitleSpan: { color: ORANGE },
  searchBox: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  searchSelect: {
    padding: '14px 20px',
    borderRadius: '10px',
    border: `2px solid #eee`,
    fontSize: '15px',
    fontFamily: "'Rajdhani', sans-serif",
    fontWeight: '600',
    color: DARK,
    background: '#f9f9f9',
    minWidth: '200px',
    outline: 'none',
    cursor: 'pointer',
  },
  searchBtn: {
    background: ORANGE,
    color: WHITE,
    padding: '14px 40px',
    borderRadius: '10px',
    border: 'none',
    fontSize: '16px',
    fontWeight: '700',
    fontFamily: "'Rajdhani', sans-serif",
    cursor: 'pointer',
    letterSpacing: '1px',
    boxShadow: '0 4px 15px rgba(255,107,0,0.35)',
    transition: 'transform 0.2s',
  },

  // ── CARS SECTION ──
  carsSection: {
    background: '#f4f6fb',
    padding: '70px 80px',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '50px',
  },
  sectionTag: {
    display: 'inline-block',
    background: 'rgba(255,107,0,0.12)',
    color: ORANGE,
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '3px',
    padding: '5px 16px',
    borderRadius: '20px',
    fontFamily: "'Rajdhani', sans-serif",
    marginBottom: '12px',
    textTransform: 'uppercase',
  },
  sectionTitle: {
    fontSize: '42px',
    fontWeight: '900',
    color: DARK,
    fontFamily: "'Rajdhani', sans-serif",
    letterSpacing: '-0.5px',
  },
  sectionTitleSpan: { color: ORANGE },
  carsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '28px',
  },

  // ── CAR CARD ──
  carCard: {
    background: WHITE,
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
  },
  carImgWrap: {
    position: 'relative',
    height: '200px',
    overflow: 'hidden',
    background: '#f0f2f8',
  },
  carImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.4s',
  },
  carBadge: {
    position: 'absolute',
    top: '14px',
    left: '14px',
    background: ORANGE,
    color: WHITE,
    fontSize: '11px',
    fontWeight: '700',
    padding: '4px 12px',
    borderRadius: '20px',
    fontFamily: "'Rajdhani', sans-serif",
    letterSpacing: '1px',
  },
  carBody: { padding: '20px' },
  carName: {
    fontSize: '22px',
    fontWeight: '800',
    color: DARK,
    fontFamily: "'Rajdhani', sans-serif",
    marginBottom: '8px',
  },
  carMeta: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    marginBottom: '16px',
  },
  carMetaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '13px',
    color: '#666',
    fontFamily: "'Rajdhani', sans-serif",
    fontWeight: '600',
  },
  carMetaIcon: { fontSize: '14px' },
  carFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTop: '1px solid #f0f0f0',
    paddingTop: '14px',
  },
  carPrice: {
    fontSize: '24px',
    fontWeight: '900',
    color: ORANGE,
    fontFamily: "'Rajdhani', sans-serif",
  },
  carPriceSub: {
    fontSize: '12px',
    color: '#999',
    fontFamily: "'Rajdhani', sans-serif",
    fontWeight: '500',
  },
  carBookBtn: {
    background: DARK,
    color: WHITE,
    padding: '10px 22px',
    borderRadius: '25px',
    border: 'none',
    fontSize: '13px',
    fontWeight: '700',
    fontFamily: "'Rajdhani', sans-serif",
    cursor: 'pointer',
    letterSpacing: '0.5px',
    transition: 'background 0.3s',
  },

  // ── WHY US SECTION ──
  whySection: {
    background: DARK,
    padding: '70px 80px',
    backgroundImage: `url('https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1800&q=80')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundBlendMode: 'overlay',
    backgroundAttachment: 'fixed',
  },
  whyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '30px',
    marginTop: '50px',
  },
  whyCard: {
    background: 'rgba(255,255,255,0.08)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,107,0,0.25)',
    borderRadius: '16px',
    padding: '30px 24px',
    textAlign: 'center',
    transition: 'transform 0.3s, background 0.3s',
  },
  whyIcon: { fontSize: '40px', marginBottom: '14px', display: 'block' },
  whyTitle: {
    fontSize: '20px',
    fontWeight: '800',
    color: WHITE,
    fontFamily: "'Rajdhani', sans-serif",
    marginBottom: '8px',
  },
  whyDesc: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.65)',
    fontFamily: "'Rajdhani', sans-serif",
    lineHeight: '1.6',
  },

  // ── FOOTER ──
  footer: {
    background: '#0d0d1a',
    padding: '50px 80px 30px',
    borderTop: `3px solid ${ORANGE}`,
  },
  footerTop: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr',
    gap: '40px',
    marginBottom: '40px',
  },
  footerLogoText: {
    fontSize: '26px',
    fontWeight: '900',
    color: WHITE,
    fontFamily: "'Rajdhani', sans-serif",
    marginBottom: '12px',
  },
  footerDesc: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.5)',
    fontFamily: "'Rajdhani', sans-serif",
    lineHeight: '1.7',
  },
  footerColTitle: {
    fontSize: '16px',
    fontWeight: '800',
    color: ORANGE,
    fontFamily: "'Rajdhani', sans-serif",
    letterSpacing: '1px',
    marginBottom: '14px',
    textTransform: 'uppercase',
  },
  footerLink: {
    display: 'block',
    fontSize: '14px',
    color: 'rgba(255,255,255,0.55)',
    fontFamily: "'Rajdhani', sans-serif",
    marginBottom: '8px',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'color 0.3s',
  },
  footerBottom: {
    borderTop: '1px solid rgba(255,255,255,0.1)',
    paddingTop: '20px',
    textAlign: 'center',
    fontSize: '13px',
    color: 'rgba(255,255,255,0.35)',
    fontFamily: "'Rajdhani', sans-serif",
  },
  footerBottomSpan: { color: ORANGE, fontWeight: '700' },
};

// ── DATA ──────────────────────────────────────────────────────
export const CARS = [
  {
    id: 1,
    name: 'Tata Nexon Pro',
    company: 'Tata',
    fuel: 'Petrol',
    seats: 5,
    price: 2500,
    badge: 'Popular',
    img: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80',
  },
  {
    id: 2,
    name: 'Mahindra Thar',
    company: 'Mahindra',
    fuel: 'Diesel',
    seats: 4,
    price: 3500,
    badge: 'Adventure',
    img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80',
  },
  {
    id: 3,
    name: 'Maruti Fronx',
    company: 'Maruti Suzuki',
    fuel: 'Petrol',
    seats: 5,
    price: 2999,
    badge: 'New',
    img: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80',
  },
  {
    id: 4,
    name: 'Hyundai Creta',
    company: 'Hyundai',
    fuel: 'Petrol',
    seats: 5,
    price: 3200,
    badge: 'Top Rated',
    img: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=600&q=80',
  },
  {
    id: 5,
    name: 'Renault Kwid',
    company: 'Renault',
    fuel: 'Petrol',
    seats: 5,
    price: 1499,
    badge: 'Budget',
    img: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&q=80',
  },
  {
    id: 6,
    name: 'Toyota Fortuner',
    company: 'Toyota',
    fuel: 'Diesel',
    seats: 7,
    price: 5500,
    badge: 'Premium',
    img: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80',
  },
];

const WHY = [
  { icon: '🚗', title: 'Wide Fleet', desc: 'Choose from 50+ premium cars across all categories and budgets.' },
  { icon: '💰', title: 'Best Prices', desc: 'Transparent pricing starting at just ₹1499/day. No hidden charges.' },
  { icon: '🔐', title: 'Safe & Secure', desc: 'All vehicles are verified and insured for your peace of mind.' },
  { icon: '⚡', title: 'Quick Booking', desc: 'Book your car in under 2 minutes with our simple process.' },
  { icon: '📞', title: '24/7 Support', desc: 'Our team is always available to help you anytime, anywhere.' },
  { icon: '🏆', title: 'Trusted Brand', desc: 'Over 10,000 happy customers and 5-star rated service.' },
];

// ── COMPONENT ─────────────────────────────────────────────────
export default function HomePage() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Load Google Font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700;800;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const filteredCars = selectedCompany
    ? CARS.filter(c => c.company === selectedCompany)
    : CARS;

  return (
    <div style={{ margin: 0, padding: 0, fontFamily: "'Rajdhani', sans-serif" }}>

      {/* ── NAVBAR ── */}
      <nav style={{
        ...styles.navbar,
        background: scrolled
          ? 'rgba(26,26,46,0.97)'
          : 'rgba(26,26,46,0.75)',
      }}>
        <a href="/" style={styles.navLogo}>
          <span style={{ fontSize: '28px' }}>🚗</span>
          <span style={styles.navLogoText}>
            Car<span style={styles.navLogoSpan}>Rental</span>
          </span>
        </a>
        <div style={styles.navLinks}>
          <span style={styles.navLink}>Home</span>
          <span style={styles.navLink}>Cars</span>
          <span style={styles.navLink}>About</span>
          <span style={styles.navLink}>Contact</span>
          {isLoggedIn() ? (
            <>
              <span onClick={() => navigate(getRole() === 'ADMIN' ? '/admin/dashboard' : '/customer/profile')} style={{ ...styles.navLink, color: ORANGE, cursor: 'pointer' }}>Dashboard</span>
              <button
                style={styles.navBtn}
                onClick={() => { logout(); navigate('/login'); }}
                onMouseEnter={e => e.target.style.background = ORANGE_LIGHT}
                onMouseLeave={e => e.target.style.background = ORANGE}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <span onClick={() => navigate('/register')} style={{ ...styles.navLink, color: ORANGE, cursor: 'pointer' }}>Register</span>
              <button
                style={styles.navBtn}
                onClick={() => navigate('/login')}
                onMouseEnter={e => e.target.style.background = ORANGE_LIGHT}
                onMouseLeave={e => e.target.style.background = ORANGE}
              >
                Login
              </button>
            </>
          )}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={styles.hero}>
        <div style={styles.heroBg} />
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <span style={styles.heroBadge}>🏆 INDIA'S #1 CAR RENTAL</span>
          <h1 style={styles.heroH1}>
            Drive Your<br />
            <span style={styles.heroSpan}>Dream Car</span><br />
            Today
          </h1>
          <p style={styles.heroP}>
            Ride new model cars starting at just ₹1499/day.<br />
            Book instantly, drive confidently.
          </p>
          <div style={styles.heroBtns}>
            <button
              style={styles.heroBtn1}
              onClick={() => {
                document.getElementById('carsSection').scrollIntoView({ behavior: 'smooth' });
              }}
              onMouseEnter={e => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 12px 30px rgba(255,107,0,0.55)';
              }}
              onMouseLeave={e => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 25px rgba(255,107,0,0.45)';
              }}
            >
              🚀 BOOK NOW
            </button>
            <button
              style={styles.heroBtn2}
              onClick={() => {
                document.getElementById('carsSection').scrollIntoView({ behavior: 'smooth' });
              }}
              onMouseEnter={e => {
                e.target.style.borderColor = ORANGE;
                e.target.style.color = ORANGE;
              }}
              onMouseLeave={e => {
                e.target.style.borderColor = 'rgba(255,255,255,0.5)';
                e.target.style.color = WHITE;
              }}
            >
              VIEW CARS
            </button>
          </div>
        </div>

        {/* Hero Stats */}
        <div style={styles.heroStats}>
          {[
            { num: '50+', label: 'Car Models' },
            { num: '10K+', label: 'Happy Customers' },
            { num: '₹1499', label: 'Starting Price' },
            { num: '24/7', label: 'Support' },
          ].map((s, i) => (
            <div key={i} style={styles.heroStat}>
              <span style={styles.heroStatNum}>{s.num}</span>
              <span style={styles.heroStatLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── SEARCH ── */}
      <section style={styles.searchSection}>
        <h2 style={styles.searchTitle}>
          Search <span style={styles.searchTitleSpan}>Cars</span> here..!!
        </h2>
        <div style={styles.searchBox}>
          <select
            style={styles.searchSelect}
            value={selectedCompany}
            onChange={e => setSelectedCompany(e.target.value)}
          >
            <option value="">Select Car Company..</option>
            <option>Tata</option>
            <option>Mahindra</option>
            <option>Maruti Suzuki</option>
            <option>Hyundai</option>
            <option>Renault</option>
            <option>Toyota</option>
          </select>
          <button
            style={styles.searchBtn}
            onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
          >
            🔍 Search
          </button>
        </div>
      </section>

      {/* ── CARS GRID ── */}
      <section id="carsSection" style={styles.carsSection}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionTag}>Our Fleet</div>
          <h2 style={styles.sectionTitle}>
            Available <span style={styles.sectionTitleSpan}>Cars</span>
          </h2>
        </div>
        <div style={styles.carsGrid}>
          {filteredCars.map(car => (
            <div
              key={car.id}
              style={{
                ...styles.carCard,
                transform: hoveredCard === car.id ? 'translateY(-8px)' : 'translateY(0)',
                boxShadow: hoveredCard === car.id
                  ? '0 16px 40px rgba(255,107,0,0.18)'
                  : '0 4px 20px rgba(0,0,0,0.08)',
              }}
              onMouseEnter={() => setHoveredCard(car.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={styles.carImgWrap}>
                <img
                  src={car.img}
                  alt={car.name}
                  style={{
                    ...styles.carImg,
                    transform: hoveredCard === car.id ? 'scale(1.08)' : 'scale(1)',
                  }}
                  onError={e => {
                    e.target.src = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80';
                  }}
                />
                <span style={styles.carBadge}>{car.badge}</span>
              </div>
              <div style={styles.carBody}>
                <div style={styles.carName}>{car.name}</div>
                <div style={styles.carMeta}>
                  <span style={styles.carMetaItem}>
                    <span style={styles.carMetaIcon}>⛽</span> {car.fuel}
                  </span>
                  <span style={styles.carMetaItem}>
                    <span style={styles.carMetaIcon}>💺</span> {car.seats} Seats
                  </span>
                  <span style={styles.carMetaItem}>
                    <span style={styles.carMetaIcon}>🏢</span> {car.company}
                  </span>
                </div>
                <div style={styles.carFooter}>
                  <div>
                    <div style={styles.carPrice}>₹{car.price.toLocaleString()}</div>
                    <div style={styles.carPriceSub}>per day</div>
                  </div>
                  <button
                    onClick={() => navigate('/car/detail/' + car.id)}
                    style={{
                      ...styles.carBookBtn,
                      background: hoveredCard === car.id ? ORANGE : DARK,
                    }}
                  >
                    Book Now →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY US ── */}
      <section style={styles.whySection}>
        <div style={{ ...styles.sectionHeader }}>
          <div style={{ ...styles.sectionTag, background: 'rgba(255,107,0,0.25)' }}>Why Choose Us</div>
          <h2 style={{ ...styles.sectionTitle, color: WHITE }}>
            Why <span style={styles.sectionTitleSpan}>CarRental?</span>
          </h2>
        </div>
        <div style={styles.whyGrid}>
          {WHY.map((w, i) => (
            <div
              key={i}
              style={styles.whyCard}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.background = 'rgba(255,107,0,0.15)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
              }}
            >
              <span style={styles.whyIcon}>{w.icon}</span>
              <div style={styles.whyTitle}>{w.title}</div>
              <div style={styles.whyDesc}>{w.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={styles.footer}>
        <div style={styles.footerTop}>
          <div>
            <div style={styles.footerLogoText}>
              Car<span style={{ color: ORANGE }}>Rental</span>
            </div>
            <p style={styles.footerDesc}>
              Welcome to our world of boundless exploration. Embrace the freedom to wander,
              discover, and make unforgettable memories. Let's embark on this journey together.
            </p>
          </div>
          {[
            { title: 'Quick Links', links: ['Home', 'Cars', 'About Us', 'Contact'] },
            { title: 'Services', links: ['Car Rental', 'Self Drive', 'Outstation', 'Airport Transfer'] },
            { title: 'Support', links: ['FAQ', 'Terms & Conditions', 'Privacy Policy', 'Help Center'] },
          ].map((col, i) => (
            <div key={i}>
              <div style={styles.footerColTitle}>{col.title}</div>
              {col.links.map((l, j) => (
                <a key={j} href="/" style={styles.footerLink}
                  onMouseEnter={e => e.target.style.color = ORANGE}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.55)'}
                >
                  {l}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div style={styles.footerBottom}>
          © 2024 <span style={styles.footerBottomSpan}>CarRental System</span>. All rights reserved.
        </div>
      </footer>

    </div>
  );
}
