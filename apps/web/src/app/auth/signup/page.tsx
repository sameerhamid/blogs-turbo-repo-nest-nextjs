import Link from "next/link";
import React from "react";
import AuthForm from "../_components/authForm";
import { Button } from "@/components/ui/button";
import { BACKEND_URL } from "@/lib/constants";

const SignUpPage = () => {
  return (
    <div className="bg-white p-8 rounded-md shadow-md md:w-98 w-90 flex flex-col items-center justify-center mt-10">
      <h2 className="text-center text-2xl font-bold mb-4">Sign Up Page</h2>
      {/* sign up form */}

      <AuthForm formType="signup" />

      <div className="flex gap-2 mt-4">
        <p>Alreay have an account?</p>
        <Link
          href={"/auth/signin"}
          className="underline text-slate-700 hover:text-slate-500"
        >
          Sign In
        </Link>
      </div>

      <div className="h-0.5 mx-auto bg-gradient-to-r from-sky-500 to-indigo-500 w-full mt-5" />
      <Button className="mt-3 py-5 cursor-pointer w-full">
        <a href={`${BACKEND_URL}/auth/google/login`}>Sign Up With Google</a>
      </Button>
    </div>
  );
};

export default SignUpPage;
