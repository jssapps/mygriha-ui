import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/types/post";

export default function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-lg border border-sand-100 bg-white transition-colors hover:border-sky-700/40"
    >
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-sand-100">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition duration-300 group-hover:scale-[1.02]"
        />
      </div>
      <div className="p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">{post.category}</p>
        <p className="mt-1.5 text-base font-semibold leading-snug text-sand-900">{post.title}</p>
        <p className="mt-2 line-clamp-2 text-sm text-sand-900/60">{post.excerpt}</p>
        <p className="mt-3 text-xs text-sand-900/40">
          {new Date(post.publishedAt).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}{" "}
          · {post.readingTimeMinutes} min read
        </p>
      </div>
    </Link>
  );
}
