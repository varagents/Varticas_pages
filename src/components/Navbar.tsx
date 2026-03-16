import { Link } from "react-router-dom";
import { ArrowRight, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { user, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-center pt-8 px-4 w-full transition-all duration-300 ${scrolled ? 'pt-4' : 'pt-8'}`}>
      {/* The black pill navbar with translucent liquid glass effect */}
      <div className={`flex items-center justify-between rounded-full px-3 py-2 max-w-2xl w-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 ${scrolled ? 'bg-black/30 backdrop-blur-2xl border border-white/10' : 'bg-[#1C1C1E]'}`}>

        {/* Logo Left */}
        <Link to="/" className="flex items-center gap-2 pl-4">
          <div className="w-8 h-8 rounded-xl bg-white p-1 flex items-center justify-center">
            <img src="/vartics.svg" alt="Varticas Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-display font-medium text-white text-lg tracking-wide">
            Varticas
          </span>
        </Link>

        {/* Center Links - Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="/#about"
            className="text-sm font-body text-white hover:text-white transition-colors"
          >
            About
          </a>
          <a
            href="/#features"
            className="text-sm font-body text-white hover:text-white transition-colors"
          >
            Features
          </a>
          <Link
            to="/blog"
            className="text-sm font-body text-white hover:text-white transition-colors"
          >
            Blogs
          </Link>
          <Link
            to="/pricing"
            className="text-sm font-body text-white hover:text-white transition-colors"
          >
            Pricing
          </Link>
        </div>

        {/* Auth Right */}
        <div className="hidden md:flex items-center">
          {user ? (
            <div className="flex items-center gap-2 pr-2">
              <Link
                to="/dashboard"
                className="bg-white hover:bg-gray-100 text-black px-6 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 transition-colors"
              >
                Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={signOut}
                className="p-2.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="pr-1">
              <Link
                to="/login"
                className="bg-white hover:bg-gray-100 text-[#1C1C1E] px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
              >
                Sign In
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 pr-4 text-white hover:opacity-70"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-24 left-4 right-4 bg-[#1C1C1E]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl z-50 animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col gap-6">
            <a
              href="/#about"
              onClick={() => setMobileOpen(false)}
              className="text-lg font-body text-white/80 hover:text-white"
            >
              About
            </a>
            <a
              href="/#features"
              onClick={() => setMobileOpen(false)}
              className="text-lg font-body text-white/80 hover:text-white"
            >
              Features
            </a>
            <Link
              to="/blog"
              onClick={() => setMobileOpen(false)}
              className="text-lg font-body text-white/80 hover:text-white"
            >
              Blog
            </Link>
            <Link
              to="/pricing"
              onClick={() => setMobileOpen(false)}
              className="text-lg font-body text-white/80 hover:text-white"
            >
              Pricing
            </Link>
            <hr className="border-white/10" />
            {user ? (
              <Link
                to="/dashboard"
                className="bg-white text-black px-6 py-3 rounded-full text-center font-bold flex justify-center items-center gap-2"
              >
                Dashboard <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-white text-black px-6 py-3 rounded-full text-center font-bold flex justify-center items-center gap-2"
              >
                Sign In <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
