import React, { useState, useMemo } from 'react';
import { useLanguage } from '../data/LanguageContext';
import menuData from '../data/menuData.json';
import './Menu.css';

// Single Menu Card Component with portion/weight variants support
const MenuCard = ({ item, language, isMarathi, failedImages, handleImageError }) => {
  const [selectedVariant, setSelectedVariant] = useState(
    item.variants && item.variants.length > 0 ? item.variants[0] : null
  );

  const hasImage = item.image && !failedImages[item.id];
  const itemName = item.name[language] || item.name.mr;
  const itemDesc = item.description ? (item.description[language] || item.description.mr) : '';
  const itemBadge = !item.variants && item.badge ? (item.badge[language] || item.badge.mr) : null;
  const currentPrice = selectedVariant ? selectedVariant.price : item.price;

  return (
    <article
      className={`menu-card ${item.isSpecial ? 'is-featured' : ''}`}
    >
      {/* Image Frame */}
      <div className="menu-card-img-wrapper">
        {/* Pure Veg Indicator Dot */}
        <div className="veg-badge" title="100% Pure Vegetarian" aria-label="100% Pure Vegetarian">
          <span className="veg-badge-circle" aria-hidden="true"></span>
        </div>

        {/* Floating Badge (Unlimited, 1kg, etc.) */}
        {itemBadge && (
          <span className="menu-item-badge">
            {itemBadge}
          </span>
        )}

        {hasImage ? (
          <img
            src={item.image}
            alt={itemName}
            className="menu-card-img"
            onError={() => handleImageError(item.id)}
            loading="lazy"
          />
        ) : (
          <div className="menu-img-placeholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <ellipse cx="12" cy="7" rx="6" ry="2" />
              <path d="M6 7c0 4 2 8 6 8s6-4 6-8" />
              <path d="M5 14c0 4 3 7 7 7s7-3 7-7" />
            </svg>
            <span>{itemName}</span>
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="menu-card-body">
        <div className="menu-card-info">
          <h4 className="menu-item-name">
            {itemName}
          </h4>
          {itemDesc && (
            <p className="menu-item-desc">
              {itemDesc}
            </p>
          )}
        </div>

        {/* Weight / Portion Selector Pills */}
        {item.variants && item.variants.length > 0 && (
          <div className="menu-variants-bar" role="radiogroup" aria-label="वजन पर्याय / Portion Options">
            {item.variants.map((v) => {
              const isSelected = selectedVariant?.id === v.id;
              const vLabel = v.label[language] || v.label.mr;
              return (
                <button
                  key={v.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  className={`menu-variant-pill ${isSelected ? 'active' : ''}`}
                  onClick={() => setSelectedVariant(v)}
                >
                  {vLabel}
                </button>
              );
            })}
          </div>
        )}

        {/* Card Footer with Price */}
        <div className="menu-card-footer">
          <div className="menu-price-box">
            <span className="menu-currency">₹</span>
            <span className="menu-price-amount">{currentPrice}</span>
          </div>

          <span className="menu-order-note">
            {item.isSpecial
              ? (isMarathi ? '⭐ खास वैशिष्ट्य' : '⭐ Chef Special')
              : (isMarathi ? '✓ ताजे तयार' : '✓ Freshly Made')}
          </span>
        </div>
      </div>
    </article>
  );
};

/**
 * Menu Component for Chaudhari Bharit Center
 * Displays official menu items across 3 distinct categories,
 * supporting interactive weight variants, category filtering, bilingual titles, and food photography.
 */
export const Menu = () => {
  const { language, isMarathi, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [failedImages, setFailedImages] = useState({});

  // Record failed images gracefully
  const handleImageError = (id) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  // Group items by category
  const categories = menuData.categories;
  const allItems = menuData.items;

  // Filter items based on active tab
  const filteredCategories = useMemo(() => {
    if (activeCategory === 'all') {
      return categories.filter((cat) => cat.id !== 'all');
    }
    return categories.filter((cat) => cat.id === activeCategory);
  }, [activeCategory, categories]);

  return (
    <section className="menu-section" id="menu" aria-label="Our Menu">
      <div className="container menu-container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-badge">
            {t('menu.badge')}
          </span>
          <h2 className="section-title">
            {t('menu.heading')}
          </h2>
          <p className="section-subtitle">
            {t('menu.subtitle')}
          </p>
        </div>

        {/* Category Navigation Filter Tabs */}
        <div className="menu-tabs-wrapper" role="tablist" aria-label="Menu Categories">
          {categories.map((cat) => {
            const count = cat.id === 'all'
              ? allItems.length
              : allItems.filter((i) => i.category === cat.id).length;

            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`menu-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span>{cat.name[language] || cat.name.mr}</span>
                <span className="tab-count">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Menu Categories and Cards */}
        {filteredCategories.map((category) => {
          const categoryItems = allItems.filter((item) => item.category === category.id);
          const isThaliCategory = category.id === 'thalis';

          return (
            <div key={category.id} className="menu-category-group">
              {/* Category Header */}
              <div className="menu-category-header">
                <div>
                  <h3 className="menu-category-title">
                    <span>{category.name[language] || category.name.mr}</span>
                  </h3>
                  {category.subtitle && (
                    <p className="menu-category-subtitle">
                      {category.subtitle[language] || category.subtitle.mr}
                    </p>
                  )}
                </div>
                <span className="section-badge section-badge-green" style={{ fontSize: 'var(--fs-xs)', margin: 0 }}>
                  {categoryItems.length} {t('menu.itemsCount')}
                </span>
              </div>

              {/* Items Cards Grid */}
              <div className={`menu-cards-grid ${isThaliCategory ? 'thalis-grid' : ''}`}>
                {categoryItems.map((item) => (
                  <MenuCard
                    key={item.id}
                    item={item}
                    language={language}
                    isMarathi={isMarathi}
                    failedImages={failedImages}
                    handleImageError={handleImageError}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Menu;
