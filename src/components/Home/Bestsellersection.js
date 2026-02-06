"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function BestSellers() {
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
           `${API_BASE_URL}/api/product/get-all-products`
        );
        const data = await res.json();

        const products = data.products || [];

        // 🔹 Latest product per brand
        const latestByBrand = {};

        products.forEach((product) => {
          if (!product.brand) return;

          if (
            !latestByBrand[product.brand] ||
            new Date(product.updatedAt) >
              new Date(latestByBrand[product.brand].updatedAt)
          ) {
            latestByBrand[product.brand] = product;
          }
        });

        setLatestProducts(Object.values(latestByBrand));
      } catch (error) {
        console.error("Error fetching best sellers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-20 text-center text-gray-500">
        Loading best sellers...
      </section>
    );
  }

  return (
    <section className="w-full py-20 bg-white">
      {/* TEXT */}
      <div className="max-w-3xl mx-auto text-center mb-14 px-4">
        <p className="text-sm uppercase tracking-widest text-gray-500 mb-3">
          (Bestsellers)
        </p>

        <h2 className="text-4xl md:text-5xl font-semibold text-black leading-tight">
          Our Most Popular Pieces <br className="hidden md:block" />
          This Season
        </h2>
      </div>

    
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {latestProducts.slice(0, 3).map((product, index) => {
          const image =
            product.images?.[0] &&
            (product.images[0].startsWith("http")
              ? product.images[0]
              : `${API_BASE_URL}${product.images[0]}`);

          return (
            <Link
              key={product._id}
              href={`/products/${product.slug}`}
              className={`group relative overflow-hidden rounded-lg bg-gray-100
                ${index === 0 ? "md:row-span-2" : ""}`}
            >
              {/* IMAGE */}
              <img
                src={image || "/placeholder.png"}
                alt={product.title}
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-100" />

              {/* CONTENT */}
              <div className="absolute bottom-0 p-5 text-white w-full">
                <p className="text-xs uppercase tracking-wide text-gray-300 mb-1">
                  {product.brand}
                </p>

                <h3 className="text-lg md:text-xl font-semibold leading-snug mb-2">
                  {product.title}
                </h3>

                {/* PRICE */}
                <div className="flex items-center gap-3">
                  {product.mrp && product.mrp > product.price && (
                    <span className="text-sm text-gray-300 line-through">
                      ₹{product.mrp}
                    </span>
                  )}

                  <span className="text-base font-semibold">
                    ₹{product.price}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
