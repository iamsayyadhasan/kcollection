"use client";

import { useEffect, useRef } from "react";

const images = [
  "/Social/social-1.jpg",
  "/Social/social-2.jpg",
  "/Social/social-3.jpg",
  "/Social/social-4.jpg",
  "/Social/social-5.jpg",
];

export default function Socialmedia() {
  const trackRef = useRef(null);

  useEffect(() => {
    let x = 0;
    let animationId;

    const animate = () => {
      x -= 0.4; // 👈 speed (smaller = slower)

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${x}px)`;

        // reset when half scrolled (because images are duplicated)
        if (Math.abs(x) >= trackRef.current.scrollWidth / 2) {
          x = 0;
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section className="w-full bg-white py-20 overflow-hidden">
      {/* TEXT */}
      <div className="max-w-3xl mx-auto text-center mb-14 px-4">
        <p className="text-sm uppercase tracking-widest text-gray-500 mb-3">
          (Social)
        </p>

    <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-gray-900">
  Follow us on social media <br />
  <a
    href="https://www.instagram.com/khans__collection/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-gray-600 transition underline-offset-4 hover:underline"
  >
    @KhansCollection
  </a>{" "}
  for updates
</h2>

      </div>

      {/* MOVING IMAGES */}
      <div className="relative w-full overflow-hidden">
        <ul
          ref={trackRef}
          className="flex gap-3 w-max will-change-transform"
        >
          {/* duplicated images for infinite loop */}
          {[...images, ...images].map((img, i) => (
            <li key={i} className="flex-shrink-0">
              <img
                src={img}
                alt="Instagram post"
                className="w-[255px] h-[255px] object-cover"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
