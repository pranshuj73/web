import { Resvg } from "@resvg/resvg-js";
import postOgImage from "@/utils/og-template/post";
import type { CollectionEntry } from "astro:content";

function svgBufferToPngBuffer(svg: Buffer | string) {
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return pngData.asPng();
}

type PostProps = (CollectionEntry<"blog"> | CollectionEntry<"notes">);

export async function generateOGImage({ post }: {post : PostProps}) {
  const svg = await postOgImage(post);
  return svgBufferToPngBuffer(svg);
}
