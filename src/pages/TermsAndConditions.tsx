import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function TermsAndConditions() {
    return (
        <div className="min-h-screen bg-[#07080A] text-white selection:bg-brand-red selection:text-white">
            <Navbar />

            <div className="pt-32 pb-20 px-4 max-w-4xl mx-auto relative">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>
                <h1 className="text-4xl md:text-6xl font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/50 mb-6">
                    Terms and Conditions
                </h1>
                <p className="text-gray-400 mb-12 text-lg font-light">
                    Last Updated: February 17, 2026
                </p>

                <article className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-a:text-brand-red hover:prose-a:text-brand-orange prose-strong:text-white prose-li:text-gray-300">
                    <section>
                        <h2>1. Introduction and Acceptance</h2>
                        <p>Welcome to Varticas. By accessing or using the Varticas platform and connecting Model Context Protocol (MCP) servers, you agree to be bound by these Terms and Conditions ("Terms"). Please read them carefully before proceeding.</p>

                        <div className="bg-brand-red/10 border border-brand-red/20 rounded-lg p-6 my-6">
                            <p className="m-0 text-brand-red"><strong>Important:</strong> If you do not agree to these Terms, you must not use Varticas or connect any MCP servers to our platform.</p>
                        </div>

                        <p>These Terms constitute a legally binding agreement between you ("User", "you", or "your") and Varticas ("we", "us", or "our"). By clicking "I Accept", creating an account, or using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms.</p>
                    </section>

                    <section>
                        <h2>2. Service Description</h2>
                        <p>Varticas is an AI-powered platform that enables users to:</p>
                        <ul>
                            <li>Connect and integrate Model Context Protocol (MCP) servers</li>
                            <li>Access AI-driven conversational interfaces and tools</li>
                            <li>Manage and orchestrate multiple MCP connections</li>
                            <li>Utilize various AI models and capabilities through our platform</li>
                            <li>Store and manage conversation history and data</li>
                        </ul>

                        <h3>2.1 MCP Integration</h3>
                        <p>The Model Context Protocol (MCP) integration allows you to connect third-party servers and services to enhance your Varticas experience. When you connect an MCP server:</p>
                        <ul>
                            <li>You grant Varticas permission to communicate with the connected MCP server on your behalf</li>
                            <li>Data may be transmitted between Varticas and the MCP server to fulfill your requests</li>
                            <li>You are responsible for ensuring you have the necessary rights and permissions to connect and use the MCP server</li>
                            <li>You acknowledge that third-party MCP servers are not controlled by Varticas</li>
                        </ul>
                    </section>

                    <section>
                        <h2>3. User Responsibilities and Conduct</h2>

                        <h3>3.1 Account Security</h3>
                        <p>You are responsible for:</p>
                        <ul>
                            <li>Maintaining the confidentiality of your account credentials</li>
                            <li>All activities that occur under your account</li>
                            <li>Notifying us immediately of any unauthorized access or security breach</li>
                            <li>Ensuring your account information is accurate and up-to-date</li>
                        </ul>

                        <h3>3.2 Acceptable Use</h3>
                        <p>When using Varticas and connecting MCP servers, you agree NOT to:</p>
                        <ol>
                            <li>Violate any applicable laws, regulations, or third-party rights</li>
                            <li>Upload, transmit, or distribute malicious code, viruses, or harmful content</li>
                            <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
                            <li>Interfere with or disrupt the integrity or performance of our services</li>
                            <li>Use our services for any illegal, harmful, or fraudulent purposes</li>
                            <li>Reverse engineer, decompile, or attempt to extract source code from our platform</li>
                            <li>Scrape, crawl, or use automated means to access our services without permission</li>
                            <li>Impersonate any person or entity, or misrepresent your affiliation</li>
                            <li>Harass, abuse, or harm other users or third parties</li>
                            <li>Use our services to generate, store, or transmit content that is illegal, offensive, or violates intellectual property rights</li>
                        </ol>

                        <div className="bg-brand-red/10 border border-brand-red/20 rounded-lg p-6 my-6">
                            <p className="m-0 text-brand-red"><strong>Warning:</strong> Violation of these acceptable use policies may result in immediate suspension or termination of your account without prior notice.</p>
                        </div>
                    </section>

                    <section>
                        <h2>4. MCP Connection and Third-Party Services</h2>

                        <h3>4.1 Third-Party MCP Servers</h3>
                        <p>When you connect third-party MCP servers to Varticas:</p>
                        <ul>
                            <li><strong>Independent Services:</strong> MCP servers are independent third-party services not owned, controlled, or operated by Varticas</li>
                            <li><strong>Separate Terms:</strong> Third-party MCP servers may have their own terms of service, privacy policies, and usage restrictions that you must comply with</li>
                            <li><strong>No Warranty:</strong> Varticas does not warrant the availability, reliability, accuracy, or quality of third-party MCP servers</li>
                            <li><strong>No Liability:</strong> Varticas is not responsible for any issues, damages, or losses arising from your use of third-party MCP servers</li>
                        </ul>

                        <h3>4.2 Data Transmission</h3>
                        <p>By connecting MCP servers, you acknowledge and consent to:</p>
                        <ul>
                            <li>Data being transmitted between Varticas and the connected MCP server</li>
                            <li>The MCP server potentially accessing, processing, or storing your data according to its own policies</li>
                            <li>Varticas having no control over how third-party MCP servers handle your data</li>
                            <li>The responsibility to review and understand the privacy practices of any MCP server you connect</li>
                        </ul>
                    </section>

                    <section>
                        <h2>5. Privacy and Data Usage</h2>

                        <h3>5.1 Data Collection</h3>
                        <p>Varticas collects and processes various types of data, including:</p>
                        <ul>
                            <li>Account information (email, name, authentication data)</li>
                            <li>Conversation history and chat interactions</li>
                            <li>MCP server connection details and configurations</li>
                            <li>Usage data and analytics</li>
                            <li>Technical information (IP address, browser type, device information)</li>
                        </ul>

                        <h3>5.2 AI Model Training and Data Use</h3>
                        <p>Varticas may use anonymized and aggregated interaction data to improve the overall functionality and quality of the platform.</p>
                        <p>However, any data obtained from Google APIs (such as Gmail messages, Google Calendar events, or other Google Workspace data) is used solely to provide the user-requested functionality within the application.</p>
                        <p>Google user data is NOT used to train, fine-tune, or improve generalized artificial intelligence or machine learning models.</p>
                        <p>All use of Google API data complies with the Google API Services User Data Policy, including the Limited Use requirements.</p>

                        <h3>5.3 Google API Compliance</h3>
                        <p>Varticas’ use and transfer of information received from Google APIs adheres to the Google API Services User Data Policy.</p>
                    </section>

                    <section>
                        <h2>6. Intellectual Property Rights</h2>
                        <p>All rights, title, and interest in and to Varticas, including all software, technology, designs, trademarks, and content, are owned by Varticas or our licensors.</p>
                        <p>You retain ownership of any content you create, upload, or transmit through Varticas. However, by using our services, you grant Varticas a worldwide, royalty-free, non-exclusive license to use, reproduce, and process your content to provide our services.</p>
                    </section>

                    <section>
                        <h2>7. Disclaimers and Limitations of Liability</h2>

                        <h3>7.1 Service Availability</h3>
                        <p>Varticas is provided on an "AS IS" and "AS AVAILABLE" basis. We do not guarantee uninterrupted or error-free service.</p>

                        <h3>7.2 AI-Generated Content</h3>
                        <div className="bg-brand-red/10 border border-brand-red/20 rounded-lg p-6 my-6">
                            <p className="m-0 text-brand-red"><strong>Disclaimer:</strong> AI-generated responses may contain errors, inaccuracies, or biases. You should verify important information independently and not rely solely on AI-generated content for critical decisions.</p>
                        </div>
                    </section>

                    <section>
                        <h2>8. Termination and Suspension</h2>
                        <p>You may terminate your account at any time. We reserve the right to suspend or terminate your account immediately if you violate these Terms or our acceptable use policies.</p>
                    </section>

                    <section>
                        <h2>9. Governing Law</h2>
                        <p>These Terms shall be governed by and construed in accordance with the laws of California, USA, without regard to its conflict of law provisions.</p>
                    </section>

                    <section>
                        <h2>10. Contact Information</h2>
                        <p>If you have any questions, concerns, or requests regarding these Terms, please contact us:</p>
                        <div className="bg-white/5 border border-white/10 rounded-lg p-6 my-6">
                            <p className="m-0"><strong>Email:</strong> legal@varticas.com</p>
                            <p className="m-0"><strong>Support:</strong> support@varticas.com</p>
                        </div>
                    </section>

                </article>
            </div>
            <Footer />
        </div>
    );
}
