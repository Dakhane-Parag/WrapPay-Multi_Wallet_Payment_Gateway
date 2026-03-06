import FloatingLines from "@/components/AnimatedBG";
import { Zap , Check, X} from "lucide-react";
import LogoLoop from "@/components/LogoLoop";
import metamaskLogo from "@/assets/Logos/metamask.png";
import phantomLogo from "@/assets/Logos/phantom.png";
import coinbaseLogo from "@/assets/Logos/coinbase.png";
import backpackLogo from "@/assets/Logos/backpack.png";
import ideaImg from "@/assets/ideaImg.png";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import LaunchCTA from "@/components/LaunchCTA";
import ManagedPayments from "@/components/ManagedPayments";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";

const imageLogos = [
  { src: metamaskLogo, alt: "MetaMask", href: "https://metamask.io" },
  { src: phantomLogo, alt: "Phantom", href: "https://phantom.com" },
  { src: coinbaseLogo, alt: "Coinbase", href: "https://coinbase.com" },
  { src: backpackLogo, alt: "Backpack", href: "https://backpack.app" },
];

const otherPlatforms = [
  "Constant back-and-forth between billing, tax, and compliance tools",
  "Expensive developer hours spent on integrations",
  "Customer and revenue data scattered across dashboards",
  "Hidden fees for every extra feature or user",
  "Multiple logins, subscriptions, and failed syncs",
  "Limited visibility into your global business",
  "No developer-centric infrastructure",
];

const wrapPayments = [
  "One platform for payments, billing, and distribution",
  "Built-in Merchant of Record coverage worldwide",
  "Seamless developer-first APIs and SDKs",
  "Centralized analytics for revenue and customer insights",
  "Transparent, simple pricing",
  "One login, one integration, full control",
  "Friendlier on the pocket as a complete stack",
];


const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const goToAuth = () => {
    setLoading(true);

    // small delay for smooth UX
    setTimeout(() => {
      navigate("/auth", { state: { fromCTA: true } });
    }, 400);
  };
  return (
    <>
      <Navbar></Navbar>
      {/* HERO SECTION */}
      <div className="relative bg-black min-h-screen w-full overflow-hidden">
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
            <span className="
  inline-flex items-center gap-2
  bg-[rgb(54,117,136)]/20
  border border-[rgb(88,196,186)]/30
  text-[rgb(170,235,230)]
  px-4 py-2 rounded-full
  backdrop-blur-sm
  shadow-[0_0_15px_rgba(88,196,186,0.35)]
">
  <Zap className="w-4 h-4 text-[rgb(170,235,230)]" />
  <span className="text-sm font-medium ">
    Lightning Fast Integration
  </span>
</span>

          </div>

          <h1 className="w-full sm:w-[85%] md:w-[75%] lg:w-[60%] mx-auto text-white text-3xl sm:text-4xl md:text-6xl font-bold mb-4 leading-tight">
            One Payment System 
          </h1>

          <p className="text-base sm:text-lg md:text-xl max-w-xl md:max-w-2xl opacity-80 mb-8">
            Accept crypto payments from any wallet on any blockchain with one unified SDK. Fast,
            secure, and developer-friendly.
          </p>

          <div className="mt-3 flex flex-col sm:flex-row gap-4 pointer-events-auto">
            <Link to="/signup">
            <button
              className="px-8 py-3
                 bg-[rgb(88,196,186)]
                 rounded-xl
                hover:bg-[rgb(110,215,205)]
                 text-[#003f3f] font-bold
                shadow-[0_0_20px_rgba(88,196,186,0.4)]
                transition-all duration-300
                hover:shadow-[0_0_25px_rgba(110,215,180)]"
            >
              {loading && (
        <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
      )}
      {loading ? "Loading…" : "Get started"}
            </button>
            </Link>

            <Link to="/docs">
              <button className="px-8 py-3 bg-white/10 border border-white/20 hover:bg-white/20 text-white rounded-xl">
                View Documentation
              </button>
            </Link>
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

      {/* idea section */}
      <section className="w-full bg-white text-black py-24 px-4 flex justify-center">
        <div
          className="
            relative max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 p-12
            rounded-3xl overflow-hidden
            shadow-2xl
            border border-gray-300
            bg-white"
        >
          <div className="relative z-10 flex justify-center md:justify-end order-1 md:order-2">
            <div className="w-full max-w-md rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.12)] bg-white">
              <img
                src={ideaImg}
                alt="Developer illustration"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="relative z-10 space-y-6 order-2 md:order-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-black">
              One Integration,
              <br /> Infinite Wallet Support
            </h2>

            <h3 className="text-lg sm:text-xl text-gray-700 leading-relaxed">
              Connect once — support every major crypto wallet instantly.
            </h3>

            <p className="text-gray-600 leading-relaxed">
              No need to manage dozens of APIs or handle compatibility issues. Our unified SDK
              automatically adapts to new wallets and chains.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Stay focused on your product while your infrastructure stays future-proof.
            </p>
          </div>
        </div>
      </section>

      {/* Usecases section */}
      <ManagedPayments/>
      


    {/* Built different section */}
       <section className="relative py-24 bg-white text-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-sm font-semibold tracking-widest text-blue-600 mb-4">
            BUILT DIFFERENT
          </p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Stop piecing tools together. <br />
            Start growing with one platform.
          </h2>
          <p className="text-gray-600 text-lg">
            Managing payments, billing, and distribution shouldn’t mean juggling
            6–10 different tools. With <span className="font-semibold">WrapPayments</span>,
            everything you need to monetize lives in one place.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Divider */}
          <div className="hidden md:block absolute inset-y-0 left-1/2 w-px bg-gray-200" />

          {/* Other Platforms */}
          <div>
            <h3 className="text-xl font-semibold mb-8 flex items-center gap-3">
              Other Platforms
            </h3>

            <ul className="space-y-6">
              {otherPlatforms.map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="flex-shrink-0 mt-1">
                    <X className="h-5 w-5 text-red-500" />
                  </span>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* WrapPayments */}
          <div>
            <h3 className="text-xl font-semibold mb-8 flex items-center gap-3">
              <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-emerald-500 text-white text-sm">
                ✓
              </span>
              WrapPayments
            </h3>

            <ul className="space-y-6">
              {wrapPayments.map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="flex-shrink-0 mt-1">
                    <Check className="h-5 w-5 text-emerald-500" />
                  </span>
                  <span className="text-gray-800">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>

    <LaunchCTA/>
      <Footer></Footer>
    </>
  );
};

export default Home;
