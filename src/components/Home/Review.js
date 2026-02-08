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
  const [showReviews, setShowReviews] = useState(false);
  const containerRef = useRef(null);

  /* ✅ CONTROLLED PARALLAX (NO TOP GAP) */
  useEffect(() => {
    function onScroll() {
      if (!containerRef.current) return;

      const scroll = Math.min(window.scrollY, 120);
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
      autoplayMs,
    );

    return () => clearInterval(interval);
  }, [autoplay, autoplayMs]);

  return (
    <>
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

        {/* ================= REVIEW CONTENT ================= */}
        <div className="absolute bottom-14 left-6 md:left-12 lg:left-20 max-w-md z-20 text-white">
          <p className="text-sm text-gray-300 mb-3">(Reviews)</p>

          <p className="text-xl md:text-2xl font-semibold leading-snug">
            “Excellent collection, competitive pricing and prompt delivery, you
            can buy from them without giving a second thought to the
            authenticity of the product.”
          </p>

          <div className="mt-4 text-sm text-gray-300">
            <p className="font-medium text-white">Sania Ahmad</p>
            <p className="flex items-center gap-2">
              <span>✔</span> Verified Buyer
            </p>

            {/* OPEN GOOGLE REVIEWS */}
            <button
              onClick={() =>
                window.open(
                  "https://www.google.com/maps/place/Khan+Collection-+Pakistani+Suits/@27.925104,78.0727221,17z/data=!4m8!3m7!1s0x3974a5e14fd181e7:0xc7fe98b0861e5655!8m2!3d27.925104!4d78.0753024!9m1!1b1!16s%2Fg%2F11f66f4h17?entry=ttu&g_ep=EgoyMDI2MDIwNC4wIKXMDSoASAFQAw%3D%3D",
                  "_blank",
                )
              }
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white underline underline-offset-4 hover:opacity-80"
            >
              View all Google Reviews
            </button>
          </div>
        </div>

        {/* ================= INDICATORS ================= */}
        <div className="absolute bottom-6 left-0 right-0 flex gap-5 z-20 px-6">
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

      {/* ================= GOOGLE REVIEWS MODAL ================= */}
      {showReviews && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 px-4">
          <div className="relative w-full max-w-4xl bg-white rounded-xl overflow-hidden">
            {/* Close button */}
            <button
              onClick={() => setShowReviews(false)}
              className="absolute top-3 right-4 z-10 text-black text-xl"
              aria-label="Close reviews"
            >
              ✕
            </button>

            {/* Google Reviews iframe */}
            <div className="w-full h-[70vh]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3525.2459626139826!2d78.0727221105923!3d27.92510397595855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3974a5e14fd181e7%3A0xc7fe98b0861e5655!2sKhan%20Collection-%20Pakistani%20Suits!5e0!3m2!1sen!2sin!4v1770568136739!5m2!1sen!2sin"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
