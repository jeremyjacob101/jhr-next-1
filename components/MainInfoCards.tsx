"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MainCard } from "@/types/maincard";
import { montserrat } from "@/lib/fonts";

const cards: MainCard[] = [
  {
    title: "Your Jerusalem Real Estate Partner",
    body: "Navigating Jerusalem's real estate market from abroad can be challenging. At JHR, we understand your unique needs and offer personalized guidance every step of the way. Let us simplify the process for you.",
    img: "/icons/handshake-svgrepo-com.svg",
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
    img: "/icons/team-teamwork-users-svgrepo-com.svg",
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
    img: "/icons/family-svgrepo-com.svg",
  },
  {
    title: "Locations",
    body: "Explore our exclusive focus areas such as Rechavia, Mamila, Talbiya, and more. Specializing in new construction, Tama 38 urban renewal projects, penthouses, and private houses in prime central Jerusalem locations.",
    img: "/icons/house-chimney-blank-svgrepo-com.svg",
  },
];

function InfoCard({
  card,
  alignRight,
}: {
  card: MainCard;
  alignRight: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const bottomOffset =
      typeof window !== "undefined" && window.innerWidth < 640 ? 60 : 100;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target !== node) return;

          if (entry.isIntersecting) {
            setVisible(true);
          } else {
            setVisible(false);
          }
        });
      },
      {
        root: null,
        rootMargin: `0px 0px -${bottomOffset}px 0px`,
        threshold: 0,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const directionClass = alignRight ? "translate-x-8" : "-translate-x-8";

  return (
    <div className={`flex ${alignRight ? "justify-end" : "justify-start"}`}>
      <div className="w-[90vw] sm:w-[65vw]" ref={ref}>
        <div
          className={`group rounded-3xl border border-white/15 bg-white/10 backdrop-blur-sm shadow-xl overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-2xl ${
            visible
              ? "opacity-100 translate-x-0"
              : `opacity-0 ${directionClass}`
          }`}
        >
          <div
            className={`flex flex-col md:flex-row ${
              alignRight ? "md:flex-row-reverse" : ""
            } p-6 md:p-7 gap-4 md:gap-6`}
          >
            {card.img ? (
              <div className="flex justify-center md:justify-start">
                <div className="h-36 w-36 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                  <Image
                    src={card.img}
                    alt={card.title}
                    width={96}
                    height={96}
                    className="object-contain"
                  />
                </div>
              </div>
            ) : null}

            <div className="flex-1">
              <h2
                className={`${montserrat.className} text-2xl md:text-3xl font-extrabold text-[#FAF9F6] leading-tight transition-colors duration-200 group-hover:text-[#ad8548]`}
              >
                {card.title}
              </h2>

              {card.body ? (
                <p className="mt-4 text-[18px] text-[#FAF9F6]/85 leading-normal">
                  {card.body}
                </p>
              ) : null}

              {card.bullets && card.bullets.length ? (
                <ul className="mt-4 text-[16.5px] space-y-0.5 list-disc list-inside text-[#FAF9F6]/90">
                  {card.bullets.map((item) => (
                    <li key={item} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}

              {card.footer ? (
                <p className="mt-4 text-[18px] text-[#FAF9F6]/85 leading-normal">
                  {card.footer}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MainInfoCards() {
  return (
    <section className="mx-5 mb-12 rounded-4xl overflow-hidden bg-linear-to-b from-blue-950 via-blue-950 to-blue-900">
      <div className="max-w-6xl mx-auto px-5 py-14">
        <div className="space-y-7">
          {cards.map((card, idx) => (
            <InfoCard key={card.title} card={card} alignRight={idx % 2 !== 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
