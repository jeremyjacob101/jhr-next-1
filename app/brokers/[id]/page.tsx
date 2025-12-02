import Link from "next/link";
import { notFound } from "next/navigation";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { supabase } from "@/lib/supabase";
import { Broker } from "@/types/broker";
import { Property } from "@/types/property";

export default async function BrokerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 👇 unwrap the params Promise
  const { id } = await params;

  // fetch the broker with that id
  const { data: broker, error: brokerError } = await supabase
    .from("brokers")
    .select("*")
    .eq("id", id)
    .maybeSingle(); // avoid throwing if 0 rows

  if (brokerError) {
    console.error("Error loading broker", brokerError);
  }

  if (!broker) {
    // no broker with this id → 404 page
    notFound();
  }

  const typedBroker = broker as Broker;

  const { data: properties, error: propertiesError } = await supabase
    .from("properties")
    .select("*")
    .eq("brokerName", typedBroker.name);

  if (propertiesError) {
    console.error("Error loading properties", propertiesError);
  }

  const safeProperties = (properties as Property[]) ?? [];

  return (
    <>
      <NavBar />

      <main className="max-w-5xl mx-auto px-5 py-10">
        <Link href="/brokers" className="text-sm text-gray-600 hover:underline">
          ← Back to Brokers
        </Link>

        <div className="flex flex-col md:flex-row gap-6 mt-6 mb-8 items-center md:items-start">
          <div
            className="w-32 h-32 rounded-full bg-cover bg-center"
            style={{ backgroundImage: `url(${typedBroker.photoUrl})` }}
          />
          <div>
            <h1 className="text-3xl font-semibold mb-1">{typedBroker.name}</h1>
            <p className="text-sm text-gray-500 mb-2">{typedBroker.area}</p>
            <p className="text-sm text-gray-700">{typedBroker.phone}</p>
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
    </>
  );
}
