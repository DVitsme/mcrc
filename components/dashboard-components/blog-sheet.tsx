"use client"

import { useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { blogSchema } from "@/app/dashboard/blogs/page"

type Blog = z.infer<typeof blogSchema>

interface BlogSheetProps {
  blog: Blog | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: () => void
}

const formSchema = blogSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  author_id: true,
})

export function BlogSheet({ blog, open, onOpenChange, onSave }: BlogSheetProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      status: "draft",
      published_at: null,
      featured_image: null,
      tags: [],
    },
  })

  useEffect(() => {
    if (blog) {
      form.reset({
        title: blog.title,
        slug: blog.slug,
        content: blog.content,
        excerpt: blog.excerpt,
        status: blog.status,
        published_at: blog.published_at,
        featured_image: blog.featured_image,
        tags: blog.tags,
      })
    } else {
      form.reset({
        title: "",
        slug: "",
        content: "",
        excerpt: "",
        status: "draft",
        published_at: null,
        featured_image: null,
        tags: [],
      })
    }
  }, [blog, form])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      if (blog) {
        // Update existing blog
        const { error } = await supabase
          .from('blogs')
          .update({
            ...values,
            updated_at: new Date().toISOString(),
          })
          .eq('id', blog.id)

        if (error) throw error
        toast.success('Blog post updated successfully')
      } else {
        // Create new blog
        const { error } = await supabase
          .from('blogs')
          .insert([
            {
              ...values,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ])

        if (error) throw error
        toast.success('Blog post created successfully')
      }

      onSave()
      onOpenChange(false)
    } catch (error) {
      console.error('Error saving blog:', error)
      toast.error('Failed to save blog post')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{blog ? 'Edit Blog Post' : 'Create New Blog Post'}</SheetTitle>
          <SheetDescription>
            {blog
              ? 'Make changes to your blog post here.'
              : 'Fill in the details to create a new blog post.'}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter blog title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="enter-blog-slug" {...field} />
                  </FormControl>
                  <FormDescription>
                    This will be used in the URL of your blog post.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerpt</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter a brief excerpt"
                      className="h-20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your blog content here"
                      className="h-40"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="featured_image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Featured Image URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter image URL"
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter>
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : blog ? 'Update Post' : 'Create Post'}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
} 