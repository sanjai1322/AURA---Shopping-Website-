import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { type Product } from '../types';
import { useToast } from './useToast';

interface WishlistContextType {
  wishlistItems: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>(() => {
    try {
      const localData = window.localStorage.getItem('wishlist');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Could not parse wishlist data from localStorage", error);
      return [];
    }
  });
  const { showToast } = useToast();

  useEffect(() => {
    window.localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = useCallback((product: Product) => {
    setWishlistItems(prevItems => {
      const exist = prevItems.find(item => item.id === product.id);
      if (exist) {
        return prevItems; // Already in wishlist, do nothing
      }
      showToast(`'${product.name}' added to wishlist`);
      return [...prevItems, product];
    });
  }, [showToast]);

  const removeFromWishlist = useCallback((productId: number) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
  }, []);

  const isInWishlist = useCallback((productId: number): boolean => {
    return wishlistItems.some(item => item.id === productId);
  }, [wishlistItems]);

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist, wishlistCount }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};