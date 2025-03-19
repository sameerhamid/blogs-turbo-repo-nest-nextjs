"use client";
import { SessionUser } from "@/lib/session";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  ArrowRightStartOnRectangleIcon,
  ListBulletIcon,
  PencilSquareIcon,
} from "@heroicons/react/16/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  user: SessionUser;
};

// Function to generate a color based on the first letter
export const getBackgroundColor = (char: string) => {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
  ];
  return colors[char.charCodeAt(0) % colors.length]; // Rotate colors
};

const Profile = ({ user }: Props) => {
  const pathname = usePathname(); // Get current route
  const firstChar = user.name?.charAt(0).toUpperCase() || "?";
  const bgColor = getBackgroundColor(firstChar);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className="cursor-pointer ">
        <Avatar>
          <AvatarImage
            src={user.avatar}
            alt={user.name ?? ""}
            className="rounded-full w-14 border-1 border-white"
          />

          <AvatarFallback
            className={`flex items-center justify-center text-white font-semibold ${bgColor} border-1 border-white`}
          >
            <div>{firstChar}</div>
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>

      <PopoverContent className="translate-x-[-10px] w-65">
        <div className="flex justify-center items-center gap-2 w-full">
          <div
            className={`flex items-center justify-center text-white font-semibold ${bgColor} w-6 h-6 rounded-full `}
          >
            {firstChar}
          </div>

          <p className="line-clamp-1">
            {user.name &&
              user.name.charAt(0).toUpperCase() + user.name.slice(1)}
          </p>
        </div>

        <div className="border-b border-gray-300 my-2" />
        <div
          className="*:grid *:grid-cols-5 *:gap-3 *:items-center *:my-2 *:py-2
         [&>*:hover]:bg-sky-500 [&>*:hover]:text-white *:transition *:rounded-md
         [&>*>*:nth-child(1)]:justify-self-end
         "
        >
          <Link
            href={"/user/create-post"}
            onClick={handleOpen}
            className={`${
              pathname === "/user/create-post"
                ? "bg-sky-500 text-white"
                : "hover:bg-sky-500 hover:text-white"
            }`}
          >
            <PencilSquareIcon className="w-4 " />
            <span className="col-span-4">Create Post</span>
          </Link>

          <Link
            href={"/user/posts"}
            onClick={handleOpen}
            className={`${
              pathname === "/user/posts"
                ? "bg-sky-500 text-white"
                : "hover:bg-sky-500 hover:text-white"
            }`}
          >
            <ListBulletIcon className="w-4" />
            <span className="col-span-4">Posts</span>
          </Link>

          <a href="/api/auth/signout">
            <ArrowRightStartOnRectangleIcon className="w-4" />
            <span className="col-span-4">Sign Out</span>
          </a>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Profile;
