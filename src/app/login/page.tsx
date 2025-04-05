"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const LoginPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Log session and status to check their state
  useEffect(() => {
    console.log("Session:", session);
    console.log("Status:", status);

    if (status === "loading") return; // Do nothing while loading
    if (status === "authenticated") {
      setIsAuthenticated(true);
      router.push("/"); // Redirect to home if authenticated
    } else {
      setIsAuthenticated(false);
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex items-center justify-center">
      {/* BOX */}
      <div className="h-full shadow-2xl rounded-md flex flex-col md:flex-row md:h-[70%] md:w-full lg:w-[60%] 2xl:w-1/2">
        {/* IMAGE CONTAINER */}
        <div className="relative h-1/3 w-full md:h-full md:w-1/2">
          <Image src="/loginBg.png" alt="Login Background" fill className="object-cover" />
        </div>
        {/* FORM CONTAINER */}
        <div className="p-10 flex flex-col gap-8 md:w-1/2">
          <h1 className="font-bold text-xl xl:text-3xl">Welcome</h1>
          <p>Log into your account or create a new one using social buttons</p>

          {/* Conditional rendering based on authentication */}
          {isAuthenticated ? (
            <button
              className="flex gap-4 p-4 ring-1 ring-green-100 rounded-md"
              onClick={() => signOut()}
            >
              <span className="text-green-500">Sign out</span>
            </button>
          ) : (
            <>
              <button
                className="flex gap-4 p-4 ring-1 ring-orange-100 rounded-md"
                onClick={() => signIn("google")}
              >
                <Image
                  src="/google.png"
                  alt="Google"
                  width={20}
                  height={20}
                  className="object-contain"
                />
                <span>Sign in with Google</span>
              </button>
              <button className="flex gap-4 p-4 ring-1 ring-blue-100 rounded-md">
                <Image
                  src="/facebook.png"
                  alt="Facebook"
                  width={20}
                  height={20}
                  className="object-contain"
                />
                <span>Sign in with Facebook</span>
              </button>
            </>
          )}

          <p className="text-sm">
            Have a problem?
            <Link className="underline" href="/">
              {" "}
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
