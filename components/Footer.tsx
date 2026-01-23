export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--navy)] text-[#FAF9F6]">
      <div className="max-w-5xl mx-auto px-5 py-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between text-sm text-center md:text-left">
        {/* Always first */}
        <p className="text-sm font-semibold tracking-[0.18em] uppercase">
          Jerusalem Heritage Realty
        </p>

        {/* Contact should be second on mobile, right on desktop */}
        <div className="order-2 md:order-3 text-sm text-gray-400 md:text-right">
          <p>Phone: +972-53-454-5304</p>
          <p>Email: office@jhrisrael.com</p>
        </div>

        {/* Copyright should be last on mobile, left-ish on desktop */}
        <p className="order-3 md:order-2 mt-0 text-sm text-gray-400 md:mt-0 md:flex-1">
          © {year} Jerusalem Heritage Realty. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
