"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type CartItem = {
  mealId: string;
  name: string;
  price: number;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (mealId: string) => void;
  increment: (mealId: string) => void;
  decrement: (mealId: string) => void;
  clearCart: () => void;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.mealId === item.mealId);
      if (exists) {
        return prev.map((i) =>
          i.mealId === item.mealId ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (mealId: string) => {
    setCart((prev) => prev.filter((i) => i.mealId !== mealId));
  };

  const increment = (mealId: string) => {
    setCart((prev) =>
      prev.map((i) => (i.mealId === mealId ? { ...i, quantity: i.quantity + 1 } : i))
    );
  };

  const decrement = (mealId: string) => {
    setCart((prev) =>
      prev.map((i) =>
        i.mealId === mealId ? { ...i, quantity: Math.max(i.quantity - 1, 1) } : i
      )
    );
  };

  const clearCart = () => setCart([]);

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, increment, decrement, clearCart, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};