import { useState } from "react";
import { ArrowRight } from "lucide-react";

const useCases = [
  {
    title: "Send",
    description:
      "Pay contractors, vendors, and partners globally using fiat or stablecoins — fast and compliant.",
    badge: "EUR €20,000",
  },
  {
    title: "Receive",
    description:
      "Accept payments in crypto or fiat with minimal setup and auto-convert to your preferred currency.",
    badge: "100 USDC → INR",
  },
  {
    title: "Convert",
    description:
      "Move seamlessly between fiat and crypto with built-in on-ramps and off-ramps.",
    badge: "USD → USDC",
  },
  {
    title: "Store",
    description:
      "Securely hold funds in stablecoin-linked wallets with access to global banking rails.",
    badge: "Multi-currency",
  },
];

export default function ManagedPayments() {
  const [activeTab, setActiveTab] = useState<"usecases" | "delivery">("usecases");

  return (
    <section className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-sm font-semibold tracking-widest text-blue-600 mb-4">
            FEATURES
          </p>
          <h2 className="text-4xl font-bold text-[#003f3f] mb-4">
            Managed payments
          </h2>
          <p className="text-lg text-[#4a7f7a]">
            Launch faster with WrapPayments’ compliance-first, developer-friendly
            platform for global money movement.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-16">
          <div className="flex bg-[#d9f2ef] rounded-full p-1">
            <button
              onClick={() => setActiveTab("usecases")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                activeTab === "usecases"
                 ? "bg-[#003f3f] text-[#e6fffb]"
                : "text-[#006d68]"
                }`}

            >
              Use cases
            </button>
            <button
              onClick={() => setActiveTab("delivery")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                activeTab === "delivery"
                 ? "bg-[#003f3f] text-[#e6fffb]"
                : "text-[#006d68]"
                }`}     
            >
              Delivery models
            </button>
          </div>
        </div>

        {/* Cards */}
        {activeTab === "usecases" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((item, index) => (
              <div
                key={index}
                className="
                  bg-white rounded-3xl p-8
                  border border-[#d9f2ef]
                  shadow-[0_20px_50px_rgba(88,196,186,0.15)]
                  hover:shadow-[0_30px_70px_rgba(88,196,186,0.25)]
                  transition
                "
              >
                {/* Mock card */}
                <div className="bg-[#e8f7f5] rounded-xl p-4 mb-6 text-sm font-medium text-[#006d68]">
                  {item.badge}
                </div>

                <h3 className="text-xl font-semibold text-[#003f3f] mb-3">
                  {item.title}
                </h3>

                <p className="text-[#4a7f7a] mb-6 leading-relaxed">
                  {item.description}
                </p>

               <button
  className="
    flex items-center gap-2
    text-[#003f3f] font-medium
    hover:text-[#005f5f]
    hover:gap-3
    transition-all
  "
>
  Learn more
  <ArrowRight className="w-4 h-4" />
</button>

              </div>
            ))}
          </div>
        )}

        {/* Delivery models */}
        {activeTab === "delivery" && (
          <div className="text-center text-[#4a7f7a] text-lg py-20">
            Flexible delivery models designed for startups, platforms, and
            enterprises — powered by WrapPayments.
          </div>
        )}

        {/* CTA */}
        <div className="flex justify-center mt-16">
          <button
  className="
    px-8 py-3 rounded-xl
    bg-[#003f3f]
    text-[#e6fffb] font-semibold
    shadow-[0_0_25px_rgba(0,63,63,0.5)]
    hover:bg-[#005f5f]
    hover:shadow-[0_0_35px_rgba(0,95,95,0.6)]
    transition
  "
>
  Learn more
</button>
        
        </div>
      </div>
    </section>
  );
}
