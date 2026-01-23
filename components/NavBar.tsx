"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/properties", label: "Properties" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on click outside
  useEffect(() => {
    if (!open) return;

    const onDown = (e: MouseEvent | TouchEvent) => {
      const panel = panelRef.current;
      const toggle = toggleRef.current;
      const target = e.target as Node;

      // If click is on the toggle button (or inside it), ignore
      if (toggle && toggle.contains(target)) return;

      // If click is inside the dropdown panel, ignore
      if (panel && panel.contains(target)) return;

      setOpen(false);
    };

    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, [open]);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-[var(--navy)]/90 backdrop-blur-md border-b border-white/10 shadow-[0_18px_60px_-40px_rgba(0,0,0,0.85)] px-6 md:px-8 py-3">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 mr-8 no-underline text-[#ac8548]"
        >
          <Image
            src="/jhr-logos/svg/LOGO_%20JHR%20_%20FINAL-04.svg"
            alt="Jerusalem Heritage Realty logo"
            width={90}
            height={90}
            className="h-9 w-auto md:h-13"
            priority
          />
          <span className="text-[20px] md:text-[22px] font-bold tracking-[0.18em] uppercase font-display text-center md:text-left">
            Jerusalem Heritage Realty
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-6 text-[17px] font-medium">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[#ac8548] hover:text-[#c79a55] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          ref={toggleRef}
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[#ac8548] hover:bg-white/10 transition"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {open ? (
              <>
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </>
            ) : (
              <>
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown (smooth) */}
      <div
        ref={panelRef}
        className={`md:hidden overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-out ${
          open
            ? "max-h-80 opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-1"
        }`}
      >
        <div className="mt-3 rounded-2xl border border-white/10 bg-[var(--navy)]/80 backdrop-blur-md shadow-[0_22px_80px_-55px_rgba(0,0,0,0.95)] p-3">
          <div className="flex flex-col">
            {navLinks.map((l, i) => (
              <div key={l.href} className="flex flex-col items-center">
                <Link
                  href={l.href}
                  className="w-full px-3 py-3 rounded-xl text-[16px] font-medium text-[#ac8548] hover:bg-white/5 hover:text-[#c79a55] transition"
                >
                  {l.label}
                </Link>

                {i !== navLinks.length - 1 ? (
                  <div className="h-px w-[90%] bg-gray-400/30" />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
