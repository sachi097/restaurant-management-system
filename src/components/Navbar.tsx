import React from "react";
import Menu from "./Menu";
import Link from "next/link";
import CartIcon from "./CartIcon";
import Image from "next/image";
import UserLinks from "./UserLinks";

const Navbar = () => {
  const user = false;
  return (
    <div className="h-12 text-black p-4 flex items-center justify-between border-b-2 border-b-gray-500 uppercase md:h-24 lg:px-20 xl:px-40 bg-gray-200">
      {/* LEFT LINKS */}
      <div className="hidden md:flex gap-4 flex-1">
        <Link href="/" className="hover:text-gray-600">Homepage</Link>
        <Link href="/menu" className="hover:text-gray-600">Menu</Link>
        <Link href="/contact" className="hover:text-gray-600">Contact</Link>
      </div>
      {/* LOGO */}
      <div className="text-xl md:font-bold flex-1 md:text-center text-gray-700">
        <Link href="/">RESTURANT</Link>
      </div>
      {/* MOBILE MENU */}
      <div className="md:hidden">
        <Menu />
      </div>
      {/* RIGHT LINKS */}
      <div className="hidden md:flex gap-4 items-center justify-end flex-1">
        <div className="md:absolute top-3 right-2 lg:static flex items-center gap-2 cursor-pointer bg-gray-400 px-2 py-1 rounded-md text-black">
          <Image src="/phone.png" alt="" width={20} height={20} />
          <span>123-235-6480</span>
        </div>
        <UserLinks/>
        <CartIcon />
      </div>
    </div>
  );
};

export default Navbar;
