import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import type { BlogPost } from "./Blog";

// ─── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ─── Skeleton ──────────────────────────────────────────────────────────────────

function Skeleton() {
  return (
    <div className="max-w-3xl mx-auto animate-pulse">
      <div className="h-8 w-20 bg-gray-200 rounded-full mb-10" />
      <div className="h-10 w-3/4 bg-gray-200 rounded mb-4" />
      <div className="h-4 w-32 bg-gray-200 rounded mb-4" />
      <div className="h-6 w-full bg-gray-100 rounded mb-2" />
      <div className="h-6 w-4/5 bg-gray-100 rounded mb-10" />
      <div className="w-full h-72 bg-gray-200 rounded-2xl mb-10" />
      <div className="space-y-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`h-4 bg-gray-200 rounded ${i % 3 === 2 ? "w-4/5" : "w-full"}`} />
        ))}
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    async function fetchPost() {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (error) {
        setError(error.code === "PGRST116" ? "Post not found." : error.message);
      } else {
        setPost(data);
      }

      setLoading(false);
    }

    fetchPost();
  }, [slug]);

  return (
    <div className="min-h-screen bg-[#dfdfdf] text-black overflow-x-hidden selection:bg-black selection:text-white">
      <Navbar />

      <main className="pt-36 pb-32 px-4">
        {loading && (
          <section className="pt-4">
            <Skeleton />
          </section>
        )}

        {!loading && error && (
          <div className="flex flex-col items-center gap-3 py-32 text-center">
            <AlertCircle className="w-8 h-8 text-red-400" />
            <p className="text-gray-600 font-body">{error}</p>
            <Link
              to="/blog"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold font-body text-black hover:opacity-70 transition-opacity"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
          </div>
        )}

        {!loading && !error && post && (
          <motion.article
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Back link */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold font-body text-gray-500 hover:text-black transition-colors mb-10"
            >
              <ArrowLeft className="w-4 h-4" /> All posts
            </Link>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-black leading-tight mb-3">
              {post.title}
            </h1>

            {/* Date */}
            <p className="text-sm text-gray-400 font-body mb-4">
              {formatDate(post.created_at)}
            </p>

            {/* Description */}
            {post.description && (
              <p className="text-lg text-gray-500 font-body leading-relaxed mb-10 border-l-2 border-black/10 pl-4">
                {post.description}
              </p>
            )}

            {/* Cover image */}
            {post.image_url && (
              <div className="w-full rounded-2xl overflow-hidden mb-10 shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full max-h-[480px] object-cover"
                />
              </div>
            )}

            {/* Content — rendered as plain text preserving line breaks.
                Future: swap with a Markdown renderer (e.g. react-markdown) */}
            <div className="prose prose-gray max-w-none font-body text-gray-700 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>
          </motion.article>
        )}
      </main>

      <Footer />
    </div>
  );
}
