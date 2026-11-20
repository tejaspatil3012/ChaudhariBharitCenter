import React from 'react';
import { useLanguage } from '../data/LanguageContext';
import './WhyChooseUs.css';

/**
 * WhyChooseUs Component for Chaudhari Bharit Center
 * Displays the 4 official highlight cards communicating authentic Khandeshi heritage,
 * homemade taste, pure nutrition, and takeaway availability.
 */
export const WhyChooseUs = () => {
  const { isMarathi, t } = useLanguage();

  const features = [
    {
      id: 1,
      number: '01',
      title: t('whyChooseUs.card1Title'),
      description: t('whyChooseUs.card1Desc'),
      accentClass: 'accent-saffron',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {/* Traditional Clay Handi & Fire Flame for Authentic Taste */}
          <ellipse cx="12" cy="7" rx="6" ry="2" />
          <path d="M6 7c0 4 2 8 6 8s6-4 6-8" />
          <path d="M5 14c0 4 3 7 7 7s7-3 7-7" />
          <path d="M12 1c.5 1.5-1 2-1 3 0 .8.7 1.5 1 1.5s1-.7 1-1.5c0-1-1.5-1.5-1-3z" fill="var(--color-secondary)" stroke="none" />
        </svg>
      )
    },
    {
      id: 2,
      number: '02',
      title: t('whyChooseUs.card2Title'),
      description: t('whyChooseUs.card2Desc'),
      accentClass: 'accent-brown',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {/* Home / Homemade Kitchen Icon */}
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
          <path d="M12 5v2" />
        </svg>
      )
    },
    {
      id: 3,
      number: '03',
      title: t('whyChooseUs.card3Title'),
      description: t('whyChooseUs.card3Desc'),
      accentClass: 'accent-green',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {/* Shield of Purity & Nutrition */}
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      )
    },
    {
      id: 4,
      number: '04',
      title: t('whyChooseUs.card4Title'),
      description: t('whyChooseUs.card4Desc'),
      accentClass: 'accent-saffron',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {/* Takeaway / Parcel Delivery Bag Icon */}
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      )
    }
  ];

  return (
    <section className="why-choose-us-section" id="why-choose-us" aria-label="Why Choose Us Section">
      <div className="container why-choose-us-container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">
            {t('whyChooseUs.badge')}
          </span>
          <h2 className="section-title">
            {t('whyChooseUs.heading')}
          </h2>
          <p className="section-subtitle">
            {t('whyChooseUs.subtitle')}
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="why-cards-grid">
          {features.map((card) => (
            <div key={card.id} className={`why-card ${card.accentClass}`}>
              <span className="why-card-number" aria-hidden="true">
                {card.number}
              </span>

              <div className="why-icon-box" aria-hidden="true">
                {card.icon}
              </div>

              <h3 className="why-card-title">
                {card.title}
              </h3>

              <p className="why-card-desc">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Assurance Strip */}
        <div className="why-trust-strip">
          <div className="trust-strip-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>{isMarathi ? '१००% शुद्ध शाकाहारी भोजन' : '100% Pure Vegetarian Meals'}</span>
          </div>

          <div className="trust-strip-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>{isMarathi ? 'चुलीवर भाजलेले अस्सल भरीत' : 'Authentic Woodfire Chulha Roasted'}</span>
          </div>

          <div className="trust-strip-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>{isMarathi ? 'सुरक्षित व जलद पार्सल सुविधा' : 'Hygienic & Fast Parcel Packing'}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
