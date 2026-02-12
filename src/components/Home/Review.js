"use client";

import { useEffect, useRef, useState } from "react";

const slides = [
  {
    id: 1,
    desktop: "/images/jj-2.jpg",
    mobile: "/images/jj-1.jpeg",
    alt: "Seasonal essentials for men",
    review:
      "Excellent collection, competitive pricing and prompt delivery, you can buy without second thought.",
    name: "Sania Ahmad",
  },
  {
    id: 2,
    desktop: "/images/hero-desktop-1.jpg",
    mobile: "/images/Charizma-1.jpeg",
    alt: "Seasonal essentials for women",
    review:
      "Beautiful collection and quick delivery. Products are genuine. Love their collection.",
    name: "Bona Sarkar",
  },
  {
    id: 3,
    desktop: "/images/aghanoor-2.jpg",
    mobile: "/images/aghanoor-1.jpeg",
    alt: "New arrivals",
    review:
      "Beautiful designs and very cooperative service. Will definitely order again!",
    name: "Fatima Noor",
  },
];

export default function Review(props) {
  const autoplay = props.autoplay ?? true;
  const autoplayMs = props.autoplayMs ?? 3000;
  const parallaxSpeed = props.parallaxSpeed ?? 0.04;

  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);

  /* PARALLAX */
  useEffect(() => {
    function onScroll() {
      if (!containerRef.current) return;
      const scroll = Math.min(window.scrollY, 120);
      containerRef.current.style.transform =
        "translateY(" + scroll * parallaxSpeed + "px)";
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [parallaxSpeed]);

  /* AUTOPLAY */
  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, autoplayMs);

    return () => clearInterval(interval);
  }, [autoplay, autoplayMs]);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden -mt-16"
    >
      {/* SLIDER */}
      <div className="relative w-full h-[46vh] sm:h-[50vh] md:h-[55vh] lg:h-[60vh]">
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

            {/* Better mobile readability overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent md:bg-gradient-to-b md:from-black/30 md:via-black/50 md:to-black/80" />
          </div>
        ))}
      </div>

      {/* REVIEW CONTENT */}
      <div className="absolute bottom-20 sm:bottom-16 left-4 sm:left-6 md:left-12 lg:left-20 right-4 sm:right-auto max-w-lg z-20 text-white">
        <p className="text-xs sm:text-sm text-gray-300 mb-2">(Reviews)</p>

        <p className="text-base sm:text-lg md:text-xl font-semibold leading-snug">
          “{slides[index].review}”
        </p>

        <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-300">
          <p className="font-medium text-white">{slides[index].name}</p>

          <p className="flex items-center gap-2">
            <span>✔</span> Verified Buyer
          </p>

          <button
            onClick={() =>
              window.open(
                "https://www.google.com/maps/place/Khan+Collection-+Pakistani+Suits/@27.925104,78.0727221,17z/data=!4m8!3m7!1s0x3974a5e14fd181e7:0xc7fe98b0861e5655!8m2!3d27.925104!4d78.0753024!9m1!1b1!16s%2Fg%2F11f66f4h17",
                "_blank"
              )
            }
            className="mt-3 inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-white underline underline-offset-4 hover:opacity-80"
          >
            View all Google Reviews
          </button>
        </div>
      </div>

      {/* INDICATORS */}
      <div className="absolute bottom-6 left-0 right-0 flex gap-3 sm:gap-5 z-20 px-6">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="w-12 sm:w-16 h-1 bg-white/40 rounded-full overflow-hidden"
          >
            <div
              className="h-full bg-white"
              style={{
                width: index === i ? "100%" : "0%",
                transition: "width " + autoplayMs + "ms linear",
              }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
