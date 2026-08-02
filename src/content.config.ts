import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
});

const products = defineCollection({
	// Load Markdown files in the `src/content/products/` directory.
	loader: glob({ base: "./src/content/products", pattern: "**/*.md" }),
	schema: ({ image }) =>
		z.object({
			name: z.string(),
			category: z.string(),
			shortDescription: z.string(),
			sku: z.string().optional(),
			// Free-form so it can hold Vietnamese formatting/units ("1.250.000 đ / cây").
			// Left unset -> UI falls back to "Liên hệ báo giá tốt nhất".
			price: z.string().optional(),
			// Card overlay pill, e.g. "Sẵn hàng" / "Số lượng lớn".
			badge: z.string().optional(),
			// Ordered so the specs table renders rows in a stable, author-controlled order.
			specs: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
			// images[0] doubles as the card thumbnail and the OG image.
			images: z.array(image()).min(1),
			order: z.number().optional(),
		}),
});

export const collections = { blog, products };
