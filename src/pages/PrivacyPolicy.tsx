import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Shield, Lock, Eye, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";

/* ─── Reusable styled primitives ─────────────────────────── */

function SectionTitle({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-6 mt-14 first:mt-0">
      <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-brand-red/15 border border-brand-red/30 flex items-center justify-center text-brand-red font-bold text-sm font-display">
        {number}
      </span>
      <h2 className="text-2xl md:text-3xl font-bold font-display text-white m-0 leading-tight">
        {title}
      </h2>
      <div className="flex-1 h-px bg-white/5" />
    </div>
  );
}

function SubTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-base font-bold font-display text-white mt-8 mb-3 flex items-center gap-3">
      <span className="w-3 h-3 rounded-sm bg-brand-red flex-shrink-0 opacity-90" />
      <span className="tracking-wide">{children}</span>
    </h3>
  );
}

function Para({ children }: { children: React.ReactNode }) {
  return <p className="text-gray-400 leading-relaxed mb-4 text-base">{children}</p>;
}

function Ul({ children }: { children: React.ReactNode }) {
  return (
    <ul className="space-y-2 mb-4 text-gray-400 text-base">
      {children}
    </ul>
  );
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 leading-relaxed">
      <span className="mt-2 w-1 h-1 rounded-full bg-brand-red flex-shrink-0" />
      <span>{children}</span>
    </li>
  );
}

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5 my-5 text-gray-300 text-sm leading-relaxed">
      {children}
    </div>
  );
}

function WarnBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-brand-red/8 border border-brand-red/25 rounded-xl p-5 my-5 text-sm leading-relaxed text-gray-300">
      <span className="text-brand-red font-semibold">Important: </span>
      {children}
    </div>
  );
}

function RedCallout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#0F1012] border border-brand-red/20 rounded-xl p-5 my-5 flex gap-3">
      <div className="w-1 rounded-full bg-brand-red flex-shrink-0" />
      <p className="text-sm text-gray-300 leading-relaxed m-0">{children}</p>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────── */

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#07080A] text-white selection:bg-brand-red selection:text-white">
      <Navbar />

      <div className="pt-32 pb-24 px-4 max-w-4xl mx-auto relative">

        {/* Back link */}
        {/* <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-10 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" />
          Back to Home
        </Link> */}

        {/* Badge */}
        {/* <div className="mb-5 inline-flex items-center gap-3 px-5 py-1.5 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red text-sm font-semibold">
          <Shield className="w-3.5 h-3.5" />
          Legal Document
        </div> */}

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/50 mb-4 leading-tight">
          Privacy Policy
        </h1>
        <p className="text-gray-500 text-sm mb-10 border-b border-white/5 pb-8">
          Effective Date: February 17, 2026 &mdash; Last Updated: March 2026
        </p>

        {/* Quick summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
          <div className="flex items-start gap-3 rounded-xl bg-white/5 border border-white/10 p-5 hover:bg-white/8 transition-colors">
            <Lock className="w-5 h-5 text-brand-red mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-white mb-1">No Data Selling</p>
              <p className="text-xs text-gray-500">We never sell your personal data to third parties.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-xl bg-white/5 border border-white/10 p-5 hover:bg-white/8 transition-colors">
            <Eye className="w-5 h-5 text-brand-red mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-white mb-1">Google Data Protected</p>
              <p className="text-xs text-gray-500">Google user data is never used for AI training.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-xl bg-white/5 border border-white/10 p-5 hover:bg-white/8 transition-colors">
            <UserCheck className="w-5 h-5 text-brand-red mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-white mb-1">User Control</p>
              <p className="text-xs text-gray-500">You control your data and can request deletion anytime.</p>
            </div>
          </div>
        </div>

        {/* ── Article body ── */}
        <div className="space-y-2">

          {/* 1. Introduction */}
          <section id="introduction">
            <SectionTitle number="1" title="Introduction" />
            <Para>Welcome to Varticas. We are committed to protecting your privacy and ensuring transparency about how we handle your personal information. This Privacy Policy explains our practices regarding the collection, use, disclosure, and protection of your data when you use our AI-powered platform and Model Context Protocol (MCP) integrations.</Para>
            <InfoBox><strong className="text-white">Our Commitment:</strong> We believe in data minimization, transparency, and giving you control over your information. We will never sell your personal data to third parties.</InfoBox>
            <Para>This Privacy Policy applies to:</Para>
            <Ul>
              <Li>The Varticas web application and desktop application</Li>
              <Li>All services, features, and functionalities provided by Varticas</Li>
              <Li>Data collected through MCP server integrations</Li>
              <Li>Communications between you and Varticas</Li>
            </Ul>
            <Para>By using Varticas, you acknowledge that you have read and understood this Privacy Policy and consent to the practices described herein.</Para>
          </section>

          {/* 2. Information We Collect */}
          <section id="data-collection">
            <SectionTitle number="2" title="Information We Collect" />
            <Para>We collect various types of information to provide, maintain, and improve our services.</Para>

            <SubTitle>2.1 Information You Provide Directly</SubTitle>
            <div className="overflow-x-auto rounded-xl border border-white/10 mb-6">
              <table className="w-full text-left border-collapse text-sm">
                <thead className="bg-white/5">
                  <tr>
                    <th className="border-b border-white/10 p-4 font-semibold text-white">Data Type</th>
                    <th className="border-b border-white/10 p-4 font-semibold text-white">Examples</th>
                    <th className="border-b border-white/10 p-4 font-semibold text-white">Purpose</th>
                  </tr>
                </thead>
                <tbody className="text-gray-400">
                  <tr className="hover:bg-white/3 transition-colors">
                    <td className="border-b border-white/5 p-4"><strong className="text-white">Account Information</strong></td>
                    <td className="border-b border-white/5 p-4">Email address, name, password, profile picture</td>
                    <td className="border-b border-white/5 p-4">Account creation, authentication, personalization</td>
                  </tr>
                  <tr className="hover:bg-white/3 transition-colors">
                    <td className="border-b border-white/5 p-4"><strong className="text-white">Conversation Data</strong></td>
                    <td className="border-b border-white/5 p-4">Chat messages, prompts, AI responses, conversation history</td>
                    <td className="border-b border-white/5 p-4">Service delivery, conversation continuity</td>
                  </tr>
                  <tr className="hover:bg-white/3 transition-colors">
                    <td className="border-b border-white/5 p-4"><strong className="text-white">MCP Configuration</strong></td>
                    <td className="border-b border-white/5 p-4">Server URLs, API keys, connection settings</td>
                    <td className="border-b border-white/5 p-4">MCP server integration, service functionality</td>
                  </tr>
                  <tr className="hover:bg-white/3 transition-colors">
                    <td className="p-4"><strong className="text-white">User Preferences</strong></td>
                    <td className="p-4">Settings, themes, substitutions</td>
                    <td className="p-4">Personalized experience, service optimization</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <SubTitle>2.2 Information Collected Automatically</SubTitle>
            <Ul>
              <Li><strong className="text-white">Usage Data:</strong> Features accessed, actions performed, time spent, interaction patterns</Li>
              <Li><strong className="text-white">Device Information:</strong> Device type, operating system, browser type and version, screen resolution</Li>
              <Li><strong className="text-white">Technical Data:</strong> IP address, user agent, referring URLs, access times, error logs</Li>
              <Li><strong className="text-white">Performance Data:</strong> Response times, load times, crash reports, system performance metrics</Li>
              <Li><strong className="text-white">Location Data:</strong> General geographic location based on IP address (country/city level)</Li>
            </Ul>

            <SubTitle>2.3 Information from Third-Party Sources</SubTitle>
            <Para>We may receive information from:</Para>
            <Ul>
              <Li><strong className="text-white">Authentication Providers:</strong> OAuth providers (Google, GitHub, etc.) for account creation and login</Li>
              <Li><strong className="text-white">MCP Servers:</strong> Data returned by connected third-party MCP servers in response to your requests</Li>
              <Li><strong className="text-white">Analytics Services:</strong> Aggregated usage statistics and insights from analytics tools</Li>
            </Ul>
            <WarnBox>We do not have control over the data collection practices of third-party MCP servers. Please review their privacy policies before connecting them to Varticas.</WarnBox>
          </section>

          {/* 3. How We Use Your Information */}
          <section id="data-usage">
            <SectionTitle number="3" title="How We Use Your Information" />
            <Para>We use the collected information for the following purposes:</Para>

            <SubTitle>3.1 Service Delivery and Functionality</SubTitle>
            <Ul>
              <Li>Provide access to Varticas platform and features</Li>
              <Li>Process and respond to your prompts and requests</Li>
              <Li>Facilitate MCP server connections and communications</Li>
              <Li>Maintain conversation history and context</Li>
              <Li>Authenticate and authorize your access</Li>
              <Li>Enable personalized experiences and preferences</Li>
            </Ul>

            <SubTitle>3.2 Use of Google User Data</SubTitle>
            <Para>Varticas accesses Google user data (such as Gmail messages, Google Calendar events, or other Google Workspace data) only to provide the functionality explicitly requested by the user within the application.</Para>
            <Para>For example, this may include:</Para>
            <Ul>
              <Li>Reading email messages to generate summaries or replies</Li>
              <Li>Sending emails on behalf of the user when the user explicitly instructs the application</Li>
              <Li>Creating or managing calendar events based on user commands</Li>
            </Ul>
            <Para>Google user data is processed solely to perform the user-requested actions and is not used for any unrelated purposes.</Para>
            <Para>Varticas does <strong className="text-white">NOT</strong> use Google user data for:</Para>
            <Ul>
              <Li>Training or improving artificial intelligence or machine learning models</Li>
              <Li>Advertising or marketing purposes</Li>
              <Li>Data brokerage or selling user data</Li>
              <Li>Profiling or analytics unrelated to the requested functionality</Li>
            </Ul>
            <Para>Any Google user data accessed through Google APIs is used only during the execution of the requested feature and is not stored for AI model training.</Para>
            <Para>Varticas does not retain Google user data beyond what is necessary to perform the user-requested action.</Para>

            <SubTitle>3.3 Platform Improvement and Analytics</SubTitle>
            <RedCallout>Analytics and product improvement activities are performed only on general platform usage data and <strong className="text-white">never</strong> on Google user data obtained through Google APIs. Google user data (such as Gmail content or Calendar events) is not used for analytics, research, product improvement, or artificial intelligence training.</RedCallout>
            <Ul>
              <Li>Analyze usage patterns and trends</Li>
              <Li>Monitor and improve platform performance</Li>
              <Li>Conduct research and development</Li>
              <Li>Test new features and functionalities</Li>
            </Ul>
          </section>

          {/* Google API Compliance */}
          <section id="google-compliance">
            <SectionTitle number="✦" title="Google API Services User Data Policy Compliance" />
            <div className="bg-gradient-to-br from-brand-red/10 to-transparent border border-brand-red/20 rounded-2xl p-6">
              <Para>Varticas' use and transfer of information received from Google APIs adheres to the <strong className="text-white">Google API Services User Data Policy</strong>, including the Limited Use requirements.</Para>
              <Para>Google user data is accessed and used only to provide or improve user-facing features that are explicitly requested by the user. Varticas does not use Google user data for advertising, marketing, data brokerage, or training generalized artificial intelligence models.</Para>
            </div>
          </section>

          {/* 4. Data Sharing */}
          <section id="data-sharing">
            <SectionTitle number="4" title="Data Sharing and Disclosure" />
            <Para>We value your trust and do not sell your personal information. However, we may share your data in the following circumstances:</Para>

            <SubTitle>4.1 Service Providers</SubTitle>
            <Para>We may share data with trusted third-party service providers who assist us in operating our platform, such as:</Para>
            <Ul>
              <Li>Cloud hosting providers (e.g., AWS, Google Cloud)</Li>
              <Li>Database and storage providers</Li>
              <Li>Analytics and monitoring services</Li>
              <Li>Customer support tools</Li>
            </Ul>

            <SubTitle>4.2 Legal Requirements</SubTitle>
            <Para>We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).</Para>

            <SubTitle>4.3 Business Transfers</SubTitle>
            <Para>If Varticas is involved in a merger, acquisition, or asset sale, your personal data may be transferred. We will provide notice before your personal data is transferred and becomes subject to a different Privacy Policy.</Para>
          </section>

          {/* 5. Security */}
          <section id="security">
            <SectionTitle number="5" title="Security of Your Data" />
            <Para>We employ industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. These measures include:</Para>
            <Ul>
              <Li>Encryption of data in transit and at rest</Li>
              <Li>Secure authentication mechanisms</Li>
              <Li>Regular security audits and vulnerability assessments</Li>
              <Li>Access controls and least privilege principles</Li>
            </Ul>
            <Para>However, no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.</Para>
          </section>

          {/* 6. Your Data Rights */}
          <section id="rights">
            <SectionTitle number="6" title="Your Data Rights" />
            <Para>Depending on your location, you may have the following rights regarding your personal data:</Para>
            <Ul>
              <Li><strong className="text-white">Access:</strong> You have the right to request copies of your personal data.</Li>
              <Li><strong className="text-white">Rectification:</strong> You have the right to request that we correct any information you believe is inaccurate.</Li>
              <Li><strong className="text-white">Erasure:</strong> You have the right to request that we erase your personal data, under certain conditions.</Li>
              <Li><strong className="text-white">Restrict Processing:</strong> You have the right to request that we restrict the processing of your personal data.</Li>
              <Li><strong className="text-white">Data Portability:</strong> You have the right to request that we transfer the data that we have collected to another organization, or directly to you.</Li>
            </Ul>
            <Para>To exercise these rights, please contact us at <a href="mailto:privacy@varticas.com" className="text-brand-red hover:text-orange-400 transition-colors">privacy@varticas.com</a>.</Para>
          </section>

          {/* 7. Contact Us */}
          <section id="contact">
            <SectionTitle number="7" title="Contact Us" />
            <Para>If you have any questions about this Privacy Policy, please contact us:</Para>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-2 text-sm text-gray-400">
              <p><strong className="text-white">Email: </strong><a href="mailto:privacy@varticas.com" className="text-brand-red hover:text-orange-400 transition-colors">privacy@varticas.com</a></p>
              <p><strong className="text-white">Website: </strong><a href="https://varticas.com/contact" className="text-brand-red hover:text-orange-400 transition-colors">varticas.com/contact</a></p>
            </div>
          </section>

        </div>{/* end article body */}
      </div>
      <Footer />
    </div>
  );
}
