"use client"
import { useCartStore } from "@/utils/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const CartIcon = () => {
  const { data: session } = useSession();
  const { totalItems } = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return (
    <Link href={session?.user.isAdmin ? "/add" : "/cart"}>
      <div className="flex items-center gap-4">
        <div className="relative w-8 h-8 md:w-5 md:h-5">
          <Image
            src="/cart.png"
            alt="Cart"
            fill
            sizes="100%"
            className="object-contain"
          />
        </div>
        {session?.user.isAdmin ? (
          <button className="p-1 bg-gray-500 text-white rounded-md">Add Product</button>
        ) : (
          <span className="text-gray-700">Cart ({totalItems})</span>
        )}
      </div>
    </Link>
  );
};

export default CartIcon;
