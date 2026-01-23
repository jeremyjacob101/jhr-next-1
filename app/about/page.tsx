import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { supabaseAdmin } from "@/lib/supabase.server";
import { Broker } from "@/types/broker";

export const metadata = {
  title: "About | Jerusalem Heritage Realty",
};

const OFFICE_EMAIL = "office@jhrisrael.com";

function digitsOnly(s?: string | null) {
  return (s ?? "").replace(/\D/g, "");
}

function toWhatsAppNumber(raw?: string | null) {
  const d = digitsOnly(raw);
  if (!d) return "";
  if (d.startsWith("972")) return d;
  if (d.startsWith("0")) return `972${d.slice(1)}`;
  return d;
}

export default async function AboutPage() {
  const teamWideImg = supabaseAdmin.storage
    .from("brokers")
    .getPublicUrl("bigpic.jpg").data.publicUrl;

  const { data: featured } = await supabaseAdmin
    .from("brokers")
    .select("*")
    .or("name.ilike.%Natanel%,name.ilike.%Yaakov%")
    .order("id")
    .overrideTypes<Broker[], { merge: false }>();

  const brokerImageUrl = (path?: string | null) => {
    const safePath = path?.trim() ? path.trim() : "defaultAvatar.jpg";
    return supabaseAdmin.storage.from("brokers").getPublicUrl(safePath).data
      .publicUrl;
  };

  const natanel =
    featured?.find((b) => b.name?.toLowerCase().includes("natanel")) ?? null;
  const yaakov =
    featured?.find((b) => b.name?.toLowerCase().includes("yaakov")) ?? null;

  const natanelTel = natanel?.phone ? `tel:${natanel.phone}` : null;
  const yaakovWa = yaakov?.phone
    ? `https://wa.me/${toWhatsAppNumber(yaakov.phone)}`
    : null;

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      {/* Hero */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[460px] sm:h-[560px] md:h-[640px]">
          <Image
            src={teamWideImg}
            alt="Jerusalem Heritage Realty team"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/60" />
        </div>

        <div className="absolute inset-0 flex items-end">
          <div className="w-full">
            <div className="max-w-5xl mx-auto px-5 pb-10">
              <h1 className="text-[34px] sm:text-[44px] font-semibold text-[#FAF9F6] leading-tight">
                Team
              </h1>
              <p className="mt-3 max-w-2xl text-[15px] sm:text-[16px] text-white/85 leading-relaxed">
                Most of our clients are coming from abroad. You want someone in
                Jerusalem who understands your standards and concerns and can
                communicate smoothly with local owners, lawyers, and brokers.
                That is what we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="flex-1 min-h-0 max-w-5xl mx-auto px-5 py-12 font-sans w-full">
        {/* Concrete about copy */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">
            Jerusalem Heritage Realty is built for people coming from abroad
          </h2>
          <p className="text-base text-slate-700 leading-relaxed mb-4">
            Most of our clients are like you. American, French, English or from
            other communities abroad.
          </p>
          <p className="text-base text-slate-700 leading-relaxed">
            You want someone in Jerusalem who gets your life, your standards,
            and your concerns, and who can also speak the language of local
            owners, lawyers, and brokers. That is what we do.
          </p>
        </section>

        {/* Two team blocks using same card style */}
        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-8">Meet the Team</h2>

          <div className="grid gap-7 grid-cols-1 sm:grid-cols-2">
            {/* Natanel card */}
            {natanel ? (
              <div className="bg-slate-50 px-5 py-6 rounded-2xl shadow-md text-center hover:shadow-lg transition h-full">
                <Link
                  href={`/team/${natanel.id}`}
                  className="no-underline text-inherit block"
                >
                  <div className="relative w-28 h-28 rounded-full mx-auto mb-4 overflow-hidden">
                    <Image
                      src={brokerImageUrl(natanel.photoUrl)}
                      alt={`${natanel.name} headshot`}
                      fill
                      sizes="112px"
                      className="object-cover object-center"
                    />
                  </div>

                  <h3 className="text-xl font-semibold mb-1">{natanel.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{natanel.area}</p>

                  <p className="text-sm text-gray-700">
                    <strong>IL</strong> {natanel.phone ?? "\u00A0"}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>US</strong> {natanel.phone_us ?? "\u00A0"}
                  </p>

                  <p className="text-sm text-gray-700 mt-3">{natanel.role}</p>

                  <div className="mt-3 text-sm font-medium text-slate-700 underline underline-offset-4">
                    View profile
                  </div>
                </Link>

                <div className="mt-5 flex gap-3 justify-center flex-wrap">
                  {natanelTel ? (
                    <a
                      href={natanelTel}
                      className="rounded-xl bg-slate-900 text-[#FAF9F6] text-sm font-medium px-4 py-2 hover:bg-slate-800 active:bg-slate-950 transition"
                    >
                      Call Natanel
                    </a>
                  ) : (
                    <span className="rounded-xl bg-slate-300 text-slate-600 text-sm font-medium px-4 py-2 cursor-not-allowed">
                      Call Natanel
                    </span>
                  )}

                  <a
                    href={`mailto:${OFFICE_EMAIL}?subject=${encodeURIComponent(
                      "Jerusalem Heritage Realty enquiry",
                    )}`}
                    className="rounded-xl bg-white border border-slate-200 text-slate-900 text-sm font-medium px-4 py-2 hover:bg-slate-50 transition"
                  >
                    Email office inbox
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 px-5 py-6 rounded-2xl shadow-md text-center h-full">
                <p className="text-sm text-gray-600">
                  Natanel not found in brokers table.
                </p>
              </div>
            )}

            {/* Yaakov card */}
            {yaakov ? (
              <div className="bg-slate-50 px-5 py-6 rounded-2xl shadow-md text-center hover:shadow-lg transition h-full">
                <Link
                  href={`/team/${yaakov.id}`}
                  className="no-underline text-inherit block"
                >
                  <div className="relative w-28 h-28 rounded-full mx-auto mb-4 overflow-hidden">
                    <Image
                      src={brokerImageUrl(yaakov.photoUrl)}
                      alt={`${yaakov.name} headshot`}
                      fill
                      sizes="112px"
                      className="object-cover object-center"
                    />
                  </div>

                  <h3 className="text-xl font-semibold mb-1">{yaakov.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{yaakov.area}</p>

                  <p className="text-sm text-gray-700">
                    <strong>IL</strong> {yaakov.phone ?? "\u00A0"}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>US</strong> {yaakov.phone_us ?? "\u00A0"}
                  </p>

                  <p className="text-sm text-gray-700 mt-3">{yaakov.role}</p>

                  <div className="mt-3 text-sm font-medium text-slate-700 underline underline-offset-4">
                    View profile
                  </div>
                </Link>

                <div className="mt-5 flex gap-3 justify-center flex-wrap">
                  {yaakovWa ? (
                    <a
                      href={yaakovWa}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl bg-slate-900 text-[#FAF9F6] text-sm font-medium px-4 py-2 hover:bg-slate-800 active:bg-slate-950 transition"
                    >
                      WhatsApp Yaakov
                    </a>
                  ) : (
                    <span className="rounded-xl bg-slate-300 text-slate-600 text-sm font-medium px-4 py-2 cursor-not-allowed">
                      WhatsApp Yaakov
                    </span>
                  )}

                  <a
                    href={`mailto:${OFFICE_EMAIL}?subject=${encodeURIComponent(
                      "Jerusalem Heritage Realty enquiry",
                    )}`}
                    className="rounded-xl bg-white border border-slate-200 text-slate-900 text-sm font-medium px-4 py-2 hover:bg-slate-50 transition"
                  >
                    Email office inbox
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 px-5 py-6 rounded-2xl shadow-md text-center h-full">
                <p className="text-sm text-gray-600">
                  Yaakov not found in brokers table.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
