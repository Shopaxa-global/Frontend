import { createContext, useContext, useState } from "react";
import { CartContentResponse, FetchErrorType } from "../types";
interface CartContextType {
  cartData: CartContentResponse | null;
  setCartData: React.Dispatch<React.SetStateAction<CartContentResponse | null>>;
  error: FetchErrorType | null;
  setError: React.Dispatch<React.SetStateAction<FetchErrorType | null>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartData, setCartData] = useState<CartContentResponse | null>(null);
  const [error, setError] = useState<FetchErrorType | null>(null);

  return (
    <CartContext.Provider value={{ cartData, setCartData, error, setError }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
