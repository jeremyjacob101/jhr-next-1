"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

type PopupType = "general" | "efrat";
type SubmitState = "idle" | "submitting" | "success" | "error";

type PopupContent = {
  headline: string;
  body: string;
  cta: string;
  privacy: string;
  success: string;
  options: string[];
  leadSource: string;
  submittedKey: string;
  seenKey: string;
};

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const TIMER_MS = 45 * 1000;

const GENERAL_CONTENT: PopupContent = {
  headline: "Looking for the Right Property in Jerusalem?",
  body: "Get early access to select homes, new developments, and off-market opportunities before they are publicly listed.",
  cta: "Send Me Relevant Opportunities",
  privacy:
    "We'll only send relevant Jerusalem property opportunities. No spam.",
  success: "Thank you. We'll be in touch with relevant opportunities.",
  options: [
    "Home",
    "Investment",
    "Rental",
    "New development",
    "Not sure yet",
  ],
  leadSource: "Website Exit Popup - General",
  submittedKey: "jhr_general_exit_popup_submitted",
  seenKey: "jhr_general_exit_popup_seen",
};

const EFRAT_CONTENT: PopupContent = {
  headline: "Thinking About Buying in Efrat?",
  body: "Get the project brochure, pricing overview, and next steps before the tender stage opens.",
  cta: "Send Me the Efrat Details",
  privacy: "We'll send only relevant project details and updates.",
  success: "Thank you. We'll send you the Efrat details and next steps.",
  options: [
    "Garden apartment",
    "Duplex",
    "Investment",
    "Family home",
    "Not sure yet",
  ],
  leadSource: "Website Exit Popup - Efrat",
  submittedKey: "jhr_efrat_exit_popup_submitted",
  seenKey: "jhr_efrat_exit_popup_seen",
};

function isEfratPath(pathname: string) {
  const value = pathname.toLowerCase();
  return (
    value === "/efrat" ||
    value.startsWith("/efrat/") ||
    value === "/projects/efrat" ||
    value.includes("mordot") ||
    value.includes("zayit")
  );
}

function isContactPath(pathname: string) {
  const value = pathname.toLowerCase();
  return value === "/contact" || value.startsWith("/contact/");
}

function getStoredDate(key: string) {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(key);
  if (!raw) return null;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : null;
}

function hasRecentSeen(key: string) {
  const seenAt = getStoredDate(key);
  return seenAt !== null && Date.now() - seenAt < WEEK_MS;
}

function markSeen(key: string) {
  window.localStorage.setItem(key, String(Date.now()));
}

function markSubmitted(key: string) {
  window.localStorage.setItem(key, "true");
}

function hasSubmitted(key: string) {
  return window.localStorage.getItem(key) === "true";
}

function hasActiveFormFocus() {
  const activeEl = document.activeElement;
  if (!(activeEl instanceof HTMLElement)) return false;
  const formEl = activeEl.closest("form");
  return Boolean(formEl);
}

function isInContactSection() {
  const candidates = [
    "#contact",
    "#contact-section",
    "#contact-form",
    "[data-contact-section='true']",
  ];

  for (const selector of candidates) {
    const node = document.querySelector(selector);
    if (!(node instanceof HTMLElement)) continue;
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return true;
  }

  return false;
}

export default function ExitIntentPopup() {
  const pathname = usePathname() || "/";
  const [isOpen, setIsOpen] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [error, setError] = useState("");

  const popupType: PopupType | null = useMemo(() => {
    if (isContactPath(pathname)) return null;
    return isEfratPath(pathname) ? "efrat" : "general";
  }, [pathname]);

  const content = popupType === "efrat" ? EFRAT_CONTENT : GENERAL_CONTENT;

  useEffect(() => {
    setIsOpen(false);
    setSubmitState("idle");
    setError("");
  }, [pathname]);

  useEffect(() => {
    if (!popupType) return;

    const submittedKey = content.submittedKey;
    const seenKey = content.seenKey;

    if (hasSubmitted(submittedKey) || hasRecentSeen(seenKey)) return;

    const maybeOpen = () => {
      if (hasSubmitted(submittedKey) || hasRecentSeen(seenKey)) return;
      if (hasActiveFormFocus()) return;
      if (isInContactSection()) return;
      setIsOpen(true);
      markSeen(seenKey);
    };

    const timerId = window.setTimeout(maybeOpen, TIMER_MS);

    const onMouseOut = (event: MouseEvent) => {
      const isDesktop = window.matchMedia("(pointer: fine)").matches;
      if (!isDesktop) return;
      if (event.clientY > 8) return;
      const toElement = event.relatedTarget as Node | null;
      if (toElement) return;
      maybeOpen();
    };

    document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.clearTimeout(timerId);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, [content.seenKey, content.submittedKey, popupType]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const interest = String(formData.get("interest") ?? "").trim();

    if (!name || !email) return;

    setSubmitState("submitting");
    setError("");

    try {
      const payload = {
        name,
        email,
        phone,
        interest,
        page: pathname,
        popupType: content.leadSource,
        source: content.leadSource,
        message: `Exit popup lead (${popupType}).`,
        project: popupType === "efrat" ? "efrat" : "",
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          typeof data?.error === "string"
            ? data.error
            : "Something went wrong. Please try again.",
        );
      }

      markSubmitted(content.submittedKey);
      markSeen(content.seenKey);
      setSubmitState("success");

      window.setTimeout(() => {
        setIsOpen(false);
      }, 1200);
    } catch (err) {
      setSubmitState("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  function handleClose() {
    markSeen(content.seenKey);
    setIsOpen(false);
  }

  if (!popupType || !isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-end justify-center bg-[#071b34]/45 p-4 sm:items-center"
      style={{ zIndex: 2147483647 }}
    >
      <div className="w-full max-w-xl rounded-lg border border-[#d9c8a5] bg-[#f9f7f2] p-6 text-[#071b34] shadow-[0_20px_45px_-25px_rgba(7,27,52,0.55)] animate-[fadeIn_220ms_ease-out] sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-2xl font-semibold leading-tight text-[#071b34]">
            {content.headline}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="text-sm text-[#6f7d92] transition hover:text-[#071b34]"
          >
            Not now
          </button>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-[#334155]">{content.body}</p>

        {submitState === "success" ? (
          <p className="mt-6 rounded-md border border-[#d9c8a5] bg-white px-4 py-3 text-sm font-medium text-[#071b34]">
            {content.success}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-3">
            <div>
              <label htmlFor="popup-name" className="mb-1 block text-sm font-medium">
                Name
              </label>
              <input
                id="popup-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className="h-11 w-full rounded-md border border-[#d2d8e0] bg-white px-3 text-sm outline-none transition focus:border-[#b98a42] focus:ring-2 focus:ring-[#d9c8a5]/50"
              />
            </div>

            <div>
              <label htmlFor="popup-email" className="mb-1 block text-sm font-medium">
                Email
              </label>
              <input
                id="popup-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="h-11 w-full rounded-md border border-[#d2d8e0] bg-white px-3 text-sm outline-none transition focus:border-[#b98a42] focus:ring-2 focus:ring-[#d9c8a5]/50"
              />
            </div>

            <div>
              <label htmlFor="popup-phone" className="mb-1 block text-sm font-medium">
                Phone
              </label>
              <input
                id="popup-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                className="h-11 w-full rounded-md border border-[#d2d8e0] bg-white px-3 text-sm outline-none transition focus:border-[#b98a42] focus:ring-2 focus:ring-[#d9c8a5]/50"
              />
            </div>

            <div>
              <label htmlFor="popup-interest" className="mb-1 block text-sm font-medium">
                {popupType === "efrat" ? "Interested in:" : "Looking for:"}
              </label>
              <select
                id="popup-interest"
                name="interest"
                defaultValue=""
                className="h-11 w-full rounded-md border border-[#d2d8e0] bg-white px-3 text-sm outline-none transition focus:border-[#b98a42] focus:ring-2 focus:ring-[#d9c8a5]/50"
              >
                <option value="">Select one</option>
                {content.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {error ? <p className="text-sm font-medium text-red-700">{error}</p> : null}

            <button
              type="submit"
              disabled={submitState === "submitting"}
              className="mt-1 inline-flex h-11 w-full items-center justify-center rounded-md bg-[#071b34] px-4 text-sm font-semibold text-[#f7e7c6] transition hover:bg-[#0d2748] disabled:cursor-not-allowed disabled:opacity-65"
            >
              {submitState === "submitting" ? "Sending..." : content.cta}
            </button>

            <p className="text-xs leading-relaxed text-[#64748b]">{content.privacy}</p>
          </form>
        )}
      </div>
    </div>
  );
}
