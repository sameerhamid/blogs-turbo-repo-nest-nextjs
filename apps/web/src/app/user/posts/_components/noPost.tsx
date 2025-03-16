import { Button } from "@/components/ui/button";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import React from "react";

const NoPost = () => {
  return (
    <div className="mt-32 flex flex-col items-center gap-5">
      <p className="text-center p-2 text-5xl text-slate-400">No Post Yet!</p>
      <Button
        asChild
        className="py-5 bg-gradient-to-r from-sky-500 to-indigo-500"
      >
        <Link
          href="/user/posts/new"
          className="flex gap-2 items-center justify-center"
        >
          <span>
            <PencilSquareIcon className="w-6" />
          </span>
          <span>Write Your First Post</span>
        </Link>
      </Button>
    </div>
  );
};

export default NoPost;
