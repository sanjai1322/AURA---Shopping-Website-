import React from 'react';
import GlassContainer from './GlassContainer';
import StarRating from './StarRating';

interface SidebarProps {
  brands: string[];
  selectedBrands: string[];
  onBrandChange: (brand: string) => void;
  price: number;
  onPriceChange: (price: number) => void;
  selectedRating: number;
  onRatingChange: (rating: number) => void;
  isLoading?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  brands,
  selectedBrands,
  onBrandChange,
  price,
  onPriceChange,
  selectedRating,
  onRatingChange,
  isLoading = false,
}) => {
  return (
    <aside className="w-full lg:w-64 space-y-8">
      {/* Price Filter */}
      <GlassContainer isLoading={isLoading} className="p-6 animation-fade-in-up" style={{ animationDelay: '100ms' }}>
        <h3 className="font-bold mb-4 text-lg">Price Range</h3>
        <input
          type="range"
          min="0"
          max="350000"
          step="5000"
          value={price}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="w-full cursor-pointer"
          aria-label="Price range slider"
        />
        <div className="flex justify-between text-sm text-[var(--text-secondary)] mt-2 font-mono">
          <span>₹0</span>
          <span>₹{price.toLocaleString('en-IN')}</span>
        </div>
      </GlassContainer>

      {/* Brand Filter */}
      <GlassContainer isLoading={isLoading} className="p-6 animation-fade-in-up" style={{ animationDelay: '200ms' }}>
        <h3 className="font-bold mb-4 text-lg">Brands</h3>
        <div className="space-y-3">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => onBrandChange(brand)}
                className="custom-checkbox"
              />
              <span className="text-[var(--text-primary)] group-hover:text-[var(--text-primary)] transition-colors">{brand}</span>
            </label>
          ))}
        </div>
      </GlassContainer>

      {/* Rating Filter */}
      <GlassContainer isLoading={isLoading} className="p-6 animation-fade-in-up" style={{ animationDelay: '300ms' }}>
        <h3 className="font-bold mb-4 text-lg">Rating</h3>
        <div className="space-y-3">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="radio"
                name="rating"
                checked={selectedRating === rating}
                onChange={() => onRatingChange(rating)}
                className="custom-radio"
              />
              <StarRating rating={rating} />
              <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">& Up</span>
            </label>
          ))}
        </div>
      </GlassContainer>
    </aside>
  );
};

export default Sidebar;