"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Notification = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/menu"); // Navigate to the menu page
  };

  return (
    <div
      className="h-12 bg-green-400 text-green-800 px-4 flex items-center justify-center text-center text-sm md:text-base cursor-pointer"
      onClick={handleClick}
    >
      Free delivery for all orders over $20. Order your food now!
    </div>
  );
};

export default Notification;
