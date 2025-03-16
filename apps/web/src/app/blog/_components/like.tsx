"use client";
import {
  getPostLikesData,
  likePost,
  unlikePost,
} from "@/lib/actions/likeActions";
import { SessionUser } from "@/lib/session";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/16/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import React from "react";
import { toast } from "sonner";
type Props = {
  postId: number;
  user?: SessionUser;
};
const Like = (props: Props) => {
  const { data, refetch } = useQuery({
    queryKey: ["GET_POST_LIKES_DATA", props.postId],
    queryFn: async () => await getPostLikesData(props.postId),
  });

  const likeMutation = useMutation({
    mutationFn: async () => {
      if (!props.user) {
        toast("Oops!", {
          description: "Please log in to like a post",
          duration: 7000,
          style: {
            color: "red",
          },
        });
      }
      await likePost(props.postId);
    },
    onSuccess: async () => {
      await refetch();
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: async () => await unlikePost(props.postId),
    onSuccess: async () => {
      await refetch();
    },
  });

  return (
    <div className="mt-2 flex items-center justify-start gap-1">
      {data?.userLikedPost ? (
        <button
          className="cursor-pointer"
          onClick={() => unlikeMutation.mutate()}
        >
          <SolidHeartIcon className="w-6 text-rose-600" />
        </button>
      ) : (
        <button
          className="cursor-pointer"
          onClick={() => likeMutation.mutate()}
        >
          <HeartIcon className="w-6" />
        </button>
      )}
      <p className="text-slate-600">{data?.likeCount}</p>
    </div>
  );
};

export default Like;
