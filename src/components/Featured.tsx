// "use client";

import { ProductType } from "@/types/types";
import Image from "next/image";
import React, { useEffect } from "react";
import { useCartStore } from "@/utils/store";
import { toast } from "react-toastify";

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products!");
  }

  return res.json();
};

const Featured = async () => {
  // const { addToCart } = useCartStore();

  // useEffect(()=>{
  //   useCartStore.persist.rehydrate();
  // },[])

  // const handleCart = (product: ProductType)=>{
  //   addToCart({
  //     id: product.id,
  //     title: product.title,
  //     img: product.img,
  //     price: 1 * product.price + (product.options?.length ? product.options[0].additionalPrice : 0),
  //     ...(product.options?.length && {
  //       optionTitle: product.options[0].title,
  //     }),
  //     quantity: 1,
  //   })
  //   toast.success("The product added to the cart!")
  // }

  const featuredProducts: ProductType[] = await getData();

  return (
    <div className="w-screen overflow-x-scroll text-gray-800">
      {/* WRAPPER */}
      <div className="w-max flex">
        {/* SINGLE ITEM */}
        {featuredProducts.map((item) => (
          <div
            key={item.id}
            className="w-screen h-[60vh] flex flex-col items-center justify-around p-4 hover:bg-gray-100 transition-all duration-300 md:w-[50vw] xl:w-[33vw] xl:h-[90vh]"
          >
            {/* IMAGE CONTAINER */}
            {item.img && (
              <div className="relative flex-1 w-full transition-transform duration-500 hover:scale-105">
                <Image src={item.img} alt={item.title} fill className="object-contain" />
              </div>
            )}
            {/* TEXT CONTAINER */}
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
              <h1 className="text-xl font-semibold uppercase xl:text-2xl 2xl:text-3xl">{item.title}</h1>
              <p className="p-4 2xl:p-8 text-gray-600">{item.desc}</p>
              <span className="text-xl font-bold">${item.price}</span>
              <button className="bg-gray-600 text-white p-2 rounded-md hover:bg-gray-700 transition"  >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
