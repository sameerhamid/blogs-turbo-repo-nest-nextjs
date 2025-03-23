"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deletePost } from "@/lib/actions/postActions";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";

type Props = {
  params: Promise<{ id: string }>;
};
const InterceptorDeletePostPage = (props: Props) => {
  const params = use(props.params);
  const postId = parseInt(params.id);

  return (
    <AlertDialog open>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete This Post!</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your post
            and remove its data from our services.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <a href={`/user/posts`}>Cancel</a>
          </AlertDialogCancel>
          <AlertDialogAction
            asChild
            className="bg-red-500 text-white cursor-pointer hover:bg-red-700"
            onClick={() => deletePost(postId)}
          >
            <a href={`/user/posts`}>Delete</a>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default InterceptorDeletePostPage;
