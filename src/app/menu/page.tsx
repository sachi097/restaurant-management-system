import { MenuType } from "@/types/types";
import Link from "next/link";
import React from "react";

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/categories", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed!");
  }

  return res.json();
};

const MenuPage = async () => {
  const menu: MenuType = await getData();
  return (
    <div className="p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col md:flex-row items-center justify-center gap-4">
      {menu.map((category) => (
        <Link
          href={`/menu/${category.slug}`}
          key={category.id}
          className="w-full h-1/3 bg-cover p-8 md:h-1/2 rounded-md flex flex-col justify-end relative"
          style={{ backgroundImage: `url(${category.img})` }}
        >
          {/* Overlay to improve text visibility */}
          <div className="absolute inset-0 bg-black opacity-50 rounded-md"></div>

          <div className="relative z-10">
            <h1 className={`uppercase font-bold text-2xl sm:text-3xl text-${category.color} mb-4`}>
              {category.title}
            </h1>
            <p className="text-sm sm:text-base my-4 text-white">{category.desc}</p>
            {/* Show "Explore" button only on large screens */}
            <button className={`hidden sm:block bg-${category.color} text-${category.color === "black" ? "white" : "green-500"} py-2 px-4 rounded-md`}>
              Explore
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuPage;
