export default function Footer() {
  return (
    <footer className="bg-black text-white px-14 pt-12 pb-7 flex flex-col justify-between min-h-[220px]">
      {/* Top Row */}
      <div className="flex justify-between items-start flex-wrap gap-8">
        {/* Logo */}
        <div className="font-black text-7xl tracking-tighter leading-none uppercase"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
          HoodieAI
        </div>

        {/* Nav Groups */}
        <div className="flex gap-16 flex-wrap">
          {/* Column 1 */}
          <div className="flex flex-col gap-3 text-right">
            {["Shopping Guide", "Log In / Sign Up", "Exchange & Returns", "Shipping & Deliveries", "How To Buy", "Payment"].map((item) => (
              <a key={item} href="#"
                className="text-white text-[13px] font-normal tracking-wide leading-none hover:opacity-50 transition-opacity duration-200">
                {item}
              </a>
            ))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-3 text-right">
            {["About Us", "Retail Stores", "Contact Us"].map((item) => (
              <a key={item} href="#"
                className="text-white text-[13px] font-normal tracking-wide leading-none hover:opacity-50 transition-opacity duration-200">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-right text-[12px] text-white/70 mt-10 tracking-wide">
        © Copyrights Reserved by Hoodie Sys 2025
      </div>
    </footer>
  );
}
