import Link from "next/link";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { supabaseAdmin } from "@/lib/supabase.server";
import { Property } from "@/types/property";
import { Broker } from "@/types/broker";

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: propertyRow, error: propertyError } = await supabaseAdmin
    .from("properties")
    .select("*, broker:brokers(*)")
    .eq("id", id)
    .maybeSingle();

  if (propertyError) {
    console.error("Error loading property", propertyError);
  }

  if (!propertyRow) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1 min-h-0 max-w-5xl mx-auto px-5 py-10">
          <p className="mb-3">Property not found.</p>
          <Link href="/" className="text-sm text-gray-600 hover:underline">
            ← Back to properties
          </Link>
        </main>
      </div>
    );
  }

  const property = propertyRow as Property;
  const broker = property.broker ?? null;

  const brokerImageUrl = (path?: string | null) => {
    const safePath = path?.trim() ? path.trim() : "defaultAvatar.jpg";
    return supabaseAdmin.storage.from("brokers").getPublicUrl(safePath).data
      .publicUrl;
  };
  const brokerPhoto = brokerImageUrl(broker?.photoUrl);

  const backdropUrl = property.backdropImageUrl || property.heroImageUrl;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    `${property.street}, ${property.city}, Israel`,
  )}&output=embed`;

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <section className="relative h-[260px] mb-0 overflow-hidden">
        <Image
          src={backdropUrl}
          alt={`${property.propertyName} backdrop`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-linear-to-b from-[#0b1f3a]/40 to-[#0b1f3a]/75" />

        <div className="relative z-10 max-w-5xl mx-auto h-full flex flex-col justify-end px-5 pb-6 text-white">
          <p className="mb-1">
            <Link href="/" className="text-xs text-gray-200 hover:underline">
              ← Back to properties
            </Link>
          </p>
          <h1 className="text-[28px] md:text-[30px] font-semibold mb-1">
            {property.propertyName}
          </h1>
          <p className="text-sm text-gray-200 mb-1">
            {property.neighborhood} • {property.street}, {property.city}
          </p>
          <p className="text-[20px] md:text-[22px] font-bold text-emerald-200">
            ₪{property.priceNIS.toLocaleString("he-IL")}
          </p>
        </div>
      </section>

      <main className="flex-1 min-h-0 max-w-5xl mx-auto px-5 pt-5 pb-16 font-sans">
        <section className="grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-7 mt-2">
          <div>
            {/* hero image */}
            <div className="relative w-full h-80 rounded-2xl overflow-hidden mb-5">
              <Image
                src={property.heroImageUrl}
                alt={property.propertyName}
                fill
                sizes="(min-width: 768px) 66vw, 100vw"
                className="object-cover object-center"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-100 rounded-2xl px-4 py-3 mb-6">
              <div>
                <span className="text-[11px] uppercase tracking-[0.12em] text-gray-500">
                  Bedrooms
                </span>
                <div className="text-[16px] font-semibold text-slate-900">
                  {property.beds}
                </div>
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-[0.12em] text-gray-500">
                  Bathrooms
                </span>
                <div className="text-[16px] font-semibold text-slate-900">
                  {property.baths}
                </div>
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-[0.12em] text-gray-500">
                  Interior
                </span>
                <div className="text-[16px] font-semibold text-slate-900">
                  {property.indoorSqm} m²
                </div>
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-[0.12em] text-gray-500">
                  Outdoor
                </span>
                <div className="text-[16px] font-semibold text-slate-900">
                  {property.outdoorSqm} m²
                </div>
              </div>
            </div>

            <section className="mb-7">
              <h2 className="text-[20px] font-semibold mb-2">
                Property Overview
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Elegant residence in the heart of {property.neighborhood}, with
                bright living spaces, generous outdoor areas, and walking
                distance to cafes, parks, and historic Jerusalem landmarks.
                Designed for comfortable family living and entertaining.
              </p>
            </section>

            <section>
              <h2 className="text-[20px] font-semibold mb-2">Location</h2>
              <p className="text-sm text-gray-600">
                {property.street}, {property.city}, Israel
              </p>
              <div className="mt-3 rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  title="Property location"
                  src={mapSrc}
                  className="border-0 w-full h-[260px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </section>
          </div>

          <aside className="md:pl-1">
            {broker && (
              <Link
                href={`/about/${broker.id}`}
                className="no-underline text-inherit"
              >
                <div className="bg-slate-50 rounded-2xl p-5 shadow-md hover:shadow-lg transition cursor-pointer">
                  <h3 className="text-sm uppercase tracking-[0.16em] text-gray-500 mb-3">
                    Exclusive Broker
                  </h3>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0">
                      <Image
                        src={brokerPhoto}
                        alt={`${broker.name} photo`}
                        fill
                        sizes="44px"
                        className="object-cover object-center"
                      />
                    </div>

                    <div>
                      <p className="m-0 font-semibold">{broker.name}</p>
                      <p className="m-0 text-[13px] text-gray-500">
                        Licensed Jerusalem Broker
                      </p>
                    </div>
                  </div>

                  <div className="text-sm mb-3">
                    <p>{broker.phone}</p>
                    <p>{broker.email}</p>
                  </div>

                  <p className="text-[13px] text-gray-600">
                    Contact the broker to schedule a private viewing or receive
                    a full brochure of this property.
                  </p>
                </div>
              </Link>
            )}
          </aside>
        </section>
      </main>
      <Footer />
    </div>
  );
}
