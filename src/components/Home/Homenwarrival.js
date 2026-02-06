"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function HomeNewArrival() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/product/get-all-products`
        );
        const data = await res.json();

        const allProducts = data.products || [];

        // ✅ Only New Arrivals
        const newArrivals = allProducts
          .filter((item) => item.isNew)
          .sort(
            (a, b) =>
              new Date(b.createdAt || b.updatedAt) -
              new Date(a.createdAt || a.updatedAt)
          )
          .slice(0, 3); // latest 3

        setProducts(newArrivals);
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  if (loading) {
    return (
      <section className="py-20 text-center text-gray-500">
        Loading new arrivals...
      </section>
    );
  }

  return (
    <section className="w-full py-20 bg-white">
      {/* TEXT */}
      <div className="max-w-3xl mx-auto text-center mb-14 px-4">
        <p className="text-sm uppercase tracking-widest text-gray-500 mb-3">
          (New Arrivals)
        </p>

        <h2 className="text-4xl md:text-5xl font-semibold text-black leading-tight">
          This Season&apos;s <br /> Must-Haves
        </h2>
      </div>

      {/* PRODUCTS GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-4">
        {products.map((product) => {
          const image =
            product.images?.[0] &&
            (product.images[0].startsWith("http")
              ? product.images[0]
              : `${API_BASE_URL}${product.images[0]}`);

          return (
            <Link
              key={product._id}
              href={`/products/${product.slug}`}
              className="group flex flex-col"
            >
              {/* IMAGE WRAPPER */}
              <div className="relative bg-gray-100 h-[485px] flex items-center justify-center overflow-hidden">
                
                {/* NEW BADGE */}
                <span className="absolute top-4 left-4 bg-black text-white text-xs px-3 py-1 z-10">
                  New
                </span>

                <img
                  src={image || "/placeholder.png"}
                  alt={product.title}
                  className="max-h-full object-contain transition duration-500 group-hover:scale-105"
                />
              </div>

              {/* TEXT */}
              <h3 className="mt-4 font-medium text-lg">
                {product.title}
              </h3>

              <p className="text-sm text-gray-500">
                {product.brand}
              </p>

              {/* PRICE */}
              <div className="mt-1 flex items-center gap-3">
                {product.mrp && product.mrp > product.price && (
                  <span className="text-sm text-gray-400 line-through">
                    ₹{product.mrp}
                  </span>
                )}
                <span className="text-base font-semibold text-black">
                  ₹{product.price}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
