import Link from "next/link";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Projects | Jerusalem Heritage Realty",
};

export default async function ProjectsPage() {
  // Replace this with the image you’re going to send (URL or /public path)
  const EFRAT_IMAGE_SRC = "/efrat.jpg";

  // Replace with your real schedule link if you have it
  const SCHEDULE_CALL_HREF = "/contact";

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-1 min-h-0 max-w-5xl mx-auto px-5 py-16 font-sans w-full">
        {/* Header */}
        <section className="mb-10">
          <h1 className="text-3xl font-semibold mb-3">Projects</h1>

          <p className="text-base text-slate-700 leading-relaxed max-w-3xl">
            Browse new developments and curated collections of listings.
            <br />
            If you want early access or a specific unit type, send your brief
            and we will guide you to the right options.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href={SCHEDULE_CALL_HREF}
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 text-[#FAF9F6] text-sm font-medium px-5 py-3 hover:bg-slate-800 active:bg-slate-950 transition"
            >
              Schedule a call
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-900 text-sm font-medium px-5 py-3 hover:bg-slate-50 transition"
            >
              Send an enquiry
            </Link>
          </div>
        </section>

        {/* Tall photo tiles */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* EFRAT PROJECT (clickable tile) */}
          <Link href="/projects/efrat" className="no-underline text-inherit">
            <article className="group relative overflow-hidden rounded-3xl shadow-lg border border-slate-100 bg-slate-50 h-[520px] sm:h-[620px]">
              {/* Image */}
              <Image
                src={EFRAT_IMAGE_SRC}
                alt="Efrat Project"
                fill
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/20 to-black/70" />

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 text-white">
                <p className="text-xs uppercase tracking-[0.18em] text-white/75 mb-2">
                  Featured project
                </p>

                <h2 className="text-3xl sm:text-4xl font-semibold leading-tight">
                  EFRAT PROJECT
                </h2>

                <p className="mt-3 text-sm sm:text-[15px] text-white/85 leading-relaxed max-w-md">
                  New development with guided access to units and clear next
                  steps. Tap to view details.
                </p>

                <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white/95">
                  <span className="underline underline-offset-4 group-hover:no-underline">
                    View project
                  </span>
                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </div>
              </div>
            </article>
          </Link>

          {/* UPCOMING PROJECTS (gray, disabled tile) */}
          <article
            aria-disabled="true"
            className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 h-[520px] sm:h-[620px] cursor-not-allowed"
          >
            {/* Gray background with subtle pattern */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-200/30 via-slate-200/20 to-slate-300/40" />
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, rgba(0,0,0,0.08), transparent 45%), radial-gradient(circle at 80% 30%, rgba(0,0,0,0.06), transparent 50%)",
              }}
            />

            {/* Content */}
            <div className="absolute inset-0 p-6 sm:p-7 flex flex-col justify-end">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-600 mb-2">
                Coming soon
              </p>

              <h2 className="text-3xl sm:text-4xl font-semibold leading-tight text-slate-900">
                UPCOMING PROJECTS
              </h2>

              <p className="mt-3 text-sm sm:text-[15px] text-slate-700 leading-relaxed max-w-md">
                Curated projects are being prepared. Send your brief and we’ll
                guide you to the right options.
              </p>

              <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-slate-600">
                <span className="underline underline-offset-4 decoration-slate-400">
                  Not available yet
                </span>
              </div>
            </div>
          </article>
        </section>
      </main>

      <Footer />
    </div>
  );
}
