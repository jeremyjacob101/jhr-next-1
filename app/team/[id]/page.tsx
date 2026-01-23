import Link from "next/link";
import { notFound } from "next/navigation";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { supabaseAdmin } from "@/lib/supabase.server";
import { Broker } from "@/types/broker";
import { Property } from "@/types/property";
import Image from "next/image";

export default async function BrokerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: broker, error: brokerError } = await supabaseAdmin
    .from("brokers")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (brokerError) {
    console.error("Error loading broker", brokerError);
  }

  if (!broker) {
    notFound();
  }

  const typedBroker = broker as Broker;

  const { data: properties, error: propertiesError } = await supabaseAdmin
    .from("properties3")
    .select("*, broker:brokers(*)")
    .eq("broker_id", typedBroker.id);

  if (propertiesError) {
    console.error("Error loading properties", propertiesError);
  }

  const safeProperties = (properties as Property[]) ?? [];

  const brokerImageUrl = (path?: string | null) => {
    const safePath = path?.trim() ? path.trim() : "defaultAvatar.jpg";
    return supabaseAdmin.storage.from("brokers").getPublicUrl(safePath).data
      .publicUrl;
  };

  const brokerPhoto = brokerImageUrl(broker?.photoUrl);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 min-h-0 max-w-5xl mx-auto px-5 py-10">
        <Link href="/team" className="text-sm text-gray-600 hover:underline">
          ← Back to team
        </Link>

        <div className="flex flex-col md:flex-row gap-6 mt-6 mb-8 items-center md:items-start">
          <div className="relative w-28 h-28 rounded-full overflow-hidden shrink-0 mx-auto md:mx-0 mb-4 md:mb-0">
            <Image
              src={brokerPhoto}
              alt="Broker photo"
              fill
              sizes="112px"
              className="object-cover object-center"
            />
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-3xl font-semibold mb-1">{typedBroker.name}</h1>
            <p className="text-sm text-gray-500 mb-2">{typedBroker.area}</p>
            <p className="text-sm text-gray-700"><strong>IL </strong>{typedBroker.phone}</p>
            {typedBroker.phone_us && <p className="text-sm text-gray-700"><strong>US </strong>{typedBroker.phone_us}</p>}
            <p className="text-sm text-gray-700 mt-3">{typedBroker.role}</p>
            <p className="text-sm text-gray-700">{typedBroker.email}</p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-5">
          Properties by {typedBroker.name}
        </h2>

        {safeProperties.length === 0 ? (
          <p className="text-gray-500">No properties for this broker yet.</p>
        ) : (
          <div className="grid gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {safeProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
