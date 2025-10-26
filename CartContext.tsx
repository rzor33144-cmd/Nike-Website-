
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Shoe, CartItem } from './types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (shoe: Shoe) => void;
  removeFromCart: (shoeId: number) => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  goToPayment: () => void;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
  goToPayment: () => void;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children, goToPayment: navigateToPayment }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (shoe: Shoe) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === shoe.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === shoe.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...shoe, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (shoeId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== shoeId));
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  
  const goToPayment = () => {
    closeCart();
    // Use a small delay to allow the cart to close before navigating
    setTimeout(() => {
      navigateToPayment();
    }, 300); 
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        isCartOpen,
        openCart,
        closeCart,
        goToPayment,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
