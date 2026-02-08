"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [womenProducts, setWomenProducts] = useState(0);
  const [menProducts, setMenProducts] = useState(0);

  /* FETCH PRODUCTS & CALCULATE STATS */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/product/get-all-products`
        );
        const data = await res.json();

        if (data.success) {
          const products = data.products || [];

          setTotalProducts(products.length);
          setWomenProducts(
            products.filter(
              (p) => p.category === "Women" || p.gender === "Women"
            ).length
          );
          setMenProducts(
            products.filter(
              (p) => p.category === "Men" || p.gender === "Men"
            ).length
          );
        }
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Overview of your store performance
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {/* TOTAL */}
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
          <p className="text-sm text-gray-500">
            Total Products
          </p>
          <p className="text-3xl font-semibold text-gray-900 mt-2">
            {loading ? "—" : totalProducts}
          </p>
        </div>

        {/* WOMEN */}
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
          <p className="text-sm text-gray-500">
            Women Products
          </p>
          <p className="text-3xl font-semibold text-gray-900 mt-2">
            {loading ? "—" : womenProducts}
          </p>
        </div>

        {/* MEN */}
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
          <p className="text-sm text-gray-500">
            Men Products
          </p>
          <p className="text-3xl font-semibold text-gray-900 mt-2">
            {loading ? "—" : menProducts}
          </p>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/admin/products"
            className="inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition"
          >
            Manage Products
          </Link>

          <Link
            href="/admin/products/add"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md text-gray-800 hover:bg-gray-100 transition"
          >
            Add New Product
          </Link>
        </div>
      </div>
    </div>
  );
}
