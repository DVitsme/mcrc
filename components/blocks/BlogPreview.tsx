import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { getAllPublishedPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

async function BlogPreview() {
  const posts = await getAllPublishedPosts();

  return (
    <section className="py-16">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8 md:mb-14 lg:mb-16">
          <div className="flex items-start justify-between gap-8">
            <div>
              <p className="text-wider mb-4 text-sm font-medium text-muted-foreground">
                Latest Articles
              </p>
              <h2 className="mb-4 w-full text-4xl font-medium md:mb-5 md:text-5xl lg:mb-6 lg:text-6xl">
                Blog
              </h2>
            </div>
            <Button asChild className="hidden md:block">
              <Link href="/blog">View all posts</Link>
            </Button>
          </div>
          <p>Stay updated with our latest insights and articles</p>
        </div>
        <div className="grid gap-x-4 gap-y-8 md:grid-cols-3 lg:gap-x-6 lg:gap-y-12">
          {posts.slice(0, 3).map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col">
              <div className="mb-4 flex overflow-clip rounded-xl md:mb-5">
                <div className="transition duration-300 group-hover:scale-105">
                  <Image
                    src={post.featured_image_url || '/images/blog-placeholder.jpg'}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="aspect-[3/2] h-full w-full object-cover object-center"
                  />
                </div>
              </div>

              <div>
                {post.tags && post.tags.length > 0 && (
                  <Badge>{post.tags[0].name}</Badge>
                )}
              </div>
              <div className="mb-2 line-clamp-3 pt-4 text-lg font-medium break-words md:mb-3 md:pt-4 md:text-2xl lg:pt-4 lg:text-3xl">
                {post.title}
              </div>
              <div className="mb-4 line-clamp-2 text-sm text-muted-foreground md:mb-5 md:text-base">
                {post.excerpt || post.meta_description}
              </div>
              <div className="mt-auto text-sm text-muted-foreground">
                {post.published_at ? formatDate(post.published_at) : formatDate(post.created_at)}
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-center py-2 md:hidden">
          <Button asChild className="w-full sm:w-fit">
            <Link href="/blog">View all posts</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export { BlogPreview };
