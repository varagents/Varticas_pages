import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertCircle, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  category: string;
  author: string;
  image_url: string | null;
  published: boolean;
  created_at: string;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ─── Card ──────────────────────────────────────────────────────────────────────

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <motion.article
      variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
      className="h-full"
    >
      <Link
        to={`/blog/${post.slug}`}
        className="group flex flex-col bg-white rounded-2xl border border-black/5 shadow-[0_4px_20px_rgb(0,0,0,0.05)] hover:shadow-[0_16px_48px_rgb(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden h-full"
      >
        {/* Cover image — A3 (297:420) */}
        <div className="w-full aspect-[420/297] bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0 overflow-hidden">
          {post.image_url ? (
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-12 h-12 rounded-2xl bg-gray-300/60" />
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 px-5 pt-4 pb-5 gap-2">
          {/* Title */}
          <h2 className="text-[15px] font-semibold font-display text-black leading-snug group-hover:text-gray-700 transition-colors line-clamp-2">
            {post.title}
          </h2>

          {/* Description */}
          <p className="text-[13px] text-gray-400 font-body leading-relaxed line-clamp-1 flex-1">
            {post.description}
          </p>

          {/* Date + arrow */}
          <div className="flex items-center justify-between pt-3 mt-1 border-t border-black/[0.06]">
            <p className="text-[12px] text-gray-400 font-body">
              {formatDate(post.created_at)}
            </p>
            <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 flex-shrink-0" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

// ─── Loading skeleton ──────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="flex flex-col bg-white rounded-2xl border border-black/5 overflow-hidden animate-pulse">
      <div className="w-full aspect-[297/420] bg-gray-200" />
      <div className="px-5 pt-4 pb-5 flex flex-col gap-2">
        <div className="h-5 w-3/4 bg-gray-200 rounded" />
        <div className="h-4 w-full bg-gray-100 rounded" />
        <div className="h-4 w-2/3 bg-gray-100 rounded" />
        <div className="pt-3 mt-1 border-t border-black/[0.06]">
          <div className="h-3 w-24 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setPosts(data ?? []);
      }

      setLoading(false);
    }

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-[#dfdfdf] text-black overflow-x-hidden selection:bg-black selection:text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-16 px-4 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-white/40 blur-[140px] rounded-full pointer-events-none" />
        <motion.div
          className="max-w-3xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tight mb-5 text-black">
            Varticas Blogs
          </h1>
          <p className="text-lg text-gray-600 font-body leading-relaxed max-w-xl mx-auto">
            Insights on AI agents, automation, and MCP integrations.
          </p>
        </motion.div>
      </section>

      {/* Grid */}
      <section className="pb-32 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Loading */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="flex flex-col items-center gap-3 py-24 text-center">
              <AlertCircle className="w-8 h-8 text-red-400" />
              <p className="text-gray-600 font-body">
                Could not load posts. Please try again later.
              </p>
              <span className="text-xs text-gray-400 font-mono">{error}</span>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && posts.length === 0 && (
            <p className="text-center text-gray-400 font-body py-24">
              No posts yet — check back soon.
            </p>
          )}

          {/* Posts */}
          {!loading && !error && posts.length > 0 && (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
