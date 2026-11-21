import React from 'react';
import { useLanguage } from '../data/LanguageContext';
import './Footer.css';

const Footer = () => {
  const { t, isMarathi } = useLanguage();
  const currentYear = new Date().getFullYear();

  const phone1 = '9403576310';
  const phone2 = '9545331352';

  const mapQuery = encodeURIComponent('Radhakrishna Traders Yawal Chopda Road Kingaon Yawal Jalgaon');
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
  const instagramUrl = 'https://www.instagram.com/chaudhari_bharit_center?mdxt=a3kzN3NtZ2l5anFj';

  const navLinks = [
    { id: 'home', label: t('footer.links.home') },
    { id: 'about', label: t('footer.links.about') },
    { id: 'menu', label: t('footer.links.menu') },
    { id: 'gallery', label: t('footer.links.gallery') },
    { id: 'contact', label: t('footer.links.contact') }
  ];

  const handleScrollTo = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Update hash in URL cleanly
      window.history.pushState(null, '', `#${sectionId}`);
    } else {
      window.location.hash = `#${sectionId}`;
    }
  };

  const specialities = [
    t('footer.specialities.0'),
    t('footer.specialities.1'),
    t('footer.specialities.2'),
    t('footer.specialities.3')
  ];

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Column 1 – About Restaurant */}
            <div className="footer-col">
              <div className="footer-brand">
                <h3 className="footer-brand-title">{t('footer.restaurantName')}</h3>
                <p className="footer-brand-tagline">"{t('footer.tagline')}"</p>
                <p className="footer-brand-subtagline">{t('footer.subTagline')}</p>
              </div>
              <p className="footer-about-text">{t('footer.aboutText')}</p>
              <div className="footer-parcel-badge">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
                <span>{t('footer.parcelAvailable')}</span>
              </div>
            </div>

            {/* Column 2 – Quick Links */}
            <div className="footer-col">
              <h4 className="footer-col-title">{t('footer.quickLinks')}</h4>
              <ul className="footer-links-list">
                {navLinks.map((link) => (
                  <li key={link.id} className="footer-link-item">
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => handleScrollTo(e, link.id)}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 – Contact Information */}
            <div className="footer-col">
              <h4 className="footer-col-title">{t('footer.contactInfo')}</h4>
              <div className="footer-contact-list">
                {/* Phone Numbers */}
                <div className="footer-contact-item">
                  <svg className="footer-contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <div className="footer-contact-phone-group">
                    <div>
                      <a href={`tel:+91${phone1}`} className="footer-phone-link">
                        +91 {phone1}
                      </a>
                      <span className="footer-phone-person"> ({t('footer.contactPerson1')})</span>
                    </div>
                    <div>
                      <a href={`tel:+91${phone2}`} className="footer-phone-link">
                        +91 {phone2}
                      </a>
                      <span className="footer-phone-person"> ({t('footer.contactPerson2')})</span>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="footer-contact-item">
                  <svg className="footer-contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <div>
                    <span className="footer-contact-text">{t('footer.address')}</span>
                    <div>
                      <a
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-map-link"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                          <line x1="8" y1="2" x2="8" y2="18"></line>
                          <line x1="16" y1="6" x2="16" y2="22"></line>
                        </svg>
                        {t('footer.openMap')} →
                      </a>
                    </div>
                  </div>
                </div>

                {/* Instagram Profile */}
                <div className="footer-contact-item">
                  <svg className="footer-contact-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <div>
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-instagram-link"
                    >
                      @chaudhari_bharit_center
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 4 – Our Speciality */}
            <div className="footer-col">
              <h4 className="footer-col-title">{t('footer.specialityTitle')}</h4>
              <ul className="footer-speciality-list">
                {specialities.map((item, idx) => (
                  <li key={idx} className="footer-speciality-item">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p className="footer-copyright">
            © {currentYear} {isMarathi ? 'चौधरी भरीत सेंटर' : 'Chaudhari Bharit Center'}. {t('footer.copyright')}
          </p>
          <p className="footer-crafted-line">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            {t('footer.craftedLine')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
