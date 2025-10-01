import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '../constants';
import ProductCard from '../components/ProductCard';
import Sidebar from '../components/Sidebar';
import { Product } from '../types';
import GlassContainer from '../components/GlassContainer';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import Breadcrumbs from '../components/Breadcrumbs';

const Shop: React.FC = () => {
  const { category: categorySlug } = useParams<{ category?: string }>();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q');

  // Find category name from slug
  const category = categorySlug
    ? CATEGORIES.find(c => c.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-') === categorySlug)
    : undefined;

  const allBrands = useMemo(() => {
    const productsToConsider = category
      ? PRODUCTS.filter(p => p.category === category)
      : PRODUCTS;
    return [...new Set(productsToConsider.map(p => p.brand))].sort();
  }, [category]);
  
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(350000);
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortOption, setSortOption] = useState('featured');
  const [isLoading, setIsLoading] = useState(true);

  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };
  
  const handleRatingChange = (rating: number) => {
    setSelectedRating(prev => (prev === rating ? 0 : rating));
  };

  const filteredProducts = useMemo(() => {
    let products = PRODUCTS;

    if (searchQuery) {
        const lowercasedQuery = searchQuery.toLowerCase();
        products = products.filter(p =>
            p.name.toLowerCase().includes(lowercasedQuery) ||
            p.brand.toLowerCase().includes(lowercasedQuery) ||
            p.category.toLowerCase().includes(lowercasedQuery)
        );
    }

    if (category) {
      products = products.filter(p => p.category === category);
    }
    
    if (selectedBrands.length > 0) {
      products = products.filter(p => selectedBrands.includes(p.brand));
    }
    
    products = products.filter(p => p.price <= maxPrice);

    if (selectedRating > 0) {
      products = products.filter(p => p.rating >= selectedRating);
    }
    
    // Sorting logic
    switch (sortOption) {
      case 'price-asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        products.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        // Default is a mix, maybe by ID or rating
        products.sort((a,b) => b.rating - a.rating || a.id - b.id);
        break;
    }

    return products;
  }, [category, selectedBrands, maxPrice, selectedRating, sortOption, searchQuery]);
  
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [category, selectedBrands, maxPrice, selectedRating, sortOption, searchQuery]);

  const crumbs: { name: string; path?: string }[] = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: (category || searchQuery) ? '/shop' : undefined },
  ];
  if (searchQuery) {
      crumbs.push({ name: `Search: "${searchQuery}"` });
  } else if (category) {
      crumbs.push({ name: category });
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <Breadcrumbs crumbs={crumbs} />
      <div className="text-center mb-12 animation-fade-in-up">
        <h1 className="text-4xl font-bold">{searchQuery ? `Search results for "${searchQuery}"` : (category || 'All Products')}</h1>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Sidebar */}
        <div className="w-full lg:w-64 lg:sticky lg:top-40">
          <Sidebar
            brands={allBrands}
            selectedBrands={selectedBrands}
            onBrandChange={handleBrandChange}
            price={maxPrice}
            onPriceChange={setMaxPrice}
            selectedRating={selectedRating}
            onRatingChange={handleRatingChange}
            isLoading={isLoading}
          />
        </div>
        
        {/* Products Grid */}
        <main className="flex-1">
          {/* Sort and Count */}
          <GlassContainer isLoading={isLoading} className="p-4 mb-8 flex justify-between items-center animation-fade-in-up" style={{ animationDelay: '100ms' }}>
            <p className="text-sm text-[var(--text-secondary)]">{filteredProducts.length} Products Found</p>
            <div className="relative">
              <select 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-full pl-4 pr-8 py-2 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring-color)] focus:shadow-[0_0_10px_var(--focus-ring-color)] transition-all duration-300 cursor-pointer"
                aria-label="Sort products"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Customer Rating</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </GlassContainer>

          {isLoading ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => <ProductCardSkeleton key={index} />)}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 animation-fade-in-up" style={{ animationDelay: '200ms' }}>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <GlassContainer className="p-8 animation-fade-in-up" style={{ animationDelay: '200ms' }}>
                <div className="text-center py-12">
                    <p className="text-xl text-[var(--text-secondary)]">No products match your filters.</p>
                </div>
            </GlassContainer>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;