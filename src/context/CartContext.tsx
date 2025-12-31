import React, { createContext, useContext, useState, useCallback } from 'react';
import { Product, CartItem, VisitRequest } from '@/lib/data';
import { toast } from 'sonner';

interface CartContextType {
  cartItems: CartItem[];
  visitRequests: VisitRequest[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  createVisitRequest: (shopId: string) => VisitRequest;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [visitRequests, setVisitRequests] = useState<VisitRequest[]>([]);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, product.stockQty);
        toast.success(`Updated quantity to ${newQty}`);
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: newQty }
            : item
        );
      }
      toast.success(`${product.name} added to cart`);
      return [...prev, { product, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
    toast.info('Item removed from cart');
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity: Math.min(quantity, item.product.stockQty) }
          : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [cartItems]);

  const getCartCount = useCallback(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  const createVisitRequest = useCallback((shopId: string): VisitRequest => {
    const shopItems = cartItems.filter(item => item.product.shopId === shopId);
    const request: VisitRequest = {
      id: `vr-${Date.now()}`,
      customerId: 'current-user',
      shopId,
      items: shopItems,
      totalEstimatedAmount: shopItems.reduce((t, i) => t + i.product.price * i.quantity, 0),
      status: 'created',
      holdExpiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
    };
    setVisitRequests(prev => [...prev, request]);
    setCartItems(prev => prev.filter(item => item.product.shopId !== shopId));
    toast.success('Visit & Hold request created!');
    return request;
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        visitRequests,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        createVisitRequest,
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
