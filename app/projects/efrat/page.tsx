import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { supabaseAdmin } from "@/lib/supabase.server";
import { Broker } from "@/types/broker";

export const metadata = {
  title: "Efrat Project | Jerusalem Heritage Realty",
};

export default async function EfratProjectPage() {
  const SCHEDULE_CALL_HREF = "/contact";
  const ENQUIRY_HREF = "/contact";

  // Canva embed
  const CANVA_EMBED_SRC =
    "https://www.canva.com/design/DAG9ZNhw9Uw/iRe4_LKEEIHmXohO13puXw/view?embed";

  // pull only these two brokers (edit to match your DB values)
  const TARGET_BROKER_NAMES = ["Natanel Moshe Junger", "Yaakov Mechlovitz"];

  const { data: brokers, error } = await supabaseAdmin
    .from("brokers")
    .select("*")
    .in("name", TARGET_BROKER_NAMES)
    .order("id")
    .overrideTypes<Broker[], { merge: false }>();

  const brokerImageUrl = (path?: string | null) => {
    const safePath = path?.trim() ? path.trim() : "defaultAvatar.jpg";
    return supabaseAdmin.storage.from("brokers").getPublicUrl(safePath).data
      .publicUrl;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-1 min-h-0 max-w-5xl mx-auto px-5 py-16 font-sans w-full">
        {/* Canva embed */}
        <section className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="p-6 sm:p-7 border-b border-slate-100">
            <h2 className="text-xl font-semibold text-slate-900">
              Project Overview
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Browse the interactive Canva doc below.
            </p>
          </div>

          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src={CANVA_EMBED_SRC}
              className="absolute inset-0 w-full h-full"
              allow="fullscreen"
              allowFullScreen
              loading="lazy"
              title="Efrat Project Canva"
            />
          </div>
        </section>
        {/* Header */}
        <section className="mb-10">
          <h1 className="text-3xl font-semibold mb-3">Efrat Project</h1>

          <p className="text-base text-slate-700 leading-relaxed max-w-3xl">
            Get guided access, availability, and next steps.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href={SCHEDULE_CALL_HREF}
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 text-[#FAF9F6] text-sm font-medium px-5 py-3 hover:bg-slate-800 active:bg-slate-950 transition"
            >
              Schedule a call
            </Link>

            <Link
              href={ENQUIRY_HREF}
              className="inline-flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-900 text-sm font-medium px-5 py-3 hover:bg-slate-50 transition"
            >
              Send an enquiry
            </Link>
          </div>
        </section>

        {/* Brokers (Natanel + Yaakov) */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-8">Your team</h2>

          {error ? (
            <p className="text-red-600">Error loading brokers.</p>
          ) : !brokers || brokers.length === 0 ? (
            <p className="text-gray-500">
              No matching brokers found (Natanel / Yaakov).
            </p>
          ) : (
            <div className="grid gap-7 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {brokers.map((b) => (
                <Link
                  key={b.id}
                  href={`/team/${b.id}`}
                  className="no-underline text-inherit"
                >
                  <div className="bg-slate-50 px-5 py-6 rounded-2xl shadow-md text-center hover:shadow-lg transition">
                    <div className="relative w-28 h-28 rounded-full mx-auto mb-4 overflow-hidden">
                      <Image
                        src={brokerImageUrl(b.photoUrl)}
                        alt={`${b.name} headshot`}
                        fill
                        sizes="112px"
                        className="object-cover object-center"
                      />
                    </div>

                    <h2 className="text-xl font-semibold mb-1">{b.name}</h2>
                    <p className="text-sm text-gray-500 mb-3">{b.area}</p>

                    <p className="text-sm text-gray-700">
                      <strong>IL</strong> {b.phone}
                    </p>

                    <p className="text-sm text-gray-700">
                      {b.phone_us && <strong>US</strong>}{" "}
                      {b.phone_us ?? "\u00A0"}
                    </p>

                    <p className="text-sm text-gray-700 mt-3">{b.role}</p>
                    <p className="text-sm text-gray-700 mt-3">{b.email}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
