import { supabaseAdmin } from "@/lib/supabase.server";
import PropertyCard from "@/components/PropertyCard";
import { Property } from "@/types/property";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import styles from "./page.module.css";
import type { CSSProperties } from "react";

type CSSVars = CSSProperties & Record<`--${string}`, string>;

type StoryBlock = {
  title: string;
  body?: string;
  bullets?: string[];
  footer?: string;
  images: { src: string; alt: string }[];
};

const storyBlocks: StoryBlock[] = [
  {
    title: "Your Jerusalem Real Estate Partner",
    body: "Navigating Jerusalem's real estate market from abroad can be challenging. At JHR, we understand your unique needs and offer personalized guidance every step of the way. Let us simplify the process for you.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1574586594690-db2449286e33?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Jerusalem stone architecture placeholder",
      },
      {
        src: "https://plus.unsplash.com/premium_photo-1699531223990-856f23c13e43?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Jerusalem city view placeholder",
      },
      {
        src: "https://plus.unsplash.com/premium_photo-1667427810751-5d38b0921237?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Jerusalem street placeholder",
      },
    ],
  },
  {
    title: "Why Choose JHR",
    body: "You want someone who:",
    bullets: [
      "Understands your mindset and your style",
      "Can explain each step in clear English",
      "Knows the religious and community side as well as the real estate",
      "Is reliable, straightforward, and pleasant to deal with",
    ],
    footer:
      "This is exactly what we built JHR for. You get a team that understands the city, the buildings, the people, and the way deals really work here.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1765274993134-0cd145a53485?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Elegant interior placeholder",
      },
      {
        src: "https://images.unsplash.com/photo-1663785383982-f5484de9fba8?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Luxury apartment placeholder",
      },
      {
        src: "https://plus.unsplash.com/premium_photo-1684175656172-19a7ee56f0c8?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Modern living room placeholder",
      },
    ],
  },
  {
    title: "Who We Work Best With",
    bullets: [
      "American families looking for a home or investment in prime Jerusalem areas",
      "Families planning a future move and wanting to buy now while they can",
      "Sellers who want serious marketing, qualified buyers, and firm control of the process",
      "Investors who want quality apartments or new projects with long term value",
    ],
    footer: "If you see yourself in this list, we should talk.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1626303905295-cd61f99cbb04?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Consultation placeholder",
      },
      {
        src: "https://images.unsplash.com/photo-1704655295066-681e61ecca6b?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Meeting placeholder",
      },
      {
        src: "https://images.unsplash.com/photo-1574513828701-6b92d7fed61d?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Teamwork placeholder",
      },
    ],
  },
  {
    title: "Locations",
    body: "Explore our exclusive focus areas such as Rechavia, Mamila, Talbiya, and more. Specializing in new construction, Tama 38 urban renewal projects, penthouses, and private houses in prime central Jerusalem locations.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1707337954290-8378da085d99?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGplcnVzYWxlbSUyMHN1YnVyYnxlbnwwfHwwfHx8MA%3D%3D",
        alt: "Neighborhood placeholder",
      },
      {
        src: "https://images.unsplash.com/photo-1645028699892-0f2a7296a4b1?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "City map placeholder",
      },
      {
        src: "https://images.unsplash.com/photo-1632487112403-2d011716780c?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "City streets placeholder",
      },
    ],
  },
];

function StorySection({ block, idx }: { block: StoryBlock; idx: number }) {
  const flip = idx % 2 === 1;

  const mediaVars: CSSVars = {
    "--speed": `${18 + idx * 2}s`,
    "--dir": flip ? "-1" : "1",
    "--slides": String(block.images.length * 2),
  };

  return (
    <section className={styles.storySection}>
      <div className={styles.storyBg} />
      <div className={styles.storyGrid} />
      <div className={styles.vignette} />

      <div className={styles.storyInner}>
        <div className={`${styles.storyLayout} ${flip ? styles.flip : ""}`}>
          {/* TEXT */}
          <div className={styles.storyText}>
            <div className={styles.kickerRow}>
              <div className={styles.kickerLine} />
              <div className={styles.kickerDot} />
              <div className={styles.kickerLine} />
            </div>

            <h2 className="jhr-reveal" data-reveal="up">
              {block.title}
            </h2>

            <div className={`${styles.goldRule} jhr-reveal`} data-reveal="up" />

            {block.body ? (
              <p className="jhr-reveal" data-reveal="up">
                {block.body}
              </p>
            ) : null}

            {block.bullets?.length ? (
              <ul className="jhr-reveal" data-reveal="up">
                {block.bullets.map((b) => (
                  <li key={b}>
                    <span className={styles.bulletDot} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            {block.footer ? (
              <p className="jhr-reveal" data-reveal="up">
                {block.footer}
              </p>
            ) : null}
          </div>

          {/* SLIDING MEDIA */}
          <div
            className={`${styles.storyMedia} jhr-reveal`}
            data-reveal={flip ? "left" : "right"}
            style={mediaVars}
          >
            <div
              className={styles.mediaFrame}
              aria-label={`${block.title} imagery`}
            >
              <div className={styles.mediaSheen} />

              <div className={styles.mediaTrack}>
                {[...block.images, ...block.images].map((img, i) => (
                  <div key={`${img.src}-${i}`} className={styles.mediaSlide}>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 900px) 100vw, 50vw"
                      loading="eager"
                      priority
                    />
                  </div>
                ))}
              </div>

              <div className={styles.mediaFadeLeft} />
              <div className={styles.mediaFadeRight} />
            </div>

            <div className={styles.mediaCaption} aria-hidden="true">
              <div className={styles.captionLine} />
              <div className={styles.captionPip} />
              <div className={styles.captionLine} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
      <div id="jhr-sticky-nav" className={styles.stickyNav}>
        <NavBar />
      </div>

      {/* HERO */}
      <section id="jhr-hero" className={styles.hero}>
        <Image
          src="https://yykrealestate.com/assets/Neighborhoods/3/Baka-mob.jpg"
          alt="Baka neighborhood in Jerusalem"
          fill
          sizes="100vw"
          loading="eager"
          priority
          className={styles.heroImg}
        />

        <div className={styles.heroOverlay} />
        <div className={styles.heroGlow} />
        <div className={styles.scan} />

        <div className={styles.heroInner}>
          {/* Top brand mark (logo only, like the reference) */}
          <div className={styles.heroTop}>
            <Image
              src="/jhr-logos/svg/LOGO_%20JHR%20_%20FINAL-04.svg"
              alt="Jerusalem Heritage Realty"
              width={140}
              height={140}
              priority
              className={styles.heroLogo}
            />
          </div>

          {/* Center title */}
          <div className={styles.heroCenter}>
            <p className={styles.heroKicker}>WELCOME TO</p>
            <h1 className={styles.heroHeading}>JERUSALEM HERITAGE REALTY</h1>
            <div className={styles.heroRule} />
          </div>

          {/* Bottom copy + arrow */}
          <div className={styles.heroBottom}>
            <div className={styles.heroBottomCopy}>
              <p>Your Home.</p>
              <p>Your Heritage.</p>
              <p>Your Future in Jerusalem.</p>
            </div>

            <a
              href="#jhr-story-start"
              className={styles.scrollCue}
              aria-label="Scroll down"
            >
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* FULL-HEIGHT STORY SECTIONS */}
      <div id="jhr-story-start" className={styles.storyWrap}>
        {storyBlocks.map((block, idx) => (
          <StorySection key={block.title} block={block} idx={idx} />
        ))}
      </div>

      {/* FEATURED */}
      <section className={styles.featured}>
        <div className={styles.featuredBg} />
        <div className={styles.featuredInner}>
          <h2 className={styles.featuredTitle}>
            Featured Jerusalem Properties
          </h2>

          <div className={styles.featuredDivider}>
            <div className={styles.featuredLine2} />
            <div className={styles.featuredDot} />
            <div className={styles.featuredLine1} />
          </div>

          <div className="grid gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {properties.slice(0, 3).map((property) => (
              <div key={property.id} className={styles.propertyHover}>
                <div className={styles.propertyHalo} />
                <div className="relative rounded-4xl">
                  <PropertyCard property={property} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link href="/properties" className={styles.featuredLink}>
              View all Jerusalem properties
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.preFooterImage} style={{ height: "480px" }}>
        <Image
          src="/jhr-logos/svg/LOGO_%20JHR%20_%20FINAL-09.svg"
          alt="Jerusalem Heritage Realty"
          fill
          sizes="100vw"
          className={styles.preFooterImg}
        />
        <div className={styles.preFooterOverlay} />
      </section>

      <Footer />

      {/* Scroll pop-in (no client component needed) */}
      <Script id="jhr-reveal" strategy="afterInteractive">{`
        (() => {
          const els = Array.from(document.querySelectorAll('[data-reveal]'));
          if (!('IntersectionObserver' in window) || els.length === 0) {
            els.forEach(el => el.classList.add('jhr-visible'));
            return;
          }

          const io = new IntersectionObserver((entries) => {
            for (const e of entries) {
              if (e.isIntersecting) {
                e.target.classList.add('jhr-visible');
                io.unobserve(e.target);
              }
            }
          }, { threshold: 0.18, rootMargin: '0px 0px -10% 0px' });

          els.forEach(el => io.observe(el));
        })();
      `}</Script>
      <Script id="jhr-sticky-nav-script" strategy="afterInteractive">{`
  (() => {
    const nav = document.getElementById("jhr-sticky-nav");
    const trigger = document.getElementById("jhr-story-start");
    if (!nav || !trigger) return;

    const set = (v) => nav.setAttribute("data-visible", v ? "true" : "false");

    const update = () => {
      // show once we're at/past the first pixel of the section after hero
      set(trigger.getBoundingClientRect().top <= 1);
    };

    // start hidden + sync initial state
    set(false);
    update();

    // show immediately when user clicks the down arrow (so it appears during smooth scroll)
    const cue = document.querySelector(".${styles.scrollCue}");
    cue?.addEventListener("click", () => {
      set(true);
      requestAnimationFrame(() => requestAnimationFrame(update));
    });

    // keep it correct on real scrolling too
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(update, { threshold: 0 });
      io.observe(trigger);
    }
  })();
`}</Script>
    </>
  );
}
