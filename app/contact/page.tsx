"use client";

import Image from "next/image";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    form.reset();
    alert("Thanks! We received your message and a broker will reach out.");
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

        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-slate-50 rounded-2xl p-5 shadow-md">
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

          <div className="flex flex-col gap-5 h-full">
            <div className="bg-slate-50 rounded-2xl shadow-md overflow-hidden flex-1">
              <div className="relative w-full h-full min-h-[220px]">
                <Image
                  src="https://cdn.stocksnap.io/img-thumbs/280h/table-chairs_7OPWOSQFXS.jpg"
                  alt="Jerusalem Heritage Realty office"
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 shadow-md text-sm flex-1 flex flex-col overflow-hidden">
              <h2 className="text-[19px] font-semibold mb-2">
                Jerusalem Heritage Realty Office
              </h2>

              <div className="space-y-1 text-slate-700">
                <p>18 King George Street, Jerusalem, Israel</p>
                <p>
                  Phone:{" "}
                  <a
                    className="underline underline-offset-2 hover:no-underline"
                    href="tel:+97225551212"
                  >
                    +972-2-555-1212
                  </a>
                </p>
                <p>
                  Email:{" "}
                  <a
                    className="underline underline-offset-2 hover:no-underline"
                    href="mailto:office@JerusalemHeritageRealty.com"
                  >
                    office@JerusalemHeritageRealty.com
                  </a>
                </p>
              </div>

              <div className="mt-4 flex-1 overflow-hidden rounded-xl border border-slate-200 bg-white">
                <iframe
                  title="Jerusalem Heritage Realty - 18 King George Street, Jerusalem"
                  className="w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=18%20King%20George%20Street%2C%20Jerusalem%2C%20Israel&output=embed"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
