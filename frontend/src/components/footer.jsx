export default function Footer() {
  return (
    <footer className="bg-black text-white px-6 pt-10 pb-6 flex flex-col gap-8">

      {/* Logo */}
      <div
        className="font-black text-5xl tracking-tighter leading-none"
        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
      >
        HoodieAI
      </div>

      {/* Nav Groups */}
      <div className="flex gap-12">
        {/* Column 1 */}
        <div className="flex flex-col gap-3">
          {["Shopping Guide", "Log In / Sign Up", "Exchange & Returns", "Shipping & Deliveries", "How To Buy", "Payment"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-white text-[13px] font-normal tracking-wide leading-none active:opacity-50 transition-opacity duration-200"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-3">
          {["About Us", "Retail Stores", "Contact Us"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-white text-[13px] font-normal tracking-wide leading-none active:opacity-50 transition-opacity duration-200"
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="text-[11px] text-white/60 tracking-wide">
        © Copyrights Reserved by Hoodie AI 2025
      </div>

    </footer>
  );
}
