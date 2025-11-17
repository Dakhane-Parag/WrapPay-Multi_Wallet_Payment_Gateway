import FloatingLines from "@/components/ui/AnimatedBG";
import { Zap } from "lucide-react";
import LogoLoop from "@/components/LogoLoop";
import metamaskLogo from "@/assets/Logos/metamask.png";
import phantomLogo from "@/assets/Logos/phantom.png";
import coinbaseLogo from "@/assets/Logos/coinbase.png";
import backpackLogo from "@/assets/Logos/backpack.png";

const imageLogos = [
  { src: metamaskLogo, alt: "MetaMask", href: "https://metamask.io" },
  { src: phantomLogo, alt: "Phantom", href: "https://phantom.com" },
  { src: coinbaseLogo, alt: "Coinbase", href: "https://coinbase.com" },
  { src: backpackLogo, alt: "Backpack", href: "https://backpack.app" },
];

const Home = () => {
  return (
    <>
      {/* HERO SECTION */}
      <div className="relative bg-black min-h-screen w-full overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 w-full h-full pointer-events-auto">
          <FloatingLines
            enabledWaves={["top", "middle", "bottom"]}
            lineCount={[3, 4, 5]}
            lineDistance={[10, 8, 6]}
            bendRadius={5.0}
            bendStrength={-0.5}
            interactive={true}
            parallax={true}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center pointer-events-none text-white gap-3 px-4 py-24 md:py-32 lg:py-40">
          <div className="flex justify-center mb-6 mt-16 sm:mt-20 md:mt-6">
            <span className="inline-flex items-center gap-2 bg-purple-600/20 border border-purple-500/30 text-purple-300 px-4 py-2 rounded-full backdrop-blur-md shadow-[0_0_15px_rgba(139,92,246,0.4)]">
              <Zap className="w-4 h-4 text-purple-300" />
              <span className="text-sm font-medium">Lightning Fast-Integration</span>
            </span>
          </div>

          <h1 className="w-full sm:w-[85%] md:w-[75%] lg:w-[60%] mx-auto text-white text-3xl sm:text-4xl md:text-6xl font-bold mb-4 leading-tight">
            One Payment System for Every Crypto Wallet
          </h1>

          <p className="text-base sm:text-lg md:text-xl max-w-xl md:max-w-2xl opacity-80 mb-8">
            Accept crypto payments from any wallet on any blockchain with one unified SDK. Fast,
            secure, and developer-friendly.
          </p>

          <div className="mt-3 flex flex-col sm:flex-row gap-4 pointer-events-auto">
            <button className="px-8 py-3 bg-[#7c59e6] text-white font-semibold rounded-xl shadow-[0_0_15px_rgba(167,139,250,0.5)] transition-all duration-300 hover:bg-[#a995fc] hover:shadow-[0_0_25px_rgba(196,181,253,0.8)]">
              Get Started
            </button>

            <button className="px-8 py-3 bg-white/10 border border-white/20 hover:bg-white/20 text-white rounded-xl">
              View Documentation
            </button>
          </div>
        </div>

        <div className="relative" style={{ height: "220px" }}>
          <p className="absolute top-2 left-0 right-0 text-center text-white text-lg z-20">
            Supported Wallets
          </p>

          <LogoLoop
            logos={imageLogos}
            speed={60}
            direction="left"
            logoHeight={180}
            gap={45}
            hoverSpeed={10}
            scaleOnHover
            ariaLabel="Wallets Supported"
          />
        </div>
      </div>

      <section className="relative z-10 text-black px-6 py-24 md:py-32 bg-white backdrop-blur-xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Why Choose Our Payment SDK?
        </h2>

        <p className="max-w-3xl mx-auto text-center text-lg opacity-80 mb-16">
          Built for scalability and simplicity, our SDK ensures seamless payments across chains and
          wallets with minimal integration time.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
            <h3 className="text-xl font-semibold mb-3">Multi-Wallet Support</h3>
            <p className="opacity-75">
              Accept payments from any wallet including MetaMask, Phantom, Trust Wallet, and more.
            </p>
          </div>

          <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
            <h3 className="text-xl font-semibold mb-3">Cross-Chain Ready</h3>
            <p className="opacity-75">
              Works across Ethereum, Solana, Polygon, BNB Chain, and upcoming L2 ecosystems.
            </p>
          </div>

          <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
            <h3 className="text-xl font-semibold mb-3">Developer Friendly</h3>
            <p className="opacity-75">
              Simple APIs, clean documentation, and fast onboarding for both startups and
              enterprises.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
