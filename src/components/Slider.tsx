"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const data = [
  {
    id: 1,
    title: "Always fresh, always crispy, always hot",
    image: "/imageres1.jpg",
  },
  {
    id: 2,
    title: "We deliver your order wherever you are in NY",
    image: "/imageres2.jpg",
  },
  {
    id: 3,
    title: "The best pizza to share with your family",
    image: "/slide3.jpg",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(
      () =>
        setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1)),
      4000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:flex-row bg-green-100">
      {/* TEXT CONTAINER */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-8 text-center text-white font-extrabold">
        <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl leading-tight px-8 md:px-10 xl:px-20 text-shadow-md">
          {data[currentSlide].title}
        </h1>
        <button
          className="bg-green-500 text-black py-4 px-8 rounded-lg shadow-lg hover:bg-green-600 transition duration-300"
          onClick={() => router.push("/menu")}
        >
          Order Now
        </button>
      </div>

      {/* IMAGE CONTAINER */}
      <div className="w-full flex-1 relative overflow-hidden">
        <Image
          src={data[currentSlide].image}
          alt="Slider Image"
          fill
          className="object-cover transition-transform duration-1000 ease-in-out"
        />
        <div className="absolute inset-0 bg-black opacity-30 z-0"></div> {/* Overlay */}
      </div>
    </div>
  );
};

export default Slider;
