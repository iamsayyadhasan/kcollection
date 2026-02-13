import React from "react";

function Craft() {
  return (
    <div className="mt-20 max-w-6xl mx-auto px-5">
      
      {/* Main two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

        {/* LEFT COLUMN: Title */}
        <div className="lg:-ml-24">
          <h2 className="text-3xl sm:text-4xl font-semibold">
            Our Craft & Curation
          </h2>
        </div>

        {/* RIGHT COLUMN: Text + Image */}
        <div className="space-y-6">
          
          <p className="text-sm sm:text-base leading-relaxed text-gray-700">
            Khan’s Boutique deals exclusively in original Pakistani brands, known for their superior fabrics, intricate embroidery, and exceptional craftsmanship. From luxury formals to refined everyday wear, each collection is thoughtfully curated to ensure authenticity and excellence.
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-gray-700">
            We take pride in offering only genuine designs, celebrating the artistry and heritage of Pakistani fashion — pieces made to be worn, loved, and cherished for years.
          </p>

          {/* Responsive image (same behavior as earlier section) */}
          <div className="relative w-full h-[280px] sm:h-[320px] lg:h-[380px] overflow-hidden">
            <img
              src="/Media/Craft.WEBP"
              alt="Our Craft & Curation"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

        </div>

      </div>
    </div>
  );
}

export default Craft;
