import { Twitter, Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="py-20 px-4 border-t border-white/5 bg-[#07080A]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center">
                <span className="font-display font-bold text-lg text-white">V</span>
              </div>
              <span className="font-display font-bold text-xl text-white">Varticas</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              The missing operating system for your data. Automate anything on the web with AI agents.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-white text-sm">Product</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-brand-red transition-colors">Features</a></li>
              <li><Link to="/pricing" className="hover:text-brand-red transition-colors">Pricing</Link></li>
              <li><a href="#" className="hover:text-brand-red transition-colors">Changelog</a></li>
              <li><a href="#" className="hover:text-brand-red transition-colors">Docs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-white text-sm">Company</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-brand-red transition-colors">About</a></li>
              <li><a href="#" className="hover:text-brand-red transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-brand-red transition-colors">Careers</a></li>
              <li><Link to="/contact" className="hover:text-brand-red transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-white text-sm">Connect</h4>
            <div className="flex gap-4">
              <a href="https://x.com/varticas59689" className="p-2 rounded-lg hover:bg-white/5 transition-colors text-gray-500 hover:text-white">
                <Twitter className="w-5 h-5" />
              </a>
              {/* <a href="https://github.com/varagents" className="p-2 rounded-lg hover:bg-white/5 transition-colors text-gray-500 hover:text-white">
                <Github className="w-5 h-5" />
              </a> */}
              <a href="https://www.linkedin.com/company/varticas" className="p-2 rounded-lg hover:bg-white/5 transition-colors text-gray-500 hover:text-white">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:soumyajit@varticas.com" className="p-2 rounded-lg hover:bg-white/5 transition-colors text-gray-500 hover:text-white">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-sm text-gray-600">
          <div>&copy; 2026 Varticas All rights reserved.</div>
          <div className="flex gap-8 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="hover:text-gray-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
