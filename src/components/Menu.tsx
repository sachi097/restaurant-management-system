"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CartIcon from "./CartIcon";

const links = [
  { id: 1, title: "Homepage", url: "/" },
  { id: 2, title: "Menu", url: "/menu" },
  { id: 3, title: "Working Hours", url: "/working-hours" },
  { id: 4, title: "Contact", url: "/contact" },
];

const Menu = () => {
  const [open, setOpen] = useState(false);

  // TEMPORARY: Change `false` to actual user authentication check when implemented.
  const user = false;

  return (
    <div className="relative">
      {/* Menu Toggle Icon */}
      <button onClick={() => setOpen(!open)} aria-label="Toggle menu">
        <Image
          src={open ? "/close.png" : "/open.png"}
          alt="Menu Icon"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      </button>

      {/* Menu Overlay */}
      {open && (
        <nav className="fixed inset-0 bg-red-500 text-white flex flex-col items-center justify-center text-2xl z-50">
          {links.map((item) => (
            <Link
              href={item.url}
              key={item.id}
              className="hover:text-gray-300 transition"
              onClick={() => setOpen(false)}
            >
              {item.title}
            </Link>
          ))}

          {/* User Authentication Links */}
          <Link
            href={user ? "/orders" : "/login"}
            className="hover:text-gray-300 transition"
            onClick={() => setOpen(false)}
          >
            {user ? "Orders" : "Login"}
          </Link>

          {/* Cart Icon Link */}
          <Link href="/cart" onClick={() => setOpen(false)}>
            <CartIcon />
          </Link>
        </nav>
      )}
    </div>
  );
};

export default Menu;
