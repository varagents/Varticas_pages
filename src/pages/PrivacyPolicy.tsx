import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
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
          Privacy Policy
        </h1>
        <p className="text-gray-400 mb-12 text-lg font-light">
          Effective Date: February 17, 2026
        </p>
        
        <article className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-a:text-brand-red hover:prose-a:text-brand-orange prose-strong:text-white prose-li:text-gray-300">
            <section id="introduction">
                <h2>1. Introduction</h2>
                <p>Welcome to Varticas. We are committed to protecting your privacy and ensuring transparency about how we handle your personal information. This Privacy Policy explains our practices regarding the collection, use, disclosure, and protection of your data when you use our AI-powered platform and Model Context Protocol (MCP) integrations.</p>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 my-6">
                    <p className="m-0 text-gray-300"><strong>Our Commitment:</strong> We believe in data minimization, transparency, and giving you control over your information. We will never sell your personal data to third parties.</p>
                </div>
                <p>This Privacy Policy applies to:</p>
                <ul>
                    <li>The Varticas web application and desktop application</li>
                    <li>All services, features, and functionalities provided by Varticas</li>
                    <li>Data collected through MCP server integrations</li>
                    <li>Communications between you and Varticas</li>
                </ul>
                <p>By using Varticas, you acknowledge that you have read and understood this Privacy Policy and consent to the practices described herein.</p>
            </section>

            <section id="data-collection">
                <h2>2. Information We Collect</h2>
                <p>We collect various types of information to provide, maintain, and improve our services.</p>

                <h3>2.1 Information You Provide Directly</h3>
                <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr>
                            <th className="border-b border-white/10 p-4">Data Type</th>
                            <th className="border-b border-white/10 p-4">Examples</th>
                            <th className="border-b border-white/10 p-4">Purpose</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border-b border-white/5 p-4"><strong>Account Information</strong></td>
                            <td className="border-b border-white/5 p-4">Email address, name, password, profile picture</td>
                            <td className="border-b border-white/5 p-4">Account creation, authentication, personalization</td>
                        </tr>
                        <tr>
                            <td className="border-b border-white/5 p-4"><strong>Conversation Data</strong></td>
                            <td className="border-b border-white/5 p-4">Chat messages, prompts, AI responses, conversation history</td>
                            <td className="border-b border-white/5 p-4">Service delivery, AI model improvement, conversation continuity</td>
                        </tr>
                         <tr>
                            <td className="border-b border-white/5 p-4"><strong>MCP Configuration</strong></td>
                            <td className="border-b border-white/5 p-4">Server URLs, API keys, connection settings</td>
                            <td className="border-b border-white/5 p-4">MCP server integration, service functionality</td>
                        </tr>
                         <tr>
                            <td className="border-b border-white/5 p-4"><strong>User Preferences</strong></td>
                            <td className="border-b border-white/5 p-4">Settings, themes, substitutions</td>
                            <td className="border-b border-white/5 p-4">Personalized experience, service optimization</td>
                        </tr>
                    </tbody>
                </table>
                </div>

                <h3>2.2 Information Collected Automatically</h3>
                <ul>
                    <li><strong>Usage Data:</strong> Features accessed, actions performed, time spent, interaction patterns</li>
                    <li><strong>Device Information:</strong> Device type, operating system, browser type and version, screen resolution</li>
                    <li><strong>Technical Data:</strong> IP address, user agent, referring URLs, access times, error logs</li>
                    <li><strong>Performance Data:</strong> Response times, load times, crash reports, system performance metrics</li>
                    <li><strong>Location Data:</strong> General geographic location based on IP address (country/city level)</li>
                </ul>

                <h3>2.3 Information from Third-Party Sources</h3>
                <p>We may receive information from:</p>
                <ul>
                    <li><strong>Authentication Providers:</strong> OAuth providers (Google, GitHub, etc.) for account creation and login</li>
                    <li><strong>MCP Servers:</strong> Data returned by connected third-party MCP servers in response to your requests</li>
                    <li><strong>Analytics Services:</strong> Aggregated usage statistics and insights from analytics tools</li>
                </ul>
                <div className="bg-brand-red/10 border border-brand-red/20 rounded-lg p-6 my-6">
                     <p className="m-0 text-brand-red"><strong>Important:</strong> We do not have control over the data collection practices of third-party MCP servers. Please review their privacy policies before connecting them to Varticas.</p>
                </div>
            </section>

            <section id="data-usage">
                <h2>3. How We Use Your Information</h2>
                <p>We use the collected information for the following purposes:</p>
                
                <h3>3.1 Service Delivery and Functionality</h3>
                <ul>
                    <li>Provide access to Varticas platform and features</li>
                    <li>Process and respond to your prompts and requests</li>
                    <li>Facilitate MCP server connections and communications</li>
                    <li>Maintain conversation history and context</li>
                    <li>Authenticate and authorize your access</li>
                    <li>Enable personalized experiences and preferences</li>
                </ul>

                <h3>3.2 AI Model Training and Improvement</h3>
                 <div className="bg-white/5 border border-white/10 rounded-lg p-6 my-6">
                    <p className="m-0 text-gray-300"><strong>Transparency Notice:</strong> Your conversations and interactions may be used to train and improve our AI models. This helps us provide better, more accurate, and more helpful responses.</p>
                </div>
                <p>Specifically, we may use your data to:</p>
                <ul>
                     <li>Train and fine-tune AI language models</li>
                     <li>Improve response quality and accuracy</li>
                     <li>Develop new features and capabilities</li>
                     <li>Identify and fix errors or biases</li>
                </ul>
                <p><strong>Opt-Out:</strong> If you do not want your data used for AI training, please contact us at <a href="mailto:privacy@varticas.com">privacy@varticas.com</a> to opt out.</p>

                <h3>3.3 Platform Improvement and Analytics</h3>
                <ul>
                    <li>Analyze usage patterns and trends</li>
                    <li>Monitor and improve platform performance</li>
                    <li>Conduct research and development</li>
                    <li>Test new features and functionalities</li>
                </ul>
            </section>
            
            <section id="data-sharing">
                <h2>4. Data Sharing and Disclosure</h2>
                <p>We value your trust and do not sell your personal information. However, we may share your data in the following circumstances:</p>

                <h3>4.1 Service Providers</h3>
                <p>We may share data with trusted third-party service providers who assist us in operating our platform, such as:</p>
                <ul>
                    <li>Cloud hosting providers (e.g., AWS, Google Cloud)</li>
                    <li>Database and storage providers</li>
                    <li>Analytics and monitoring services</li>
                    <li>Customer support tools</li>
                </ul>

                <h3>4.2 Legal Requirements</h3>
                <p>We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).</p>

                <h3>4.3 Business Transfers</h3>
                <p>If Varticas is involved in a merger, acquisition, or asset sale, your personal data may be transferred. We will provide notice before your personal data is transferred and becomes subject to a different Privacy Policy.</p>
            </section>

            <section id="security">
                <h2>5. Security of Your Data</h2>
                <p>We employ industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. These measures include:</p>
                <ul>
                    <li>Encryption of data in transit and at rest</li>
                    <li>Secure authentication mechanisms</li>
                    <li>Regular security audits and vulnerability assessments</li>
                    <li>Access controls and least privilege principles</li>
                </ul>
                <p>However, no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.</p>
            </section>

            <section id="rights">
                <h2>6. Your Data Rights</h2>
                <p>Depending on your location, you may have the following rights regarding your personal data:</p>
                <ul>
                    <li><strong>Access:</strong> You have the right to request copies of your personal data.</li>
                    <li><strong>Rectification:</strong> You have the right to request that we correct any information you believe is inaccurate.</li>
                    <li><strong>Erasure:</strong> You have the right to request that we erase your personal data, under certain conditions.</li>
                    <li><strong>Restrict Processing:</strong> You have the right to request that we restrict the processing of your personal data.</li>
                    <li><strong>Data Portability:</strong> You have the right to request that we transfer the data that we have collected to another organization, or directly to you.</li>
                </ul>
                <p>To exercise these rights, please contact us at <a href="mailto:privacy@varticas.com">privacy@varticas.com</a>.</p>
            </section>

             <section id="contact">
                <h2>7. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us:</p>
                <ul>
                    <li>By email: <a href="mailto:privacy@varticas.com">privacy@varticas.com</a></li>
                    <li>By visiting this page on our website: <a href="https://varticas.com/contact">varticas.com/contact</a></li>
                </ul>
            </section>

        </article>
      </div>
      <Footer />
    </div>
  );
}
