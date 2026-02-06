"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminProductsPage() {
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
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /* 🔴 DELETE PRODUCT */
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/product/delete-product/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("✅ Product deleted successfully");

        // remove product from UI instantly
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
    return <p className="p-6">Loading products...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Products
          </h1>
          <p className="text-sm text-gray-500">
            Manage all store products
          </p>
        </div>

        <Link
          href="/admin/products/add"
          className="px-5 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
        >
          + Add Product
        </Link>
      </div>


      {/* PRODUCTS TABLE */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-t hover:bg-gray-50"
                >
                 <td className="p-4">
  <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
    <img
      src={
        product.images?.[0]
          ? product.images[0].startsWith("http")
            ? product.images[0]
            : `http://localhost:5000${product.images[0]}`
          : "/placeholder.png"
      }
      alt={product.title}
      className="w-full h-full object-cover"
    />
  </div>
</td>

                  <td className="p-4 text-gray-900">
                    {product.title}
                  </td>

                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">
                      {product.category}
                    </span>
                  </td>

                  <td className="p-4 text-gray-900">
                    ₹{product.price}
                  </td>

                  <td className="p-4 text-gray-600 max-w-xs truncate">
                    {product.description || "-"}
                  </td>

                  <td className="p-4 space-x-3">
                    <Link
                      href={`/admin/products/edit/${product._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>

                    {/* 🔴 DELETE BUTTON */}
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
