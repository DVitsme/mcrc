import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CalendarDays, Clock, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  getAllPublishedPosts,
  getFeaturedPost,
  getAllTags,
  type BlogPost
} from '@/lib/blog'
import { formatDate } from '@/lib/utils'

export default async function BlogPage({
  searchParams
}: {
  searchParams: { tag?: string }
}) {
  // Fetch data in parallel
  const [featuredPostData, allPostsData, tagsData] = await Promise.all([
    getFeaturedPost(),
    getAllPublishedPosts(),
    getAllTags()
  ]);

  // If no featured post is found, use the first post as featured
  const featuredPost = featuredPostData || (allPostsData.length > 0 ? allPostsData[0] : null);

  // Filter out the featured post from the list of posts
  const posts = featuredPost
    ? allPostsData.filter(post => post.id !== featuredPost.id)
    : allPostsData;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section with Featured Post */}
      {featuredPost && (
        <section className="mb-16">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="order-2 flex flex-col justify-center lg:order-1">
              {featuredPost.tags && featuredPost.tags.length > 0 && (
                <Badge
                  className={`${getCategoryColor(featuredPost.tags[0].name)} mb-4 inline-flex w-fit`}
                >
                  {featuredPost.tags[0].name}
                </Badge>
              )}
              <h1 className="mb-4 text-3xl font-bold lg:text-4xl xl:text-5xl">
                {featuredPost.title}
              </h1>
              <p className="mb-6 text-lg text-muted-foreground">
                {featuredPost.excerpt || featuredPost.meta_description}
              </p>
              <div className="mb-6 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{featuredPost.author?.full_name || 'Admin'}</p>
                    <p className="text-xs text-muted-foreground">{getRoleName(featuredPost.author?.role)}</p>
                  </div>
                </div>
                <Separator orientation="vertical" className="h-6" />
                <div className="flex items-center gap-1">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {featuredPost.published_at ? formatDate(featuredPost.published_at) : formatDate(featuredPost.created_at)}
                  </span>
                </div>
                <Separator orientation="vertical" className="h-6" />
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {featuredPost.read_time_minutes ? `${featuredPost.read_time_minutes} min read` : '5 min read'}
                  </span>
                </div>
              </div>
              <Button asChild className="w-fit">
                <Link href={`/blog/${featuredPost.slug}`}>
                  Read Full Article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="order-1 lg:order-2">
              <div className="overflow-hidden rounded-xl">
                <Link href={`/blog/${featuredPost.slug}`}>
                  <Image
                    src={featuredPost.featured_image_url || '/images/blog-placeholder.jpg'}
                    alt={featuredPost.title}
                    width={800}
                    height={500}
                    className="aspect-[16/10] h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="mb-12">
        <div className="overflow-x-auto pb-2">
          <Tabs defaultValue={searchParams.tag || 'all'} className="w-full">
            <TabsList className="mb-8 flex w-full justify-start space-x-2 bg-transparent p-0">
              <TabsTrigger
                key="all"
                value="all"
                className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                asChild
              >
                <Link href="/blog">All</Link>
              </TabsTrigger>

              {tagsData.map((tag) => (
                <TabsTrigger
                  key={tag.slug}
                  value={tag.slug}
                  className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  asChild
                >
                  <Link href={`/blog?tag=${tag.slug}`}>{tag.name}</Link>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={searchParams.tag || 'all'} className="mt-0">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <Suspense fallback={<p>Loading blog posts...</p>}>
                  {posts.map((post) => (
                    <BlogPostCard key={post.id} post={post} />
                  ))}
                </Suspense>
              </div>
              {posts.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground">No posts in this category yet. Check back soon!</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="mt-16 rounded-2xl bg-muted p-8 md:p-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold md:text-3xl">Subscribe to Our Newsletter</h2>
          <p className="mt-4 text-muted-foreground">
            Stay updated with the latest insights, tips, and news about mediation and conflict resolution.
          </p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="rounded-md border px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:w-72"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  )
}

function BlogPostCard({ post }: { post: BlogPost }) {
  const primaryTag = post.tags && post.tags.length > 0 ? post.tags[0] : null;

  return (
    <Card className="flex flex-col overflow-hidden border-0 shadow-none">
      <div className="overflow-hidden rounded-xl">
        <Link href={`/blog/${post.slug}`} className="block">
          <div className="aspect-[16/9] w-full overflow-hidden">
            <Image
              src={post.featured_image_url || '/images/blog-placeholder.jpg'}
              alt={post.title}
              width={600}
              height={340}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </Link>
      </div>
      <CardHeader className="px-0 pt-4">
        <div className="flex items-center gap-2">
          {primaryTag && (
            <Badge className={`${getCategoryColor(primaryTag.name)} font-medium`}>
              {primaryTag.name}
            </Badge>
          )}
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{post.read_time_minutes ? `${post.read_time_minutes} min read` : '5 min read'}</span>
          </div>
        </div>
        <CardTitle className="mt-2 line-clamp-2">
          <Link href={`/blog/${post.slug}`} className="hover:text-primary">
            {post.title}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-2 mt-2 text-base">
          {post.excerpt || post.meta_description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto flex items-center justify-between px-0 pt-4">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{post.author?.full_name || 'Admin'}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4" />
          <span>{post.published_at ? formatDate(post.published_at) : formatDate(post.created_at)}</span>
        </div>
      </CardFooter>
    </Card>
  )
}

function getCategoryColor(category: string) {
  const lowercaseCategory = category.toLowerCase();

  switch (lowercaseCategory) {
    case 'community':
    case 'mediation':
      return 'bg-blue-100 text-blue-800 hover:bg-blue-200'
    case 'restorative justice':
    case 'justice':
      return 'bg-purple-100 text-purple-800 hover:bg-purple-200'
    case 'communication':
    case 'dialogue':
      return 'bg-green-100 text-green-800 hover:bg-green-200'
    case 'psychology':
    case 'mental health':
      return 'bg-amber-100 text-amber-800 hover:bg-amber-200'
    case 'family':
    case 'relationships':
      return 'bg-pink-100 text-pink-800 hover:bg-pink-200'
    case 'education':
    case 'schools':
    case 'learning':
      return 'bg-cyan-100 text-cyan-800 hover:bg-cyan-200'
    case 'science':
    case 'research':
      return 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200'
  }
}

function getRoleName(role?: string) {
  if (!role) return 'Contributor';

  switch (role) {
    case 'coordinator':
      return 'Coordinator';
    case 'mediator':
      return 'Mediator';
    default:
      return 'Contributor';
  }
} 