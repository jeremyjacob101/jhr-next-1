import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-50 bg-linear-to-r from-slate-100 to-slate-200 shadow-md px-6 md:px-8 py-3 flex items-center justify-between">
      <div className="text-[20px] md:text-[22px] font-bold tracking-[0.18em] uppercase text-slate-900">
        <Link href="/" className="no-underline text-slate-900">
          Jerusalem Heritage Realty
        </Link>
      </div>

      <div className="flex gap-6 text-[17px] font-medium">
        <Link
          href="/properties"
          className="text-slate-900 hover:text-slate-700 transition-colors"
        >
          Properties
        </Link>
        <Link
          href="/brokers"
          className="text-slate-900 hover:text-slate-700 transition-colors"
        >
          Brokers
        </Link>
        <Link
          href="/contact"
          className="text-slate-900 hover:text-slate-700 transition-colors"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}
