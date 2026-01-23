"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

export default function WhatsAppFloatingButton() {
  const [mounted, setMounted] = useState(false);

  // Create a dedicated mount node so we fully escape page/layout stacking contexts
  const el = useMemo(() => {
    if (typeof window === "undefined") return null;
    const node = document.createElement("div");
    node.id = "whatsapp-floating-root";
    return node;
  }, []);

  useEffect(() => {
    if (!el) return;

    // Avoid duplicates during fast refresh
    const existing = document.getElementById("whatsapp-floating-root");
    if (existing) {
      setMounted(true);
      return;
    }

    document.body.appendChild(el);
    setMounted(true);

    return () => {
      el.remove();
    };
  }, [el]);

  if (!mounted) return null;

  const button = (
    <a
      href="https://wa.me/972526166178"
      target="_blank"
      rel="noreferrer"
      aria-label="Contact us on WhatsApp"
      style={{
        position: "fixed",
        right: 20,
        bottom: 20,
        zIndex: 2147483647,
        pointerEvents: "auto",
      }}
      className="flex items-center gap-3 rounded-full bg-green-500 text-white shadow-2xl px-4 py-3 hover:opacity-95 active:scale-[0.98] transition"
    >
      <Image
        src="/icons/whatsapp-symbol-logo-svgrepo-com.svg"
        alt="WhatsApp"
        width={26}
        height={26}
        priority
      />
      <span className="text-sm font-semibold whitespace-nowrap">
        Schedule A Call
      </span>
    </a>
  );

  // If we detected an existing node, portal into it; otherwise into our created el
  const mountNode =
    document.getElementById("whatsapp-floating-root") ?? el ?? document.body;

  return createPortal(button, mountNode);
}
