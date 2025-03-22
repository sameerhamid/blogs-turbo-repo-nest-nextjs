import SubmitButton from "@/components/submitButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { deletePost, fetchPostById } from "@/lib/actions/postActions";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const DeletPostPage = async (props: Props) => {
  const params = await props.params;
  const post = await fetchPostById(parseInt(params.id));
  const formAction = async (formData: FormData) => {
    "use server";
    await deletePost(post.id);
    redirect("/user/posts");
  };
  return (
    <Card className="w-96 m-12 px-6 py-6">
      <CardHeader>
        <CardTitle className="flex flex-col gap-4 items-center font-thin">
          <p className="text-red-600">Delete The Post</p>
          <ExclamationCircleIcon className="w-14 h-14 text-red-600" />
        </CardTitle>
      </CardHeader>

      <CardDescription className="-mt-4">
        <p>
          This action cannot be undone. This will permanently delete your post
          and remove its data from our services.
        </p>
        <hr className="m-3" />

        <p className="text-slate-600 font-bold">Title of the Post</p>
        <p>{post.title}</p>
      </CardDescription>

      <CardContent>
        <form action={formAction} className="flex justify-end gap-2">
          <Button variant={"secondary"} asChild>
            <Link href="/user/posts">Cancel</Link>
          </Button>
          <SubmitButton variant={"destructive"} className="cursor-pointer">
            Delete
          </SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
};

export default DeletPostPage;
