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
        src: "https://images.unsplash.com/photo-1544986581-efac024faf62?auto=format&fit=crop&w=1600&q=70",
        alt: "Jerusalem stone architecture placeholder",
      },
      {
        src: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=1600&q=70",
        alt: "Jerusalem city view placeholder",
      },
      {
        src: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=70",
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
        src: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1600&q=70",
        alt: "Elegant interior placeholder",
      },
      {
        src: "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=1600&q=70",
        alt: "Luxury apartment placeholder",
      },
      {
        src: "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1600&q=70",
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
        src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=70",
        alt: "Consultation placeholder",
      },
      {
        src: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=70",
        alt: "Meeting placeholder",
      },
      {
        src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=70",
        alt: "Teamwork placeholder",
      },
    ],
  },
  {
    title: "Locations",
    body: "Explore our exclusive focus areas such as Rechavia, Mamila, Talbiya, and more. Specializing in new construction, Tama 38 urban renewal projects, penthouses, and private houses in prime central Jerusalem locations.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1526481280695-3c687fd5432c?auto=format&fit=crop&w=1600&q=70",
        alt: "Neighborhood placeholder",
      },
      {
        src: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1600&q=70",
        alt: "City map placeholder",
      },
      {
        src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=70",
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
                      unoptimized
                      sizes="(max-width: 900px) 100vw, 50vw"
                      className={styles.mediaImg}
                      priority={idx === 0 && i < 2}
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
          unoptimized
          sizes="100vw"
          priority
          className={styles.heroImg}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroGlow} />
        <div className={styles.scan} />

        <div className={styles.heroInner}>
          <div className={styles.heroCard}>
            <p className={styles.heroKicker}>WELCOME TO</p>

            <h1 className={styles.heroTitle}>JERUSALEM HERITAGE REALTY</h1>

            <div className={styles.heroRule} />

            <div className={styles.heroCopy}>
              <p>Your Home.</p>
              <p>Your Heritage.</p>
              <p>Your Future in Jerusalem.</p>
            </div>
          </div>
        </div>

        <div className={styles.heroBottomFade} />
      </section>

      {/* FULL-HEIGHT STORY SECTIONS */}
      <div className={styles.storyWrap}>
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
    const hero = document.getElementById("jhr-hero");
    if (!nav || !hero) return;

    const show = () => nav.setAttribute("data-visible", "true");
    const hide = () => nav.setAttribute("data-visible", "false");

    // start hidden
    hide();

    const updateNow = () => {
      const rect = hero.getBoundingClientRect();
      // show only when we've fully passed the hero
      if (rect.bottom <= 0) show();
      else hide();
    };

    updateNow();

    if (!("IntersectionObserver" in window)) {
      window.addEventListener("scroll", updateNow, { passive: true });
      return;
    }

    const io = new IntersectionObserver(() => updateNow(), { threshold: 0 });
    io.observe(hero);
  })();
`}</Script>
    </>
  );
}
