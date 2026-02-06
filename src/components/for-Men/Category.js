"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/* BRAND TABS */
const tabs = [
  "All",
  "Junaid Jamshed",
  "Alkaram",
  "Gul Ahmed",
  "New Arrivals",
  "Sale",
];

export default function MenCollectionSection() {
  const [activeTab, setActiveTab] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* FETCH PRODUCTS */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/product/get-all-products"
        );
        const data = await res.json();

        // only MEN products
        const menProducts = data.products.filter(
          (item) => item.category === "Men"
        );

        setProducts(menProducts);
      } catch (error) {
        console.error("Error fetching men products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /* FILTER LOGIC (UNCHANGED CONCEPT) */
  const filteredProducts =
    activeTab === "All"
      ? products
      : activeTab === "New Arrivals"
      ? products.filter((item) => item.isNew)
      : activeTab === "Sale"
      ? products.filter((item) => item.onSale)
      : products.filter((item) => item.brand === activeTab);

  if (loading) {
    return <p className="p-6">Loading products...</p>;
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

      {/* EMPTY STATE */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg font-medium text-gray-700">
            Products are currently unavailable.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Please check back soon.
          </p>
        </div>
      ) : (
        /* PRODUCTS GRID */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((item) => (
            <Link
              key={item._id}
              href={`/products/${item.slug}`}
              className="group"
            >
              <div className="relative overflow-hidden bg-gray-100">
                {/* BADGES */}
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

                <img
                  src={item.images?.[0]}
                  alt={item.title}
                  className="w-full h-[320px] object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              <h3 className="mt-3 text-sm font-medium">
                {item.title}
              </h3>
              <p className="text-xs text-gray-400">
                {item.brand}
              </p>

              {/* PRICE */}
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
          ))}
        </div>
      )}
    </section>
  );
}
