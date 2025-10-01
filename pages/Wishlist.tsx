import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../hooks/useWishlist';
import ProductCard from '../components/ProductCard';
import GlassContainer from '../components/GlassContainer';
import Button from '../components/Button';

const Wishlist: React.FC = () => {
  const { wishlistItems, wishlistCount } = useWishlist();

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-center mb-12 animation-fade-in-up">Your Wishlist</h1>
      
      {wishlistCount === 0 ? (
        <GlassContainer className="p-8 animation-fade-in-up">
          <div className="text-center py-12">
            <p className="text-xl text-[var(--text-secondary)] mb-6">Your wishlist is empty.</p>
            <Link to="/shop">
              <Button>Explore Products</Button>
            </Link>
          </div>
        </GlassContainer>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animation-fade-in-up">
          {wishlistItems.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
