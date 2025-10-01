import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import Card from './Card';
import Button from './Button';
import StarRating from './StarRating';
import HeartIcon from './icons/HeartIcon';
import ShoppingCartIcon from './icons/ShoppingCartIcon';
import QuickViewModal from './QuickViewModal';
import ImageWithLoader from './ImageWithLoader';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const navigate = useNavigate();

  const isWishlisted = isInWishlist(product.id);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const middleX = rect.width / 2;
    const middleY = rect.height / 2;
    const rotateY = (x - middleX) / middleX * 7; // Max rotation 7 degrees
    const rotateX = (middleY - y) / middleY * 7;
    el.style.setProperty('--rotate-x', `${rotateX}deg`);
    el.style.setProperty('--rotate-y', `${rotateY}deg`);
    el.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
    el.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.setProperty('--rotate-x', '0deg');
    el.style.setProperty('--rotate-y', '0deg');
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };
  
  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };
  
  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };


  const finalPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price;

  const formatPrice = (price: number) => price.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <>
      <div onClick={handleCardClick} className="block group h-full cursor-pointer" role="link" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}>
        <Card 
            className="transition-all duration-300 hover:shadow-[var(--card-hover-shadow)] hover:-translate-y-2 transition-ios interactive-tilt"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
          <div className="relative">
            <div className="relative aspect-square overflow-hidden rounded-t-2xl">
              <ImageWithLoader
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full"
                imgClassName="object-cover transition-transform duration-300 group-hover:scale-105 transition-ios"
              />
              <div 
                className="absolute inset-0 bg-[var(--glass-bg)] backdrop-blur-[2px] opacity-0 group-hover:animate-image-ripple pointer-events-none"
              ></div>
              <div className="glossy-sheen"></div>
            </div>
            
            <div className="absolute top-3 right-3">
              <button
                onClick={handleWishlistClick}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 ${isWishlisted ? 'bg-red-500/20 text-red-400' : 'bg-black/20 text-[var(--text-primary)] hover:bg-[var(--glass-bg)]'}`}
              >
                <HeartIcon filled={isWishlisted} className="w-5 h-5" />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transition-ios flex justify-center items-center">
                <Button onClick={handleQuickViewClick} className="py-2 px-4 text-sm">
                    Quick View
                </Button>
            </div>
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <div>
              <p className="text-sm text-[var(--text-secondary)] mb-1">{product.brand}</p>
              <h3 className="font-semibold text-[var(--text-primary)] truncate group-hover:whitespace-normal">
                {product.name}
              </h3>
              <div className="flex items-center justify-between mt-3">
                  <div className="flex items-baseline gap-2">
                      <p className="text-lg font-bold">{formatPrice(finalPrice)}</p>
                      {product.discount && (
                          <p className="text-sm text-[var(--text-secondary)] line-through">{formatPrice(product.price)}</p>
                      )}
                  </div>
                  <StarRating rating={product.rating} />
              </div>
            </div>
            <Button
                onClick={handleAddToCartClick}
                className="w-full mt-auto py-3 text-sm"
            >
                <span className="inline-flex items-center justify-center w-full h-full gap-2">
                  <ShoppingCartIcon className="w-5 h-5"/>
                  <span>Add to Cart</span>
                </span>
            </Button>
          </div>
        </Card>
      </div>
      {isQuickViewOpen && <QuickViewModal product={product} onClose={() => setIsQuickViewOpen(false)} />}
    </>
  );
};

export default ProductCard;