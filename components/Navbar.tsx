import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { useTheme } from '../hooks/useTheme';
import { NAV_LINKS } from '../constants';
import ShoppingCartIcon from './icons/ShoppingCartIcon';
import HeartIcon from './icons/HeartIcon';
import MenuIcon from './icons/MenuIcon';
import XIcon from './icons/XIcon';
import UserIcon from './icons/UserIcon';
import SearchIcon from './icons/SearchIcon';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';
import Tooltip from './Tooltip';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [isCartAnimating, setIsCartAnimating] = useState(false);
  const prevCartCount = useRef(cartCount);
  const [isWishlistAnimating, setIsWishlistAnimating] = useState(false);
  const prevWishlistCount = useRef(wishlistCount);

  useEffect(() => {
    if (cartCount > prevCartCount.current) {
        setIsCartAnimating(true);
        const timer = setTimeout(() => setIsCartAnimating(false), 400);
        return () => clearTimeout(timer);
    }
    prevCartCount.current = cartCount;
  }, [cartCount]);

  useEffect(() => {
    if (wishlistCount > prevWishlistCount.current) {
        setIsWishlistAnimating(true);
        const timer = setTimeout(() => setIsWishlistAnimating(false), 400);
        return () => clearTimeout(timer);
    }
    prevWishlistCount.current = wishlistCount;
  }, [wishlistCount]);
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinkClasses = `block px-3 py-2 rounded-md text-base font-medium text-[var(--text-secondary)] hover:bg-[var(--glass-bg)] hover:text-[var(--text-primary)]`;

  return (
    <header className="bg-[var(--surface-color)] backdrop-blur-2xl border-b border-[var(--glass-border)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="text-[var(--brand-logo-color)] brand-glow font-bold text-xl tracking-wider mr-6">
              AURA
            </NavLink>
             <div className="md:hidden">
                <Tooltip text={isOpen ? 'Close menu' : 'Open menu'}>
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="inline-flex items-center justify-center p-2 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)] focus:outline-none transition-colors"
                    >
                      {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                    </button>
                </Tooltip>
              </div>
          </div>

          <form onSubmit={handleSearchSubmit} className="flex-1 hidden md:flex justify-center px-6">
            <div className="w-full max-w-lg">
              <label htmlFor="search" className="sr-only">Search</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-[var(--text-secondary)] group-focus-within:text-[var(--text-primary)] transition-colors" />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-full py-2 pl-10 pr-10 text-sm placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring-color)] focus:shadow-[0_0_10px_var(--focus-ring-color)] transition-all duration-300"
                  placeholder="Search for products, brands and more"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="p-1 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)] transition-colors"
                      aria-label="Clear search"
                    >
                      <XIcon className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </form>
          
          <div className="flex items-center space-x-2">
             <div className="hidden md:flex items-center space-x-2">
                 <Tooltip text="My Account">
                     <NavLink to="/login" className="p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)] transition-colors duration-200">
                        <UserIcon className="h-6 w-6"/>
                     </NavLink>
                 </Tooltip>
                 <Tooltip text={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
                    <button onClick={toggleTheme} className="p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)] transition-colors duration-200">
                        {theme === 'dark' ? <SunIcon className="h-6 w-6"/> : <MoonIcon className="h-6 w-6"/>}
                    </button>
                 </Tooltip>
                 <div className="w-px h-6 bg-[var(--glass-border)]"></div>
              </div>
            <Tooltip text="Wishlist">
              <NavLink
                to="/wishlist"
                className={`relative text-[var(--text-secondary)] hover:text-[var(--text-primary)] block p-2 rounded-full hover:bg-[var(--glass-bg)] transition-colors duration-200 ${isWishlistAnimating ? 'animate-pulse-once' : ''}`}
              >
                <HeartIcon className="h-6 w-6" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--checkbox-checked-bg-color)] text-[var(--checkbox-tick-color)] text-xs font-bold transform -translate-y-1/4 translate-x-1/4">
                    {wishlistCount}
                  </span>
                )}
              </NavLink>
            </Tooltip>
            <Tooltip text="Shopping Cart">
              <NavLink
                to="/cart"
                className={`relative text-[var(--text-secondary)] hover:text-[var(--text-primary)] block p-2 rounded-full hover:bg-[var(--glass-bg)] transition-colors duration-200 ${isCartAnimating ? 'animate-pulse-once' : ''}`}
              >
                <ShoppingCartIcon className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--checkbox-checked-bg-color)] text-[var(--checkbox-tick-color)] text-xs font-bold transform -translate-y-1/4 translate-x-1/4">
                    {cartCount}
                  </span>
                )}
              </NavLink>
            </Tooltip>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-[var(--glass-border)]">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `${navLinkClasses} ${isActive ? 'bg-[var(--glass-bg)] text-[var(--text-primary)]' : ''}`
                }
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;