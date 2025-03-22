import { TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import { Tooltip, TooltipTrigger } from "@radix-ui/react-tooltip";
import Link from "next/link";
import React from "react";

type Props = {
  postId: number;
};
const PostActions = ({ postId }: Props) => {
  return (
    <div className="flex justify-center items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={`/user/posts/${postId}/update`}
              className="border p-2 border-yellow-500 rounded-md text-yellow-500 hover:border-yellow-700 hover:text-yellow-700 transition-colors"
            >
              <PencilIcon className="w-4" />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit This Post</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={`/user/posts/${postId}/delete`}
              className="border p-2 border-red-500 rounded-md text-red-500 hover:border-red-700 hover:text-red-700 transition-colors"
            >
              <TrashIcon className="w-4" />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete This Post</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default PostActions;
