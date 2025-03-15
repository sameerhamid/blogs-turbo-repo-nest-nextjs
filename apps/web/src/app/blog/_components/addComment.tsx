import SubmitButton from "@/components/submitButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SessionUser } from "@/lib/session";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  postId: number;
  user: SessionUser;
  className?: string;
};

const AddComment = (props: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-4 bg-gradient-to-r from-sky-500 to-indigo-500 cursor-pointer">
          Leave Your Comment
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Write Your Comment</DialogTitle>
        <form className={cn(props.className)}>
          <Label htmlFor="comment" className="mb-2">
            Your Commnet
          </Label>
          <div className="border-t border-x rounded-t-md">
            <Textarea
              placeholder="Your Comment"
              name="comment"
              className="border-none acitve:outline-none focus-visible:ring-0 shadow-none"
            />
          </div>
          <p className="border rounded-b-md p-2">
            <span className="text-slate-400">Write as </span>
            <span className="text-slate-700">
              {props?.user?.name?.charAt(0).toUpperCase() +
                (props?.user?.name?.slice(1) ?? "")}
            </span>
          </p>

          <SubmitButton className="mt-4 bg-gradient-to-r from-sky-500 to-indigo-500 cursor-pointer ">
            Submit
          </SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddComment;
