import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="h-16 md:h-24 p-4 lg:px-20 xl:px-40 text-gray-700 flex items-center justify-between bg-gray-100 border-t border-gray-300">
      {/* Brand Name */}
      <Link href="/" className="font-bold text-lg md:text-xl text-gray-900 hover:text-gray-600 transition">
        RESTURANT
      </Link>
      
      {/* Copyright */}
      <p className="text-sm md:text-base">© {new Date().getFullYear()} All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
