import { getBackgroundColor } from "@/components/profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Comment } from "@/lib/types/modelTypes";
import React from "react";

type Props = {
  comment: Comment;
};
const CommentCard = ({ comment }: Props) => {
  const firstChar = comment.author.name?.charAt(0).toUpperCase() || "?";
  const bgColor = getBackgroundColor(firstChar);
  return (
    <div className="p-2 shadow rounded">
      <div className="flex gap-2 text-slate-500 items-center">
        <Avatar className="border-2">
          <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
          <AvatarFallback
            className={`flex items-center justify-center text-white font-semibold ${bgColor} border-1 border-white`}
          >
            <div>{firstChar}</div>
          </AvatarFallback>
        </Avatar>
        <p>{comment.author.name} |</p>
        <p>{new Date(comment.createdAt).toLocaleDateString()}</p>
      </div>
      <p className="mt-4">{comment.content}</p>
    </div>
  );
};

export default CommentCard;
