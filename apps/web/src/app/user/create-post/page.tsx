import React from "react";
import UpsertPostForm from "./_components/upsertPostForm";

const CreatePostPage = () => {
  return (
    <div className="bg-white text-center shadow-md rounded-md p-6 max-w-2xl w-full">
      <h2 className="text-lg font-bold text-slate-700">Create New Post</h2>

      <UpsertPostForm type="create" />
    </div>
  );
};

export default CreatePostPage;
