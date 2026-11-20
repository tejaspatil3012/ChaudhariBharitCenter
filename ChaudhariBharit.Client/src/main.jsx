import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LanguageProvider } from './data/LanguageContext';
import './styles/global.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>
);
