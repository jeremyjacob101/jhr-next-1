import Link from "next/link";
import { notFound } from "next/navigation";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilters from "@/components/PropertyFilters";
import { supabaseAdmin } from "@/lib/supabase.server";
import { Property } from "@/types/property";
import { Project } from "@/types/project";

type SP = {
  q?: string;
  minPrice?: string;
  maxPrice?: string;
  minBeds?: string;
  maxBeds?: string;
  minBaths?: string;
  maxBaths?: string;
  sort?: string; // "price_asc" | "price_desc"
};

export default async function ProjectDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<SP>;
}) {
  const { id } = await params;
  const sp = await searchParams;

  const { data: projectRow } = await supabaseAdmin
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!projectRow) notFound();
  const project = projectRow as Project;

  let query = supabaseAdmin
    .from("properties")
    .select("*, broker:brokers(*)")
    .eq("project_id", id);

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
    query = query.order("priceNIS", { ascending: true });
  }

  const { data: properties, error } = await query.overrideTypes<
    Property[],
    { merge: false }
  >();

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1 min-h-0 max-w-5xl mx-auto px-5 py-10">
          <p className="text-red-600">Error loading project properties.</p>
          <Link
            href="/projects"
            className="text-sm text-gray-600 hover:underline"
          >
            ← Back to projects
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 min-h-0 max-w-5xl mx-auto px-5 py-16 font-sans">
        <Link
          href="/projects"
          className="text-sm text-gray-600 hover:underline"
        >
          ← Back to projects
        </Link>

        <div className="mt-4 mb-6">
          <h1 className="text-2xl font-semibold">{project.name}</h1>
          <p className="text-sm text-gray-500 mt-1">
            Properties in this project.
          </p>
        </div>

        <PropertyFilters />

        {!properties || properties.length === 0 ? (
          <p className="text-gray-500">No properties found for this project.</p>
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
