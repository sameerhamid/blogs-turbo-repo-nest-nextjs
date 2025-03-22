import { createClient } from "@supabase/supabase-js";

export async function uploadThumbnail(image: File) {
  const superbaseUrl = process.env.SUPERBASE_URL!;
  const superbaseKey = process.env.SUPERBASE_API_KEY!;

  const supabase = createClient(superbaseUrl, superbaseKey);

  const data = await supabase.storage
    .from("thumbnail")
    .upload(`${image.name}_${Date.now()}`, image);

  if (!data.data?.path) {
    throw new Error("Failed to upload image");
  }

  const urlData = await supabase.storage
    .from("thumbnail")
    .getPublicUrl(data.data?.path);

  return urlData.data.publicUrl;
}
