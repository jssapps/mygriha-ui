"use client";

import { useState } from "react";
import type { BlogCategory } from "@/types/post";
import type { BlogPost } from "@/types/post";
import PostCard from "@/components/PostCard";

export default function BlogFilter({
  posts,
  categories,
}: {
  posts: BlogPost[];
  categories: BlogCategory[];
}) {
  const [filter, setFilter] = useState<BlogCategory | "all">("all");

  const visible = filter === "all" ? posts : posts.filter((p) => p.category === filter);

  return (
    <div>
      <div className="mt-6 flex flex-wrap gap-1 border-b border-sand-100">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`relative px-4 py-2.5 text-sm font-semibold transition-colors ${
            filter === "all" ? "text-sky-700" : "text-sand-900/50 hover:text-sand-900/80"
          }`}
        >
          All Insights
          {filter === "all" && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-sky-700" />}
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setFilter(category)}
            className={`relative px-4 py-2.5 text-sm font-semibold transition-colors ${
              filter === category ? "text-sky-700" : "text-sand-900/50 hover:text-sand-900/80"
            }`}
          >
            {category}
            {filter === category && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-sky-700" />}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="mt-16 text-center text-sm text-sand-900/50">No articles in this category yet.</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
