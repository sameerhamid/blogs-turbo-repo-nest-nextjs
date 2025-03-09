import { Post } from "@/lib/types/modelTypes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  post: Partial<Post>;
};
const PostCard = (props: Props) => {
  const {
    id,
    title = "",
    slug,
    thumbnail,
    content = "",
    createdAt = "",
  } = props.post;
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <div className="relative h-60 ">
        <Image
          src={thumbnail ?? "/no-image.png"}
          alt={title}
          className="w-full h-48  rounded-t-lg"
          fill
          unoptimized
        />
      </div>

      <div className="px-6 py-6 flex-grow flex flex-col">
        <h3 className="text-lg font-bold mt-2 break-words text-center text-gray-600">
          {title}
        </h3>
        <p className="mt-2 test-gray-500 text-sm">
          {new Date(createdAt).toLocaleDateString()}
        </p>
        <p className="mt-4 text-gray-700 break-words">
          {content.slice(0, 100)}...
        </p>
        <Link
          href={`/blog/${slug}/${id}`}
          className="text-indigo-600 hover:underline mt-auto block text-right"
        >
          Read more
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
