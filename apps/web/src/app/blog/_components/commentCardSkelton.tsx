import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const CommentCardSkelton = () => {
  return (
    <div className="flex flex-col gap-2 shadow rounded p-4">
      <div className="flex items-center gap-2">
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-4 w-48 " />
      </div>
      <Skeleton className="h-8 w-96 " />
    </div>
  );
};

export default CommentCardSkelton;
