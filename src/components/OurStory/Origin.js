import React from "react";

function Origin() {
  return (
    <section className="mt-14 md:mt-20 max-w-6xl mx-auto px-5">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-24 items-start">

        {/* TITLE */}
        <div className="lg:-ml-24">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 lg:mb-0">
            Origin
          </h2>
        </div>

        {/* CONTENT */}
        <div className="space-y-4 md:space-y-6">

          <p className="text-sm sm:text-base leading-relaxed text-gray-700">
            Khan’s Boutique was born in 2017 from a shared love for timeless fashion and fine craftsmanship.
            Founded by a mother–daughter duo, our journey began in Aligarh, Uttar Pradesh,
            where tradition, elegance, and attention to detail have always been part of everyday life.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-gray-700">
            Comfort, versatility, and elegance exist together in balance, never competing, always complementing.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-gray-700">
            What started as a small passion project soon grew into a boutique trusted for authenticity,
            quality, and refined taste. At Khan’s Boutique, we believe clothing is more than fashion —
            it is an expression of identity, culture, and confidence.
          </p>

          <img
            src="/images/apaayesha.jpg"
            alt="Model posing thoughtfully against pink background"
            className="w-full max-w-full md:max-w-2xl object-cover mt-2 md:mt-4"
          />

        </div>

      </div>
    </section>
  );
}

export default Origin;
