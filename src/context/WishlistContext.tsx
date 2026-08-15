'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface WishlistItem {
  id: string;
  title: string;
  price: string;
  image: string;
  category?: string;
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  toggleWishlist: (item: WishlistItem) => void;
  isInWishlist: (id: string) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ayushman_print_wishlist');
      if (saved) {
        setWishlist(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load wishlist:', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('ayushman_print_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist:', e);
    }
  }, [wishlist]);

  const toggleWishlist = (item: WishlistItem) => {
    setWishlist((prev) => {
      const exists = prev.some((w) => w.id === item.id || w.title === item.title);
      if (exists) {
        return prev.filter((w) => w.id !== item.id && w.title !== item.title);
      } else {
        return [...prev, item];
      }
    });
  };

  const isInWishlist = (id: string) => {
    return wishlist.some((w) => w.id === id || w.title === id);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
