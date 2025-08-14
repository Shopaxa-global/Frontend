// src/context/CartActionContext.tsx
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import type { CartItemType, Conversion } from '../types'; // adjust path

export type CartAction = {
  isLuxury: boolean;
  items: CartItemType[];
  subTotal: number;
  fee: number;
  conversion?: Conversion;
  createdAt?: {
    formattedDate: string;
    formattedTime: string;
  } | null;
};

type CartActionContextValue = {
  action: CartAction | null;
  setAction: (action: CartAction) => void;
  clearAction: () => void;
};

const CartActionContext = createContext<CartActionContextValue | undefined>(
  undefined
);

export const CartActionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [action, setActionState] = useState<CartAction | null>(null);

  const setAction = useCallback((next: CartAction) => {
    setActionState(next);
  }, []);

  const clearAction = useCallback(() => setActionState(null), []);

  const value = useMemo(
    () => ({ action, setAction, clearAction }),
    [action, setAction, clearAction]
  );

  return (
    <CartActionContext.Provider value={value}>
      {children}
    </CartActionContext.Provider>
  );
};

export const useCartAction = (): CartActionContextValue => {
  const ctx = useContext(CartActionContext);
  if (!ctx) {
    throw new Error('useCartAction must be used within a <CartActionProvider>');
  }
  return ctx;
};
