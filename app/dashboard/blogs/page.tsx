"use client"

import { useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { DataTable } from "@/components/dashboard-components/data-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { BlogSheet } from "@/components/dashboard-components/blog-sheet"
import { Blog } from "@/lib/schemas/blog"

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
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching blogs:', error.message)
        return
      }
      console.log("dashboard/blogs/page.tsx data", data)
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