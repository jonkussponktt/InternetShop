import { createContext, useContext } from "react";

export const CartContext = createContext(undefined);

export function useCart() {
  const cart = useContext(CartContext);
  if (cart === undefined) {
    throw new Error("useCart must be used within CartProvider");
  }
  return cart;
}
