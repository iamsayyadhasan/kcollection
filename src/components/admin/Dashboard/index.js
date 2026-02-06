"use client";

import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      {/* PAGE HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Manage your products and store content
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Total Products</h3>
          <p className="text-2xl font-semibold text-gray-900 mt-2">
            24
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Women Products</h3>
          <p className="text-2xl font-semibold text-gray-900 mt-2">
            14
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Men Products</h3>
          <p className="text-2xl font-semibold text-gray-900 mt-2">
            10
          </p>
        </div>

      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/admin/products"
            className="px-5 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
          >
            View Products
          </Link>

          <Link
            href="/admin/products/add"
            className="px-5 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
          >
            Add New Product
          </Link>
        </div>
      </div>

    </div>
  );
}
