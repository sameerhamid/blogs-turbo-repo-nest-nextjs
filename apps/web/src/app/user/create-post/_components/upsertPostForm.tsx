"use client";
import SubmitButton from "@/components/submitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveNewPost, updatePost } from "@/lib/actions/postActions";
import { PostFormState } from "@/lib/types/formState";
import { Post } from "@/lib/types/modelTypes";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  type: "create" | "update";
  post?: Post;
};

const UpsertPostForm = (props: Props) => {
  // console.log("props post>>>", props.post);
  const [imageUrl, setImageUrl] = useState<string>(
    props.type === "create" ? "" : props.post?.thumbnail || ""
  );
  const [state, action] = useActionState(
    props.type === "create" ? saveNewPost : updatePost,
    props.type === "create"
      ? undefined
      : {
          data: {
            postId: props.post?.id,
            title: props.post?.title,
            content: props.post?.content,
            published: props.post?.published ? "on" : "off",
            tags: props.post?.tags.map((tag) => tag.name).join(","),
            prevThumbnailUrl: props.post?.thumbnail ?? undefined,
          },
        }
  );

  console.log("state>>>", state);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImageUrl(URL.createObjectURL(event.target.files![0]));
    }
  };

  useEffect(() => {
    if (state?.ok) {
      toast("Success!", {
        description: state.message,
        duration: 7000,
        style: {
          color: "green",
        },
      });
      redirect("/user/posts");
    }
  }, [state]);

  return (
    <form
      className="flex flex-col gap-4 w-full [&>div>label]:text-slate-500 [&>div>input]:transition [&>div>textarea]:transition"
      action={action}
    >
      {!!state?.ok === false && !!state?.message && (
        <p className="text-red-500 text-sm">{state.message}</p>
      )}

      <input hidden name="postId" defaultValue={state?.data?.postId} />
      <div className="flex flex-col gap-2 ">
        <Label htmlFor="title">Title</Label>
        <div>
          <Input
            defaultValue={state?.data?.title}
            id="title"
            name="title"
            placeholder="Enter The Title Of Your Post"
            className="py-5 border border-gray-300 rounded-md focus-visible:ring-1 focus-visible:ring-blue-300 focus-visible:border-blue-300"
          />

          {!!state?.errors?.title && (
            <p className="text-red-500 text-sm text-start">
              {state.errors.title[0]}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="content">Content</Label>
        <div>
          <Textarea
            defaultValue={state?.data?.content}
            id="content"
            name="content"
            placeholder="Write Your Post Content Here"
            rows={6}
            className="border border-gray-300 rounded-md focus-visible:ring-1 focus-visible:ring-blue-300 focus-visible:border-blue-300"
          />
          {!!state?.errors?.content && (
            <p className="text-red-500 text-sm text-start">
              {state.errors.content[0]}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="thumbnail">Thumbnail</Label>
        <div>
          <Input
            id="thumbnail"
            type="file"
            name="thumbnail"
            accept="image/*"
            onChange={handleImageChange}
            className="h-10 border border-gray-300 rounded-md focus-visible:ring-1 focus-visible:ring-blue-300 focus-visible:border-blue-300"
          />
          {!!state?.errors?.thumbnail && (
            <p className="text-red-500 text-sm text-start">
              {state.errors.thumbnail[0]}
            </p>
          )}
        </div>

        {!!imageUrl && (
          <Image
            src={imageUrl}
            alt="post thumbnail"
            width={200}
            height={150}
            unoptimized
          />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <div>
          <Input
            defaultValue={state?.data?.tags}
            id="tags"
            name="tags"
            placeholder="Enter Tags (comma-separated)"
            className="py-5 border border-gray-300 rounded-md focus-visible:ring-1 focus-visible:ring-blue-300 focus-visible:border-blue-300"
          />

          {!!state?.errors?.tags && (
            <p className="text-red-500 text-sm text-start">
              {state.errors.tags[0]}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <input
          defaultChecked={state?.data?.published === "on"}
          id="published"
          type="checkbox"
          name="published"
          className="w-5 h-5 border border-gray-300 rounded focus:ring-blue-300 focus:border-blue-300"
        />
        <Label htmlFor="published">Published Now</Label>
      </div>

      <SubmitButton className="py-5 bg-gradient-to-br from-sky-500 to-indigo-500 text-white cursor-pointer text-xl">
        Save
      </SubmitButton>
    </form>
  );
};

export default UpsertPostForm;
