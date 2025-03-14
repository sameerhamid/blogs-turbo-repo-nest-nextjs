"use client";
import SubmitButton from "@/components/submitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/actions/auth";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import React, { useActionState, useState } from "react";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [state, action] = useActionState(signUp, undefined);

  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <form className={`flex flex-col  gap-4 `} action={action}>
      {/* Global Error Message */}
      {!!state?.message && (
        <p className="text-red-500 text-sm">{state.message}</p>
      )}

      {/* Name Field */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <div>
          <Input
            defaultValue={state?.data?.name ?? ""}
            id="name"
            name="name"
            placeholder="John Doe"
            className="py-5 w-75 border border-gray-300 rounded-md focus-visible:ring-1 focus-visible:ring-blue-300 focus-visible:border-blue-300"
          />
          {!!state?.errors?.name && (
            <p className="text-red-500 text-sm">{state.errors.name[0]}</p>
          )}
        </div>
      </div>

      {/* Email Field */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <div>
          <Input
            defaultValue={state?.data?.email ?? ""}
            id="email"
            name="email"
            placeholder="john@example.com"
            className="py-5 w-75 border border-gray-300 rounded-md focus-visible:ring-1 focus-visible:ring-blue-300 focus-visible:border-blue-300"
          />
          {!!state?.errors?.email && (
            <p className="text-red-500 text-sm">{state.errors.email[0]}</p>
          )}
        </div>
      </div>

      {/* Password Field */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Password</Label>

        <div className="w-75">
          <div className="relative">
            <Input
              defaultValue={state?.data?.password ?? ""}
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              className="py-5 w-75 pr-10 border border-gray-300 rounded-md focus-visible:ring-1 focus-visible:ring-blue-300 focus-visible:border-blue-300"
            />
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
          {!!state?.errors?.password && (
            <div className="text-red-500 text-sm">
              <p>Password Must:</p>
              <ul>
                {state.errors.password.map((err) => (
                  <li key={err}>{err}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <SubmitButton className="w-75 py-5 bg-gradient-to-br from-sky-500 to-indigo-500 text-white cursor-pointer">
        Sign Up
      </SubmitButton>
    </form>
  );
};

export default SignupForm;
