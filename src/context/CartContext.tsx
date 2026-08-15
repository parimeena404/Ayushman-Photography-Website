'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CustomDesignData {
  companyName?: string;
  tagline?: string;
  fullName?: string;
  designation?: string;
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
  logoUrl?: string | null;
  themeColor?: string;
  notes?: string;
}

export interface CartItem {
  id: string; // unique item id in cart
  productId: string;
  title: string;
  category: string;
  paperStock: string; // e.g. "350 GSM Velvet Touch"
  cornerStyle: string; // e.g. "Rounded Cut" or "Standard Square"
  finishOption: string; // e.g. "Gold Foil Stamping" or "Glossy Lamination"
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  image: string;
  customDesign?: CustomDesignData;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  couponCode: string;
  couponDiscountPercent: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  subtotal: number;
  discountAmount: number;
  gstAmount: number;
  shippingFee: number;
  grandTotal: number;
  totalItemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState<string>('');
  const [couponDiscountPercent, setCouponDiscountPercent] = useState<number>(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ayushman_print_cart');
      if (saved) {
        setCart(JSON.parse(saved));
      }
      const savedCoupon = localStorage.getItem('ayushman_print_coupon');
      if (savedCoupon) {
        const parsed = JSON.parse(savedCoupon);
        setCouponCode(parsed.code || '');
        setCouponDiscountPercent(parsed.discount || 0);
      }
    } catch (e) {
      console.error('Failed to parse cart from storage:', e);
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('ayushman_print_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart:', e);
    }
  }, [cart]);

  const addToCart = (newItem: Omit<CartItem, 'id'>) => {
    const id = `cart_item_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const fullItem: CartItem = { ...newItem, id };
    setCart((prev) => [...prev, fullItem]);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const ratio = quantity / item.quantity;
          const updatedTotal = Math.round(item.totalPrice * ratio);
          return { ...item, quantity, totalPrice: updatedTotal };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('ayushman_print_cart');
  };

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'FESTIVE20') {
      setCouponCode('FESTIVE20');
      setCouponDiscountPercent(20);
      localStorage.setItem('ayushman_print_coupon', JSON.stringify({ code: 'FESTIVE20', discount: 20 }));
      return { success: true, message: 'Festive 20% discount applied!' };
    } else if (clean === 'BULKPRINT15') {
      setCouponCode('BULKPRINT15');
      setCouponDiscountPercent(15);
      localStorage.setItem('ayushman_print_coupon', JSON.stringify({ code: 'BULKPRINT15', discount: 15 }));
      return { success: true, message: 'Bulk print 15% discount applied!' };
    } else if (clean === 'FIRSTPRINT10') {
      setCouponCode('FIRSTPRINT10');
      setCouponDiscountPercent(10);
      localStorage.setItem('ayushman_print_coupon', JSON.stringify({ code: 'FIRSTPRINT10', discount: 10 }));
      return { success: true, message: 'First order 10% discount applied!' };
    } else {
      return { success: false, message: 'Invalid coupon code. Try FESTIVE20 for 20% OFF' };
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setCouponDiscountPercent(0);
    localStorage.removeItem('ayushman_print_coupon');
  };

  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const discountAmount = Math.round((subtotal * couponDiscountPercent) / 100);
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const gstAmount = Math.round(taxableAmount * 0.18); // 18% GST on print work
  const shippingFee = taxableAmount > 999 || cart.length === 0 ? 0 : 99; // Free shipping over ₹999
  const grandTotal = taxableAmount + gstAmount + shippingFee;
  const totalItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        couponCode,
        couponDiscountPercent,
        applyCoupon,
        removeCoupon,
        subtotal,
        discountAmount,
        gstAmount,
        shippingFee,
        grandTotal,
        totalItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
