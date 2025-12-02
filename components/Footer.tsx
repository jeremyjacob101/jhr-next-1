import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 bg-black text-white">
      <div className="max-w-5xl mx-auto px-5 py-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between text-sm">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] uppercase">
            Jerusalem Heritage Realty
          </p>
          <p className="mt-2 text-xs text-gray-400">
            © {year} Jerusalem Heritage Realty. All rights reserved.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link href="/" className="hover:underline">
            Properties
          </Link>
          <Link href="/brokers" className="hover:underline">
            Brokers
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </div>

        <div className="text-xs text-gray-400">
          <p>Phone: +972-50-000-0000</p>
          <p>Email: info@jerusalemheritagerealty.com</p>
        </div>
      </div>
    </footer>
  );
}
