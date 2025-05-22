"use client"

import { useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { DataTable } from "@/components/dashboard-components/data-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { z } from "zod"
import { BlogSheet } from "@/components/dashboard-components/blog-sheet"

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

type Blog = z.infer<typeof blogSchema>

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching blogs:', error.message)
        return
      }

      setBlogs(data || [])
    } catch (error) {
      console.error('Error in fetchBlogs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateBlog = () => {
    setSelectedBlog(null)
    setIsSheetOpen(true)
  }

  const handleEditBlog = (blog: Blog) => {
    setSelectedBlog(blog)
    setIsSheetOpen(true)
  }

  const handleDeleteBlog = async (blogId: string) => {
    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', blogId)

      if (error) {
        console.error('Error deleting blog:', error.message)
        return
      }

      // Refresh the blogs list
      fetchBlogs()
    } catch (error) {
      console.error('Error in handleDeleteBlog:', error)
    }
  }

  // Transform blogs data for the DataTable
  const tableData = blogs.map(blog => ({
    id: blog.id,
    header: blog.title,
    type: blog.status,
    status: blog.status,
    target: blog.excerpt,
    limit: new Date(blog.created_at).toLocaleDateString(),
    reviewer: blog.author_id,
    content: blog.content,
    slug: blog.slug,
    tags: blog.tags || [],
  }))

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Button onClick={handleCreateBlog}>
          <Plus className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </div>

      <DataTable data={tableData} />

      <BlogSheet
        blog={selectedBlog}
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        onSave={fetchBlogs}
      />
    </div>
  )
} 