"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const API_BASE_URL = "https://api.khansboutique.com";

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || "";

  const [query, setQuery] = useState(initialQuery);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setProducts([]);
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);

      const res = await fetch(
        "https://api.khansboutique.com/api/product/get-all-products"
      );
      const data = await res.json();

      const filtered = data.products.filter(
        (p) =>
          p.title?.toLowerCase().includes(query.toLowerCase()) ||
          p.brand?.toLowerCase().includes(query.toLowerCase())
      );

      setProducts(filtered);
      setLoading(false);
    };

    fetchProducts();
  }, [query]);

  // 🔄 Update URL as user types (nice UX)
  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("query", query);
    router.replace(`/search?${params.toString()}`, { scroll: false });
  }, [query, router]);

  const getImageUrl = (images = []) => {
    if (!images.length) return "/placeholder.png";
    return images[0].startsWith("http")
      ? images[0]
      : `${API_BASE_URL}${images[0]}`;
  };

  return (
    <div className="min-h-screen bg-white px-4 pt-28 pb-10">
      {/* 🔍 SEARCH INPUT (THIS WAS MISSING) */}
      <input
        autoFocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products…"
        className="w-full max-w-md border px-4 py-3 rounded-md text-sm mb-6"
      />

      {loading && <p>Searching…</p>}

      {!loading && query.length >= 2 && products.length === 0 && (
        <p>No products found.</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map((p) => (
          <a
            key={p.slug}
            href={`/products/${p.slug}`}
            className="border rounded overflow-hidden hover:shadow"
          >
            <img
              src={getImageUrl(p.images)}
              alt={p.title}
              className="w-full h-56 object-cover"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.png";
              }}
            />
            <div className="p-3">
              <p className="text-sm font-medium">{p.title}</p>
              <p className="text-xs text-gray-500">{p.brand}</p>
              <p className="font-semibold mt-1">Rs. {p.price}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
