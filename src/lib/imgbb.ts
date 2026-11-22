type ImgbbResponse = {
  data?: { url?: string; display_url?: string };
  success?: boolean;
  error?: { message?: string };
};

export async function uploadToImgbb(file: File): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  if (!apiKey) {
    throw new Error("Image upload is not configured. Add NEXT_PUBLIC_IMGBB_API_KEY.");
  }

  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`,
    { method: "POST", body: formData }
  );

  const json = (await res.json()) as ImgbbResponse;
  if (!res.ok || !json.data?.display_url) {
    throw new Error(json.error?.message || "Failed to upload image");
  }

  return json.data.display_url;
}
