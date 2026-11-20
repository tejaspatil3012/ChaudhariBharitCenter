import React from 'react';
import { useLanguage } from '../data/LanguageContext';

/**
 * Reusable LanguageSwitcher Component
 * Displays 'मराठी' and 'English' options.
 * Ready to be seamlessly embedded into Navbar in Step 3.
 */
export const LanguageSwitcher = ({ className = '', isDark = false }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={`lang-switcher ${className}`}
      role="group"
      aria-label="Language selection"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '3px',
        borderRadius: 'var(--radius-sm)',
        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'var(--color-secondary-light)',
        border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.2)' : 'var(--color-border)'}`
      }}
    >
      <button
        type="button"
        onClick={() => setLanguage('mr')}
        aria-pressed={language === 'mr'}
        style={{
          padding: '6px 14px',
          borderRadius: 'var(--radius-xs)',
          fontSize: 'var(--fs-sm)',
          fontWeight: language === 'mr' ? 'var(--fw-bold)' : 'var(--fw-medium)',
          fontFamily: 'var(--font-marathi)',
          backgroundColor: language === 'mr' ? 'var(--color-secondary)' : 'transparent',
          color: language === 'mr' ? 'var(--color-text-inverse)' : (isDark ? '#FDF1E2' : 'var(--color-text)'),
          cursor: 'pointer',
          transition: 'all var(--transition-fast)',
          border: 'none',
          outline: 'none',
          boxShadow: language === 'mr' ? 'var(--shadow-xs)' : 'none'
        }}
      >
        मराठी
      </button>

      <button
        type="button"
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        style={{
          padding: '6px 14px',
          borderRadius: 'var(--radius-xs)',
          fontSize: 'var(--fs-sm)',
          fontWeight: language === 'en' ? 'var(--fw-bold)' : 'var(--fw-medium)',
          fontFamily: 'var(--font-english)',
          backgroundColor: language === 'en' ? 'var(--color-secondary)' : 'transparent',
          color: language === 'en' ? 'var(--color-text-inverse)' : (isDark ? '#FDF1E2' : 'var(--color-text)'),
          cursor: 'pointer',
          transition: 'all var(--transition-fast)',
          border: 'none',
          outline: 'none',
          boxShadow: language === 'en' ? 'var(--shadow-xs)' : 'none'
        }}
      >
        English
      </button>
    </div>
  );
};

export default LanguageSwitcher;
