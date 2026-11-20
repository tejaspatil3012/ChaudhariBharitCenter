import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../data/LanguageContext';
import './Gallery.css';

/**
 * Gallery Component for Chaudhari Bharit Center
 * Showcases all 8 authentic Khandeshi restaurant food photographs in a modern grid
 * with an interactive lightbox modal, keyboard navigation, and full bilingual support.
 */
export const Gallery = () => {
  const { t, isMarathi } = useLanguage();
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);

  // 8 Official Gallery Items with exact requested filenames
  const galleryItems = [
    {
      id: 1,
      image: '/images/gallery/gallery-khandeshi-food-spread.jpg',
      title: t('gallery.item8Title'),
      description: t('gallery.item8Desc'),
      isProminent: true
    },
    {
      id: 2,
      image: '/images/gallery/gallery-bharit.jpg',
      title: t('gallery.item1Title'),
      description: t('gallery.item1Desc'),
      isProminent: false
    },
    {
      id: 3,
      image: '/images/gallery/gallery-bharit-bhakri-thali.jpg',
      title: t('gallery.item2Title'),
      description: t('gallery.item2Desc'),
      isProminent: false
    },
    {
      id: 4,
      image: '/images/gallery/gallery-bharit-puri-thali.jpg',
      title: t('gallery.item3Title'),
      description: t('gallery.item3Desc'),
      isProminent: false
    },
    {
      id: 5,
      image: '/images/gallery/gallery-shev-bhaji.jpg',
      title: t('gallery.item4Title'),
      description: t('gallery.item4Desc'),
      isProminent: false
    },
    {
      id: 6,
      image: '/images/gallery/gallery-kokum-kadhi.jpg',
      title: t('gallery.item5Title'),
      description: t('gallery.item5Desc'),
      isProminent: false
    },
    {
      id: 7,
      image: '/images/gallery/gallery-buttermilk-kadhi.jpg',
      title: t('gallery.item6Title'),
      description: t('gallery.item6Desc'),
      isProminent: false
    },
    {
      id: 8,
      image: '/images/gallery/gallery-kalnyachi-bhakri.jpg',
      title: t('gallery.item7Title'),
      description: t('gallery.item7Desc'),
      isProminent: false
    }
  ];

  // Lightbox Navigation Handlers
  const handleNext = useCallback((e) => {
    e?.stopPropagation();
    setActiveLightboxIndex((prev) => (prev + 1) % galleryItems.length);
  }, [galleryItems.length]);

  const handlePrev = useCallback((e) => {
    e?.stopPropagation();
    setActiveLightboxIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  }, [galleryItems.length]);

  const handleClose = useCallback(() => {
    setActiveLightboxIndex(null);
  }, []);

  // Keyboard navigation for Lightbox (Esc, Arrow Left, Arrow Right)
  useEffect(() => {
    if (activeLightboxIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, handleClose, handleNext, handlePrev]);

  // Lock body scrolling when Lightbox is active
  useEffect(() => {
    if (activeLightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [activeLightboxIndex]);

  const currentItem = activeLightboxIndex !== null ? galleryItems[activeLightboxIndex] : null;

  return (
    <section className="gallery-section" id="gallery" aria-label="Photo Gallery">
      <div className="container gallery-container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">
            {t('gallery.badge')}
          </span>
          <h2 className="section-title">
            {t('gallery.heading')}
          </h2>
          <p className="section-subtitle">
            {t('gallery.subtitle')}
          </p>
        </div>

        {/* Gallery Image Grid */}
        <div className="gallery-grid">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              className={`gallery-item ${item.isProminent ? 'is-prominent' : ''}`}
            >
              <div
                className="gallery-card"
                onClick={() => setActiveLightboxIndex(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveLightboxIndex(index);
                  }
                }}
                aria-label={`${item.title} - ${t('gallery.viewFull')}`}
              >
                {/* Pure Veg Indicator Tag */}
                <div className="gallery-veg-tag">
                  <span className="gallery-veg-dot" aria-hidden="true"></span>
                  <span>{isMarathi ? '१००% शुद्ध' : '100% Pure Veg'}</span>
                </div>

                {/* Actual Food Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="gallery-img"
                  loading="lazy"
                />

                {/* Bottom Title Bar */}
                <div className="gallery-title-bar">
                  <h3 className="gallery-item-title">{item.title}</h3>
                  <p className="gallery-item-desc">{item.description}</p>
                </div>

                {/* Hover Zoom Overlay */}
                <div className="gallery-hover-overlay" aria-hidden="true">
                  <div className="gallery-zoom-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      <line x1="11" y1="8" x2="11" y2="14" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =================================================================
         Interactive Lightbox Modal
         ================================================================= */}
      {activeLightboxIndex !== null && currentItem && (
        <div
          className="lightbox-backdrop"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label={currentItem.title}
        >
          <div
            className="lightbox-content-box"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              className="lightbox-close-btn"
              onClick={handleClose}
              aria-label={t('gallery.close')}
              title={t('gallery.close')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Previous Image Button */}
            <button
              type="button"
              className="lightbox-nav-btn prev"
              onClick={handlePrev}
              aria-label={t('gallery.prev')}
              title={t('gallery.prev')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Next Image Button */}
            <button
              type="button"
              className="lightbox-nav-btn next"
              onClick={handleNext}
              aria-label={t('gallery.next')}
              title={t('gallery.next')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Main Lightbox Image */}
            <div className="lightbox-img-wrapper">
              <img
                src={currentItem.image}
                alt={currentItem.title}
                className="lightbox-full-img"
              />
            </div>

            {/* Lightbox Information Bar */}
            <div className="lightbox-info-bar">
              <div>
                <h3 className="lightbox-title">{currentItem.title}</h3>
                <p className="lightbox-desc">{currentItem.description}</p>
              </div>
              <span className="lightbox-counter">
                {activeLightboxIndex + 1} / {galleryItems.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
