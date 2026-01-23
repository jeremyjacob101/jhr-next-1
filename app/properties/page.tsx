import { supabaseAdmin } from "@/lib/supabase.server";
import PropertyCard from "@/components/PropertyCard";
import { Property } from "@/types/property";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PropertyFilters from "@/components/PropertyFilters";

type SP = {
  q?: string;
  minPrice?: string;
  maxPrice?: string;
  minBeds?: string;
  maxBeds?: string;
  minBaths?: string;
  maxBaths?: string;
  sort?: string;
};

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;

  let query = supabaseAdmin.from("properties3").select("*, broker:brokers(*)");

  const q = sp.q?.trim();
  if (q) query = query.ilike("propertyName", `%${q}%`);

  const minPrice = Number(sp.minPrice);
  if (!Number.isNaN(minPrice)) query = query.gte("priceNIS", minPrice);

  const maxPrice = Number(sp.maxPrice);
  if (!Number.isNaN(maxPrice)) query = query.lte("priceNIS", maxPrice);

  const minBeds = Number(sp.minBeds);
  if (!Number.isNaN(minBeds)) query = query.gte("beds", minBeds);

  const maxBeds = Number(sp.maxBeds);
  if (!Number.isNaN(maxBeds)) query = query.lte("beds", maxBeds);

  const minBaths = Number(sp.minBaths);
  if (!Number.isNaN(minBaths)) query = query.gte("baths", minBaths);

  const maxBaths = Number(sp.maxBaths);
  if (!Number.isNaN(maxBaths)) query = query.lte("baths", maxBaths);

  if (sp.sort === "price_desc") {
    query = query.order("priceNIS", { ascending: false });
  } else if (sp.sort === "price_asc") {
    query = query.order("priceNIS", { ascending: true });
  } else {
    // default sort (pick whatever you prefer)
    query = query.order("priceNIS", { ascending: true });
  }

  const { data: properties, error } = await query.overrideTypes<
    Property[],
    { merge: false }
  >();

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 min-h-0 p-8">
          <h1 className="text-2xl font-semibold mb-4">Listings</h1>
          <p className="text-red-600 mb-4">Error loading listings.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 min-h-0 max-w-5xl mx-auto px-5 py-16 font-sans w-full">
        <PropertyFilters />

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
    </div>
  );
}
