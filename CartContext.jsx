
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addToCart(item) {
    setCart((currentCart) => [...currentCart, item]);
  }

  function removeFromCart(indexToRemove) {
    setCart((currentCart) =>
      currentCart.filter((item, index) => index !== indexToRemove)
    );
  }

  const cartCount = cart.length;

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, cartCount, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
