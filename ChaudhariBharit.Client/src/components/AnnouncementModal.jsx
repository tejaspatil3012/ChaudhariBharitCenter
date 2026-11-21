import React, { useState, useEffect } from 'react';
import { useLanguage } from '../data/LanguageContext';
import './AnnouncementModal.css';

export const AnnouncementModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { isMarathi } = useLanguage();

  useEffect(() => {
    // Lock body scroll when modal is open
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="announcement-modal-backdrop"
      onClick={() => setIsOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label={isMarathi ? 'विशेष घोषणा - नवीन डिश लवकरच येत आहे' : 'Special Announcement - Coming Soon'}
    >
      <div
        className="announcement-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button */}
        <button
          type="button"
          className="announcement-modal-close"
          onClick={() => setIsOpen(false)}
          aria-label={isMarathi ? 'पॉपअप बंद करा' : 'Close popup'}
        >
          <svg
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
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Poster Image */}
        <div className="announcement-poster-wrapper">
          <img
            src="/images/coming-soon-poster.jpg"
            alt={isMarathi ? 'चौधरी भरीत सेंटर - स्टार्टर्स मध्ये लवकरच एक नवीन डिश येत आहे - Coming Soon' : 'Chaudhari Bharit Center - Coming Soon'}
            className="announcement-poster-img"
          />
        </div>
      </div>
    </div>
  );
};

export default AnnouncementModal;
