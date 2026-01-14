export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--navy)] text-[#FAF9F6]">
      <div className="max-w-5xl mx-auto px-5 py-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between text-sm">
        <div>
          <p className="text-sm font-semibold tracking-[0.18em] uppercase">
            Jerusalem Heritage Realty
          </p>
          <p className="mt-2 text-sm text-gray-400">
            © {year} Jerusalem Heritage Realty. All rights reserved.
          </p>
        </div>

        <div className="text-sm text-gray-400">
          <p>Phone: +972-534545304</p>
          <p>Email: office@jhrisrael.com</p>
        </div>
      </div>
    </footer>
  );
}
