import { Link } from "react-router-dom";
import { ArrowRight, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
      <div
        className="flex items-center gap-2 p-1.5 pl-4 pr-1.5 rounded-full backdrop-blur-xl shadow-2xl max-w-3xl w-full justify-between"
        style={{
          border: '1px solid transparent',
          backgroundImage: `linear-gradient(rgba(26, 27, 30, 0.8), rgba(26, 27, 30, 0.8)), linear-gradient(to right, rgba(255,255,255,0.05), rgba(255,255,255,0.4), rgba(255,255,255,0.05))`,
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box',
        }}
      >

        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Varticas Logo"
            className="w-8 h-8 rounded-lg shrink-0"
          />
          <span className="font-display font-bold text-white text-lg tracking-tight">Varticas</span>
        </Link>

        {/* Links - Hidden on Mobile */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Features
          </a>
          <Link
            to="/pricing"
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Pricing
          </Link>
          <Link
            to="/iota"
            className="px-4 py-1.5 rounded-full text-sm font-bold text-white hover:scale-105 transition-all shadow-[0_0_10px_rgba(216,76,152,0.15)]"
            style={{
              border: '1px solid transparent',
              backgroundImage: `linear-gradient(#1A1B1E, #1A1B1E), linear-gradient(90deg, #FF5F57, #D84C98, #6C5CE7)`,
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
            }}
          >
            .iota
          </Link>
        </div>

        {/* CTA / Auth Button */}
        {user ? (
          <div className="flex items-center gap-2">
            <Link
              to="/dashboard"
              className="bg-white/10 hover:bg-white/15 text-white transition-colors px-4 py-2.5 rounded-full text-sm font-medium flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              <span className="hidden md:inline">Dashboard</span>
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
          <Link
            to="/login"
            className="bg-white text-black hover:bg-gray-200 transition-colors px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2"
          >
            Sign In
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </nav>
  );
}
