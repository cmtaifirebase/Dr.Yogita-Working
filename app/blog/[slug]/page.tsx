import { notFound } from "next/navigation";
import { getBlogPostBySlug, getAllBlogSlugs } from "@/lib/blog";
import BlogPostHero from "@/components/blog/blog-post-hero";
import BlogPostContent from "@/components/blog/blog-post-content";
import BlogPostAuthor from "@/components/blog/blog-post-author";
import RelatedPosts from "@/components/blog/related-posts";
import FooterSection from "@/components/footer-section";

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Dr. Yogita Physiotherapy Blog`,
    description: post.excerpt,
  };
}

// Pre-generate static paths for blog posts
export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Main blog post page component
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-rose-50/30 pt-20">
      <BlogPostHero post={post} />
      <BlogPostContent post={post} />
      <BlogPostAuthor />
      <RelatedPosts currentSlug={params.slug} />
      <FooterSection />
    </main>
  );
}
