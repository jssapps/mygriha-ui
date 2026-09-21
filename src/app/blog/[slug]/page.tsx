import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/data/posts";
import { getProjectBySlug } from "@/data/projects";
import JsonLd from "@/components/JsonLd";
import OpenLeadPopupButton from "@/components/OpenLeadPopupButton";
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from "@/lib/jsonld";
import { buttonClasses } from "@/lib/ui";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const path = `/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const path = `/blog/${post.slug}`;
  const relatedProject = post.relatedProjectSlug ? getProjectBySlug(post.relatedProjectSlug) : undefined;

  const articleJsonLd = buildArticleJsonLd(post, path);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Insights", path: "/blog" },
    { name: post.title, path },
  ]);

  return (
    <article>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <div className="relative h-[42vh] min-h-[280px] w-full overflow-hidden bg-sand-100">
        <Image src={post.coverImage} alt={post.title} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-sky-900/80 via-sky-900/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-3xl px-4 pb-8 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand-50/80">
              {post.category}
            </p>
            <h1 className="mt-2 max-w-2xl text-2xl font-bold leading-tight text-white sm:text-4xl">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <p className="text-xs text-sand-900/40">
          {new Date(post.publishedAt).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          · {post.readingTimeMinutes} min read
        </p>

        <div className="mt-6 space-y-5 text-lg leading-relaxed text-sand-900/80">
          {post.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {relatedProject && (
          <div className="mt-10 rounded-lg border border-sand-100 bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-sand-900/50">
              Referenced Project
            </p>
            <p className="mt-1.5 text-lg font-bold text-sand-900">{relatedProject.name}</p>
            <p className="mt-1 text-sm text-sand-900/60">{relatedProject.tagline}</p>
            <Link href={`/projects/${relatedProject.slug}`} className={`mt-4 inline-flex ${buttonClasses("primary")}`}>
              View Full Project Brief
            </Link>
          </div>
        )}

        <div className="mt-10 rounded-lg border border-sand-100 bg-sand-50 p-6 text-center">
          <p className="text-base font-bold text-sand-900">Have a project in mind?</p>
          <p className="mt-1.5 text-sm text-sand-900/60">
            Talk to our advisory team — no obligation, no brokerage.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <OpenLeadPopupButton className={buttonClasses("primary")}>Enquire Now</OpenLeadPopupButton>
            <Link href="/projects" className={buttonClasses("secondary")}>
              Browse Featured Projects
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
