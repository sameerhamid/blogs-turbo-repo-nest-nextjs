import Link from "next/link";
import React from "react";
import AuthForm from "../_components/authForm";
import { Button } from "@/components/ui/button";
import { BACKEND_URL } from "@/lib/constants";

const SingInPage = () => {
  return (
    <div className="bg-white p-8 border rounded-md shadow-md md:w-98 w-90 flex flex-col justify-center align-center mt-10">
      <h1 className="text-center text-2xl font-bold mb-4">Sign In Page</h1>

      {/* signin form  */}
      <AuthForm formType="signin" />

      <Link
        href={"/auth/signin"}
        className="underline text-slate-700 hover:text-blue-500 text-center mt-2"
      >
        Forgot Your Password?
      </Link>

      <div className="flex gap-2 mt-4 align-center justify-center">
        <p>Don't have an account?</p>
        <Link
          href={"/auth/signup"}
          className="underline text-slate-700 hover:text-blue-500 "
        >
          Sign Up
        </Link>
      </div>

      <div className="h-0.5 mx-auto bg-gradient-to-r from-sky-500 to-indigo-500 w-full mt-5" />
      <Button className="mt-3 py-5 cursor-pointer w-full">
        <a href={`${BACKEND_URL}/auth/google/login`}>Sign In With Google</a>
      </Button>
    </div>
  );
};

export default SingInPage;
