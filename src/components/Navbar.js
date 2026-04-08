import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import AccessibilityPanel from "./AccessibilityPanel";
import languagePack from "../utils/language";
import { useAppContext } from "../utils/AppContext";
import "../styles/Components.css";

export default function Navbar() {
  const { language } = useAppContext();
  const t = language === "en" ? languagePack.EN : languagePack.TN;
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);

  const toggleAccessibility = () => setIsAccessibilityOpen(!isAccessibilityOpen);
  const closeAccessibility = () => setIsAccessibilityOpen(false);

  return (
    <header className="navbar-blue">
      <div className="nav-content">
        {/* Left Section */}
        <div className="nav-left">
          {/* Accessibility Hamburger */}
          <button
            className="accessibility-hamburger"
            onClick={toggleAccessibility}
            aria-label={
              language === "en"
                ? "Accessibility options"
                : "Dikgato tša go fitlhelela"
            }
            aria-expanded={isAccessibilityOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Brand Section */}
          <NavLink to="/" className="brand">
            <div className="brand-content">
              <div className="navbar-logo-wrapper">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/icons/Code-of-Arms-colour.png`}
                  alt="Ministry of Health Logo"
                  className="navbar-logo-img"
                />
              </div>
              <div className="brand-text">
                <div className="brand-title">{t.siteTitle}</div>
                <div className="brand-subtitle">
                  {language === "en"
                    ? "Ministry of Health"
                    : "Lefapha la Bophelo"}
                </div>
              </div>
            </div>
          </NavLink>
        </div>

        {/* Center Navigation Links */}
        <nav className="nav-links-main">
          {[
            { to: "/", label: t.home, end: true },
            { to: "/about", label: t.about },
            { to: "/services", label: t.services },
            { to: "/education", label: t.education },
            {
              to: "/analytics",
              label: language === "en" ? "Analytics" : "Dianalitiki",
            },
            { to: "/careers", label: t.careers },
            { to: "/feedback", label: t.feedback },
          ].map((link, index) => (
            <NavLink
              key={index}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                isActive ? "nav-link-main active" : "nav-link-main"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Tools */}
        <div className="nav-tools">
          <NavLink to="/emergency" className="emergency-pill small">
            <span className="emergency-icon">🚨</span>
            <span>{language === "en" ? "Emergency" : "Tšhogo"}</span>
          </NavLink>
          {/* Remove compact prop to show text on desktop */}
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>

      {/* Accessibility Panel */}
      {isAccessibilityOpen && (
        <div className="accessibility-panel-left">
          <AccessibilityPanel onClose={closeAccessibility} />
        </div>
      )}
    </header>
  );
}