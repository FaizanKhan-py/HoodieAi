export default function Footer() {
  const col1 = ["Shopping Guide", "Log In / Sign Up", "Exchange & Returns", "Shipping & Deliveries", "How To Buy", "Payment"];
  const col2 = ["About Us", "Retail Stores", "Contact Us"];

  return (
    <>
      {/* ── MOBILE (hidden on md+) ── */}
      <footer className="md:hidden bg-black text-white px-6 pt-10 pb-6 flex flex-col gap-8">

        <div className="font-black text-5xl tracking-tighter leading-none"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
          HoodieAI
        </div>

        <div className="flex gap-12">
          <div className="flex flex-col gap-3">
            {col1.map((item) => (
              <a key={item} href="#"
                className="text-white text-[13px] font-normal tracking-wide leading-none active:opacity-50 transition-opacity duration-200">
                {item}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            {col2.map((item) => (
              <a key={item} href="#"
                className="text-white text-[13px] font-normal tracking-wide leading-none active:opacity-50 transition-opacity duration-200">
                {item}
              </a>
            ))}
          </div>
        </div>

        <div className="text-[11px] text-white/60 tracking-wide">
          © Copyrights Reserved by Hoodie AI 2025
        </div>
      </footer>

      {/* ── DESKTOP (hidden on mobile, visible on md+) ── */}
      <footer className="hidden md:flex bg-black text-white px-14 pt-12 pb-7 flex-col justify-between min-h-[220px]">

        <div className="flex justify-between items-start flex-wrap gap-8">
          <div className="font-black text-7xl tracking-tighter leading-none uppercase"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            HoodieAI
          </div>

          <div className="flex gap-16 flex-wrap">
            <div className="flex flex-col gap-3 text-right">
              {col1.map((item) => (
                <a key={item} href="#"
                  className="text-white text-[13px] font-normal tracking-wide leading-none hover:opacity-50 transition-opacity duration-200">
                  {item}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-3 text-right">
              {col2.map((item) => (
                <a key={item} href="#"
                  className="text-white text-[13px] font-normal tracking-wide leading-none hover:opacity-50 transition-opacity duration-200">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="text-right text-[12px] text-white/70 mt-10 tracking-wide">
          © Copyrights Reserved by Hoodie Sys 2025
        </div>
      </footer>
    </>
  );
}
