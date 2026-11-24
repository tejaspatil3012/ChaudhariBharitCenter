import React, { useState } from 'react';
import { useLanguage } from '../data/LanguageContext';
import './About.css';

/**
 * About Us Component for Chaudhari Bharit Center
 * Features restaurant introduction, authentic Maharashtrian cultural narrative,
 * 4 key highlight cards, and food photography presentation.
 */
export const About = () => {
  const { t, isMarathi } = useLanguage();
  const [imgError, setImgError] = useState(false);

  // 4 Core Highlight points with dedicated traditional iconography
  const highlights = [
    {
      id: 1,
      text: t('about.highlight1'),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Authentic Handi / Pot for Traditional Flavors */}
          <ellipse cx="12" cy="7" rx="6" ry="2" />
          <path d="M6 7c0 4 2 8 6 8s6-4 6-8" />
          <path d="M5 14c0 4 3 7 7 7s7-3 7-7" />
        </svg>
      )
    },
    {
      id: 2,
      text: t('about.highlight2'),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Home / Homemade Love Icon */}
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    },
    {
      id: 3,
      text: t('about.highlight3'),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Pure / Leaf / Wholesome Nutrition Icon */}
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      )
    },
    {
      id: 4,
      text: t('about.highlight4'),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Parcel / Takeaway Bag Icon */}
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      )
    }
  ];

  return (
    <section className="about-section" id="about" aria-label="About Us Section">
      <div className="container about-container">
        <div className="about-grid">
          {/* =================================================================
             Left Column: Restaurant Story & Highlights
             ================================================================= */}
          <div className="about-content">
            <div className="about-header-group">
              <span className="about-badge">
                {t('about.subheading')}
              </span>
              <h2 className="about-heading">
                {t('about.heading')}
              </h2>
              <span className="about-subheading">
                {isMarathi ? 'खान्देशी चव... अस्सल मातीची!' : 'Authentic Khandeshi Flavours, Straight from Our Roots!'}
              </span>
            </div>

            <p className="about-paragraph">
              {t('about.paragraph1')}
            </p>

            <p className="about-paragraph-invite">
              {t('about.paragraph2')}
            </p>

            {/* 4 Highlight Points Grid */}
            <div className="about-highlights-grid">
              {highlights.map((item) => (
                <div key={item.id} className="about-highlight-card">
                  <div className="highlight-icon-box" aria-hidden="true">
                    {item.icon}
                  </div>
                  <span className="highlight-text">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* =================================================================
             Right Column: Authentic Food Photography
             ================================================================= */}
          <div className="about-image-column">
            <div className="about-image-card">
              <span className="about-image-floating-badge about-corner-badge">
                {t('about.imageBadge')}
              </span>

              <div className="about-image-wrapper">
                {!imgError ? (
                  <img
                    src="/images/menu/bharit-puri-thali.jpg?v=2"
                    alt={t('about.imageAlt')}
                    className="about-food-img"
                    onError={() => setImgError(true)}
                    loading="lazy"
                  />
                ) : (
                  /* Tasteful traditional UI placeholder awaiting user-supplied original photo */
                  <div className="about-photo-placeholder">
                    <svg
                      className="about-placeholder-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                      <circle cx="12" cy="13" r="4" />
                    </svg>
                    <h3 className="about-placeholder-title">
                      {isMarathi ? 'अस्सल भरीत आणि पुरी' : 'Authentic Bharit & Puri'}
                    </h3>
                    <p className="about-placeholder-note">
                      {t('about.imagePlaceholderNote')}
                    </p>
                    <span className="about-placeholder-code">/images/bharit-puri.jpg</span>
                  </div>
                )}
              </div>

              {/* Card Footer Note */}
              <div className="about-image-footer">
                <span className="about-footer-title">
                  {isMarathi ? 'पारंपरिक चुलीवरील मेजवानी' : 'Traditional Woodfire Delight'}
                </span>
                <span className="about-footer-tag">
                  ✓ {isMarathi ? '१००% शाकाहारी' : '100% Vegetarian'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
