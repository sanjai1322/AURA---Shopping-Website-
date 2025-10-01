import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import GlassContainer from '../components/GlassContainer';
import Button from '../components/Button';
import StarRating from '../components/StarRating';
import ProductCard from '../components/ProductCard';
import HeartIcon from '../components/icons/HeartIcon';
import ImageWithLoader from '../components/ImageWithLoader';
import { Product } from '../types';
import Breadcrumbs from '../components/Breadcrumbs';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [product, setProduct] = useState<Product | null | undefined>(undefined);

  useEffect(() => {
    setProduct(undefined); // Start loading
    const timer = setTimeout(() => {
      const foundProduct = PRODUCTS.find(p => p.id === Number(id));
      setProduct(foundProduct || null);
    }, 500);
    return () => clearTimeout(timer);
  }, [id]);

  if (product === undefined) {
    // Loading state with shimmer
    return (
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Image Skeleton */}
          <GlassContainer isLoading={true}>
            <div className="aspect-square bg-[var(--skeleton-bg)] animate-pulse-bg"></div>
          </GlassContainer>
          
          {/* Details Skeleton */}
          <div className="p-6 md:p-8 flex flex-col">
            <div className="h-10 bg-[var(--skeleton-bg)] rounded w-3/4 mb-4 animate-pulse-bg"></div>
            <div className="h-6 bg-[var(--skeleton-bg)] rounded w-1/4 mb-5 animate-pulse-bg" style={{animationDelay: '0.05s'}}></div>
            <div className="h-5 bg-[var(--skeleton-bg)] rounded w-1/2 mb-6 animate-pulse-bg" style={{animationDelay: '0.1s'}}></div>
            <div className="h-8 bg-[var(--skeleton-bg)] rounded w-1/3 mb-8 animate-pulse-bg" style={{animationDelay: '0.15s'}}></div>
            <div className="space-y-3 flex-grow">
              <div className="h-4 bg-[var(--skeleton-bg)] rounded animate-pulse-bg" style={{animationDelay: '0.2s'}}></div>
              <div className="h-4 bg-[var(--skeleton-bg)] rounded animate-pulse-bg" style={{animationDelay: '0.25s'}}></div>
              <div className="h-4 bg-[var(--skeleton-bg)] rounded w-5/6 animate-pulse-bg" style={{animationDelay: '0.3s'}}></div>
            </div>
            <div className="flex gap-4 mt-auto pt-6">
              <div className="h-14 bg-[var(--skeleton-bg)] rounded-full flex-grow animate-pulse-bg" style={{animationDelay: '0.35s'}}></div>
              <div className="h-14 bg-[var(--skeleton-bg)] rounded-full flex-grow animate-pulse-bg" style={{animationDelay: '0.4s'}}></div>
              <div className="h-14 w-14 bg-[var(--skeleton-bg)] rounded-full flex-shrink-0 animate-pulse-bg" style={{animationDelay: '0.45s'}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center max-w-lg mx-auto px-4">
        <GlassContainer className="p-8">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-[var(--text-secondary)] mb-6">We couldn't find the product you're looking for.</p>
          <Link to="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </GlassContainer>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);

  const handleWishlistClick = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate('/cart');
  };

  const finalPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price;
  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);
  const formatPrice = (price: number) => price.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const categorySlug = product.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: product.category, path: `/shop/${categorySlug}` },
    { name: product.name }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-24">
      <section>
        <Breadcrumbs crumbs={crumbs} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Product Image */}
          <GlassContainer className="p-4 group">
            <ImageWithLoader
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-auto aspect-square rounded-lg"
              imgClassName="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </GlassContainer>

          {/* Product Details */}
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              {product.name}
            </h1>
            <p className="text-lg text-[var(--text-secondary)] mb-3">by {product.brand}</p>
            <div className="flex items-center gap-3 mb-4">
              <StarRating rating={product.rating} />
              <a href="#reviews" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300 pt-0.5">{product.reviewsCount} reviews</a>
            </div>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold">{formatPrice(finalPrice)}</span>
              {product.discount && (
                <>
                  <span className="text-xl text-[var(--text-secondary)] line-through">{formatPrice(product.price)}</span>
                  <span className="bg-green-500/20 text-green-300 text-sm font-semibold px-3 py-1 rounded-full">{product.discount}% off</span>
                </>
              )}
            </div>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
              {product.description}
            </p>
            <div className="flex gap-4 mt-auto">
              <Button onClick={() => addToCart(product)} className="flex-grow py-4 text-lg">
                Add to Cart
              </Button>
              <Button onClick={handleBuyNow} className="flex-grow py-4 text-lg bg-transparent hover:bg-[var(--glass-bg)]">
                Buy Now
              </Button>
              <button
                  onClick={handleWishlistClick}
                  aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  className={`p-4 rounded-full transition-all duration-300 ${isWishlisted ? 'bg-red-500/20 text-red-400 border border-red-500/50' : 'bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/20'}`}
              >
                  <HeartIcon filled={isWishlisted} className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications and Reviews */}
      <GlassContainer>
        <div className="p-8">
            <h3 className="text-2xl font-bold mb-6">Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-[var(--text-primary)]">
                <div className="flex justify-between border-b border-[var(--glass-border)] py-2"><span className="text-[var(--text-secondary)]">Brand</span><span>{product.brand}</span></div>
                <div className="flex justify-between border-b border-[var(--glass-border)] py-2"><span className="text-[var(--text-secondary)]">Category</span><span>{product.category}</span></div>
                <div className="flex justify-between border-b border-[var(--glass-border)] py-2"><span className="text-[var(--text-secondary)]">Model</span><span>{product.name}</span></div>
                <div className="flex justify-between border-b border-[var(--glass-border)] py-2"><span className="text-[var(--text-secondary)]">Origin</span><span>Future City</span></div>
            </div>
        </div>
      </GlassContainer>
      
      <div id="reviews">
        <h3 className="text-2xl font-bold mb-6 text-center">Customer Reviews</h3>
        <GlassContainer className="p-8 space-y-6">
            {/* Dummy reviews */}
            <div className="border-b border-[var(--glass-border)] pb-4">
                <div className="flex items-center mb-2">
                    <StarRating rating={5}/>
                    <p className="ml-3 font-semibold">Incredible Piece of Tech!</p>
                </div>
                <p className="text-[var(--text-secondary)]">Absolutely stunning design and functionality. The holographic display is even better in person. Highly recommended!</p>
                <p className="text-xs text-[var(--text-secondary)] mt-2">Alex C. on January 15, 2024</p>
            </div>
            <div className="border-b border-[var(--glass-border)] pb-4">
                <div className="flex items-center mb-2">
                    <StarRating rating={4}/>
                    <p className="ml-3 font-semibold">Great product, minor flaws</p>
                </div>
                <p className="text-[var(--text-secondary)]">Love the aesthetic and it works perfectly. Battery life could be a bit better, but it's a small price to pay for this design.</p>
                <p className="text-xs text-[var(--text-secondary)] mt-2">Jasmine R. on February 02, 2024</p>
            </div>
        </GlassContainer>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold text-center mb-12">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;