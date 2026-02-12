import React from "react";

function Philosphy() {
  return (
    <section className="mt-14 md:mt-20 max-w-6xl mx-auto px-5">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-24 items-start">

        {/* TITLE */}
        <div className="lg:-ml-24">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 lg:mb-0">
            Philosophy
          </h2>
        </div>

        {/* CONTENT */}
        <div className="space-y-4 md:space-y-6">

          <p className="text-sm sm:text-base leading-relaxed text-gray-700">
            We believe in curating pieces that speak quietly yet powerfully.
            Every outfit we offer is chosen with care, focusing on grace,
            comfort, and enduring style. Our aim is to bring designs that feel
            effortless, elegant, and wearable — pieces that fit seamlessly into
            modern lifestyles while honoring classic aesthetics.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-gray-700">
            As a mother–daughter brand, our philosophy is deeply rooted in
            trust, warmth, and a personal connection with our customers.
          </p>

          <img
            src="/images/apa.jpg"
            alt="Model posing thoughtfully against pink background"
            className="w-full max-w-full md:max-w-2xl object-cover mt-2 md:mt-4"
          />

        </div>

      </div>
    </section>
  );
}

export default Philosphy;
