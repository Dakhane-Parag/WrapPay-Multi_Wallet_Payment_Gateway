import FloatingLines from "@/components/ui/AnimatedBG";
import { Zap } from "lucide-react";

const Home = () => {
  return (
    <>
    <div className="relative bg-black min-h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full pointer-events-auto"
        style={{ width: "100%", height: "100%" }}
      >
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

      <div className="relative z-10 flex flex-col items-center justify-center text-center pointer-events-none text-white gap-3 px-4 py-24 md:py-32 lg:py-40">
        <div className="flex justify-center mb-6 mt-16 sm:mt-20 md:mt-6">
          <span className="inline-flex items-center gap-2 bg-purple-600/20 border border-purple-500/30 text-purple-300 px-4 py-2 rounded-full backdrop-blur-md shadow-[0_0_15px_rgba(139,92,246,0.4)]">
            <Zap className="w-4 h-4 text-purple-300" />
            <span className="text-sm font-medium">Lightning Fast-Integration</span>
          </span>
        </div>

        <h1
          className="
            w-full
            sm:w-[85%]
            md:w-[75%]
            lg:w-[60%]
            mx-auto text-white
            text-3xl sm:text-4xl md:text-6xl
            font-bold mb-4 leading-tight
          "
        >
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
      </div>
      

   </>   
  );
};

export default Home;
