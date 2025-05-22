"use client"

import { useState, useEffect } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { DataTable } from "@/components/dashboard-components/data-table"
import { BlogSheet } from "@/components/dashboard-components/blog-sheet"
import { Blog } from "@/lib/schemas/blog"
import { toast } from "sonner"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

type BlogTableData = {
  id: string;
  header: string;
  type: string;
  status: string;
  target: string;
  limit: string;
  reviewer: string;
  skills?: string[];
};

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [tableData, setTableData] = useState<BlogTableData[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const fetchBlogs = async () => {
    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const blogData = data || [];
      setBlogs(blogData);

      // Transform blog data to match table schema
      const transformedData: BlogTableData[] = blogData.map(blog => ({
        id: blog.id,
        header: blog.title,
        type: blog.status,
        status: blog.status,
        target: blog.author_id,
        limit: 'Standard',
        reviewer: 'Admin',
        skills: blog.tags
      }));

      setTableData(transformedData);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to fetch blogs');
    }
  };

  useEffect(() => {
    void fetchBlogs();
  }, []);

  const handleCreateBlog = () => {
    setSelectedBlog(null);
    setIsSheetOpen(true);
  };

  const columns: ColumnDef<BlogTableData>[] = [
    {
      accessorKey: "header",
      header: "Title",
    },
    {
      accessorKey: "type",
      header: "Status",
    },
    {
      accessorKey: "target",
      header: "Author",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const blog = row.original;
        return (
          <div className="flex gap-2">
            <button
              onClick={() => handleCreateBlog()}
              className="text-blue-600 hover:text-blue-800"
            >
              Edit
            </button>
            <button
              onClick={() => handleCreateBlog()}
              className="text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Button onClick={handleCreateBlog}>
          <Plus className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </div>

      <DataTable
        data={tableData}
        columns={columns}
      />

      <BlogSheet
        blog={selectedBlog}
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        onSave={fetchBlogs}
      />
    </div>
  );
} 