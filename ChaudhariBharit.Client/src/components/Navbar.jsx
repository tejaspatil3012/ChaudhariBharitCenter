import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../data/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import './Navbar.css';

/**
 * Navbar Component for Chaudhari Bharit Center
 * Supports authentic Maharashtrian restaurant branding,
 * bilingual language switching (मराठी/English), and mobile responsiveness.
 */
export const Navbar = () => {
  const { t, language, isMarathi } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Navigation Links configuration
  const navLinks = [
    { id: 'home', label: t('navbar.home') },
    { id: 'about', label: t('navbar.about') },
    { id: 'menu', label: t('navbar.menu') },
    { id: 'gallery', label: t('navbar.gallery') },
    { id: 'feedback', label: t('navbar.feedback') },
    { id: 'contact', label: t('navbar.contact') },
  ];

  // Handle subtle navbar shadow on window scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Lock body scroll when mobile menu is open to prevent background scrolling
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on window resize beyond mobile breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 860 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Smooth scroll handler for anchor links
  const handleNavClick = useCallback((e, sectionId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If target section is not in DOM yet, update URL hash smoothly
      window.location.hash = `#${sectionId}`;
    }
  }, []);

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Left Side: Traditional Restaurant Branding */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, 'home')}
          className="navbar-brand"
          aria-label={isMarathi ? 'चौधरी भरीत सेंटर - मुख्यपृष्ठ' : 'Chaudhari Bharit Center - Home'}
        >
          {/* Authentic Earthen Clay Pot / Chulha Flame Brand Icon */}
          <div className="brand-icon-wrapper" aria-hidden="true">
            <svg
              className="brand-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Traditional Earthen Handi / Pot */}
              <ellipse cx="12" cy="7" rx="6" ry="2" />
              <path d="M6 7c0 4 2 8 6 8s6-4 6-8" />
              <path d="M5 14c0 4 3 7 7 7s7-3 7-7" />
              {/* Subtle flame accent at top */}
              <path d="M12 2c.5 1.5-1 2-1 3 0 .8.7 1.5 1 1.5s1-.7 1-1.5c0-1-1.5-1.5-1-3z" fill="var(--color-secondary)" stroke="none" />
            </svg>
          </div>

          <div className="brand-text">
            <span className="brand-title">चौधरी भरीत सेंटर</span>
            <span className="brand-subtitle">CHAUDHARI BHARIT CENTER</span>
          </div>
        </a>

        {/* Center: Desktop Navigation Links */}
        <nav aria-label="Main Navigation">
          <ul className="navbar-nav">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className="nav-link"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Side: Language Switcher & Contact Button */}
        <div className="navbar-actions">
          {/* Bilingual Switcher */}
          <LanguageSwitcher isDark={true} />

          {/* Prominent Contact Us Button */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="navbar-contact-btn"
            aria-label={t('navbar.contactBtn')}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>{t('navbar.contactBtn')}</span>
          </a>

          {/* Mobile Hamburger Menu Toggle Button */}
          <button
            type="button"
            className={`hamburger-btn ${isMobileMenuOpen ? 'is-active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
          >
            <span className="hamburger-line" aria-hidden="true"></span>
            <span className="hamburger-line" aria-hidden="true"></span>
            <span className="hamburger-line" aria-hidden="true"></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      <div
        className={`mobile-backdrop ${isMobileMenuOpen ? 'is-open' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Slide-down Navigation Drawer */}
      <div
        id="mobile-navigation-drawer"
        className={`mobile-drawer ${isMobileMenuOpen ? 'is-open' : ''}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <ul className="mobile-nav-list">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className="mobile-nav-link"
              >
                <span>{link.label}</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Drawer Footer: Language Switcher and Contact Button */}
        <div className="mobile-drawer-footer">
          <div className="mobile-lang-row">
            <span className="mobile-lang-label">
              {t('common.language')} ({language === 'mr' ? 'मराठी' : 'English'}):
            </span>
            <LanguageSwitcher />
          </div>

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="mobile-contact-btn"
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>{t('navbar.contactBtn')}</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
