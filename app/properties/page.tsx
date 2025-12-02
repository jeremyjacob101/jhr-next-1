import { supabaseAdmin } from "@/lib/supabaseAdmin";
import PropertyCard from "@/components/PropertyCard";
import { Property } from "@/types/property";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default async function PropertiesPage() {
  const { data: properties, error } = await supabaseAdmin
    .from("properties")
    .select("*")
    .overrideTypes<Property[], { merge: false }>();

  if (error) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-semibold mb-4">Listings</h1>
        <p className="text-red-600 mb-4">Error loading listings.</p>
      </main>
    );
  }

  return (
    <>
      <NavBar />
      <main className="max-w-5xl mx-auto px-5 py-16 font-sans">
        {!properties || properties.length === 0 ? (
          <p className="text-gray-500">No properties found.</p>
        ) : (
          <div className="grid gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
