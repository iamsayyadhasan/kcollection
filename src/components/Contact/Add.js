import { Link } from "lucide-react";
import React from "react";

export default function ContactSection() {
  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 py-24">

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">

          {/* LEFT SIDE */}
          <div className="md:col-span-7">
            <p className="text-sm text-gray-500 mb-6">
              (Contact us)
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight">
              We’d Love to Hear <br /> from You
            </h1>
          </div>

          {/* RIGHT SIDE */}
          <div className="md:col-span-5 space-y-10">

            {/* Address */}
            <div>
              <p className="text-sm text-gray-500 mb-2">
                (Address)
              </p>
              <p className="text-base">
                Kabir Colony, Patwari Ka Nagla <br/> Aligarh, Uttar Pradesh 202001
              </p>
            </div>
{/* Socials */}
<div>
  <p className="text-sm text-gray-500 mb-2">(Socials)</p>

  <a
    href="https://www.instagram.com/khans__collection"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 text-base"
  >
    Instagram
  </a>

  <a
    href="https://www.facebook.com/khanscollezioni"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 text-base"
  >
    Facebook
  </a>
</div>

            {/* Customer Support */}
            <div>
              <p className="text-sm text-gray-500 mb-2">
                (Customer Support)
              </p>
              <p className="text-base">
                hello@khanscollection.com
              </p>
            </div>

            {/* Partnerships */}
            {/* <div>
              <p className="text-sm text-gray-500 mb-2">
                (Partnerships & Collaborations)
              </p>
              <p className="text-base">
                collab@marion.com
              </p>
            </div> */}

          </div>
        </div>
      </div>
    </section>
  );
}
