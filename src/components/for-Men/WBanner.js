"use client";
import Image from "next/image";

export default function Mbanner() {
  return (
    <section
      aria-label="Men Banner"
      className="relative w-full h-[65vh] md:h-[80vh] lg:h-[80vh] overflow-hidden"
    >

      {/* 📱 MOBILE IMAGE */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src="/images/jj-2.jpg"   // mobile image (you can change later)
          alt="For Men"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* 💻 DESKTOP IMAGE */}
      <div className="absolute inset-0 hidden md:block">
        <img
          src="/images/jmandes.jpeg"
          alt="For Men"
          className="w-full h-full object-cover"
        />
      </div>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/40 z-[1]" />

      {/* TEXT */}
      <div className="absolute bottom-8 left-6 md:bottom-12 md:left-12 lg:left-20 text-white z-[2]">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
          For Men
        </h1>
      </div>

    </section>
  );
}
