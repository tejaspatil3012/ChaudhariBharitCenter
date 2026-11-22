import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useLanguage } from '../data/LanguageContext';
import './Gallery.css';

/**
 * Gallery Component for Chaudhari Bharit Center
 * Showcases authentic Khandeshi restaurant food photographs & live videos in a modern grid
 * with dedicated Video Player modal, interactive Photo Lightbox modal,
 * filter tabs (All, Photos, Videos), and full bilingual support.
 */
export const Gallery = () => {
  const { t, isMarathi } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);
  const [activeVideoItem, setActiveVideoItem] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const videoRef = useRef(null);

  const INITIAL_VISIBLE_COUNT = 5;

  // Gallery items including official restaurant photographs & authentic Khandeshi delicacies + videos
  const galleryItems = useMemo(() => [
    {
      id: 'p1',
      type: 'photo',
      image: '/images/gallery/gallery-restaurant-board.jpg',
      title: t('gallery.item9Title'),
      description: t('gallery.item9Desc'),
      isProminent: true,
      hasVegTag: false
    },
    {
      id: 'p2',
      type: 'photo',
      image: '/images/gallery/gallery-restaurant-counter.jpg?v=2',
      title: '',
      description: t('gallery.item10Desc'),
      isProminent: false,
      hasVegTag: false
    },
    {
      id: 'p3',
      type: 'photo',
      image: '/images/gallery/gallery-official-menu-card.jpg',
      title: t('gallery.item11Title'),
      description: t('gallery.item11Desc'),
      isProminent: false,
      hasVegTag: false
    },
    {
      id: 'v1',
      type: 'video',
      videoSrc: '/videos/video-khandeshi-bharit-making.mp4',
      poster: '/images/gallery/poster-khandeshi-bharit-making.jpg?v=2',
      title: t('gallery.video1Title'),
      description: t('gallery.video1Desc'),
      duration: '0:21',
      isProminent: false
    },
    {
      id: 'v2',
      type: 'video',
      videoSrc: '/videos/video-traditional-cooking-dining.mp4',
      poster: '/images/gallery/poster-traditional-cooking-dining.jpg?v=2',
      title: t('gallery.video2Title'),
      description: t('gallery.video2Desc'),
      duration: '0:42',
      isProminent: false
    },
    {
      id: 'p8',
      type: 'photo',
      image: '/images/gallery/gallery-khandeshi-food-spread.jpg',
      title: t('gallery.item8Title'),
      description: t('gallery.item8Desc'),
      isProminent: true,
      hasVegTag: true
    }
  ], [t]);

  // Separate list of photos for the Photo Lightbox navigation
  const photoItems = useMemo(() => galleryItems.filter(i => i.type !== 'video'), [galleryItems]);

  // Filtered gallery items based on active category
  const displayedItems = useMemo(() => {
    if (activeFilter === 'photos') {
      return galleryItems.filter(i => i.type !== 'video');
    }
    if (activeFilter === 'videos') {
      return galleryItems.filter(i => i.type === 'video');
    }
    return galleryItems;
  }, [activeFilter, galleryItems]);

  // Visible items based on Show More (initial 5 cards)
  const visibleItems = useMemo(() => {
    if (isExpanded || displayedItems.length <= INITIAL_VISIBLE_COUNT) {
      return displayedItems;
    }
    return displayedItems.slice(0, INITIAL_VISIBLE_COUNT);
  }, [displayedItems, isExpanded]);

  const hasMore = displayedItems.length > INITIAL_VISIBLE_COUNT;

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setIsExpanded(false);
  };

  // Handle opening photo in Lightbox
  const handleOpenPhoto = (item) => {
    const photoIdx = photoItems.findIndex(p => p.id === item.id);
    if (photoIdx !== -1) {
      setActiveLightboxIndex(photoIdx);
    }
  };

  // Lightbox Navigation Handlers
  const handleNextPhoto = useCallback((e) => {
    e?.stopPropagation();
    setActiveLightboxIndex((prev) => (prev + 1) % photoItems.length);
  }, [photoItems.length]);

  const handlePrevPhoto = useCallback((e) => {
    e?.stopPropagation();
    setActiveLightboxIndex((prev) => (prev - 1 + photoItems.length) % photoItems.length);
  }, [photoItems.length]);

  const handleClosePhoto = useCallback(() => {
    setActiveLightboxIndex(null);
  }, []);

  // Handle Video Modal
  const handleOpenVideo = (item) => {
    setActiveVideoItem(item);
  };

  const handleCloseVideo = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setActiveVideoItem(null);
  }, []);

  // Keyboard navigation (Esc, Arrow Left, Arrow Right)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (activeVideoItem !== null) {
          handleCloseVideo();
        } else if (activeLightboxIndex !== null) {
          handleClosePhoto();
        }
      } else if (activeLightboxIndex !== null) {
        if (e.key === 'ArrowRight') {
          handleNextPhoto();
        } else if (e.key === 'ArrowLeft') {
          handlePrevPhoto();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, activeVideoItem, handleClosePhoto, handleCloseVideo, handleNextPhoto, handlePrevPhoto]);

  // Lock body scrolling when either Lightbox or Video Modal is open
  useEffect(() => {
    if (activeLightboxIndex !== null || activeVideoItem !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [activeLightboxIndex, activeVideoItem]);

  const currentPhoto = activeLightboxIndex !== null ? photoItems[activeLightboxIndex] : null;

  return (
    <section className="gallery-section" id="gallery" aria-label="Photo and Video Gallery">
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

        {/* Filter Navigation Tabs (All, Photos, Videos) */}
        <div className="gallery-tabs-wrapper" role="tablist" aria-label="Gallery Filter">
          <button
            type="button"
            role="tab"
            aria-selected={activeFilter === 'all'}
            className={`gallery-tab-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            <span>{t('gallery.filterAll')}</span>
            <span className="tab-count">{galleryItems.length}</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeFilter === 'photos'}
            className={`gallery-tab-btn ${activeFilter === 'photos' ? 'active' : ''}`}
            onClick={() => handleFilterChange('photos')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="tab-icon">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span>{t('gallery.filterPhotos')}</span>
            <span className="tab-count">{photoItems.length}</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeFilter === 'videos'}
            className={`gallery-tab-btn ${activeFilter === 'videos' ? 'active' : ''}`}
            onClick={() => handleFilterChange('videos')}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="tab-icon">
              <polygon points="6 3 20 12 6 21 6 3" />
            </svg>
            <span>{t('gallery.filterVideos')}</span>
            <span className="tab-count">{galleryItems.filter(i => i.type === 'video').length}</span>
          </button>
        </div>

        {/* Gallery Grid */}
        <div className={`gallery-grid ${activeFilter === 'videos' ? 'is-video-grid' : ''}`}>
          {visibleItems.map((item) => {
            const isVideo = item.type === 'video';

            return (
              <div
                key={item.id}
                className={`gallery-item ${item.isProminent && activeFilter === 'all' ? 'is-prominent' : ''} ${isVideo ? 'is-video-item' : ''}`}
              >
                <div
                  className={`gallery-card ${isVideo ? 'video-card' : ''}`}
                  onClick={() => isVideo ? handleOpenVideo(item) : handleOpenPhoto(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      if (isVideo) handleOpenVideo(item);
                      else handleOpenPhoto(item);
                    }
                  }}
                  aria-label={`${item.description || item.title} - ${isVideo ? t('gallery.playVideo') : t('gallery.viewFull')}`}
                >
                  {/* Video Badge Indicator */}
                  {isVideo && (
                    <>
                      <div className="gallery-video-tag">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
                          <polygon points="6 3 20 12 6 21 6 3" />
                        </svg>
                        <span>{t('gallery.videoBadge')}</span>
                      </div>
                      <div className="gallery-video-duration">
                        <span>{item.duration}</span>
                      </div>
                    </>
                  )}

                  {/* Pure Veg Indicator Tag (Only for authentic food items) */}
                  {!isVideo && item.hasVegTag && (
                    <div className="gallery-veg-tag">
                      <span className="gallery-veg-dot" aria-hidden="true"></span>
                      <span>{isMarathi ? '१००% शुद्ध' : '100% Pure Veg'}</span>
                    </div>
                  )}

                  {/* Image / Video Poster */}
                  <img
                    src={isVideo ? item.poster : item.image}
                    alt={item.description || item.title}
                    className="gallery-img"
                    loading="lazy"
                  />

                  {/* Center Play Button for Videos */}
                  {isVideo && (
                    <div className="gallery-play-center" aria-hidden="true">
                      <div className="gallery-play-icon">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="8 5 19 12 8 19 8 5" />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Bottom Title Bar (Only below description text displayed) */}
                  <div className="gallery-title-bar">
                    <p className="gallery-item-desc">{item.description}</p>
                  </div>

                  {/* Hover Overlay for Photos */}
                  {!isVideo && (
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
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Show More / Show Less Button */}
        {hasMore && (
          <div className="gallery-load-more-wrapper">
            <button
              type="button"
              className="gallery-load-more-btn"
              onClick={() => {
                if (isExpanded) {
                  setIsExpanded(false);
                  const galleryEl = document.getElementById('gallery');
                  if (galleryEl) {
                    galleryEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                } else {
                  setIsExpanded(true);
                }
              }}
              aria-expanded={isExpanded}
            >
              <span>{isExpanded ? t('gallery.showLess') : t('gallery.showMore')}</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`load-more-icon ${isExpanded ? 'is-expanded' : ''}`}
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* =================================================================
         Responsive Video Player Modal
         ================================================================= */}
      {activeVideoItem && (
        <div
          className="video-modal-backdrop"
          onClick={handleCloseVideo}
          role="dialog"
          aria-modal="true"
          aria-label={activeVideoItem.title || activeVideoItem.description}
        >
          <div
            className="video-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="video-modal-header">
              <div className="video-modal-info">
                <span className="video-modal-badge">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
                    <polygon points="6 3 20 12 6 21 6 3" />
                  </svg>
                  {t('gallery.videoBadge')}
                </span>
                <h3 className="video-modal-title">
                  {activeVideoItem.title || activeVideoItem.description}
                </h3>
              </div>
              <button
                type="button"
                className="video-modal-close-btn"
                onClick={handleCloseVideo}
                aria-label={t('gallery.close')}
                title={t('gallery.close')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Video Player Container (Loads video only when modal is opened, does not autoplay) */}
            <div className="video-player-container">
              <video
                ref={videoRef}
                src={activeVideoItem.videoSrc}
                poster={activeVideoItem.poster}
                controls
                controlsList="nodownload"
                playsInline
                preload="metadata"
                className="responsive-video-player"
              >
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Video Caption Bar */}
            {activeVideoItem.description && (
              <div className="video-modal-caption">
                <p>{activeVideoItem.description}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =================================================================
         Interactive Photo Lightbox Modal
         ================================================================= */}
      {activeLightboxIndex !== null && currentPhoto && (
        <div
          className="lightbox-backdrop"
          onClick={handleClosePhoto}
          role="dialog"
          aria-modal="true"
          aria-label={currentPhoto.title || currentPhoto.description}
        >
          <div
            className="lightbox-content-box"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              className="lightbox-close-btn"
              onClick={handleClosePhoto}
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
              onClick={handlePrevPhoto}
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
              onClick={handleNextPhoto}
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
                src={currentPhoto.image}
                alt={currentPhoto.title || currentPhoto.description}
                className="lightbox-full-img"
              />
            </div>

            {/* Lightbox Information Bar */}
            <div className="lightbox-info-bar">
              <div>
                <h3 className="lightbox-title">{currentPhoto.title || currentPhoto.description}</h3>
                {currentPhoto.title && currentPhoto.description && (
                  <p className="lightbox-desc">{currentPhoto.description}</p>
                )}
              </div>
              <span className="lightbox-counter">
                {activeLightboxIndex + 1} / {photoItems.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
