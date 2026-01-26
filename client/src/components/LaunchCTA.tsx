export default function LaunchCTA() {
  return (
    <section className="py-24 px-6">
      <div
        className="
          relative max-w-6xl mx-auto
          rounded-3xl overflow-hidden
          bg-gradient-to-br from-[#0b0f14] via-[#111827] to-[#020617]
          shadow-2xl
        "
      >
        {/* Subtle grid overlay */}
        <div
          className="
            absolute inset-0
            bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)]
            bg-[size:48px_48px]
            opacity-100
          "
        />

        {/* Glow accent */}
        <div
          className="
            absolute bottom-[-120px] right-[-120px]
            h-[420px] w-[420px]
            rounded-full
            bg-emerald-400/20
            blur-[140px]
          "
        />

        {/* Content */}
        <div className="relative z-10 px-10 py-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Launch faster. Get paid everywhere.
          </h2>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/80 mb-10">
            Accept wallets, and crypto—while we handle billing, payouts, and compliance.
            <span className="text-white font-bold"> WrapPayments </span>
            brings payments, billing, and payouts together—so you can focus on building what matters.
          </p>

          <div className="flex justify-center">
            <button
              className="
                px-10 py-4
                rounded-xl
                bg-[rgb(88,196,186)]
                text-[#003f3f]
                font-semibold text-lg
                shadow-[0_0_30px_rgba(88,196,186,0.45)]
                hover:bg-[rgb(110,215,205)]
                hover:shadow-[0_0_40px_rgba(110,215,205,0.6)]
                transition-all duration-300
              "
            >
              Start with WrapPayments
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
