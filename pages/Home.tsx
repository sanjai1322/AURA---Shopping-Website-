
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import GlassContainer from '../components/GlassContainer';
import ImageWithLoader from '../components/ImageWithLoader';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import { Product } from '../types';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setFeaturedProducts(PRODUCTS.filter(p => p.rating >= 4.8).slice(0, 4));
      setNewArrivals(PRODUCTS.slice().sort((a, b) => b.id - a.id).slice(0, 4));
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const middleX = rect.width / 2;
    const middleY = rect.height / 2;
    const rotateY = (x - middleX) / middleX * 7;
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


  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section 
        className="relative max-w-6xl mx-auto px-4 -mt-16 py-16 text-center overflow-hidden rounded-b-3xl"
      >
        {/* Background Aurora */}
        <div className="absolute inset-0 z-0">
           <div className="absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2 animate-aurora filter blur-3xl opacity-50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[50vh]">
            <GlassContainer 
                ref={heroRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="animation-fade-in-up p-8 md:p-12 w-full max-w-4xl interactive-tilt"
            >
                <div className="glossy-sheen"></div>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-black dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-b dark:from-white dark:to-zinc-400 my-4 leading-tight">
                    Experience the Aura of Innovation.
                </h1>
                <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10">
                    Discover a curated collection where futuristic design meets unparalleled performance. Step into a new era of technology.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to="/shop">
                        <Button className="px-8 py-4 text-lg w-full sm:w-auto">Explore Collection</Button>
                    </Link>
                    <Link to="/shop/new-arrivals"> {/* Example link */}
                        <Button className="px-8 py-4 text-lg bg-transparent hover:bg-[var(--glass-bg)] w-full sm:w-auto">New Arrivals</Button>
                    </Link>
                </div>
            </GlassContainer>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 animation-fade-in-up">Top Rated</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => <ProductCardSkeleton key={index} />)
            : featuredProducts.map((product, index) => (
                <div key={product.id} className="animation-fade-in-up" style={{ animationDelay: `${index * 100}ms`}}>
                  <ProductCard product={product} />
                </div>
              ))}
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="max-w-6xl mx-auto px-4">
         <GlassContainer className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="animation-fade-in-up" style={{ animationDelay: '100ms' }}>
                    <h3 className="text-xl font-bold mb-2">Curated Selection</h3>
                    <p className="text-[var(--text-secondary)]">Only the best, most innovative products make it into our collection.</p>
                </div>
                <div className="animation-fade-in-up" style={{ animationDelay: '200ms' }}>
                    <h3 className="text-xl font-bold mb-2">Secure & Fast Shipping</h3>
                    <p className="text-[var(--text-secondary)]">Your new tech arrives safely at your doorstep, quick and hassle-free.</p>
                </div>
                <div className="animation-fade-in-up" style={{ animationDelay: '300ms' }}>
                    <h3 className="text-xl font-bold mb-2">Exceptional Support</h3>
                    <p className="text-[var(--text-secondary)]">Our team is always here to help you with any questions or concerns.</p>
                </div>
            </div>
         </GlassContainer>
      </section>

      {/* New Arrivals */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 animation-fade-in-up">New Arrivals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => <ProductCardSkeleton key={index} />)
            : newArrivals.map((product, index) => (
                <div key={product.id} className="animation-fade-in-up" style={{ animationDelay: `${index * 100}ms`}}>
                  <ProductCard product={product} />
                </div>
              ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/shop">
            <Button>View All Products</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;