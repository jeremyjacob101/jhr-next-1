import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-50 bg-[var(--navy)]/90 backdrop-blur-md border-b border-white/10 shadow-[0_18px_60px_-40px_rgba(0,0,0,0.85)] px-6 md:px-8 py-3 flex items-center justify-between">
      <Link
        href="/"
        className="flex items-center gap-3 no-underline text-[#ac8548]"
      >
        <Image
          src="/jhr-logos/svg/LOGO_%20JHR%20_%20FINAL-04.svg"
          alt="Jerusalem Heritage Realty logo"
          width={90}
          height={90}
          className="h-9 w-auto md:h-13"
          priority
        />
        <span className="text-[20px] md:text-[22px] font-bold tracking-[0.18em] uppercase font-display">
          Jerusalem Heritage Realty
        </span>
      </Link>

      <div className="flex gap-6 text-[17px] font-medium">
        <Link
          href="/properties"
          className="text-[#ac8548] hover:text-[#c79a55] transition-colors"
        >
          Properties
        </Link>
        <Link
          href="/projects"
          className="text-[#ac8548] hover:text-[#c79a55] transition-colors"
        >
          Projects
        </Link>
        <Link
          href="/team"
          className="text-[#ac8548] hover:text-[#c79a55] transition-colors"
        >
          Team
        </Link>
        <Link
          href="/contact"
          className="text-[#ac8548] hover:text-[#c79a55] transition-colors"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}
