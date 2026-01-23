"use client";

import Image from "next/image";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";

export default function ContactPage() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      form.reset();
      alert("Thanks! We received your message and a broker will reach out.");
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data?.error ? `Error: ${data.error}` : "Something went wrong.");
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 min-h-0 max-w-5xl mx-auto px-5 pt-10 pb-16 font-sans">
        <h1 className="text-[30px] font-semibold mb-2">Contact Us</h1>

        <p className="text-[15px] text-gray-600 mb-7">
          Interested in one of our Jerusalem properties or looking for something
          specific? Leave your details and a broker will reach out.
        </p>

        <section className="flex justify-center">
          <div className="bg-slate-50 rounded-2xl p-5 shadow-md w-[110%] max-w-3xl">
            <h2 className="text-[19px] font-semibold mb-4">Send an enquiry</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@email.com"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium mb-1"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+1-234-567-8910..."
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="interest"
                  className="block text-sm font-medium mb-1"
                >
                  What are you looking for?
                </label>
                <select
                  id="interest"
                  name="interest"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
                  defaultValue="buy"
                >
                  <option value="buy">Buying</option>
                  <option value="rent">Renting</option>
                  <option value="sell">Selling</option>
                  <option value="invest">Investment</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell us what you need (neighborhood, size, budget, timeframe, etc.)"
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-slate-900 text-[#FAF9F6] text-sm font-medium py-2.5 hover:bg-slate-800 active:bg-slate-950 transition"
              >
                Send message
              </button>

              <p className="text-[12px] text-gray-500">
                By submitting, you agree we may contact you about your enquiry.
              </p>
            </form>
          </div>
        </section>

        {/* WhatsApp CTA */}
        <section className="mt-10 flex justify-center">
          <a
            href="https://wa.me/972526166178"
            target="_blank"
            rel="noreferrer"
            className="w-full max-w-3xl bg-slate-50 rounded-2xl shadow-md border border-slate-100 p-5 flex items-center justify-between gap-4 hover:shadow-lg transition"
          >
            <div className="flex items-center gap-3">
              <Image
                src="/icons/whatsapp-symbol-logo-svgrepo-com.svg"
                alt="WhatsApp"
                width={34}
                height={34}
                className="shrink-0"
              />
              <div>
                <h3 className="text-[17px] font-semibold leading-tight">
                  Contact Us On WhatsApp!
                </h3>
                <p className="text-[13px] text-gray-600">
                  Tap to chat with a broker instantly.
                </p>
              </div>
            </div>

            <span className="text-sm font-medium text-slate-900 underline underline-offset-4 hover:no-underline">
              Open WhatsApp
            </span>
          </a>
        </section>
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
