import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import { supabaseAdmin } from "@/lib/supabase.server";
import { Broker } from "@/types/broker";
import Footer from "@/components/Footer";

export default async function TeamPage() {
  const { data: brokers, error } = await supabaseAdmin
    .from("brokers")
    .select("*")
    .order("id")
    .overrideTypes<Broker[], { merge: false }>();

  const brokerImageUrl = (path?: string | null) => {
    const safePath = path?.trim() ? path.trim() : "defaultAvatar.jpg";
    return supabaseAdmin.storage.from("brokers").getPublicUrl(safePath).data
      .publicUrl;
  };

  if (error) {
    console.error("Error loading brokers", error);
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1 min-h-0 max-w-5xl mx-auto px-5 py-10">
          <h1 className="text-3xl font-semibold mb-4">Meet the Team</h1>
          <p className="text-red-600">Error loading brokers.</p>
        </main>
      </div>
    );
  }

  if (!brokers || brokers.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1 min-h-0 max-w-5xl mx-auto px-5 py-10">
          <h1 className="text-3xl font-semibold mb-4">Meet the Team</h1>
          <p className="text-gray-500">No brokers found.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-1 min-h-0 max-w-5xl mx-auto px-5 py-10">
        <section className="mb-10">
          <h1 className="text-3xl font-semibold mb-4">
            Jerusalem Heritage Realty is built for people coming from abroad
          </h1>
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

        <h2 className="text-3xl font-semibold mb-8">Meet the Team</h2>

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
                  {b.phone_us &&<strong>US</strong>} {b.phone_us ?? "\u00A0"}
                </p>

                <p className="text-sm text-gray-700 mt-3">{b.role}</p>
                <p className="text-sm text-gray-700 mt-3">{b.email}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
