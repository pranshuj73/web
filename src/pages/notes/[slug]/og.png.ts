// src/pages/[slug]/og.png.js
import { getCollection } from "astro:content";
import { generateOGImage } from "@/utils/ogImageGenerator";

export async function getStaticPaths() {
  const posts = (await getCollection("notes", ({ data }) => !data.hidden));

  return posts.map(post => ({
    params: { slug: post.data.slug },
    props: { post },
  }));
}

export async function GET({ props }: {props: any}) {
  const image = await generateOGImage(props);

  return new Response(image, {
    headers: { "Content-Type": "image/png" },
  });
}

// Set to true to ensure static generation at build time
export const prerender = true;
