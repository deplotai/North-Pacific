"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/data/cms";

export interface CartItem {
  product: Product;
  size: string;
  qty: number;
}

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  addToCart: (product: Product, size: string, qty?: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, change: number) => void;
  clearCart: () => void;
  executeCheckout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const WHATSAPP_PHONE = "966500000000";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("np_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error loading cart from storage", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("np_cart", JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const addToCart = (product: Product, size: string, qty = 1) => {
    setCart((prev) => {
      const idx = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );
      if (idx > -1) {
        const newCart = [...prev];
        newCart[idx].qty += qty;
        return newCart;
      } else {
        return [...prev, { product, size, qty }];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.size === size))
    );
  };

  const updateQuantity = (productId: string, size: string, change: number) => {
    setCart((prev) => {
      const idx = prev.findIndex(
        (item) => item.product.id === productId && item.size === size
      );
      if (idx === -1) return prev;

      const newCart = [...prev];
      newCart[idx].qty += change;

      if (newCart[idx].qty <= 0) {
        return prev.filter(
          (item) => !(item.product.id === productId && item.size === size)
        );
      }
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const executeCheckout = () => {
    if (cart.length === 0) return;

    let subtotal = 0;
    let message = "Hello North Pacific! I would like to order the following items from the website:\n\n";

    cart.forEach((item, index) => {
      const price = item.product.salePrice ?? item.product.price;
      const total = price * item.qty;
      subtotal += total;

      message += `${index + 1}. *${item.product.name}*\n`;
      message += `   - Size: ${item.size}\n`;
      message += `   - Qty: ${item.qty}\n`;
      message += `   - Price: $${price.toFixed(2)} each (Subtotal: $${total.toFixed(2)})\n\n`;
    });

    message += `*ESTIMATED TOTAL:* $${subtotal.toFixed(2)}\n\n`;
    message += `Please confirm my order, sizing, and details for delivery. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;

    window.open(waUrl, "_blank");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        isSidebarOpen,
        setIsSidebarOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        executeCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
