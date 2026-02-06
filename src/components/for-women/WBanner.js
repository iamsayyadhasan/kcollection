"use client";
import Image from "next/image";

export default function Wbanner() {
  return (
    <section
      aria-label="Women Banner"
      className="relative w-full h-[65vh] md:h-[80vh] overflow-hidden"
    >
      <Image
        src="/images/hero-desktop-1.jpg"
        alt="For Women"
        fill
        priority   // 🔥 LCP FIX
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="absolute bottom-8 left-6 md:bottom-12 md:left-12 text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
          For Women
        </h1>
      </div>
    </section>
  );
}
