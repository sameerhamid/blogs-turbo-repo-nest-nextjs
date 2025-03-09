import Hero from "@/components/hero";
import Posts from "@/components/posts";
import { fetchPosts } from "@/lib/actions/postActions";
import Image from "next/image";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export default async function Home({ searchParams }: Props) {
  const { page } = await searchParams;
  const { posts, totalPost } = await fetchPosts({
    page: page ? +page : undefined,
  });
  return (
    <main>
      <Hero />
      <Posts posts={posts} />
    </main>
  );
}
