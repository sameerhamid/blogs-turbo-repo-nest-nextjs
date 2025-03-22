import UpsertPostForm from "@/app/user/create-post/_components/upsertPostForm";
import { fetchPostById } from "@/lib/actions/postActions";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};
const UpdatePostPage = async (props: Props) => {
  const params = await props.params;
  const post = await fetchPostById(parseInt(params.id));
  return (
    <div className="bg-white text-center shadow-md rounded-md p-6 max-w-2xl w-full">
      <h2 className="text-lg font-bold text-slate-700">Update Your Post</h2>

      <UpsertPostForm type="update" post={post} />
    </div>
  );
};

export default UpdatePostPage;
