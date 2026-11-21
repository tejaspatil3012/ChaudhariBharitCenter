import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useLanguage } from '../data/LanguageContext';
import { GOOGLE_FORM_FEEDBACK_URL, GOOGLE_SHEET_REVIEWS_CSV_URL } from '../config/feedbackConfig';
import './Feedback.css';

/**
 * Robust zero-dependency CSV parser
 * Handles quotes, commas inside text, and multi-line comments.
 */
const parseCSV = (text) => {
  if (!text || typeof text !== 'string') return [];

  const rows = [];
  let currentRow = [];
  let currentField = '';
  let insideQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentField += '"';
        i++; // skip escaped quote
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      currentRow.push(currentField.trim());
      currentField = '';
    } else if ((char === '\r' || char === '\n') && !insideQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++; // skip \n
      }
      currentRow.push(currentField.trim());
      currentField = '';
      if (currentRow.some((cell) => cell.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
    } else {
      currentField += char;
    }
  }

  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    if (currentRow.some((cell) => cell.length > 0)) {
      rows.push(currentRow);
    }
  }

  return rows;
};

/**
 * Customer Feedback & Live Reviews Section Component for Chaudhari Bharit Center
 * Features:
 * 1. Live text reviews feed from Google Sheets with star ratings and average score.
 * 2. Customer Feedback video reels showcasing real customer reactions.
 * 3. Video player modal with full audio & controls.
 * 4. Google Form CTA for submitting new reviews.
 */
export const Feedback = () => {
  const { t, isMarathi } = useLanguage();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const modalVideoRef = useRef(null);

  const instagramUrl = 'https://www.instagram.com/chaudhari_bharit_center?mdxt=a3kzN3NtZ2l5anFj';

  // Customer video reels configuration
  const customerVideos = useMemo(() => [
    {
      id: 'cv1',
      videoSrc: '/videos/customer-feedback-video-1.mp4',
      poster: '/images/poster-customer-feedback-1.jpg',
      badge: t('feedback.videoBadge1'),
      duration: '0:17',
      tag: t('feedback.video1Tag'),
      quote: t('feedback.video1Quote'),
      author: t('feedback.video1Author')
    },
    {
      id: 'cv2',
      videoSrc: '/videos/customer-feedback-video-2.mp4',
      poster: '/images/poster-customer-feedback-2.jpg',
      badge: t('feedback.videoBadge2'),
      duration: '0:23',
      tag: t('feedback.video2Tag'),
      quote: t('feedback.video2Quote'),
      author: t('feedback.video2Author')
    }
  ], [t]);

  // Lock body scroll when video modal is open
  useEffect(() => {
    if (activeVideo) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setActiveVideo(null);
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [activeVideo]);

  // Fetch real reviews from published Google Sheet CSV
  useEffect(() => {
    let isMounted = true;

    const fetchReviews = async () => {
      if (!GOOGLE_SHEET_REVIEWS_CSV_URL || !GOOGLE_SHEET_REVIEWS_CSV_URL.trim()) {
        if (isMounted) {
          setReviews([]);
          setIsLoading(false);
        }
        return;
      }

      try {
        setIsLoading(true);
        setHasError(false);

        const response = await fetch(GOOGLE_SHEET_REVIEWS_CSV_URL, {
          cache: 'no-cache',
          headers: { 'Accept': 'text/csv, text/plain, */*' }
        });

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }

        const csvText = await response.text();
        const parsedRows = parseCSV(csvText);

        if (!parsedRows || parsedRows.length <= 1) {
          if (isMounted) {
            setReviews([]);
            setIsLoading(false);
          }
          return;
        }

        const parsedReviews = [];

        for (let i = 1; i < parsedRows.length; i++) {
          const row = parsedRows[i];
          if (!row || row.length === 0) continue;

          const rawName = row[0] ? String(row[0]).trim() : '';
          const rawRating = row[1] !== undefined ? parseInt(String(row[1]).trim(), 10) : 5;
          const rawComment = row[2] ? String(row[2]).trim() : '';

          const rating = isNaN(rawRating) ? 5 : Math.min(5, Math.max(1, rawRating));

          parsedReviews.push({
            id: `review_${i}`,
            name: rawName,
            rating: rating,
            comment: rawComment
          });
        }

        // Newest reviews at top
        parsedReviews.reverse();

        if (isMounted) {
          setReviews(parsedReviews);
          setIsLoading(false);
        }
      } catch (err) {
        console.warn('Error fetching customer reviews from Google Sheets CSV:', err);
        if (isMounted) {
          setHasError(true);
          setIsLoading(false);
        }
      }
    };

    fetchReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  // Calculate actual average rating
  const averageRating = useMemo(() => {
    if (reviews.length === 0) return '5.0';
    const total = reviews.reduce((acc, curr) => acc + curr.rating, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  // Star icons renderer
  const renderStars = (rating, size = 18) => {
    return [1, 2, 3, 4, 5].map((starIndex) => (
      <svg
        key={starIndex}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={starIndex <= rating ? '#FFA834' : 'none'}
        stroke={starIndex <= rating ? '#FFA834' : 'rgba(229, 138, 36, 0.35)'}
        strokeWidth="1.5"
        className={`feedback-star ${starIndex <= rating ? 'filled' : 'empty'}`}
        aria-hidden="true"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ));
  };

  return (
    <section className="feedback-section" id="feedback" aria-label={t('feedback.badge')}>
      <div className="container feedback-container">
        {/* Section Header */}
        <div className="feedback-header">
          <span className="feedback-badge">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            {t('feedback.badge')}
          </span>
          <h2 className="feedback-heading">{t('feedback.heading')}</h2>
          <p className="feedback-marathi-subheading">{t('feedback.marathiSubheading')}</p>
        </div>

        {/* Two-Column Responsive Layout Grid */}
        <div className="feedback-layout-grid">
          {/* =================================================================
             Left Column: Dark Green Customer Reviews Card & Form CTA
             ================================================================= */}
          <div className="feedback-content-card">
            {/* Average Rating Summary Banner */}
            <div className="feedback-rating-summary">
              <div className="summary-stars-row" aria-label={`${averageRating} out of 5 stars`}>
                {renderStars(Math.round(parseFloat(averageRating)), 28)}
              </div>
              <p className="summary-subtext">
                {t('feedback.avgRatingSubtext')}
              </p>
              {reviews.length > 0 && (
                <div className="summary-metrics">
                  <span className="metric-score">{averageRating}</span>
                  <span className="metric-divider">/ 5</span>
                  <span className="metric-count">
                    ({reviews.length} {t('feedback.reviewsCount')})
                  </span>
                </div>
              )}
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="feedback-loading-state" aria-live="polite">
                <div className="feedback-spinner" aria-hidden="true"></div>
                <p>{t('feedback.loading')}</p>
              </div>
            )}

            {/* Reviews List with Smooth Scrollbar */}
            {!isLoading && reviews.length > 0 && (
              <div className="reviews-list">
                {reviews.map((review) => (
                  <article key={review.id} className="review-card">
                    <div className="review-card-header">
                      <span className="review-customer-name">
                        {review.name || t('feedback.defaultCustomerName')}
                      </span>
                      <div className="review-stars-row" aria-label={`${review.rating} out of 5 stars`}>
                        {renderStars(review.rating, 17)}
                      </div>
                    </div>
                    {review.comment && (
                      <p className="review-comment">{review.comment}</p>
                    )}
                  </article>
                ))}
              </div>
            )}

            {/* Friendly Empty State */}
            {!isLoading && reviews.length === 0 && (
              <div className="feedback-empty-state">
                <div className="empty-icon-wrapper" aria-hidden="true">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <h3 className="empty-title">{t('feedback.noReviewsTitle')}</h3>
                <p className="empty-desc">{t('feedback.noReviewsDesc')}</p>
              </div>
            )}

            {/* Primary Action Button: Give Feedback */}
            <div className="feedback-action-wrapper">
              <a
                href={GOOGLE_FORM_FEEDBACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="feedback-submit-btn"
                aria-label={`${t('feedback.btnText')} - Google Form`}
              >
                <div className="feedback-btn-content">
                  <span className="btn-main-text">{t('feedback.btnText')}</span>
                  <span className="btn-sub-text">{t('feedback.btnSubtext')}</span>
                </div>
                <svg
                  className="feedback-btn-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>
          </div>

          {/* =================================================================
             Right Column: Customer Feedback Videos Card
             ================================================================= */}
          <div className="feedback-videos-card">
            <div className="feedback-videos-card-header">
              <span className="videos-pill-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                {t('feedback.videoHeading')}
              </span>
              <p className="videos-card-subtext">{t('feedback.videoSubheading')}</p>
            </div>

            {/* Vertical Video Cards Grid */}
            <div className="feedback-videos-grid">
              {customerVideos.map((video) => (
                <div
                  key={video.id}
                  className="customer-video-item"
                  onClick={() => setActiveVideo(video)}
                  role="button"
                  tabIndex={0}
                  aria-label={`${video.quote} ${video.author}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveVideo(video);
                    }
                  }}
                >
                  <img
                    src={video.poster}
                    alt={video.quote}
                    className="customer-video-poster"
                  />
                  <div className="customer-video-overlay-gradient"></div>

                  {/* Top Badges */}
                  <div className="customer-video-top-bar">
                    <span className="customer-video-badge">{video.badge}</span>
                    <span className="customer-video-duration">{video.duration}</span>
                  </div>

                  {/* Central Play Button */}
                  <div className="customer-video-play-btn" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="7 4 19 12 7 20 7 4" />
                    </svg>
                  </div>

                  {/* Bottom Captions */}
                  <div className="customer-video-bottom-caption">
                    <span className="customer-video-tag">{video.tag}</span>
                    <p className="customer-video-quote">"{video.quote}"</p>
                    <span className="customer-video-author">{video.author}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Card Footer: Live customer preference & Instagram reels CTA */}
            <div className="feedback-videos-card-footer">
              <div className="videos-footer-preference">
                <span className="pulsing-green-dot" aria-hidden="true"></span>
                <span>{t('feedback.videoFooterPreference')}</span>
              </div>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="videos-footer-reels-link"
                aria-label={`${t('feedback.videoFooterMore')} - Instagram`}
              >
                <span>{t('feedback.videoFooterMore')}</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* =================================================================
           Interactive Customer Video Player Modal
           ================================================================= */}
        {activeVideo && (
          <div
            className="feedback-video-modal-backdrop"
            onClick={() => setActiveVideo(null)}
            role="dialog"
            aria-modal="true"
            aria-label={activeVideo.quote}
          >
            <div
              className="feedback-video-modal-dialog"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="feedback-video-modal-close"
                onClick={() => setActiveVideo(null)}
                aria-label={t('feedback.closeVideo')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <div className="feedback-video-player-box">
                <video
                  ref={modalVideoRef}
                  src={activeVideo.videoSrc}
                  poster={activeVideo.poster}
                  controls
                  autoPlay
                  playsInline
                  className="feedback-reel-video"
                >
                  Your browser does not support video playback.
                </video>
              </div>

              <div className="feedback-video-modal-info">
                <span className="modal-video-badge">{activeVideo.badge}</span>
                <p className="modal-video-quote">"{activeVideo.quote}"</p>
                <span className="modal-video-author">{activeVideo.author}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Feedback;
