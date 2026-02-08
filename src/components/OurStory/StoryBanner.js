"use client";

import Image from "next/image";

export default function StoryBanner() {
  return (
    <section
      aria-label="Our Story Banner"
      className="relative w-full h-[65vh] md:h-[80vh] lg:h-[80vh] overflow-hidden"
    >
      {/* ================= MOBILE IMAGE ================= */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src="/images/storybanner.jpg"
          alt="Our Story"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* ================= DESKTOP IMAGE ================= */}
      <div className="absolute inset-0 hidden md:block">
        <Image
          src="/Social/IMG_0311.jpg"
          alt="Our Story"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Text */}
      <div className="absolute bottom-8 left-6 md:bottom-12 md:left-12 lg:left-20 text-white z-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl">
          Our Story
        </h1>
      </div>
    </section>
  );
}
