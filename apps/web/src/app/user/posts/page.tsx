import Posts from "@/components/posts";
import { fethUserPosts } from "@/lib/actions/postActions";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";
import React from "react";
import NoPost from "./_components/noPost";
import PostList from "./_components/postList";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
const UserPost = async ({ searchParams }: Props) => {
  const { page } = await searchParams;
  const { totalPost, posts } = await fethUserPosts({
    page: page ? +page : 1,
    pageSize: DEFAULT_PAGE_SIZE,
  });
  return (
    <div className="mx-5">
      {!posts || !posts.length ? (
        <NoPost />
      ) : (
        <PostList
          posts={posts}
          currentPage={page ? +page : 1}
          totalPages={Math.ceil(totalPost / DEFAULT_PAGE_SIZE)}
        />
      )}
    </div>
  );
};

export default UserPost;
