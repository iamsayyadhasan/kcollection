"use client";

import { useEffect, useRef, useState } from "react";

const slides = [
  {
    id: 1,
    desktop: "/images/jj-2.jpg",
    mobile: "/images/jj-1.jpeg",
    alt: "Seasonal essentials for men",
  },
  {
    id: 2,
    desktop: "/images/hero-desktop-1.jpg",
    mobile: "/images/Charizma-1.jpeg",
    alt: "Seasonal essentials for women",
  },
  {
    id: 3,
    desktop: "/images/aghanoor-2.jpg",
    mobile: "/images/aghanoor-1.jpeg",
    alt: "New arrivals",
  },
];

export default function Review({
  autoplay = true,
  autoplayMs = 6000,
  parallaxSpeed = 0.04,
}) {
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);

  /* ✅ CONTROLLED PARALLAX (NO TOP GAP) */
  useEffect(() => {
    function onScroll() {
      if (!containerRef.current) return;

      const scroll = Math.min(window.scrollY, 120); // limit movement
      containerRef.current.style.transform = `translateY(${
        scroll * parallaxSpeed
      }px)`;
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [parallaxSpeed]);

  /* ✅ AUTOPLAY */
  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      autoplayMs
    );

    return () => clearInterval(interval);
  }, [autoplay, autoplayMs]);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden -mt-16"
    >
      {/* ================= SLIDER ================= */}
      <div className="relative w-full h-[42vh] md:h-[50vh] lg:h-[56vh]">
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === index ? "opacity-100 z-10" : "opacity-0"
            }`}
          >
            <picture>
              <source media="(max-width:767px)" srcSet={s.mobile} />
              <img
                src={s.desktop}
                alt={s.alt}
                className="w-full h-full object-cover"
              />
            </picture>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />
          </div>
        ))}
      </div>

      {/* ================= REVIEW (LEFT CORNER) ================= */}
      <div className="absolute bottom-14 left-6 md:left-12 lg:left-20 max-w-md z-20 text-white">
        <p className="text-sm text-gray-300 mb-3">(Reviews)</p>

        <p className="text-xl md:text-2xl font-semibold leading-snug">
          “I love the quality — the fabric feels premium and the fit is perfect.
          I’ve received compliments and will order.”
        </p>

        <div className="mt-4 text-sm text-gray-300">
          <p className="font-medium text-white">Emma Collins</p>
          <p className="flex items-center gap-2">
            <span>✔</span> Verified Buyer
          </p>
        </div>
      </div>

      {/* ================= INDICATORS ================= */}
      <div className="absolute bottom-6 left-0 right-0  justify-start flex gap-5 z-20 px-6">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="w-16 h-1 bg-white/40 rounded-full overflow-hidden"
          >
            <div
              className="h-full bg-white"
              style={{
                width: index === i ? "100%" : "0%",
                transition: `width ${autoplayMs}ms linear`,
              }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
