import { create } from "zustand";
import { persist } from "zustand/middleware";
import { OrderType, CartItemType } from "@/types/types";

const INITIAL_STATE = {
  products: [],
  totalItems: 0,
  totalPrice: 0,
  orderId: null as string | null,
};

export const useCartStore = create(
  persist<CartType & ActionTypes>(
    (set, get) => ({
      ...INITIAL_STATE,

      // Initialize cart with existing unpaid order if any
      async initializeCart(userEmail: string) {
        try {
          const response = await fetch(`/api/orders?userEmail=${userEmail}&status=Not Paid`);
          const orders: OrderType[] = await response.json();

          if (orders.length > 0) {
            const unpaidOrder = orders[0];
            const products = unpaidOrder.products.map((product) => ({
              ...product,
              optionTitle: product.optionTitle || "",
            }));

            set({
              products,
              totalItems: products.reduce((sum, item) => sum + item.quantity, 0),
              totalPrice: unpaidOrder.price,
              orderId: unpaidOrder.id,
            });
          }
        } catch (error) {
          console.error("Failed to initialize cart:", error);
        }
      },

      // Add item to cart, either by updating quantity or adding new
      addToCart(item: CartItemType) {
        const { products, totalPrice, totalItems } = get();
        const existingProduct = products.find((product) => product.id === item.id);

        if (existingProduct) {
          const updatedProducts = products.map((product) =>
            product.id === existingProduct.id
              ? {
                  ...product,
                  quantity: product.quantity + item.quantity,
                  price: product.price + item.price,
                }
              : product
          );
          set({
            products: updatedProducts,
            totalItems: totalItems + item.quantity,
            totalPrice: totalPrice + item.price,
          });
        } else {
          set({
            products: [...products, item],
            totalItems: totalItems + item.quantity,
            totalPrice: totalPrice + item.price,
          });
        }
      },

      // Remove item from cart
      removeFromCart(item: CartItemType) {
        const { products, totalItems, totalPrice } = get();
        const updatedProducts = products.filter((product) => product.id !== item.id);

        set({
          products: updatedProducts,
          totalItems: totalItems - item.quantity,
          totalPrice: totalPrice - item.price,
        });
      },

      // Clear the entire cart
      clearCart() {
        set(INITIAL_STATE);
      },

      // Set orderId for the current cart session
      setOrderId(id: string | null) {
        set({ orderId: id });
      },
    }),
    {
      name: "cart", // Store name for persistence
      skipHydration: true, // Skip initial hydration if necessary
    }
  )
);

// Updated Types for clarity
export type CartType = {
  products: CartItemType[]; // Array of cart items
  totalItems: number; // Total number of items in the cart
  totalPrice: number; // Total price of the items in the cart
  orderId: string | null; // Order ID if an existing order exists
};

export type ActionTypes = {
  initializeCart: (userEmail: string) => Promise<void>; // Initialize cart with unpaid order if any
  addToCart: (item: CartItemType) => void; // Add item to the cart
  removeFromCart: (item: CartItemType) => void; // Remove item from the cart
  clearCart: () => void; // Clear the entire cart
  setOrderId: (id: string | null) => void; // Set or update the order ID
};
