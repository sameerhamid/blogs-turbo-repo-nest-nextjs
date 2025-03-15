"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPostComments } from "@/lib/actions/commentsActions";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";
import { Comment } from "@/lib/types/modelTypes";
import CommentCard from "./commentCard";
import CommentPagination from "./commentPagination";

type Props = {
  postId: number;
};
const Comments = ({ postId }: Props) => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery({
    queryKey: ["GET_POST_COMMENTS", postId, page],
    queryFn: async () =>
      await getPostComments({
        postId,
        take: DEFAULT_PAGE_SIZE,
        skip: (page - 1) * DEFAULT_PAGE_SIZE,
      }),
  });

  const totalPages = Math.ceil((data?.totalComments ?? 0) / DEFAULT_PAGE_SIZE);
  return (
    <div className="p-4 rounded-md shadow-md mt-2">
      <h6 className="text-lg text-slate-700">Comments</h6>
      <div className="flex flex-col gap-4 mt-2">
        {data?.comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
      <CommentPagination
        className="pt-2"
        currentPage={page}
        totalPages={totalPages}
        setCurrentPage={setPage}
      />
    </div>
  );
};

export default Comments;
