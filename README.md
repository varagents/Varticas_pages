# Varticas — Marketing & Auth Website

> **"LLM Thinks. Varticas Executes."**  
> An autonomous agent that researches, navigates, and executes — combined with an MCP-powered workflow engine.

---

## 🚀 Overview

**Varticas** is a SaaS marketing and authentication website built with **Vite + React + TypeScript + Tailwind CSS + shadcn/ui**. It serves as the public-facing landing site and auth/onboarding portal for the Varticas AI agent product (a browser extension + desktop app that automates web tasks using LLMs and the Model Context Protocol).

The site is currently in **Beta / Pre-launch** mode — users can sign up, complete onboarding, and secure early-adopter pricing before the full product launch.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Vite](https://vitejs.dev/) + [React 18](https://react.dev/) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 3 + `tailwindcss-animate` |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Routing** | React Router DOM v6 |
| **Auth & Backend** | [Supabase](https://supabase.com/) (Auth + OAuth) |
| **State / Data** | TanStack React Query v5 |
| **Forms** | React Hook Form + Zod validation |
| **Icons** | Lucide React |
| **Deployment** | Vercel (`vercel.json` configured) |

---

## 📁 Project Structure

```
Varticas_pages/
├── public/
│   ├── logo.png
│   └── videos/
│       └── demo.mp4            # Hero section demo video
├── src/
│   ├── main.tsx                # App entry point
│   ├── App.tsx                 # Router setup + providers
│   ├── index.css               # Global styles & Tailwind
│   ├── App.css
│   ├── contexts/
│   │   └── AuthContext.tsx     # Supabase auth state management
│   ├── hooks/                  # Custom React hooks (2 files)
│   ├── lib/
│   │   ├── supabase.ts         # Supabase client
│   │   └── utils.ts            # Utility helpers (cn, etc.)
│   ├── pages/                  # Route-level page components
│   │   ├── Index.tsx           # / — Landing page
│   │   ├── Pricing.tsx         # /pricing — Pricing page
│   │   ├── Iota.tsx            # /iota — .iota product teaser
│   │   ├── Login.tsx           # /login — Auth page
│   │   ├── AuthCallback.tsx    # /auth/callback — OAuth redirect handler
│   │   ├── Onboarding.tsx      # /onboarding — Multi-step user onboarding (protected)
│   │   ├── Dashboard.tsx       # /dashboard — User dashboard (protected)
│   │   ├── Contact.tsx         # /contact — Contact form
│   │   ├── PrivacyPolicy.tsx   # /privacy-policy
│   │   ├── TermsAndConditions.tsx # /terms-and-conditions
│   │   └── NotFound.tsx        # * — 404 page
│   └── components/
│       ├── Navbar.tsx          # Fixed top navigation bar
│       ├── Hero.tsx            # Landing hero with animated background
│       ├── BentoGrid.tsx       # Feature showcase grid (Workflow Automation)
│       ├── Architecture.tsx    # Security / Privacy section
│       ├── WorkflowBuilder.tsx # Visual workflow builder demo
│       ├── SocialProof.tsx     # Use cases + social proof section
│       ├── ComparisonTable.tsx # Feature comparison table
│       ├── Solutions.tsx       # Solutions section
│       ├── Features.tsx        # Features section
│       ├── CTA.tsx             # Call-to-action section
│       ├── Pricing.tsx         # Pricing cards component
│       ├── Footer.tsx          # Site footer
│       ├── TerminalCode.tsx    # Animated terminal / code display
│       ├── NavLink.tsx         # Reusable nav link
│       ├── ProtectedRoute.tsx  # Auth guard HOC
│       ├── HashRedirectHandler.tsx # Hash-based redirect utility
│       └── ui/                 # shadcn/ui component library (50 components)
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── vercel.json
└── package.json
```

---

## 📄 Pages

### Public Pages

| Route | Component | Description |
|---|---|---|
| `/` | `Index.tsx` | Landing page composing all marketing sections |
| `/pricing` | `Pricing.tsx` | Pricing tiers, comparison table, FAQs |
| `/iota` | `Iota.tsx` | Teaser page for **.iota** — Internet of Things Applications framework |
| `/contact` | `Contact.tsx` | Contact form |
| `/privacy-policy` | `PrivacyPolicy.tsx` | Privacy policy document |
| `/terms-and-conditions` | `TermsAndConditions.tsx` | Terms & conditions document |
| `/login` | `Login.tsx` | Sign in / sign up with Google, GitHub, or email/password |
| `/auth/callback` | `AuthCallback.tsx` | OAuth redirect handler (Supabase) |
| `*` | `NotFound.tsx` | 404 not found |

### Protected Pages (requires login)

| Route | Component | Description |
|---|---|---|
| `/onboarding` | `Onboarding.tsx` | Multi-step onboarding wizard collecting user profile info |
| `/dashboard` | `Dashboard.tsx` | User dashboard showing profile, premium status, and product status |

---

## 🧩 Key Components

### Landing Page Sections (`/`)

| Component | Purpose |
|---|---|
| `Navbar` | Fixed pill-style navigation with logo, links (Features, Pricing, .iota), and auth CTA |
| `Hero` | Full-screen hero with animated gradient orbs, glow rods, a demo video player, and CTA buttons (Chrome / Mac download) |
| `BentoGrid` | "Built for production" — Workflow Automation demo with Gmail → Google Sheets → Slack animated pipeline |
| `Architecture` | "Security First" section — Zero Data Retention, End-to-End Encryption (AES-256), No Tracking |
| `WorkflowBuilder` | Visual canvas builder demo with Google Sheets → GPT-4 Agent → Gmail flow nodes |
| `SocialProof` | Use cases (Product Research, Lead Generation, Market Analysis) with real-world scenario cards |
| `ComparisonTable` | Side-by-side feature comparison |
| `CTA` | Final call-to-action |
| `Footer` | Links to Product, Company, Connect (Twitter, GitHub, LinkedIn, Mail), Privacy Policy, Terms |

### Auth & Routing

| Component | Purpose |
|---|---|
| `AuthContext` | Global Supabase auth state — provides `user`, `session`, `metadata`, `signInWithGoogle`, `signInWithGithub`, `signInWithEmail`, `signUpWithEmail`, `signOut`, `updateUserMetadata` |
| `ProtectedRoute` | Wraps protected routes; redirects unauthenticated users to `/login` |
| `HashRedirectHandler` | Handles hash-based redirects for compatibility with OAuth flows |

---

## 🔐 Authentication

Authentication is powered by **Supabase Auth** and supports:

- ✅ Google OAuth
- ✅ GitHub OAuth
- ✅ Email / Password (sign in + sign up)

OAuth flows redirect to `/auth/callback` which is handled by `AuthCallback.tsx`.

**User metadata** stored in Supabase user profile:

```ts
interface UserMetadata {
  full_name?: string;
  company?: string;
  role?: string;
  team_size?: string;
  use_case?: string;
  referral_source?: string;
  goals?: string;
  is_premium?: boolean;
  onboarding_complete?: boolean;
  selected_plan?: string;
}
```

---

## 💳 Pricing

Two tiers available at `/pricing`:

| Plan | Price | Highlights |
|---|---|---|
| **Starter** | $0 / mo | Limited agent tasks, limited workflows, community support, limited MCP integrations |
| **Pro** | $20 / mo | Unlimited agent tasks, 50 workflows, priority support, early access, all MCP integrations |

- 14-day money-back guarantee on paid plans
- Early adopter pricing locked in before public launch
- Plan selection is passed via query param: `/login?plan=pro`

---

## ⚡ .iota — Internet of Things Applications

The `/iota` page is a teaser for **Varticas .iota**, an upcoming open-source framework to leverage connectivity between **Agents and Hardware**. It features a minimalist white design with a gradient headline and a preview date of **28 Feb**.

---

## 🚦 Getting Started

### Prerequisites

- Node.js ≥ 18
- A Supabase project with Auth enabled (Google + GitHub OAuth providers configured)

### Installation

```bash
# Clone the repo
git clone <repo-url>
cd Varticas_pages

# Install dependencies
npm install
# or with bun:
bun install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
VITE_SUPABASE_URL=https://<your-project>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
VITE_CODE_SERVICE_URL=https://codeservice.varticas.com
VITE_PRODUCT_APP_URL=https://product.varticas.com
VITE_CODE_SERVICE_PROXY_TARGET=https://<your-railway-service>.up.railway.app
```

### Development

```bash
npm run dev
```

App runs at `http://localhost:8080`.

In development, API calls to the code service are proxied through Vite at
`/codeservice/*` to avoid browser CORS preflight blocks from localhost.
If your custom domain is down and you see `502 Bad Gateway`, set
`VITE_CODE_SERVICE_PROXY_TARGET` to your Railway direct URL.

### Build

```bash
# Production build
npm run build

# Development build
npm run build:dev

# Preview production build
npm run preview
```

### Lint

```bash
npm run lint
```

---

## 🌐 Deployment

The project is configured for **Vercel** deployment via `vercel.json`. All routes fall back to `index.html` for SPA routing:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as environment variables in your Vercel project settings.

---

## 🎨 Design System

- **Primary color**: `brand-red` (`#FF3B30`) — used for accents, CTAs, selection highlighting
- **Secondary**: `brand-orange` (`#FF9E5E`) — used for gradient rods, secondary accents
- **Background**: Near-black `#07080A`
- **Font**: Display font for headings, system sans for body
- **Animations**: Aurora gradient orbs in hero, shimmer connection lines in workflow builder, `framer-motion` for entry animations

---

## 📦 Key Dependencies

```json
"react": "^18.3.1",
"react-router-dom": "^6.30.1",
"@supabase/supabase-js": "^2.97.0",
"@tanstack/react-query": "^5.83.0",
"framer-motion": "^12.23.26",
"react-hook-form": "^7.61.1",
"zod": "^3.25.76",
"lucide-react": "^0.462.0",
"tailwindcss": "^3.4.17"
```

---

## 📜 Legal

- [Privacy Policy](/privacy-policy)
- [Terms and Conditions](/terms-and-conditions)

© 2024 Varticas AI Inc. All rights reserved.
