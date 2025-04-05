"use client";

import { OrderType } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const OrdersPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    router.push("/");
  }

  // Fetch orders
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      fetch("http://localhost:3000/api/orders").then((res) => res.json()),
  });

  const queryClient = useQueryClient();

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => {
      return fetch(`http://localhost:3000/api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }), // Send status inside an object
      })
        .then((res) => res.json())  // Handle the response
        .catch((error) => {
          toast.error("Error updating order");
          console.error("Error updating order:", error);
        });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["orders"] }); // Refresh the list of orders
      toast.success("The order status has been updated!");
    },
    onError(error) {
      toast.error("Error updating the order");
      console.error(error);
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => {
      return fetch(`http://localhost:3000/api/orders/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())  // Handle the response
        .catch((error) => {
          toast.error("Error deleting order");
          console.error("Error deleting order:", error);
        });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["orders"] }); // Refresh after delete
      toast.success("Order deleted.");
    },
  });

  // Handle update status form submission
  const handleUpdate = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement;
    const status = input.value;

    // Call the mutation to update the status
    updateMutation.mutate({ id, status });
  };

  // Handle delete order
  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  // Handle continue to pay
  const handleContinueToPay = (orderId: string) => {
    router.push(`/pay/${orderId}`);
  };

  if (isLoading || status === "loading") return "Loading...";

  return (
    <div className="p-4 lg:px-20 xl:px-40">
      <table className="w-full border-separate border-spacing-3">
        <thead>
          <tr className="text-left">
            <th className="hidden md:block">Order ID</th>
            <th>Date</th>
            <th>Price</th>
            <th className="hidden md:block">Products</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: OrderType) => (
            <tr
              className={`${item.status !== "delivered" && "bg-red-50"}`}
              key={item.id}
            >
              <td className="hidden md:block py-6 px-1">{item.id}</td>
              <td className="py-6 px-1">
                {new Date(item.createdAt).toLocaleDateString()}
              </td>
              <td className="py-6 px-1">${item.price}</td>
              <td className="hidden md:block py-6 px-1">
                {item.products.length > 0 ? item.products[0].title : "No products"}
              </td>
              <td className="py-6 px-1">{item.status}</td>

              <td className="py-6 px-1">
                {session?.user?.isAdmin ? (
                  <form
                    className="flex items-center gap-2"
                    onSubmit={(e) => handleUpdate(e, item.id)}
                  >
                    <input
                      placeholder={item.status}
                      className="p-2 ring-1 ring-red-100 rounded-md"
                    />
                    <button className="bg-red-400 p-2 rounded-full">
                      <Image src="/edit.png" alt="Edit" width={20} height={20} />
                    </button>
                  </form>
                ) : item.status !== "Paid" && item.status !== "Delivered" ? (
                  <div className="flex gap-2">
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded-md"
                      onClick={() => handleContinueToPay(item.id)}
                    >
                      Continue to Pay
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-md"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete Order
                    </button>
                  </div>
                ) : (
                  <span className="text-gray-400">No Actions</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
