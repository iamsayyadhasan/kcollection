import Link from "next/link";

export default function Collections() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* MEN COLLECTION */}
        <div className="relative h-[670px]">
          <img
            src="/images/jj-1.jpeg"
            alt="Men Collection"
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute bottom-8 left-8 text-white">
            <h3 className="text-3xl font-semibold mb-4">
              Men’s <br /> Collection
            </h3>

            <Link href="/Men">
              <button className="bg-white text-black px-4 py-2 text-sm cursor-pointer">
                Shop Now →
              </button>
            </Link>
          </div>
        </div>

        {/* WOMEN COLLECTION */}
        <div className="relative h-[670px]">
          <img
            src="/images/Charizma-1.jpeg"
            alt="Women Collection"
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute bottom-8 left-12 text-white">
            <h3 className="text-3xl font-semibold mb-4">
              Women’s <br /> Collection
            </h3>

            <Link href="/Women">
              <button className="bg-white text-black px-4 py-2 text-sm  cursor-pointer">
                Shop Now →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
