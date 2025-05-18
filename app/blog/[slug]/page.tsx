import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CalendarDays, Clock, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Card, CardHeader } from '@/components/ui/card'
import { getPostBySlug, getRelatedPosts } from '@/lib/blog'
import { formatDate } from '@/lib/utils'
import DynamicBreadcrumbs from '@/components/blocks/DynamicBreadcrumbs'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found',
    }
  }

  return {
    title: post.title,
    description: post.meta_description || post.excerpt || `Read about ${post.title}`,
    openGraph: {
      title: post.title,
      description: post.meta_description || post.excerpt || `Read about ${post.title}`,
      images: [
        {
          url: post.featured_image_url || '/images/blog-placeholder.jpg',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'article',
      publishedTime: post.published_at,
      authors: [post.author?.full_name || 'MCRC'],
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  // Fetch the post that matches the slug
  const post = await getPostBySlug(params.slug)

  // If no post is found, return 404
  if (!post) {
    notFound()
  }

  // Get the tag IDs for related posts lookup
  const tagIds = post.tags?.map(tag => tag.id) || []

  // Fetch related posts
  const relatedPosts = await getRelatedPosts(post.id, tagIds)

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back to Blog Button */}
      <div className="mb-8">
        <DynamicBreadcrumbs />
      </div>

      {/* Article Header */}
      <div className="mb-8">
        {post.tags && post.tags.length > 0 && (
          <Badge
            className={`${getCategoryColor(post.tags[0].name)} mb-4 inline-flex w-fit`}
          >
            {post.tags[0].name}
          </Badge>
        )}
        <h1 className="mb-6 text-3xl font-bold lg:text-4xl xl:text-5xl">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">{post.author?.full_name || 'Admin'}</p>
              {post.author?.role && (
                <p className="text-xs text-muted-foreground">{getRoleName(post.author.role)}</p>
              )}
            </div>
          </div>
          <Separator orientation="vertical" className="hidden h-6 sm:block" />
          <div className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {post.published_at ? formatDate(post.published_at) : formatDate(post.created_at)}
            </span>
          </div>
          <Separator orientation="vertical" className="hidden h-6 sm:block" />
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {post.read_time_minutes ? `${post.read_time_minutes} min read` : '5 min read'}
            </span>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="mb-10 overflow-hidden rounded-xl">
        <Image
          src={post.featured_image_url || '/images/blog-placeholder.jpg'}
          alt={post.title}
          width={1200}
          height={600}
          className="aspect-[21/9] w-full object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="mx-auto max-w-3xl">
        <div
          className="prose prose-lg max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Author Bio */}
        {post.author && (
          <div className="mt-16 rounded-xl bg-muted p-6">
            <h3 className="mb-2 text-lg font-semibold">About the Author</h3>
            <p className="text-muted-foreground">
              {post.author.full_name} is a {getRoleName(post.author.role).toLowerCase()} at the Mediation and Conflict Resolution Center.
            </p>
          </div>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <Link href={`/blog?tag=${tag.slug}`} key={tag.id}>
                <Badge
                  className={`${getCategoryColor(tag.name)}`}
                >
                  {tag.name}
                </Badge>
              </Link>
            ))}
          </div>
        )}

        {/* Share Links */}
        <div className="mt-10">
          <h4 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Share this article
          </h4>
          <div className="flex gap-4">
            <Button variant="outline" size="icon" aria-label="Share on Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
                <path fill="currentColor" d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5549 21H20.7996L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
              </svg>
            </Button>
            <Button variant="outline" size="icon" aria-label="Share on Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
                <path fill="currentColor" d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z" />
              </svg>
            </Button>
            <Button variant="outline" size="icon" aria-label="Share via Email">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7C3 6.46957 3.21071 5.96086 3.58579 5.58579C3.96086 5.21071 4.46957 5 5 5H19C19.5304 5 20.0391 5.21071 20.4142 5.58579C20.7893 5.96086 21 6.46957 21 7V17C21 17.5304 20.7893 18.0391 20.4142 18.4142C20.0391 18.7893 19.5304 19 19 19H5C4.46957 19 3.96086 18.7893 3.58579 18.4142C3.21071 18.0391 3 17.5304 3 17V7Z" />
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7L12 13L21 7" />
              </svg>
            </Button>
            <Button variant="outline" size="icon" aria-label="Copy Link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 13C10.8184 13.5523 11.8238 13.7748 12.8315 13.6266C13.8392 13.4783 14.7562 12.9695 15.4089 12.2111C16.0616 11.4527 16.3903 10.4981 16.3318 9.52346C16.2734 8.5488 15.8324 7.6405 15.11 7L14 5.89C13.5196 5.40233 12.8891 5.10636 12.2218 5.05968C11.5545 5.01301 10.8921 5.21793 10.3486 5.64C9.80513 6.06207 9.42299 6.67221 9.27301 7.35756C9.12302 8.0429 9.21622 8.75654 9.53 9.38" />
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 11C13.1816 10.4477 12.1762 10.2252 11.1685 10.3734C10.1608 10.5217 9.24384 11.0305 8.59114 11.7889C7.93843 12.5473 7.60971 13.5019 7.66816 14.4765C7.72661 15.4512 8.16762 16.3595 8.89 17L10 18.11C10.4804 18.5977 11.1109 18.8936 11.7782 18.9403C12.4455 18.987 13.1079 18.7821 13.6514 18.36C14.1949 17.9379 14.577 17.3278 14.727 16.6424C14.877 15.9571 14.7838 15.2435 14.47 14.62" />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-20">
          <h2 className="mb-8 text-2xl font-bold">Related Articles</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <Card key={relatedPost.id} className="flex flex-col overflow-hidden border-0 shadow-none">
                <div className="overflow-hidden rounded-xl">
                  <Link href={`/blog/${relatedPost.slug}`}>
                    <Image
                      src={relatedPost.featured_image_url || '/images/blog-placeholder.jpg'}
                      alt={relatedPost.title}
                      width={600}
                      height={340}
                      className="aspect-[16/9] h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </Link>
                </div>
                <CardHeader className="px-0 pt-4">
                  {relatedPost.tags && relatedPost.tags.length > 0 && (
                    <Badge className={`${getCategoryColor(relatedPost.tags[0].name)} w-fit`}>
                      {relatedPost.tags[0].name}
                    </Badge>
                  )}
                  <h3 className="mt-2 text-xl font-bold">
                    <Link href={`/blog/${relatedPost.slug}`} className="hover:text-primary">
                      {relatedPost.title}
                    </Link>
                  </h3>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
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