import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren;
const PostsLayout = (props: Props) => {
  return <div className="mt-24">{props.children}</div>;
};

export default PostsLayout;
