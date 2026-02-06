"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function YouMightLike() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/product/get-all-products`
        );
        const data = await res.json();

        setProducts(data.products || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-20 text-center text-gray-500">
        Loading recommendations...
      </section>
    );
  }

  return (
    <section className="w-full py-20 bg-white">
      {/* TEXT */}
      <div className="max-w-3xl mx-auto text-center mb-14 px-4">
        <p className="text-sm uppercase tracking-widest text-gray-500 mb-3">
          (Recommended)
        </p>

        <h2 className="text-4xl md:text-5xl font-semibold text-black">
          You Might Like
        </h2>
      </div>

      {/* GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {products.slice(0, 3).map((product) => {
          const image =
            product.images?.[0]?.startsWith("http")
              ? product.images[0]
              : `${API_BASE_URL}${product.images?.[0]}`;

          return (
            <Link
              key={product._id}
              href={`/products/${product.slug}`}
              className="group relative overflow-hidden rounded-lg bg-gray-100"
            >
              <img
                src={image || "/placeholder.png"}
                alt={product.title}
                className="w-full h-full object-cover transition group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

              <div className="absolute bottom-0 p-5 text-white">
                <p className="text-xs uppercase text-gray-300">
                  {product.brand}
                </p>
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <span className="text-base font-semibold">
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
