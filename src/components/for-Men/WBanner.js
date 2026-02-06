"use client";

export default function Mbanner() {
  return (
    <section
      aria-label="Men Banner"
      className="relative w-full h-[65vh] md:h-[80vh] lg:h-[80vh] overflow-hidden"
    >
      {/* Image */}
      <picture>
        <source media="(max-width: 767px)" srcSet="/images/jmandes.jpeg" />
        <source
          media="(min-width: 768px)"
          srcSet="/images/jmandes.jpeg"
        />
        <img
          src="/images/jmandes.jpg"
          alt="For Men"
          className="w-full h-full object-cover"
        />
      </picture>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Text Bottom Left */}
      <div className="absolute bottom-8 left-6 md:bottom-12 md:left-12 lg:left-20 text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
          For Men
        </h1>
      </div>
    </section>
  );
}
