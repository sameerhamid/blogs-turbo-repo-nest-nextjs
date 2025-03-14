import Link from "next/link";
import React from "react";

const SignInPannel = () => {
  return (
    <>
      <Link href={"/auth/signin"}>Sign In</Link>
      <Link href={"/auth/signup"}>Sign Up</Link>
    </>
  );
};

export default SignInPannel;
