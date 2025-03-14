import { getSession } from "@/lib/session";
import Link from "next/link";
import React from "react";
import SignInPannel from "./signInPannel";

const Navbar = async () => {
  const session = await getSession();
  return (
    <>
      <h1 className="text-2xl font-bold p-2">My Modern Blog</h1>
      <div className="flex gap-2 ml-auto flex-col md:flex-row [&>a]:py-2 [&>a]:px-4 [&>a]:transition [&>a]:rounded-md [&>a:hover]:text-sky-100 [&>a:hover]:bg-sky-500">
        <Link href="/">Blog</Link>
        <Link href="#about">About</Link>
        <Link href="#contact">Contact</Link>
        {session && session.user ? (
          <a href="/api/auth/signout">Sign Out</a>
        ) : (
          <SignInPannel />
        )}
      </div>
    </>
  );
};

export default Navbar;
