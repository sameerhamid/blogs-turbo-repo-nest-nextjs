import Hero from "@/components/hero";
import Posts from "@/components/posts";
import { fetchPosts } from "@/lib/actions/postActions";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";
import { getSession } from "@/lib/session";
import Image from "next/image";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export default async function Home({ searchParams }: Props) {
  const { page } = await searchParams;
  const { posts, totalPost } = await fetchPosts({
    page: page ? +page : undefined,
  });
  const session = await getSession();
  console.log("session>>>", session);
  return (
    <main>
      <Hero />
      <Posts
        posts={posts}
        currentPage={page ? +page : 1}
        totalPages={Math.ceil(totalPost / DEFAULT_PAGE_SIZE)}
      />
    </main>
  );
}
