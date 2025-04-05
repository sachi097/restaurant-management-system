"use client";
import { useCartStore } from "@/utils/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const CartPage = () => {
  const { products, totalItems, totalPrice, removeFromCart, addToCart } = useCartStore();
  const { data: session, status } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [existingOrderId, setExistingOrderId] = useState<string | null>(null);

  // Fetch existing unpaid order on mount
  useEffect(() => {
    const fetchExistingOrder = async () => {
      if (!session?.user?.email) return;

      try {
        const res = await fetch(`/api/orders?userEmail=${session.user.email}`);
        if (res.ok) {
          const data = await res.json();
          if (data.length && data[0].status === "Not Paid!") {
            setExistingOrderId(data[0].id); // Store the unpaid order id
          }
        }
      } catch (error) {
        console.error("Error checking for existing unpaid order:", error);
      }
    };

    fetchExistingOrder();
  }, [session?.user?.email]);

  // Update the order whenever cart is updated (add/remove items)
  useEffect(() => {
    const updateOrder = async () => {
      if (!session || !session.user?.email || !existingOrderId || !products.length) return;

      try {
        // Update the existing unpaid order
        const res = await fetch(`/api/orders/${existingOrderId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            price: parseFloat(totalPrice.toFixed(2)),
            products,
            status: "Not Paid!",
            userEmail: session.user.email,
          }),
        });

        if (!res.ok) throw new Error("Failed to update order");
      } catch (err) {
        console.error("Error updating order:", err);
      }
    };

    if (existingOrderId) {
      updateOrder();
    }
  }, [products, totalPrice, existingOrderId, session]);

  const handleCheckout = async () => {
    if (!session) {
      return router.push("/login");
    }

    setLoading(true);
    try {
      // If an unpaid order already exists, redirect to payment page
      if (existingOrderId) {
        return router.push(`/pay/${existingOrderId}`);
      }

      // Otherwise, create a new order (should not happen often)
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          price: Math.round(totalPrice * 100),
          products,
          status: "Not Paid!",
          userEmail: session.user.email,
        }),
      });

      if (!res.ok) throw new Error("Failed to create order");

      const data = await res.json();
      setExistingOrderId(data.id); // Store the new order ID
      router.push(`/pay/${data.id}`);
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong while processing your order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col lg:flex-row text-green-600">
      {/* Products List */}
      <div className="h-1/2 lg:h-full lg:w-2/3 2xl:w-1/2 overflow-y-auto p-4 lg:px-20 xl:px-40">
        {products.length === 0 ? (
          <p className="text-center mt-10 text-lg">Your cart is empty.</p>
        ) : (
          products.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between mb-4 border-b pb-4"
            >
              {item.img && (
                <Image
                  src={item.img}
                  alt={item.title}
                  width={80}
                  height={80}
                  className="rounded"
                />
              )}
              <div className="flex-1 mx-4">
                <h2 className="uppercase font-semibold text-lg">
                  {item.title} x{item.quantity}
                </h2>
                <p className="text-sm text-gray-600">{item.optionTitle}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold">${item.price}</span>
                <button
                  className="text-red-500 font-bold hover:text-red-700"
                  onClick={() => removeFromCart(item)}
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Payment Summary */}
      <div className="h-1/2 lg:h-full lg:w-1/3 2xl:w-1/2 bg-fuchsia-50 p-6 lg:px-20 xl:px-40 flex flex-col justify-center gap-4 2xl:text-xl 2xl:gap-6">
        <div className="flex justify-between">
          <span>Subtotal ({totalItems} items)</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Service Cost</span>
          <span>$0.00</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Cost</span>
          <span className="text-green-600">FREE</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-semibold">
          <span>Total (incl. VAT)</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <button
          className="bg-green-500 text-white font-bold p-3 rounded-md w-full mt-4 hover:bg-green-600 disabled:opacity-50"
          onClick={handleCheckout}
          disabled={loading || products.length === 0}
        >
          {loading ? "Processing..." : existingOrderId ? "Resume Payment" : "Checkout"}
        </button>
      </div>
    </div>
  );
};

export default CartPage;
