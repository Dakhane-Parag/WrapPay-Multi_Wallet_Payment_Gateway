import FloatingLines from "@/components/AnimatedBG";
import { Zap } from "lucide-react";
import LogoLoop from "@/components/LogoLoop";
import metamaskLogo from "@/assets/Logos/metamask.png";
import phantomLogo from "@/assets/Logos/phantom.png";
import coinbaseLogo from "@/assets/Logos/coinbase.png";
import backpackLogo from "@/assets/Logos/backpack.png";
import ideaImg from "@/assets/ideaImg.png";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const imageLogos = [
  { src: metamaskLogo, alt: "MetaMask", href: "https://metamask.io" },
  { src: phantomLogo, alt: "Phantom", href: "https://phantom.com" },
  { src: coinbaseLogo, alt: "Coinbase", href: "https://coinbase.com" },
  { src: backpackLogo, alt: "Backpack", href: "https://backpack.app" },
];

const Home = () => {
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
  <span className="text-sm font-medium">
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

      {/* idea section */}
      <section className="w-full bg-white text-black py-24 px-6 flex justify-center">
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
      <Footer></Footer>
    </>
  );
};

export default Home;
