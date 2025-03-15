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

type Props = {
  user: SessionUser;
};

// Function to generate a color based on the first letter
const getBackgroundColor = (char: string) => {
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
  const firstChar = user.name?.charAt(0).toUpperCase() || "?";
  const bgColor = getBackgroundColor(firstChar);

  return (
    <Popover>
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

      <PopoverContent className="w-full translate-x-[-10px]">
        <div className="flex justify-center items-center gap-2 px-14 ">
          <div
            className={`flex items-center justify-center text-white font-semibold ${bgColor} w-6 h-6 rounded-full `}
          >
            {firstChar}
          </div>

          <p>
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
          <Link href={"/user/create-post"}>
            <PencilSquareIcon className="w-4 " />
            <span className="col-span-4">Create Post</span>
          </Link>

          <Link href={"/user/create-post"}>
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
