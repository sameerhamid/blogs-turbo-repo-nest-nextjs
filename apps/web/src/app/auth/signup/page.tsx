import Link from "next/link";
import React from "react";
import SignupForm from "./_components/signUpForm";

const SignUpPage = () => {
  return (
    <div className="bg-white p-8 rounded-md shadow-md w-98 flex flex-col items-center justify-center">
      <h2 className="text-center text-2xl font-bold mb-4">Sign Up Page</h2>
      {/* sign up form */}

      <SignupForm />

      <div>
        <p>Alreay have an account?</p>
        <Link href={"/auth/signin"} className="underline">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
