/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const STORAGE_KEY = "cart_v1";
const CartContext = createContext(null);

function readStoredCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function toCartProduct(product) {
  return {
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image,
  };
}

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const { product, qty } = action.payload;
      const quantity = Number.isFinite(qty) && qty > 0 ? qty : 1;
      const idx = state.findIndex((i) => i.product.id === product.id);
      if (idx === -1) return [...state, { product, qty: quantity }];

      const next = [...state];
      next[idx] = { ...next[idx], qty: next[idx].qty + quantity };
      return next;
    }
    case "REMOVE": {
      const id = action.payload;
      return state.filter((i) => i.product.id !== id);
    }
    case "SET_QTY": {
      const { id, qty } = action.payload;
      const quantity = Math.max(0, Math.floor(qty));
      if (quantity === 0) return state.filter((i) => i.product.id !== id);
      return state.map((i) => (i.product.id === id ? { ...i, qty: quantity } : i));
    }
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, readStoredCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.qty, 0),
    [items],
  );

  const subtotal = useMemo(
    () =>
      items.reduce((sum, item) => sum + Number(item.product.price) * item.qty, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      add: (product, qty = 1) =>
        dispatch({ type: "ADD", payload: { product: toCartProduct(product), qty } }),
      remove: (id) => dispatch({ type: "REMOVE", payload: id }),
      setQty: (id, qty) => dispatch({ type: "SET_QTY", payload: { id, qty } }),
      clear: () => dispatch({ type: "CLEAR" }),
      has: (id) => items.some((i) => i.product.id === id),
      getQty: (id) => items.find((i) => i.product.id === id)?.qty ?? 0,
    }),
    [items, itemCount, subtotal],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
