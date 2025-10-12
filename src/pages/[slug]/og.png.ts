// src/pages/[slug]/og.png.js
import { getCollection, type CollectionEntry } from "astro:content";
import { generateOGImage } from "@/utils/ogImageGenerator";

export async function getStaticPaths() {
	const notes = await getCollection("notes");
	const blog = await getCollection("blog");

	const posts = [...notes, ...blog];

	return posts.map((post) => ({
		params: { slug: post.id },
		props: { post },
	}));
}

type PostProps = {
	post: CollectionEntry<"blog"> | CollectionEntry<"notes">;
};

export async function GET({ props }: { props: PostProps }) {
	const image = await generateOGImage(props);

	return new Response(image, {
		headers: { "Content-Type": "image/png" },
	});
}

// Set to true to ensure static generation at build time
export const prerender = true;
