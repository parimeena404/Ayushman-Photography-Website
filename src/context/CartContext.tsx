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
  couponType: 'PERCENT' | 'FLAT';
  couponValue: number;
  couponMinOrder: number;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
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
  const [couponType, setCouponType] = useState<'PERCENT' | 'FLAT'>('PERCENT');
  const [couponValue, setCouponValue] = useState<number>(0);
  const [couponMinOrder, setCouponMinOrder] = useState<number>(0);

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
        setCouponType(parsed.type === 'FLAT' ? 'FLAT' : 'PERCENT');
        setCouponValue(Number(parsed.value ?? parsed.discount ?? 0) || 0);
        setCouponMinOrder(Number(parsed.minOrder ?? 0) || 0);
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
    setCouponCode('');
    setCouponType('PERCENT');
    setCouponValue(0);
    setCouponMinOrder(0);
    localStorage.removeItem('ayushman_print_cart');
    localStorage.removeItem('ayushman_print_coupon');
  };

  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  const applyCoupon = async (code: string): Promise<{ success: boolean; message: string }> => {
    const clean = code.trim().toUpperCase();
    if (!clean) {
      return { success: false, message: 'Please enter a promo code.' };
    }
    try {
      const res = await fetch(`/api/coupons?code=${encodeURIComponent(clean)}`, { cache: 'no-store' });
      const data = await res.json();
      if (!res.ok || !data.success || !data.coupon) {
        return { success: false, message: data?.error || 'Invalid or expired coupon code.' };
      }

      const c = data.coupon;
      const minOrder = Number(c.minOrderAmount) || 0;
      if (minOrder > 0 && subtotal < minOrder) {
        return {
          success: false,
          message: `Minimum order of ₹${minOrder.toLocaleString()} required to apply ${c.code}.`,
        };
      }

      const dType: 'PERCENT' | 'FLAT' = c.discountType === 'FLAT' ? 'FLAT' : 'PERCENT';
      const dVal = Number(c.discountValue) || 0;

      setCouponCode(c.code);
      setCouponType(dType);
      setCouponValue(dVal);
      setCouponMinOrder(minOrder);
      localStorage.setItem(
        'ayushman_print_coupon',
        JSON.stringify({ code: c.code, type: dType, value: dVal, minOrder })
      );

      const label = dType === 'FLAT' ? `₹${dVal.toLocaleString()} flat discount` : `${dVal}% discount`;
      return { success: true, message: `${c.code} applied (${label})!` };
    } catch {
      return { success: false, message: 'Could not verify coupon. Please try again.' };
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setCouponType('PERCENT');
    setCouponValue(0);
    setCouponMinOrder(0);
    localStorage.removeItem('ayushman_print_coupon');
  };

  const couponMeetsMin = couponCode !== '' && subtotal >= couponMinOrder;
  const couponDiscountPercent = couponMeetsMin && couponType === 'PERCENT' ? couponValue : 0;
  const discountAmount = !couponMeetsMin
    ? 0
    : couponType === 'FLAT'
      ? Math.min(subtotal, Math.round(couponValue))
      : Math.round((subtotal * couponValue) / 100);
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const gstAmount = Math.round(taxableAmount * 0.18); // 18% GST on print work
  const shippingFee = taxableAmount > 999 || cart.length === 0 ? 0 : 99; // Free shipping over ₹999
  const grandTotal = taxableAmount + gstAmount + shippingFee;

  // Number of DISTINCT packages/items in cart (e.g. 1 package of 500 cards = 1 in red badge count)
  const totalItemCount = cart.length;

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
        couponType,
        couponValue,
        couponMinOrder,
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
