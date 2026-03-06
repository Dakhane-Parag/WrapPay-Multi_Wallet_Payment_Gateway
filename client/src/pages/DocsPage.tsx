import { useState } from "react";
import {
  CreditCard,
  Wallet,
  Code2,
  Server,
  ArrowRight,
  Menu,
  BookOpen,
  Layers,
  Shield,
  Cpu,
  Globe,
  Webhook,
  FileCode2,
  Terminal,
  Database,
  Link2,
  Key,
  BarChart3,
  RefreshCcw,
  Users,
  Zap,
} from "lucide-react";
import DocsNavbar from "@/components/DocsNavbar";
import DocsSidebar from "@/components/DocsSidebar";
import type { SidebarSection } from "@/components/DocsSidebar";

/* Wallet logo imports */
import metamaskLogo from "@/assets/Logos/metamask.png";
import phantomLogo from "@/assets/Logos/phantom.png";
import coinbaseLogo from "@/assets/Logos/coinbase.png";
import backpackLogo from "@/assets/Logos/backpack.png";

/* ------------------------------------------------------------------ */
/*  DATA: Sidebar sections per tab                                    */
/* ------------------------------------------------------------------ */

const sidebarData: Record<string, SidebarSection[]> = {
  "Get started": [
    {
      title: "",
      items: [
        { label: "Overview" },
        { label: "See all products" },
      ],
    },
    {
      title: "START BUILDING",
      items: [
        { label: "About the APIs" },
        {
          label: "Start Building",
          children: [
            { label: "Create an account" },
            { label: "Quickstarts" },
            { label: "Start developing" },
            { label: "Build with an SDK" },
          ],
        },
        {
          label: "Use WrapPay without code",
          children: [
            { label: "No-code setup" },
            { label: "Plugins & integrations" },
          ],
        },
        { label: "Migrate to WrapPay" },
      ],
    },
    {
      title: "COMMON USE CASES",
      items: [
        { label: "Accept crypto payments" },
        { label: "Multi-wallet checkout" },
        { label: "Subscription billing" },
        { label: "Accept payments in person" },
        { label: "Send invoices" },
      ],
    },
  ],
  Payments: [
    {
      title: "PAYMENTS",
      items: [
        { label: "Overview" },
        { label: "Online payments" },
        { label: "In-person payments" },
        { label: "Cross-chain payments" },
        {
          label: "Payment methods",
          children: [
            { label: "MetaMask" },
            { label: "Phantom" },
            { label: "Coinbase Wallet" },
            { label: "Backpack" },
            { label: "WalletConnect" },
          ],
        },
      ],
    },
    {
      title: "SECURITY",
      items: [
        { label: "Fraud detection" },
        { label: "Risk management" },
        { label: "Identity verification" },
      ],
    },
  ],
  Wallets: [
    {
      title: "WALLET INTEGRATIONS",
      items: [
        { label: "Overview" },
        {
          label: "EVM Wallets",
          children: [
            { label: "MetaMask" },
            { label: "Coinbase Wallet" },
            { label: "Rainbow" },
          ],
        },
        {
          label: "Solana Wallets",
          children: [
            { label: "Phantom" },
            { label: "Backpack" },
            { label: "Solflare" },
          ],
        },
        { label: "WalletConnect" },
        { label: "Custom wallet adapter" },
      ],
    },
  ],
  "SDKs & Tools": [
    {
      title: "DEVELOPER TOOLS",
      items: [
        { label: "Overview" },
        {
          label: "SDKs",
          children: [
            { label: "JavaScript SDK" },
            { label: "React SDK" },
            { label: "Python SDK" },
            { label: "REST API" },
          ],
        },
        { label: "CLI tools" },
        { label: "Webhooks" },
        { label: "Testing & sandbox" },
      ],
    },
  ],
  Infrastructure: [
    {
      title: "INFRASTRUCTURE",
      items: [
        { label: "Overview" },
        { label: "Multi-chain architecture" },
        { label: "Node infrastructure" },
        { label: "Data pipeline" },
        { label: "Uptime & reliability" },
        { label: "Rate limits" },
      ],
    },
  ],
  "API Reference": [
    {
      title: "API REFERENCE",
      items: [
        { label: "Overview" },
        { label: "Authentication" },
        {
          label: "Core resources",
          children: [
            { label: "Payments" },
            { label: "Customers" },
            { label: "Wallets" },
            { label: "Transactions" },
            { label: "Webhooks" },
          ],
        },
        { label: "Errors" },
        { label: "Changelog" },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  DATA: Product grid cards per tab                                  */
/* ------------------------------------------------------------------ */

interface ProductCard {
  name: string;
  description: string;
  icon: React.ElementType;
  logoSrc?: string;
}

interface ProductCategory {
  category: string;
  products: ProductCard[];
}

const productGridData: Record<string, ProductCategory[]> = {
  "Get started": [
    {
      category: "Payment Processing",
      products: [
        { name: "Online Payments", description: "Accept crypto payments on your website or app", icon: CreditCard },
        { name: "Cross-chain", description: "Process payments across multiple blockchains", icon: RefreshCcw },
        { name: "Connect", description: "Payments for platforms and marketplaces", icon: Link2 },
      ],
    },
    {
      category: "Wallet Integrations",
      products: [
        { name: "MetaMask", description: "EVM-compatible wallet integration", icon: Wallet, logoSrc: metamaskLogo },
        { name: "Phantom", description: "Solana ecosystem wallet support", icon: Wallet, logoSrc: phantomLogo },
        { name: "Multi-Wallet", description: "Unified adapter for all wallets", icon: Layers },
      ],
    },
    {
      category: "Revenue",
      products: [
        { name: "Billing", description: "Subscriptions and recurring payments", icon: BarChart3 },
        { name: "Invoicing", description: "Generate and send crypto invoices", icon: FileCode2 },
        { name: "Analytics", description: "Revenue and transaction insights", icon: BarChart3 },
      ],
    },
    {
      category: "Developer Tools",
      products: [
        { name: "SDKs", description: "JavaScript, React, and Python SDKs", icon: Code2 },
        { name: "Webhooks", description: "Real-time event notifications", icon: Webhook },
        { name: "CLI", description: "Command-line tools for developers", icon: Terminal },
      ],
    },
    {
      category: "Infrastructure",
      products: [
        { name: "Multi-chain", description: "Smart routing across chains", icon: Globe },
        { name: "Security", description: "Fraud detection and risk management", icon: Shield },
        { name: "Data Pipeline", description: "Transaction data and reporting", icon: Database },
      ],
    },
    {
      category: "Pre-built Components",
      products: [
        { name: "Checkout", description: "Drop-in payment UI components", icon: Cpu },
        { name: "Payment Links", description: "No-code payment collection", icon: Link2 },
        { name: "Elements", description: "Customizable UI building blocks", icon: Layers },
      ],
    },
  ],
  Payments: [
    {
      category: "Accept Payments",
      products: [
        { name: "Online Payments", description: "Accept crypto on your website or app", icon: CreditCard },
        { name: "In-person Payments", description: "Point-of-sale crypto acceptance", icon: Wallet },
        { name: "Cross-chain Payments", description: "Bridge payments across chains", icon: RefreshCcw },
      ],
    },
    {
      category: "Optimize Payments",
      products: [
        { name: "Smart Routing", description: "Optimize gas fees and routes", icon: Zap },
        { name: "Fraud Detection", description: "AI-powered fraud prevention", icon: Shield },
        { name: "Identity", description: "KYC and identity verification", icon: Users },
      ],
    },
  ],
  Wallets: [
    {
      category: "EVM Wallets",
      products: [
        { name: "MetaMask", description: "The most popular Ethereum wallet", icon: Wallet, logoSrc: metamaskLogo },
        { name: "Coinbase Wallet", description: "Self-custody crypto wallet", icon: Wallet, logoSrc: coinbaseLogo },
        { name: "Rainbow", description: "Fun and simple Ethereum wallet", icon: Wallet },
      ],
    },
    {
      category: "Solana Wallets",
      products: [
        { name: "Phantom", description: "Multi-chain crypto wallet", icon: Wallet, logoSrc: phantomLogo },
        { name: "Backpack", description: "xNFT-enabled wallet for Solana", icon: Wallet, logoSrc: backpackLogo },
        { name: "Solflare", description: "Secure Solana wallet", icon: Wallet },
      ],
    },
    {
      category: "Universal",
      products: [
        { name: "WalletConnect", description: "Protocol for connecting wallets", icon: Link2 },
        { name: "Custom Adapter", description: "Build your own wallet adapter", icon: Code2 },
        { name: "Multi-Wallet UI", description: "Pre-built wallet selector", icon: Layers },
      ],
    },
  ],
  "SDKs & Tools": [
    {
      category: "Client SDKs",
      products: [
        { name: "JavaScript SDK", description: "For web applications", icon: FileCode2 },
        { name: "React SDK", description: "React hooks and components", icon: Code2 },
        { name: "Python SDK", description: "Server-side integration", icon: Terminal },
      ],
    },
    {
      category: "Developer Tooling",
      products: [
        { name: "CLI", description: "Create, test, and deploy from terminal", icon: Terminal },
        { name: "Webhooks", description: "Subscribe to real-time events", icon: Webhook },
        { name: "Sandbox", description: "Test environment for development", icon: Cpu },
      ],
    },
  ],
  Infrastructure: [
    {
      category: "Core Infrastructure",
      products: [
        { name: "Multi-chain Engine", description: "Smart cross-chain routing", icon: Globe },
        { name: "Node Infrastructure", description: "Managed blockchain nodes", icon: Server },
        { name: "Data Pipeline", description: "Real-time transaction data", icon: Database },
      ],
    },
    {
      category: "Reliability",
      products: [
        { name: "Uptime SLAs", description: "99.99% guaranteed availability", icon: Shield },
        { name: "Rate Limits", description: "Enterprise-grade throughput", icon: Zap },
        { name: "Monitoring", description: "Real-time health dashboards", icon: BarChart3 },
      ],
    },
  ],
  "API Reference": [
    {
      category: "Core API",
      products: [
        { name: "Authentication", description: "API keys and OAuth 2.0", icon: Key },
        { name: "Payments API", description: "Create and manage payments", icon: CreditCard },
        { name: "Wallets API", description: "Wallet connection and queries", icon: Wallet },
      ],
    },
    {
      category: "Resources",
      products: [
        { name: "Customers", description: "Manage customer records", icon: Users },
        { name: "Transactions", description: "Transaction history and status", icon: Database },
        { name: "Webhooks API", description: "Event subscription management", icon: Webhook },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  PAGE-LEVEL HEADINGS                                               */
/* ------------------------------------------------------------------ */

const tabHeadings: Record<string, { title: string; subtitle: string }> = {
  "Get started": {
    title: "See all products",
    subtitle: "Browse our guides and examples by product area.",
  },
  Payments: {
    title: "Payments",
    subtitle: "Accept, optimize, and manage crypto payments.",
  },
  Wallets: {
    title: "Wallet Integrations",
    subtitle: "Connect to every major crypto wallet with one SDK.",
  },
  "SDKs & Tools": {
    title: "SDKs & Developer Tools",
    subtitle: "Everything you need to build with WrapPay.",
  },
  Infrastructure: {
    title: "Infrastructure",
    subtitle: "Enterprise-grade blockchain infrastructure.",
  },
  "API Reference": {
    title: "API Reference",
    subtitle: "Complete reference for the WrapPay API.",
  },
};

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

const DocsPage = () => {
  const [activeTab, setActiveTab] = useState("Get started");
  const [activeItem, setActiveItem] = useState("See all products");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const heading = tabHeadings[activeTab];
  const categories = productGridData[activeTab] ?? [];
  const sections = sidebarData[activeTab] ?? [];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <DocsNavbar activeTab={activeTab} onTabChange={(tab) => { setActiveTab(tab); setActiveItem("Overview"); }} />

      <div className="flex flex-1">
        <DocsSidebar
          sections={sections}
          activeItem={activeItem}
          onItemClick={(label) => { setActiveItem(label); setSidebarOpen(false); }}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main content */}
        <main className="flex-1 min-w-0 px-6 md:px-12 lg:px-16 py-10 max-w-[960px]">
          {/* Mobile sidebar toggle */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-800 mb-6 transition-colors"
          >
            <Menu className="w-4 h-4" />
            Navigation
          </button>

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <a href="/" className="hover:text-[#028181] transition-colors">
              Home
            </a>
            <span>/</span>
            <span className="text-gray-600 font-medium">{activeTab}</span>
          </nav>

          {/* Page heading */}
          <div className="mb-12">
            <h1
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {heading.title}
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl">{heading.subtitle}</p>
          </div>

          {/* Product grid sections */}
          <div className="space-y-12">
            {categories.map((cat, catIdx) => (
              <section key={cat.category}>
                {/* Category label */}
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-[13px] font-bold uppercase tracking-[0.06em] text-[#028181]">
                    {cat.category}
                  </h2>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-6">
                  {cat.products.map((product) => {
                    const Icon = product.icon;
                    return (
                      <button
                        key={product.name}
                        className="group text-left flex items-start gap-3.5 p-3 -m-3 rounded-xl hover:bg-[#f0faf9] transition-all duration-200"
                        onClick={() => setActiveItem(product.name)}
                      >
                        <span className="shrink-0 mt-0.5 flex items-center justify-center w-9 h-9 rounded-lg bg-[#e6faf8] text-[#028181] group-hover:bg-[#d0f5f1] transition-colors overflow-hidden">
                          {product.logoSrc ? (
                            <img src={product.logoSrc} alt={product.name} className="w-7 h-7 object-contain" />
                          ) : (
                            <Icon className="w-[18px] h-[18px]" />
                          )}
                        </span>
                        <div className="min-w-0">
                          <span className="text-[14.5px] font-semibold text-[#028181] group-hover:text-[#016060] flex items-center gap-1 transition-colors">
                            {product.name}
                            <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                          </span>
                          <p className="text-[13px] text-gray-500 mt-0.5 leading-snug">
                            {product.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {catIdx < categories.length - 1 && (
                  <div className="mt-8 border-b border-gray-100" />
                )}
              </section>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-[#003f3f] to-[#015e5e] text-white">
            <div className="flex items-start gap-4">
              <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-white/10">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Ready to start building?
                </h3>
                <p className="text-white/70 text-sm mb-4 max-w-lg">
                  Create a free account and start accepting crypto payments in minutes. Our SDKs make integration effortless.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="/signup"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[rgb(88,196,186)] text-[#003f3f] font-semibold text-sm rounded-lg hover:bg-[rgb(110,215,205)] transition-all shadow-lg shadow-black/10"
                  >
                    Create account
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="/docs"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 text-white font-medium text-sm rounded-lg hover:bg-white/20 transition-all border border-white/20"
                  >
                    View quickstart
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DocsPage;
