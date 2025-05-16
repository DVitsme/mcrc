import { supabase } from '@/lib/supabase';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image_url?: string;
  author_id?: string;
  status: 'draft' | 'published' | 'archived';
  published_at?: string;
  meta_description?: string;
  read_time_minutes?: number;
  created_at: string;
  updated_at: string;
  author?: {
    id: string;
    full_name: string;
    role: string;
  };
  tags?: Tag[];
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

interface BlogPostTag {
  tag: Tag;
}

export async function getFeaturedPost(): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      author:author_id(id, full_name, role),
      tags:blog_post_tags!inner(
        tag:tag_id(id, name, slug)
      )
    `)
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error('Error fetching featured post:', error);
    return null;
  }

  if (!data) return null;

  // Transform the data to match our interface
  const post: BlogPost = {
    ...data,
    tags: data.tags?.map(({ tag }: BlogPostTag) => tag) || []
  };

  return post;
}

export async function getAllPublishedPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      author:author_id(id, full_name, role),
      tags:blog_post_tags(
        tag:tag_id(id, name, slug)
      )
    `)
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching published posts:', error);
    return [];
  }

  // Transform the data to match our interface
  const posts = data?.map(post => ({
    ...post,
    tags: post.tags?.map(({ tag }: BlogPostTag) => tag) || []
  })) || [];

  return posts;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      author:author_id(id, full_name, role),
      tags:blog_post_tags(
        tag:tag_id(id, name, slug)
      )
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .single();

  if (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return null;
  }

  if (!data) return null;

  // Transform the data to match our interface
  const post: BlogPost = {
    ...data,
    tags: data.tags?.map(({ tag }: BlogPostTag) => tag) || []
  };

  return post;
}

export async function getRelatedPosts(postId: string, tagIds: string[], limit = 3): Promise<BlogPost[]> {
  if (!tagIds.length) return [];

  // Get posts that share tags with the current post
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      author:author_id(id, full_name, role),
      tags:blog_post_tags!inner(
        tag:tag_id(id, name, slug)
      )
    `)
    .neq('id', postId) // Exclude the current post
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .in('tags.tag_id', tagIds) // Posts with matching tags
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }

  // Transform the data to match our interface
  const posts = data?.map(post => ({
    ...post,
    tags: post.tags?.map(({ tag }: BlogPostTag) => tag) || []
  })) || [];

  return posts;
}

export async function getAllTags(): Promise<Tag[]> {
  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching tags:', error);
    return [];
  }

  return data || [];
}

export async function getPostsByTag(tagSlug: string): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      author:author_id(id, full_name, role),
      tags:blog_post_tags!inner(
        tag:tag_id!inner(id, name, slug)
      )
    `)
    .eq('tags.tag.slug', tagSlug)
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false });

  if (error) {
    console.error(`Error fetching posts with tag ${tagSlug}:`, error);
    return [];
  }

  // Transform the data to match our interface
  const posts = data?.map(post => ({
    ...post,
    tags: post.tags?.map(({ tag }: BlogPostTag) => tag) || []
  })) || [];

  return posts;
} 