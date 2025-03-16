import { PostWithLikeAndCommentCount } from "@/lib/types/modelTypes";
import React from "react";
import PostListItem from "./postListItem";

type Props = {
  posts: PostWithLikeAndCommentCount[];
  currentPage: number;
  totalPages: number;
};
const PostList = (props: Props) => {
  return (
    <>
      <div className="grid grid-cols-8 rounded-md shadow-md m-3 p-3 text-center">
        <div className="col-span-3"></div>

        <div>Date</div>
        <div>Published</div>
        <div>Likes</div>
        <div>Comments</div>
        <div></div>
      </div>

      {props.posts.map((post) => {
        return <PostListItem key={post.id} post={post} />;
      })}
    </>
  );
};

export default PostList;
