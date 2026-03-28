import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Mail, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase
            .from("contact_messages")
            .insert([{ name, email, message, source: window.location.pathname }]);

        setLoading(false);

        if (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
        } else {
            toast.success("Message sent! We'll get back to you soon.");
            setName("");
            setEmail("");
            setMessage("");
        }
    };

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
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-lg font-light text-gray-400 mb-2">Name</label>
                                <Input
                                    type="text"
                                    placeholder="Your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="bg-white/5 border-white/10 text-white text-lg font-light placeholder:text-gray-600 focus:border-white/30 h-12"
                                />
                            </div>
                            <div>
                                <label className="block text-lg font-light text-gray-400 mb-2">Email</label>
                                <Input
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="bg-white/5 border-white/10 text-white text-lg font-light placeholder:text-gray-600 focus:border-white/30 h-12"
                                />
                            </div>
                            <div>
                                <label className="block text-lg font-light text-gray-400 mb-2">Message</label>
                                <Textarea
                                    placeholder="How can we help you?"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                    rows={6}
                                    className="bg-white/5 border-white/10 text-white text-lg font-light placeholder:text-gray-600 focus:border-white/30 resize-none"
                                />
                            </div>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-bold font-display text-lg py-6 flex items-center justify-center gap-2"
                            >
                                {loading ? "Sending..." : (
                                    <>
                                        Send Message
                                        <Send className="w-4 h-4" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
