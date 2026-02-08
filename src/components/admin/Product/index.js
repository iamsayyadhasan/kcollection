"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  /* FETCH PRODUCTS */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/product/get-all-products`
        );
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /* DELETE PRODUCT */
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/product/delete-product/${id}`,
        { method: "DELETE" }
      );

      const data = await res.json();

      if (data.success) {
        alert("✅ Product deleted successfully");
        setProducts((prev) =>
          prev.filter((product) => product._id !== id)
        );
      } else {
        alert("❌ Failed to delete product");
      }
    } catch (error) {
      alert("❌ Server error");
    }
  };

  if (loading) {
    return <p className="p-6 text-gray-500">Loading products...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Products
          </h1>
          <p className="text-sm text-gray-500">
            Manage all store products
          </p>
        </div>

        <div className="flex gap-3 flex-wrap">
          {/* BACK TO DASHBOARD */}
          <Link
            href="/admin/dashboard"
            className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-200 transition"
          >
            ← Back to Dashboard
          </Link>

          {/* ADD PRODUCT */}
          <Link
            href="/admin/products/add"
            className="px-5 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
          >
            + Add Product
          </Link>
        </div>
      </div>

      {/* TABLE WRAPPER */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-4 text-left">Product</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Description</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="p-6 text-center text-gray-500"
                  >
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr
                    key={product._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    {/* PRODUCT */}
                    <td className="p-4 flex items-center gap-4">
                      <div className="w-14 h-14 bg-gray-100 rounded-md overflow-hidden shrink-0">
                        <img
                          src={
                            product.images?.[0]
                              ? product.images[0].startsWith("http")
                                ? product.images[0]
                                : `${API_BASE_URL}${product.images[0]}`
                              : "/placeholder.png"
                          }
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {product.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {product.brand || ""}
                        </p>
                      </div>
                    </td>

                    {/* CATEGORY */}
                    <td className="p-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">
                        {product.category}
                      </span>
                    </td>

                    {/* PRICE */}
                    <td className="p-4 font-medium text-gray-900">
                      ₹{product.price}
                    </td>

                    {/* DESCRIPTION */}
                    <td className="p-4 text-gray-600 max-w-sm">
                      <p className="line-clamp-2">
                        {product.description || "-"}
                      </p>
                    </td>

                    {/* ACTIONS */}
                    <td className="p-4">
                      <div className="flex gap-4">
                        <Link
                          href={`/admin/products/edit/${product._id}`}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => handleDelete(product._id)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
