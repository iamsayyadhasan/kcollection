import React from "react";

function Origin() {
  return (
    <div className="mt-20 max-w-6xl mx-auto px-5">
      
      {/* Main two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">

        {/* LEFT COLUMN: Title */}
        <div className="lg:-ml-24">
          <h2 className="text-5xl font-semibold">
            Origin
          </h2>
        </div>

        {/* RIGHT COLUMN: Text + Image (UNCHANGED) */}
        <div className="space-y-6">
          
          <p className="text-base leading-relaxed text-gray-700">
            Khan’s Boutique was born in 2017 from a shared love for timeless fashion and fine craftsmanship. Founded by a mother–daughter duo, our journey began in Aligarh, Uttar Pradesh, where tradition, elegance, and attention to detail have always been part of everyday life.
          </p>

          <p className="text-base leading-relaxed text-gray-700">
            Comfort, versatility, and elegance exist together in balance, never competing, always complementing.
          </p>

          <p className="text-base leading-relaxed text-gray-700">
            What started as a small passion project soon grew into a boutique trusted for authenticity, quality, and refined taste. At Khan’s Boutique, we believe clothing is more than fashion — it is an expression of identity, culture, and confidence.
          </p>

          <img
            src="/images/apaayesha.jpg"
            alt="Model posing thoughtfully against pink background"
            className="w-full max-w-2xl object-cover"
          />
        </div>

      </div>
    </div>
  );
}

export default Origin;
