'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
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

const STORAGE_KEY = 'cart';

const CartActionContext = createContext<CartActionContextValue | undefined>(
  undefined
);

export const CartActionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [action, setActionState] = useState<CartAction | null>(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartAction) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartAction;
        setActionState(parsed);
      }
    } catch {
      // ignore bad JSON or unavailable storage
    }
  }, []);

  const setAction = useCallback((next: CartAction) => {
    setActionState(next);
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  }, []);

  const clearAction = useCallback(() => {
    setActionState(null);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

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
