import { z } from "zod"

// Define the schema for blog posts
export const blogSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  excerpt: z.string(),
  status: z.enum(["draft", "published", "archived"]),
  author_id: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  published_at: z.string().nullable(),
  featured_image: z.string().nullable(),
  tags: z.array(z.string()).optional(),
})

export type Blog = z.infer<typeof blogSchema> 