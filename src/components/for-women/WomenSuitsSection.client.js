"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const tabs = [
  "All",
  "Maria B",
  "Charizma",
  "Sadabahar",
  "Agha Noor",
  "Sapphire",
  "Zara Shahjahan",
  "Ethnc",
  "Junaid Jamshed",
  "Qalamkar",
  "New Arrivals",
  "Sale",
];

export default function WomenSuitsSection() {
  const [activeTab, setActiveTab] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [hoveredId, setHoveredId] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  /* 🔹 FETCH PRODUCTS FROM BACKEND */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/product/get-all-products`
        );
        const data = await res.json();

        const womenProducts = (data.products || []).filter(
          (item) => item.category === "Women"
        );

        setProducts(womenProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (!hoveredId) return;

    const interval = setInterval(() => {
      setActiveImageIndex((prev) => prev + 1);
    }, 700);

    return () => clearInterval(interval);
  }, [hoveredId]);

  const filteredProducts =
    activeTab === "All"
      ? products
      : activeTab === "New Arrivals"
      ? products.filter((item) => item.isNew)
      : activeTab === "Sale"
      ? products.filter((item) => item.onSale)
      : products.filter((item) => item.brand === activeTab);

  if (loading) {
    return (
      <section className="w-full py-20 text-center">
        <p className="text-gray-500">Loading products...</p>
      </section>
    );
  }

  return (
    <section className="w-full bg-white py-14 px-6">
      {/* TABS */}
      <div className="flex flex-wrap gap-8 mb-10">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-base md:text-lg transition relative
              ${
                activeTab === tab
                  ? "text-black font-semibold after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-black"
                  : "text-gray-400 hover:text-black"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg font-medium text-gray-700">
            Products from this brand are currently unavailable.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((item) => {
            const currentIndex =
              hoveredId === item._id
                ? activeImageIndex % item.images.length
                : 0;

            const currentImage = item.images?.[currentIndex]
              ? item.images[currentIndex].startsWith("http")
                ? item.images[currentIndex]
                : `${API_BASE_URL}${item.images[currentIndex]}`
              : "/placeholder.png";

            return (
              <Link
                key={item._id}
                href={`/products/${item.slug}`}
                className="group"
              >
                <div className="relative overflow-hidden bg-gray-100">
                  {item.isNew && (
                    <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 z-10">
                      New
                    </span>
                  )}
                  {item.onSale && (
                    <span className="absolute top-2 right-2 bg-[#B02724] text-white text-xs px-2 py-1 z-10">
                      Sale
                    </span>
                  )}

                  <div
                    className="relative w-full h-[260px] sm:h-[320px]"
                    onMouseEnter={() => {
                      setHoveredId(item._id);
                      setActiveImageIndex(0);
                    }}
                    onMouseLeave={() => {
                      setHoveredId(null);
                      setActiveImageIndex(0);
                    }}
                  >
                    <img
                      src={currentImage}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity"
                    />
                  </div>
                </div>

                <h3 className="mt-3 text-sm font-medium">{item.title}</h3>
                <p className="text-xs text-gray-400">{item.brand}</p>

                <div className="mt-1 flex gap-2 items-center">
                  {item.mrp && item.mrp !== item.price && (
                    <span className="text-xs text-gray-400 line-through">
                      Rs. {item.mrp}
                    </span>
                  )}
                  <span className="text-sm font-semibold text-black">
                    Rs. {item.price}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
