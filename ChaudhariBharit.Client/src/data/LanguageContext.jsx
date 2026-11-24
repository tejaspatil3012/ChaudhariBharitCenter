import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { translations, defaultLanguage, supportedLanguages } from './translations';

const STORAGE_KEY = 'chaudhari_bharit_lang';

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  // 1. Initialize language: Check localStorage first; if not found or invalid, default to Marathi ('mr')
  const [language, setLanguageState] = useState(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved && (saved === 'mr' || saved === 'en')) {
          return saved;
        }
      }
    } catch (e) {
      console.warn('LocalStorage not accessible for language retrieval:', e);
    }
    return defaultLanguage; // 'mr' (मराठी)
  });

  // 2. Set language and persist in localStorage
  const setLanguage = useCallback((lang) => {
    if (lang === 'mr' || lang === 'en') {
      setLanguageState(lang);
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem(STORAGE_KEY, lang);
        }
      } catch (e) {
        console.warn('LocalStorage not accessible for language persistence:', e);
      }
    }
  }, []);

  // 3. Quick toggle between Marathi and English
  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'mr' ? 'en' : 'mr');
  }, [language, setLanguage]);

  // 4. Update html lang attribute, title and meta description dynamically
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (language === 'en') {
        document.title = 'Chaudhari Bharit Center | Authentic Homemade Taste';
        if (metaDesc) {
          metaDesc.setAttribute(
            'content',
            'Visit Chaudhari Bharit Center in Kingaon for authentic Khandeshi Bharit, Bhakri, Puri and traditional homemade food. Takeaway available.'
          );
        }
      } else {
        document.title = 'Chaudhari Bharit Center | अस्सल घरगुती चव';
        if (metaDesc) {
          metaDesc.setAttribute(
            'content',
            'चौधरी भरीत सेंटर, किनगाव येथे अस्सल खान्देशी भरीत, भाकरी, पुरी आणि पारंपरिक पदार्थांचा आनंद घ्या. पार्सल सुविधा उपलब्ध.'
          );
        }
      }
    }
  }, [language]);

  // 5. Translation accessor with fallback mechanism
  const t = useMemo(() => {
    return (keyPath, fallback = '') => {
      if (!keyPath || typeof keyPath !== 'string') return '';
      
      const keys = keyPath.split('.');
      let current = translations[language];

      for (const key of keys) {
        if (current && typeof current === 'object' && key in current) {
          current = current[key];
        } else {
          // If translation key is missing in active language, fallback to default (Marathi)
          let fb = translations[defaultLanguage];
          for (const k of keys) {
            if (fb && typeof fb === 'object' && k in fb) {
              fb = fb[k];
            } else {
              return fallback || keyPath;
            }
          }
          return fb || fallback || keyPath;
        }
      }

      if (Array.isArray(current) || typeof current === 'string' || typeof current === 'number') {
        return current;
      }
      return fallback || keyPath;
    };
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      isMarathi: language === 'mr',
      isEnglish: language === 'en',
      supportedLanguages,
      t
    }),
    [language, setLanguage, toggleLanguage, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
