import { deleteSession } from "@/lib/session";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const GET = async () => {
  await deleteSession();
  //   revalidatePath("/");
  //   revalidateTag("auth");
  redirect("/");
};
