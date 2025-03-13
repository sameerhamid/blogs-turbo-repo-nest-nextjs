"use client";
import SubmitButton from "@/components/submitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import React, { useState } from "react";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  // Toggle Password Visibility
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form className="flex flex-col gap-4">
      {/* Name Field */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="John Doe"
          className="py-5 w-75 border border-gray-300 rounded-md focus-visible:ring-1 focus-visible:ring-blue-300 focus-visible:border-blue-300"
        />
      </div>

      {/* Email Field */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          placeholder="john@example.com"
          className="py-5 w-75 border border-gray-300 rounded-md focus-visible:ring-1 focus-visible:ring-blue-300 focus-visible:border-blue-300"
        />
      </div>

      {/* Password Field */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            className="py-5 w-75 pr-10 border border-gray-300 rounded-md focus-visible:ring-1 focus-visible:ring-blue-300 focus-visible:border-blue-300"
          />
          {/* Eye Icon */}
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition cursor-pointer"
          >
            {showPassword ? (
              <EyeSlashIcon width={24} />
            ) : (
              <EyeIcon width={24} />
            )}
          </button>
        </div>
      </div>

      <SubmitButton className="w-75 py-5">Sign Up</SubmitButton>
    </form>
  );
};

export default SignupForm;
