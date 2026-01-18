// src/components/Footer.tsx

import { FC } from "react";
import { Github, Twitter, Mail } from "lucide-react";
import LogoLoop from "@/components/LogoLoop";

import metamaskLogo from "@/assets/Logos/metamask.png";
import phantomLogo from "@/assets/Logos/phantom.png";
import coinbaseLogo from "@/assets/Logos/coinbase.png";
import backpackLogo from "@/assets/Logos/backpack.png";

interface LogoItem {
  src: string;
  alt: string;
  href: string;
}

const footerLogos: LogoItem[] = [
  { src: metamaskLogo, alt: "MetaMask", href: "https://metamask.io" },
  { src: phantomLogo, alt: "Phantom", href: "https://phantom.com" },
  { src: coinbaseLogo, alt: "Coinbase", href: "https://coinbase.com" },
  { src: backpackLogo, alt: "Backpack", href: "https://backpack.app" },
];

const Footer: FC = () => {
  return (
    <footer className="bg-black text-white border-t border-white/10 relative overflow-hidden">
      {/* Wallet Loop Row */}
      <div className="py-10">
        <p className="text-center text-gray-300 mb-3">Trusted By Popular Wallets</p>
        <LogoLoop
          logos={footerLogos}
          speed={50}
          direction="right"
          logoHeight={90}
          gap={35}
          hoverSpeed={10}
          scaleOnHover={true}
          ariaLabel="Wallets Trusted"
        />
      </div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">

        {/* Brand */}
        <div className="col-span-1 lg:col-span-2">
          <h2 className="text-2xl font-bold mb-3">CryptoPay SDK</h2>
          <p className="text-gray-400 leading-relaxed">
            One unified payment system for every blockchain wallet.
            Fast. Secure. Developer-friendly.
          </p>

          <div className="flex items-center gap-4 mt-5">
            <a className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
              <Github className="w-5 h-5" />
            </a>
            <a className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
              <Twitter className="w-5 h-5" />
            </a>
            <a className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Developers */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Developers</h3>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-white cursor-pointer transition">Documentation</li>
            <li className="hover:text-white cursor-pointer transition">Integration Guide</li>
            <li className="hover:text-white cursor-pointer transition">API Reference</li>
            <li className="hover:text-white cursor-pointer transition">Changelog</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-white cursor-pointer transition">About Us</li>
            <li className="hover:text-white cursor-pointer transition">Careers</li>
            <li className="hover:text-white cursor-pointer transition">Contact</li>
            <li className="hover:text-white cursor-pointer transition">Privacy Policy</li>
          </ul>
        </div>

      </div>

      {/* Bottom */}
      <div className="text-center py-6 text-gray-500 text-sm border-t border-white/5">
        © {new Date().getFullYear()} CryptoPay SDK. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
  