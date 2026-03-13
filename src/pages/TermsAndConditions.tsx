import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, FileText, ShieldCheck, AlertTriangle } from "lucide-react";
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
  return <ul className="space-y-2 mb-4 text-gray-400 text-base">{children}</ul>;
}

function Ol({ children }: { children: React.ReactNode }) {
  return (
    <ol className="space-y-2 mb-4 text-gray-400 text-base list-none">
      {children}
    </ol>
  );
}

let _olCounter = 0;

function Li({ children, ordered }: { children: React.ReactNode; ordered?: boolean }) {
  return (
    <li className="flex items-start gap-2 leading-relaxed">
      {ordered
        ? <span className="mt-0.5 w-5 h-5 rounded-full bg-brand-red/15 border border-brand-red/20 flex items-center justify-center text-brand-red text-xs font-bold flex-shrink-0" />
        : <span className="mt-2 w-1 h-1 rounded-full bg-brand-red flex-shrink-0" />
      }
      <span>{children}</span>
    </li>
  );
}

function WarnBox({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="bg-brand-red/8 border border-brand-red/25 rounded-xl p-5 my-5 text-sm leading-relaxed text-gray-300">
      {label && <span className="text-brand-red font-semibold">{label} </span>}
      {children}
    </div>
  );
}

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5 my-5 text-gray-300 text-sm leading-relaxed">
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

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-[#07080A] text-white selection:bg-brand-red selection:text-white">
      <Navbar />

      <div className="pt-32 pb-24 px-4 max-w-4xl mx-auto relative">

        {/* Back link */}
        {/* <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-10 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link> */}

        {/* Badge */}
        {/* <div className="mb-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red text-sm font-semibold">
          <FileText className="w-3.5 h-3.5" />
          Legal Document
        </div> */}

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/50 mb-4 leading-tight">
          Terms &amp; Conditions
        </h1>
        <p className="text-gray-500 text-sm mb-10 border-b border-white/5 pb-8">
          Last Updated: February 17, 2026 &mdash; Effective: March 2026
        </p>

        {/* Quick summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
          <div className="flex items-start gap-3 rounded-xl bg-white/5 border border-white/10 p-5 hover:bg-white/8 transition-colors">
            <ShieldCheck className="w-5 h-5 text-brand-red mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-white mb-1">Google Data Protected</p>
              <p className="text-xs text-gray-500">Google API data is never used for AI training or analytics.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-xl bg-white/5 border border-white/10 p-5 hover:bg-white/8 transition-colors">
            <FileText className="w-5 h-5 text-brand-red mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-white mb-1">MCP Transparency</p>
              <p className="text-xs text-gray-500">Third-party MCP servers are independent services with their own policies.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-xl bg-white/5 border border-white/10 p-5 hover:bg-white/8 transition-colors">
            <AlertTriangle className="w-5 h-5 text-brand-red mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-white mb-1">Limited Use Compliant</p>
              <p className="text-xs text-gray-500">Our use of Google APIs adheres to Google's Limited Use requirements.</p>
            </div>
          </div>
        </div>

        {/* ── Article body ── */}
        <div className="space-y-2">

          {/* 1. Introduction */}
          <section>
            <SectionTitle number="1" title="Introduction and Acceptance" />
            <Para>Welcome to Varticas. By accessing or using the Varticas platform and connecting Model Context Protocol (MCP) servers, you agree to be bound by these Terms and Conditions ("Terms"). Please read them carefully before proceeding.</Para>
            <WarnBox label="Important:">If you do not agree to these Terms, you must not use Varticas or connect any MCP servers to our platform.</WarnBox>
            <Para>These Terms constitute a legally binding agreement between you ("User", "you", or "your") and Varticas ("we", "us", or "our"). By clicking "I Accept", creating an account, or using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms.</Para>
          </section>

          {/* 2. Service Description */}
          <section>
            <SectionTitle number="2" title="Service Description" />
            <Para>Varticas is an AI-powered platform that enables users to:</Para>
            <Ul>
              <Li>Connect and integrate Model Context Protocol (MCP) servers</Li>
              <Li>Access AI-driven conversational interfaces and tools</Li>
              <Li>Manage and orchestrate multiple MCP connections</Li>
              <Li>Utilize various AI models and capabilities through our platform</Li>
              <Li>Store and manage conversation history and data</Li>
            </Ul>

            <SubTitle>2.1 MCP Integration</SubTitle>
            <Para>The Model Context Protocol (MCP) integration allows you to connect third-party servers and services to enhance your Varticas experience. When you connect an MCP server:</Para>
            <Ul>
              <Li>You grant Varticas permission to communicate with the connected MCP server on your behalf</Li>
              <Li>Data may be transmitted between Varticas and the MCP server to fulfill your requests</Li>
              <Li>You are responsible for ensuring you have the necessary rights and permissions to connect and use the MCP server</Li>
              <Li>You acknowledge that third-party MCP servers are not controlled by Varticas</Li>
            </Ul>
          </section>

          {/* 3. User Responsibilities */}
          <section>
            <SectionTitle number="3" title="User Responsibilities and Conduct" />

            <SubTitle>3.1 Account Security</SubTitle>
            <Para>You are responsible for:</Para>
            <Ul>
              <Li>Maintaining the confidentiality of your account credentials</Li>
              <Li>All activities that occur under your account</Li>
              <Li>Notifying us immediately of any unauthorized access or security breach</Li>
              <Li>Ensuring your account information is accurate and up-to-date</Li>
            </Ul>

            <SubTitle>3.2 Acceptable Use</SubTitle>
            <Para>When using Varticas and connecting MCP servers, you agree NOT to:</Para>
            <Ul>
              <Li>Violate any applicable laws, regulations, or third-party rights</Li>
              <Li>Upload, transmit, or distribute malicious code, viruses, or harmful content</Li>
              <Li>Attempt to gain unauthorized access to our systems or other users' accounts</Li>
              <Li>Interfere with or disrupt the integrity or performance of our services</Li>
              <Li>Use our services for any illegal, harmful, or fraudulent purposes</Li>
              <Li>Reverse engineer, decompile, or attempt to extract source code from our platform</Li>
              <Li>Scrape, crawl, or use automated means to access our services without permission</Li>
              <Li>Impersonate any person or entity, or misrepresent your affiliation</Li>
              <Li>Harass, abuse, or harm other users or third parties</Li>
              <Li>Use our services to generate, store, or transmit content that is illegal, offensive, or violates intellectual property rights</Li>
            </Ul>
            <WarnBox label="Warning:">Violation of these acceptable use policies may result in immediate suspension or termination of your account without prior notice.</WarnBox>
          </section>

          {/* 4. MCP Connection */}
          <section>
            <SectionTitle number="4" title="MCP Connection and Third-Party Services" />

            <SubTitle>4.1 Third-Party MCP Servers</SubTitle>
            <Para>When you connect third-party MCP servers to Varticas:</Para>
            <Ul>
              <Li><strong className="text-white">Independent Services:</strong> MCP servers are independent third-party services not owned, controlled, or operated by Varticas</Li>
              <Li><strong className="text-white">Separate Terms:</strong> Third-party MCP servers may have their own terms of service, privacy policies, and usage restrictions that you must comply with</Li>
              <Li><strong className="text-white">No Warranty:</strong> Varticas does not warrant the availability, reliability, accuracy, or quality of third-party MCP servers</Li>
              <Li><strong className="text-white">No Liability:</strong> Varticas is not responsible for any issues, damages, or losses arising from your use of third-party MCP servers</Li>
            </Ul>

            <SubTitle>4.2 Data Transmission</SubTitle>
            <Para>By connecting MCP servers, you acknowledge and consent to:</Para>
            <Ul>
              <Li>Data being transmitted between Varticas and the connected MCP server</Li>
              <Li>The MCP server potentially accessing, processing, or storing your data according to its own policies</Li>
              <Li>Varticas having no control over how third-party MCP servers handle your data</Li>
              <Li>The responsibility to review and understand the privacy practices of any MCP server you connect</Li>
            </Ul>
          </section>

          {/* 5. Privacy and Data Usage */}
          <section>
            <SectionTitle number="5" title="Privacy and Data Usage" />

            <SubTitle>5.1 Data Collection</SubTitle>
            <Para>Varticas collects and processes various types of data, including:</Para>
            <Ul>
              <Li>Account information (email, name, authentication data)</Li>
              <Li>Conversation history and chat interactions</Li>
              <Li>MCP server connection details and configurations</Li>
              <Li>Usage data and analytics</Li>
              <Li>Technical information (IP address, browser type, device information)</Li>
            </Ul>

            <SubTitle>5.2 AI Model Training and Data Use</SubTitle>
            <Para>Varticas may use anonymized and aggregated interaction data to improve the overall functionality and quality of the platform.</Para>
            <RedCallout>
              This aggregated or anonymized data does <strong className="text-white">not</strong> include any data obtained through Google APIs, such as Gmail message content, Google Calendar events, or other Google Workspace data. Data obtained from Google APIs is excluded from analytics, research, and product improvement activities.
            </RedCallout>
            <Para>However, any data obtained from Google APIs (such as Gmail messages, Google Calendar events, or other Google Workspace data) is used solely to provide the user-requested functionality within the application.</Para>
            <Para>Google user data is <strong className="text-white">NOT</strong> used to train, fine-tune, or improve generalized artificial intelligence or machine learning models.</Para>
            <Para>All use of Google API data complies with the Google API Services User Data Policy, including the Limited Use requirements.</Para>

            <SubTitle>5.3 Google API Compliance</SubTitle>
            <div className="bg-gradient-to-br from-brand-red/10 to-transparent border border-brand-red/20 rounded-2xl p-6 my-5">
              <Para>Varticas' use and transfer of information received from Google APIs adheres to the <strong className="text-white">Google API Services User Data Policy</strong>, including the Limited Use requirements.</Para>
              <Para>Google user data accessed through Google APIs is used only to provide user-facing features that are explicitly requested by the user within the application. Varticas does not use Google user data for advertising, marketing, profiling, or data brokerage purposes. Varticas does not transfer Google user data to third parties except when necessary to provide the requested functionality or comply with legal obligations.</Para>
            </div>
            <WarnBox label="AI Training Restriction:">
              Google Workspace data, including Gmail content and Google Calendar data, is <strong className="text-white">never</strong> used to develop, train, or improve generalized artificial intelligence or machine learning models.
            </WarnBox>
          </section>

          {/* 6. Intellectual Property */}
          <section>
            <SectionTitle number="6" title="Intellectual Property Rights" />
            <Para>All rights, title, and interest in and to Varticas, including all software, technology, designs, trademarks, and content, are owned by Varticas or our licensors.</Para>
            <Para>You retain ownership of any content you create, upload, or transmit through Varticas. However, by using our services, you grant Varticas a worldwide, royalty-free, non-exclusive license to use, reproduce, and process your content to provide our services.</Para>
          </section>

          {/* 7. Disclaimers */}
          <section>
            <SectionTitle number="7" title="Disclaimers and Limitations of Liability" />

            <SubTitle>7.1 Service Availability</SubTitle>
            <Para>Varticas is provided on an "AS IS" and "AS AVAILABLE" basis. We do not guarantee uninterrupted or error-free service.</Para>

            <SubTitle>7.2 AI-Generated Content</SubTitle>
            <WarnBox label="Disclaimer:">AI-generated responses may contain errors, inaccuracies, or biases. You should verify important information independently and not rely solely on AI-generated content for critical decisions.</WarnBox>
          </section>

          {/* 8. Termination */}
          <section>
            <SectionTitle number="8" title="Termination and Suspension" />
            <Para>You may terminate your account at any time. We reserve the right to suspend or terminate your account immediately if you violate these Terms or our acceptable use policies.</Para>
          </section>

          {/* 9. Governing Law */}
          <section>
            <SectionTitle number="9" title="Governing Law" />
            <Para>These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Varticas operates, without regard to conflict of law principles.</Para>
          </section>

          {/* 10. Contact */}
          <section>
            <SectionTitle number="10" title="Contact Information" />
            <Para>If you have any questions, concerns, or requests regarding these Terms, please contact us:</Para>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-2 text-sm text-gray-400">
              <p><strong className="text-white">Legal: </strong><a href="mailto:legal@varticas.com" className="text-brand-red hover:text-orange-400 transition-colors">legal@varticas.com</a></p>
              <p><strong className="text-white">Support: </strong><a href="mailto:support@varticas.com" className="text-brand-red hover:text-orange-400 transition-colors">support@varticas.com</a></p>
            </div>
          </section>

        </div>{/* end article body */}
      </div>
      <Footer />
    </div>
  );
}
