import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren;
const PostsLayout = (props: Props) => {
  return (
    <div className="mt-24 flex flex-col justify-center items-center ">
      {props.children}
    </div>
  );
};

export default PostsLayout;
