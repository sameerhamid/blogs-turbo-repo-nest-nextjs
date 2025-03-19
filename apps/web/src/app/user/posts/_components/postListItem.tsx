import { PostWithLikeAndCommentCount } from "@/lib/types/modelTypes";
import { CheckIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";
import PostActions from "./postActions";

type Props = {
  post: PostWithLikeAndCommentCount;
};
const PostListItem = ({ post }: Props) => {
  return (
    <div className="grid grid-cols-8 m-2 rounded-md overflow-hidden border shadow hover:scale-[101%] transition text-center bg-white">
      <div className="relative  h-32">
        <Image
          src={post.thumbnail || "/no-image.png"}
          alt={post.title}
          unoptimized
          fill
        />
      </div>

      <div className="flex flex-col gap-2 col-span-2">
        <p className="text-lg line-clamp-1 px-2 text-slate-700">{post.title}</p>
        <p className="text-sm line-clamp-3 px-1 text-slate-500">
          {post.content}
        </p>
      </div>

      <p className="flex justify-center items-center">
        {new Date(post.createdAt).toLocaleDateString()}
      </p>

      <div className="flex items-center  justify-center">
        {post.published && <CheckIcon className="w-6 h-6 text-green-600" />}
      </div>

      <div className="flex items-center  justify-center">
        {post._count.likes}
      </div>

      <div className="flex items-center  justify-center">
        {post._count.comments}
      </div>

      <PostActions postId={post.id} />
    </div>
  );
};

export default PostListItem;
