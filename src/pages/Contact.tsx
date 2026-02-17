import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
    return (
        <div className="min-h-screen bg-[#07080A] text-white selection:bg-brand-red selection:text-white">
            <Navbar />

            <div className="pt-32 pb-20 px-4 max-w-6xl mx-auto relative">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                    {/* Left Column: Contact Info */}
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/50 mb-6">
                            Get in Touch
                        </h1>
                        <p className="text-gray-400 mb-8 text-lg font-light leading-relaxed">
                            Have questions about Varticas? We're here to help. Reach out to us regarding partnerships, support, or general inquiries.
                        </p>

                        <div className="space-y-8 mt-12">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-brand-red/10 rounded-lg border border-brand-red/20">
                                    <Mail className="w-6 h-6 text-brand-red" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold font-display mb-1 text-white">Email Us</h3>
                                    <p className="text-gray-400 mb-2">Our team typically responds within 24 hours.</p>
                                    <a href="mailto:Contact@Varticas.com" className="text-brand-red hover:text-white transition-colors text-lg font-medium">
                                        Contact@Varticas.com
                                    </a>
                                </div>
                            </div>

                            {/* Placeholder for other contact methods if needed later */}
                            {/* 
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display mb-1 text-white">Office</h3>
                  <p className="text-gray-400">
                    123 AI Boulevard<br />
                    San Francisco, CA 94105
                  </p>
                </div>
              </div> 
              */}
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
}
