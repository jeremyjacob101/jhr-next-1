import { supabaseAdmin } from "@/lib/supabase.server";
import PropertyCard from "@/components/PropertyCard";
import { Property } from "@/types/property";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import MainInfoCards from "@/components/MainInfoCards";

export default async function HomePage() {
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

      <section className="relative h-[540px] rounded-b-4xl overflow-hidden mb-10 mx-5">
        <Image
          src="https://yykrealestate.com/assets/Neighborhoods/3/Baka-mob.jpg"
          alt="Baka neighborhood in Jerusalem"
          fill
          unoptimized
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-linear-to-b from-black/40 to-black/60" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-5 text-center text-white">
          <p className="text-xs md:text-sm tracking-[0.22em] uppercase text-white/75 mb-3">
            WELCOME TO
          </p>
          <h1 className="text-3xl md:text-4xl mb-4 tracking-[0.18em] uppercase">
            JERUSALEM HERITAGE REALTY
          </h1>
          <p className="max-w-2xl text-base md:text-lg leading-relaxed opacity-90">
            Your Home.
          </p>
          <p className="max-w-2xl text-base md:text-lg leading-relaxed opacity-90">
            Your Heritage.
          </p>
          <p className="max-w-2xl text-base md:text-lg leading-relaxed opacity-90">
            Your Future in Jerusalem.
          </p>
        </div>
      </section>

      <MainInfoCards />

      <section className="mx-5 mb-16 rounded-4xl overflow-hidden bg-linear-to-b from-slate-400 to-slate-300">
        <main className="max-w-5xl mx-auto px-5 py-14 font-sans">
          <h2 className="text-2xl font-semibold mb-6 text-slate-900">
            Featured Jerusalem Properties
          </h2>

          <>
            <div className="grid gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {properties.slice(0, 3).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Link
                href="/properties"
                className="text-sm font-medium text-slate-900 underline underline-offset-4 hover:text-slate-700"
              >
                View all Jerusalem properties
              </Link>
            </div>
          </>
        </main>
      </section>

      <Footer />
    </>
  );
}
