import React, { useState, useEffect } from "react";
import { FaMoon, FaSun, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import duriorLogo from "../assets/durior_logo.jpeg";
import "./TopNav.css";

const TopNav = ({ activeLink, setActiveLink }) => {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Update active link based on current location
  useEffect(() => {
    const path = location.pathname;
    if (path === '/dashboard') setActiveLink('Dashboard');
    else if (path === '/sales') setActiveLink('Sales');
    else if (path === '/sales-management') setActiveLink('Sales Management');
    else if (path === '/attendance') setActiveLink('Attendance');
    else if (path === '/wages') setActiveLink('Wages');
    else if (path === '/analytics') setActiveLink('Analytics');
  }, [location, setActiveLink]);

  const NAV_LINKS = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Sales", href: "/sales" },
    { label: "Sales Management", href: "/sales-management" },
    { label: "Attendance", href: "/attendance" },
    { label: "Wages", href: "#wages" },
    { label: "Analytics", href: "#analytics" },
  ];

  const PROFILE = {
    name: "Admin User",
    avatar: duriorLogo,
  };

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link.label);
    setShowProfileDropdown(false);
  };

  return (
    <div className="top-navbar">
      <div className="nav-left">
        <img src={PROFILE.avatar} alt="Logo" className="nav-logo" />
        <span className="nav-title">Durior Admin</span>
      </div>
      
      <div className="nav-menu">
        {NAV_LINKS.map((link, idx) => (
          <Link
            key={idx}
            to={link.href}
            className={`nav-menu-link${activeLink === link.label ? " active" : ""}`}
            style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
            onClick={() => handleLinkClick(link)}
          >
            {link.label}
          </Link>
        ))}
      </div>
      
      <div className="nav-right">
        {/* Dark Mode Toggle */}
        <button 
          className="dark-mode-toggle"
          onClick={toggleDarkMode}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>

        {/* Profile Section */}
        <div className="nav-profile">
          <div 
            className="profile-trigger"
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          >
            <img src={PROFILE.avatar} alt="Profile" className="profile-avatar" />
            <span className="profile-name">{PROFILE.name}</span>
          </div>
          
          {showProfileDropdown && (
            <div className="profile-dropdown">
              <div className="dropdown-item">
                <FaUser />
                <span>Profile</span>
              </div>
              <div className="dropdown-item">
                <FaCog />
                <span>Settings</span>
              </div>
              <div className="dropdown-divider"></div>
              <div className="dropdown-item">
                <FaSignOutAlt />
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNav; 