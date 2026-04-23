import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getName, getRole, isLoggedIn, logout } from '../services/authService';

export function PublicHeader() {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();
  const role = getRole();
  const displayName = getName();

  return (
    <header className="header">
      <Link to="/" className="brand">Car<span>Rental</span></Link>
      <nav className="nav">
        <Link to="/">Home</Link>
        {!loggedIn && <Link to="/login">Login</Link>}
        {!loggedIn && <Link to="/register" className="button small">Register</Link>}
        {loggedIn && <span className="welcomeText">{displayName || role}</span>}
        {loggedIn && role === 'CUSTOMER' && <Link to="/customer/bookings">My Bookings</Link>}
        {loggedIn && role === 'CUSTOMER' && <Link to="/customer/profile">My Profile</Link>}
        {loggedIn && role === 'ADMIN' && <Link to="/admin/bookings">Admin Bookings</Link>}
        {loggedIn && (
          <button
            className="linkButton"
            onClick={() => {
              logout();
              navigate('/login');
            }}
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}

export function Page({ title, subtitle, children }) {
  return (
    <div className="page">
      <div className="pageGlow pageGlowLeft" />
      <div className="pageGlow pageGlowRight" />
      <PublicHeader />
      <main className="container">
        {(title || subtitle) && (
          <section className="heroPanel">
            {title && <h1>{title}</h1>}
            {subtitle && <p>{subtitle}</p>}
          </section>
        )}
        {children}
      </main>
    </div>
  );
}
