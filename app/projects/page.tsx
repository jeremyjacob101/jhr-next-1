import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { supabaseAdmin } from "@/lib/supabase.server";
import { Project } from "@/types/project";

type SP = {
  q?: string;
  sort?: string; // "name_asc" | "name_desc"
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;

  let qy = supabaseAdmin.from("projects").select("*");

  const q = sp.q?.trim();
  if (q) qy = qy.ilike("name", `%${q}%`);

  if (sp.sort === "name_desc") {
    qy = qy.order("name", { ascending: false });
  } else {
    qy = qy.order("name", { ascending: true });
  }

  const { data: projects, error } = await qy.overrideTypes<
    Project[],
    { merge: false }
  >();

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 min-h-0 p-8">
          <h1 className="text-2xl font-semibold mb-4">Projects</h1>
          <p className="text-red-600 mb-4">Error loading projects.</p>
        </main>
      </div>
    );
  }

  // Count properties per project (single query + JS reduce)
  const { data: propRows } = await supabaseAdmin
    .from("properties")
    .select("project_id")
    .not("project_id", "is", null);

  const counts = new Map<string, number>();
  for (const r of propRows ?? []) {
    const pid = (r as { project_id: string | null }).project_id;
    if (!pid) continue;
    counts.set(pid, (counts.get(pid) ?? 0) + 1);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-1 min-h-0 max-w-5xl mx-auto px-5 py-16 font-sans">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Projects</h1>
            <p className="text-sm text-gray-500 mt-1">
              Browse new developments and collections of listings.
            </p>
          </div>

          {/* Simple GET form for search/sort */}
          <form method="get" className="flex gap-2 items-end">
            <div>
              <label className="block text-xs uppercase tracking-[0.12em] text-gray-500 mb-1">
                Search
              </label>
              <input
                name="q"
                defaultValue={sp.q ?? ""}
                placeholder="e.g. Talbiya"
                className="w-56 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.12em] text-gray-500 mb-1">
                Sort
              </label>
              <select
                name="sort"
                defaultValue={sp.sort ?? "name_asc"}
                className="w-40 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
              >
                <option value="name_asc">Name (A–Z)</option>
                <option value="name_desc">Name (Z–A)</option>
              </select>
            </div>

            <button
              type="submit"
              className="h-[40px] rounded-xl bg-slate-900 text-white px-4 text-sm font-medium hover:bg-slate-800"
            >
              Apply
            </button>
          </form>
        </div>

        {!projects || projects.length === 0 ? (
          <p className="text-gray-500">No projects found.</p>
        ) : (
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <Link
                key={p.id}
                href={`/projects/${p.id}`}
                className="no-underline text-inherit"
              >
                <div className="rounded-2xl bg-slate-50 border border-slate-100 p-5 shadow-sm hover:shadow-md transition cursor-pointer">
                  <h3 className="text-lg font-semibold">{p.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {counts.get(p.id) ?? 0} property
                    {(counts.get(p.id) ?? 0) === 1 ? "" : "ies"}
                  </p>
                  <p className="text-xs text-gray-400 mt-3">View project →</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
