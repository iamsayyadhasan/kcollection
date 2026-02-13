"use client";

export default function StoryBanner() {
  return (
    <section
      aria-label="Our Story Banner"
      className="relative w-full h-[65vh] md:h-[80vh] lg:h-[80vh] overflow-hidden"
    >
      <picture>
        {/* Mobile */}
        <source media="(max-width: 767px)" srcSet="/images/storybanner.jpg" />

        {/* Desktop */}
        <source media="(min-width: 768px)" srcSet="/Media/img_0311.jpg" />

        {/* Fallback (ALWAYS KEEP SAME FOLDER FAMILY) */}
        <img
          src="/Media/img_0311.jpg"
          alt="Our Story"
          className="w-full h-full object-cover"
        />
      </picture>

      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute bottom-8 left-6 md:bottom-12 md:left-12 lg:left-20 text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl">
          Our Story
        </h1>
      </div>
    </section>
  );
}
