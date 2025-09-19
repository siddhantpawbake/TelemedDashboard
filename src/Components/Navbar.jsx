import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import Logo from '../assets/telemed-logo.svg';

export default function Navbar() {
  return (
    <header className="grok-navbar" role="navigation" aria-label="Primary Navigation">
      <div className="grok-navbar__inner">
        <NavLink to="/" className="grok-navbar__brand" aria-label="Bharat Telemed home">
          <img src={Logo} alt="Bharat Telemed logo" className="grok-logo" />
          <span className="brand-text">Bharat Telemed</span>
        </NavLink>
        <nav className="grok-navbar__nav">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Dashboard</NavLink>
          <NavLink to="/schemes" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Government Schemes</NavLink>
          <NavLink to="/records" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Records</NavLink>
        </nav>
      </div>
    </header>
  );
}
