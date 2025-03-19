"use client";
import SubmitButton from "@/components/submitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import React, { useState } from "react";

const UpsertPostForm = () => {
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImageUrl(URL.createObjectURL(event.target.files![0]));
    }
  };

  return (
    <form className="flex flex-col gap-4 w-full [&>div>label]:text-slate-500 [&>div>input]:transition [&>div>textarea]:transition">
      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Enter The Title Of Your Post"
          className="py-5 border border-gray-300 rounded-md focus-visible:ring-1 focus-visible:ring-blue-300 focus-visible:border-blue-300"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          placeholder="Write Your Post Content Here"
          rows={6}
          className="border border-gray-300 rounded-md focus-visible:ring-1 focus-visible:ring-blue-300 focus-visible:border-blue-300"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="thumbnail">Thumbnail</Label>
        <Input
          id="thumbnail"
          type="file"
          name="thumbnail"
          accept="image/*"
          onChange={handleImageChange}
          className="h-10 border border-gray-300 rounded-md focus-visible:ring-1 focus-visible:ring-blue-300 focus-visible:border-blue-300"
        />

        {!!imageUrl && (
          <Image src={imageUrl} alt="post thumbnail" width={200} height={150} />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          id="tags"
          name="tags"
          placeholder="Enter Tags (comma-separated)"
          className="py-5 border border-gray-300 rounded-md focus-visible:ring-1 focus-visible:ring-blue-300 focus-visible:border-blue-300"
        />
      </div>

      <div className="flex gap-2 items-center">
        <input
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
