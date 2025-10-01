import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../hooks/useCart';
import Button from './Button';
import XIcon from './icons/XIcon';
import StarRating from './StarRating';
import ImageWithLoader from './ImageWithLoader';

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Close modal on escape key press
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const handleAddToCart = () => {
    addToCart(product);
    onClose();
  };

  const handleViewDetails = () => {
    onClose();
    navigate(`/product/${product.id}`);
  };

  const finalPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price;
  const formatPrice = (price: number) => price.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-end md:items-stretch justify-center md:justify-end z-[100] animation-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-view-title"
    >
      <div
        className="relative w-full max-w-md h-[90vh] md:h-full bg-[var(--bg-primary)] backdrop-blur-2xl border-t md:border-t-0 md:border-l border-[var(--glass-border)] shadow-lg overflow-hidden flex flex-col rounded-t-2xl md:rounded-t-none md:rounded-l-2xl md:animation-slide-in-from-right animation-slide-in-from-bottom"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex-shrink-0 flex items-center justify-between p-4 border-b border-[var(--glass-border)]">
            <p className="text-lg font-bold">Quick View</p>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)] z-10 transition-colors"
              aria-label="Close"
            >
              <XIcon className="w-5 h-5" />
            </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
            <div className="w-full mb-4">
              <ImageWithLoader
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-auto aspect-square rounded-lg"
                imgClassName="object-contain"
              />
            </div>
            
            <h2 id="quick-view-title" className="text-2xl font-bold mb-1">{product.name}</h2>
            <p className="text-md text-[var(--text-secondary)] mb-3">by {product.brand}</p>
            <div className="flex items-center gap-3 mb-4">
                <StarRating rating={product.rating} />
                <span className="text-sm text-[var(--text-secondary)] pt-0.5">{product.reviewsCount} reviews</span>
            </div>

            <div className="flex items-baseline gap-3 my-4">
                <span className="text-3xl font-bold">{formatPrice(finalPrice)}</span>
                {product.discount && (
                  <>
                    <span className="text-xl text-[var(--text-secondary)] line-through">{formatPrice(product.price)}</span>
                    <span className="bg-green-500/20 text-green-300 text-sm font-semibold px-3 py-1 rounded-full">{product.discount}% off</span>
                  </>
                )}
            </div>
          
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                {product.description}
            </p>
        </div>
        
        <footer className="flex-shrink-0 p-4 border-t border-[var(--glass-border)] bg-[var(--surface-color)]/50 space-y-3">
             <Button onClick={handleAddToCart} className="w-full py-3 text-base">
              Add to Cart
            </Button>
            <Button onClick={handleViewDetails} className="w-full py-3 text-base bg-transparent dark:bg-[var(--glass-bg)] hover:bg-[var(--glass-bg)] dark:hover:bg-[rgba(255,255,255,0.1)]">
              View Full Details
            </Button>
        </footer>
      </div>
    </div>
  );
};

export default QuickViewModal;