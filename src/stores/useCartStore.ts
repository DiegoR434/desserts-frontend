import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { CartItem } from "../types/cart";
import type { Product } from "../types/product";

interface CartState {
  items: CartItem[];

  addItem: (product: Product) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id,
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          }

          return {
            itms: [...state.items, { product, quantity: 1 }],
          };
        }),

      increaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        })),

      decreaseQuantity: (id) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.product.id === id
                ? { ...item, quantity: item.quantity - 1 }
                : item,
            )
            .filter((item) => item.quantity > 0),
        })),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== id),
        })),

      clearCart: () => set({ items: [] }),
    }),

    {
      name: "dessert-cart",
    },

  ),
);
