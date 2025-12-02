import Link from "next/link";
import NavBar from "@/components/NavBar";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { Broker } from "@/types/broker";
import Footer from "@/components/Footer";

export default async function BrokersPage() {
  const { data: brokers, error } = await supabaseAdmin
    .from("brokers")
    .select("*")
    .order("name")
    .overrideTypes<Broker[], { merge: false }>();

  if (error) {
    console.error("Error loading brokers", error);
    return (
      <>
        <NavBar />
        <main className="max-w-5xl mx-auto px-5 py-10">
          <h1 className="text-3xl font-semibold mb-4">Meet the Team</h1>
          <p className="text-red-600">Error loading brokers.</p>
        </main>
      </>
    );
  }

  if (!brokers || brokers.length === 0) {
    return (
      <>
        <NavBar />
        <main className="max-w-5xl mx-auto px-5 py-10">
          <h1 className="text-3xl font-semibold mb-4">Meet the Team</h1>
          <p className="text-gray-500">No brokers found.</p>
        </main>
      </>
    );
  }

  return (
    <>
      <NavBar />

      <main className="max-w-5xl mx-auto px-5 py-10">
        <h1 className="text-3xl font-semibold mb-8">Meet the Team</h1>

        <div className="grid gap-7 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {brokers.map((b) => (
            <Link
              key={b.id}
              href={`/brokers/${b.id}`}
              className="no-underline text-inherit"
            >
              <div className="bg-slate-50 px-5 py-6 rounded-2xl shadow-md text-center hover:shadow-lg transition">
                <div
                  className="w-28 h-28 rounded-full mx-auto mb-4 bg-cover bg-center"
                  style={{ backgroundImage: `url(${b.photoUrl})` }}
                />

                <h2 className="text-xl font-semibold mb-1">{b.name}</h2>
                <p className="text-sm text-gray-500 mb-3">{b.area}</p>

                <p className="text-sm text-gray-700">{b.phone}</p>
                <p className="text-sm text-gray-700">{b.email}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
