"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
const slides = [
  {
    id: 1,
    title: "Seasonal Essentials\nFor Men",
    cta: "Shop Now",
    desktop: "/images/jj-2.jpg",
    mobile: "/images/jj-1.jpeg",
    alt: "Seasonal essentials for men",
    href: "/Men", // 👈 MEN ROUTE
  },
  {
    id: 2,
    title: "Seasonal Essentials\nFor Women",
    cta: "Shop Now",
    desktop: "/images/hero-desktop-1.jpg",
    mobile: "/images/Charizma-1.jpeg",
    alt: "Seasonal essentials for women",
    href: "/Women", // 👈 WOMEN ROUTE
  },
  {
    id: 3,
    title: "New Timeless\nArrivals This Season",
    cta: "Shop Now",
    desktop: "/images/aghanoor-2.jpg",
    mobile: "/images/aghanoor-1.jpeg",
    alt: "New Timeless\nArrivals This Season",
    href: "/Women", // 👈 NEW ARRIVALS ROUTE
  },
];

export default function Hero({
  autoplay = true,
  autoplayMs = 3000,
  parallaxSpeed = 0.06,
}) {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const rafRef = useRef(null);

  // Fade-in animation
  useEffect(() => {
    setIsVisible(false);

    const show = setTimeout(() => setIsVisible(true), 120);

    return () => clearTimeout(show);
  }, []);

  // Parallax effect
  useEffect(() => {
    function onScroll() {
      if (!containerRef.current) return;
      const top = window.scrollY || window.pageYOffset;
      containerRef.current.style.transform = `translateY(${
        top * parallaxSpeed
      }px)`;
    }

    function loop() {
      onScroll();
      rafRef.current = requestAnimationFrame(loop);
    }

    loop();

    return () => cancelAnimationFrame(rafRef.current);
  }, [parallaxSpeed]);

  function prev() {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  }

  function next() {
    setIndex((i) => (i + 1) % slides.length);
  }

  // Autoplay
  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      next();
    }, autoplayMs);

    return () => clearInterval(interval);
  }, [autoplay, autoplayMs]);

  return (
    <section
      aria-label="Hero"
      ref={containerRef}
      className={`w-full relative overflow-hidden transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Slide stack */}
      <div className="relative w-full h-[62vh] md:h-[72vh] lg:h-[100vh]">
        {slides.map((s, i) => {
          const active = i === index;
          return (
            <div
              key={s.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                active ? "opacity-100 z-10" : "opacity-0 pointer-events-none"
              }`}
            >
              {/* Image */}
              <picture>
                <source media="(max-width: 767px)" srcSet={s.mobile} />
                <source media="(min-width: 768px)" srcSet={s.desktop} />
                <img
                  src={s.desktop}
                  alt={s.alt}
                  className="w-full h-full object-cover"
                />
              </picture>

              {/* Overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.7) 100%)",
                }}
              />

              {/* Content */}
              <div className="absolute inset-0 flex items-end">
                <div className="max-w-[1200px] w-full mx-auto px-6 md:px-12 lg:px-20 pb-10 md:pb-14 lg:pb-16">
                  <p className="text-white text-sm mb-2">01–0{i + 1}</p>

                  <h2 className="text-white font-extrabold whitespace-pre-line leading-tight text-2xl md:text-4xl lg:text-5xl">
                    {s.title}
                  </h2>

                  <div className="mt-5">
                    <Link
                      href={s.href}
                      className="inline-flex items-center gap-2 bg-white text-black text-sm font-medium px-5 py-2 rounded-md shadow-md hover:opacity-90 transition"
                    >
                      {s.cta} <span className="text-xs">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Line Indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 z-20 px-6">
        {slides.map((s, i) => {
          const isActive = index === i;
          return (
            <button
              key={s.id}
              onClick={() => setIndex(i)}
              className="w-20 h-1 bg-white/40 overflow-hidden rounded-full relative"
            >
              {/* Inner animated bar */}
              <div
                className="absolute top-0 left-0 h-full bg-white"
                style={{
                  width: isActive ? "100%" : "0%",
                  transition: isActive
                    ? `width ${autoplayMs}ms linear`
                    : "none",
                }}
              ></div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
