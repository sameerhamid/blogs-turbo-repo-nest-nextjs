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
import { saveComment } from "@/lib/actions/commentsActions";
import { SessionUser } from "@/lib/session";
import { Comment } from "@/lib/types/modelTypes";
import { cn } from "@/lib/utils";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import React, { useActionState, useEffect } from "react";
import { toast } from "sonner";

type Props = {
  postId: number;
  user: SessionUser;
  className?: string;
  refetch: (options?: RefetchOptions) => Promise<
    QueryObserverResult<
      {
        comments: Comment[];
        totalComments: number;
      },
      Error
    >
  >;
};

const AddComment = (props: Props) => {
  const [state, action] = useActionState(saveComment, undefined);
  const [isOpen, setIsOpen] = React.useState(state?.open ?? false);

  useEffect(() => {
    if (state) {
      toast(state?.ok ? "Success" : "Oops! ", {
        description: state?.message,
        style: {
          color: state?.ok ? "green" : "red",
        },
      });
    }
    if (state?.ok) {
      setIsOpen(false);
      props.refetch();
    }
  }, [state]);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        <Button className="mt-4 bg-gradient-to-r from-sky-500 to-indigo-500 cursor-pointer">
          Leave Your Comment
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Write Your Comment</DialogTitle>
        <form className={cn(props.className)} action={action}>
          <input type="hidden" name="postId" defaultValue={props.postId} />
          <Label htmlFor="content" className="mb-2">
            Your Commnet
          </Label>
          <div className="border-t border-x rounded-t-md">
            <Textarea
              placeholder="Your Comment"
              name="content"
              className="border-none acitve:outline-none focus-visible:ring-0 shadow-none"
              defaultValue={state?.data?.content}
            />
          </div>
          <p className="border rounded-b-md p-2">
            <span className="text-slate-400">Write as </span>
            <span className="text-slate-700">
              {props?.user?.name?.charAt(0).toUpperCase() +
                (props?.user?.name?.slice(1) ?? "")}
            </span>
          </p>
          {!!state?.errors?.content && (
            <p className="text-red-500 text-sm mt-2">
              {state.errors.content[0]}
            </p>
          )}

          <SubmitButton className="mt-5 py-5 bg-gradient-to-r from-sky-500 to-indigo-500 cursor-pointer">
            Save Comment
          </SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddComment;
