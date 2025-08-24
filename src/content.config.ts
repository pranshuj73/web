import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
		}),
});

const site = defineCollection({
	// Load JSON files in the `src/content/site/` directory.
	loader: glob({ base: './src/content/site', pattern: '**/*.json' }),
	// Type-check the JSON data using schemas
	schema: z.union([
		z.object({
			projects: z.array(z.object({
				name: z.string(),
				url: z.string(),
				description: z.string(),
				icon: z.string().optional(),
			})),
		}),
		z.object({
			experience: z.array(z.object({
				title: z.string(),
				company: z.string(),
				company_url: z.string(),
				duration: z.string(),
				location: z.string(),
			})),
		}),
		z.object({
			education: z.array(z.object({
				degree: z.string(),
				institution: z.string(),
				institution_url: z.string(),
				duration: z.string(),
				location: z.string(),
			})),
		}),
	]),
});

export const collections = { blog, site };
