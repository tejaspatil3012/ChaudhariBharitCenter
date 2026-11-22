import React, { useState } from 'react';
import { useLanguage } from '../data/LanguageContext';
import './Hero.css';

/**
 * Hero Component for Chaudhari Bharit Center
 * Two-column desktop layout, authentic Maharashtrian restaurant branding,
 * bilingual content switching, and primary/secondary food photography presentation.
 */
export const Hero = () => {
  const { t, isMarathi } = useLanguage();

  // State to track if actual restaurant images are placed in public/images
  const [primaryImgError, setPrimaryImgError] = useState(false);
  const [secondaryImgError, setSecondaryImgError] = useState(false);

  // Smooth scroll handler for CTA buttons
  const handleScrollTo = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = `#${sectionId}`;
    }
  };

  return (
    <section className="hero-section" id="home" aria-label="Hero Section">
      <div className="container hero-container">
        <div className="hero-grid">
          {/* =================================================================
             Left Column: Restaurant Information & Traditional Identity
             ================================================================= */}
          <div className="hero-content">
            {/* Top Badges */}
            <div className="hero-badges-row">
              <span className="hero-badge-veg">
                <span className="veg-dot" aria-hidden="true"></span>
                <span>{t('common.pureVeg')}</span>
              </span>
            </div>

            {/* Restaurant Brand Name */}
            <h1 className="hero-brand-name">
              {isMarathi ? 'चौधरी भरीत सेंटर' : 'CHAUDHARI BHARIT CENTER'}
            </h1>

            {/* Main Tagline (Highlighted) */}
            <span className="hero-main-tagline">
              {t('hero.mainTagline')}
            </span>

            {/* Additional Tagline */}
            <p className="hero-additional-tagline">
              "{t('hero.additionalTagline')}"
            </p>

            {/* Experience / Description */}
            <p className="hero-description">
              {t('hero.experienceText')}
            </p>

            {/* Action Buttons */}
            <div className="hero-cta-group">
              <a
                href="#menu"
                onClick={(e) => handleScrollTo(e, 'menu')}
                className="hero-btn-menu"
                aria-label={t('hero.exploreMenuBtn')}
              >
                <span>{t('hero.exploreMenuBtn')}</span>
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>

              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, 'contact')}
                className="hero-btn-contact"
                aria-label={t('hero.contactBtn')}
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
                <span>{t('hero.contactBtn')}</span>
              </a>
            </div>

            {/* Traditional Trust Indicators */}
            <div className="hero-highlights-row">
              <div className="highlight-item item-chulha">
                <div className="highlight-icon-circle" aria-hidden="true">
                  <svg
                    className="highlight-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 2c1.5 3 4 5 4 8.5a5.5 5.5 0 1 1-11 0c0-3.5 2.5-5.5 4-8.5z" />
                    <path d="M12 17.5a2 2 0 0 0 2-2c0-1.5-1.5-2-2-3.5-0.5 1.5-2 2-2 3.5a2 2 0 0 0 2 2z" />
                  </svg>
                </div>
                <span className="highlight-text">
                  {isMarathi ? (
                    <>
                      <span>चुलीवर भाजलेले</span>
                      <span>अस्सल भरीत</span>
                    </>
                  ) : (
                    <>
                      <span>Woodfire Chulha</span>
                      <span>Roasted</span>
                    </>
                  )}
                </span>
              </div>

              <div className="highlight-item item-puri">
                <div className="highlight-icon-circle" aria-hidden="true">
                  <svg
                    className="highlight-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <ellipse cx="12" cy="14" rx="8" ry="5" />
                    <path d="M8 7c.5-1.5 2-2 2-3" />
                    <path d="M12 7c.5-1.5 2-2 2-3" />
                  </svg>
                </div>
                <span className="highlight-text">
                  {isMarathi ? (
                    <>
                      <span>गरमागरम व</span>
                      <span>खमंग पुरी</span>
                    </>
                  ) : (
                    <>
                      <span>Hot & Fresh</span>
                      <span>Crispy Puris</span>
                    </>
                  )}
                </span>
              </div>

              <div className="highlight-item item-purity">
                <div className="highlight-icon-circle" aria-hidden="true">
                  <svg
                    className="highlight-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <span className="highlight-text">
                  {isMarathi ? (
                    <>
                      <span>१००% घरगुती</span>
                      <span>शुद्धता</span>
                    </>
                  ) : (
                    <>
                      <span>100% Pure</span>
                      <span>Homemade Quality</span>
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* =================================================================
             Right Column: Actual Restaurant Food Photography
             ================================================================= */}
          <div className="hero-visual-wrapper">
            <div className="hero-visual-backdrop" aria-hidden="true"></div>

            {/* Primary Image: Bharit Photograph */}
            <div className="hero-primary-photo-card">
              <div className="photo-image-container">
                {!primaryImgError ? (
                  <img
                    src="/images/bharit.jpg?v=2"
                    alt={t('hero.primaryImageAlt')}
                    className="hero-food-img"
                    onError={() => setPrimaryImgError(true)}
                    loading="eager"
                  />
                ) : (
                  /* Tasteful fallback placeholder awaiting user-provided original photo */
                  <div className="photo-placeholder">
                    <svg
                      className="placeholder-icon"
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
                    <h2 className="placeholder-title">
                      {isMarathi ? 'अस्सल वांग्याचे भरीत' : 'Authentic Baingan Bharit'}
                    </h2>
                    <p className="placeholder-note">
                      {t('hero.imagePlaceholderNote')}
                    </p>
                    <span className="placeholder-code">/images/bharit.jpg</span>
                  </div>
                )}
              </div>

              {/* Photo Caption Bar */}
              <div className="photo-caption-bar">
                <h2 className="photo-title">
                  {isMarathi ? 'विशेष चुलीवरचे भरीत' : 'Special Chulha Bharit'}
                </h2>
                <span className="photo-badge-special">
                  {t('hero.badgeSpeciality')}
                </span>
              </div>
            </div>

            {/* Secondary Visual Element: Bharit Puri Photograph Card */}
            <div className="hero-secondary-photo-badge">
              <div className="secondary-thumbnail">
                {!secondaryImgError ? (
                  <img
                    src="/images/bharit-puri.jpg"
                    alt={t('hero.secondaryImageAlt')}
                    onError={() => setSecondaryImgError(true)}
                    loading="lazy"
                  />
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="var(--color-secondary)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <ellipse cx="12" cy="12" rx="9" ry="6" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </div>
              <div className="secondary-info">
                <span className="secondary-name">
                  {isMarathi ? 'भरीत आणि पुरी स्पेशल' : 'Bharit & Puri Special'}
                </span>
                <span className="secondary-tag">
                  {isMarathi ? '⭐ ग्राहकांची पहिली पसंती' : '⭐ Most Loved Combo'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
