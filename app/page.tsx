import { supabase } from "@/lib/supabase";
import PropertyCard from "@/components/PropertyCard";
import { Property } from "@/types/property";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default async function HomePage() {
  const { data: properties, error } = await supabase
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
      <section
        className="relative h-[540px] rounded-b-4xl overflow-hidden mb-10 mx-5 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://yykrealestate.com/assets/Neighborhoods/3/Baka-mob.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-black/40 to-black/60" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-5 text-center text-white">
          <h1 className="text-3xl md:text-4xl mb-4 tracking-[0.18em] uppercase">
            Luxury Residences in Jerusalem
          </h1>
          <p className="max-w-2xl text-base md:text-lg leading-relaxed opacity-90">
            Curated homes in Jerusalem&apos;s most sought-after neighborhoods –
            German Colony, Talbiya, Baka, and the vibrant City Center.
          </p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-5 pb-16 font-sans">
        <h2 className="text-2xl font-semibold mb-6">
          Featured Jerusalem Properties
        </h2>

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
