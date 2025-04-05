"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const UserLinks = () => {
  const { status, data } = useSession();
  const [isClient, setIsClient] = useState(false); // State to track if client is mounted

  useEffect(() => {
    setIsClient(true); // Set to true after component is mounted
  }, []);

  // If not mounted on the client, return nothing or a loading spinner
  if (!isClient) {
    return null;
  }

  if (status === "loading") {
    return <div>Loading...</div>; // Optional loading state
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
      {status === "authenticated" ? (
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <Link
            href="/orders"
            className="text-sm sm:text-base hover:text-blue-500 mt-2 sm:mt-0"
          >
            Orders
          </Link>
          <span
            className="mt-2 sm:mt-0 cursor-pointer text-sm sm:text-base text-red-600 hover:text-red-800"
            onClick={() => signOut()}
          >
            Logout
          </span>
        </div>
      ) : (
        <Link
          href="/login"
          className="text-sm sm:text-base hover:text-blue-500 mt-2 sm:mt-0"
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default UserLinks;
