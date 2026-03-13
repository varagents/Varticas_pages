import { Twitter, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="py-20 px-8 border-t border-gray-300 bg-[#dfdfdf] font-body">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">

          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white p-1 shadow-sm flex items-center justify-center">
                <img src="/vartics.svg" alt="Varticas Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-display font-black text-2xl text-black">Varticas</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs font-medium">
              The missing operating system for your work. Automate anything on the web with AI agents.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-black text-sm uppercase tracking-wider">Product</h4>
            <ul className="space-y-4 text-sm text-gray-600 font-medium">
              <li><a href="/#features" className="hover:text-black transition-colors">Features</a></li>
              <li><Link to="/pricing" className="hover:text-black transition-colors">Pricing</Link></li>
            
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-black text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-4 text-sm text-gray-600 font-medium">
              <li><a href="/#about" className="hover:text-black transition-colors">About</a></li>
              <li><Link to="/blog" className="hover:text-black transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-black transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-black text-sm uppercase tracking-wider">Connect</h4>
            <div className="flex gap-4">
              <a href="https://x.com/varticas59689" className="p-3 bg-white rounded-xl shadow-sm border border-gray-200 text-gray-600 hover:text-black hover:-translate-y-1 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/varticas" className="p-3 bg-white rounded-xl shadow-sm border border-gray-200 text-gray-600 hover:text-black hover:-translate-y-1 transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:soumyajit@varticas.com" className="p-3 bg-white rounded-xl shadow-sm border border-gray-200 text-gray-600 hover:text-black hover:-translate-y-1 transition-all">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-300 text-sm text-gray-500 font-semibold">
          <div>&copy; 2026 Varticas. All rights reserved.</div>
          <div className="flex gap-8 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="hover:text-black transition-colors">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="hover:text-black transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
