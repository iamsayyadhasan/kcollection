"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/* AVAILABLE SIZES */
const sizesList = ["XS", "S", "M", "L", "XL", "XXL"];

export default function AddProductPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    brand: "",
    price: "",
    mrp: "",
    description: "",
    sizes: [],
    isNew: false,
    onSale: false,
    isBestSeller: false, // ✅ NEW
    images: [], // File objects
  });

  /* SIZE TOGGLE */
  const handleSizeChange = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  /* IMAGE SELECT (APPEND, NOT REPLACE) */
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...selectedFiles],
    }));
  };

  /* REMOVE IMAGE */
  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.images.length) {
      alert("Please upload at least one image");
      return;
    }

    if (!formData.sizes.length) {
      alert("Please select at least one size");
      return;
    }

    const data = new FormData();

    data.append("title", formData.title);
    data.append(
      "slug",
      formData.title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
    );
    data.append("brand", formData.brand);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("mrp", formData.mrp);
    data.append("description", formData.description);
    data.append("sizes", JSON.stringify(formData.sizes));

    // ✅ FLAGS
    data.append("isNew", formData.isNew);
    data.append("onSale", formData.onSale);
    data.append("isBestSeller", formData.isBestSeller);

    // ✅ IMAGES
    formData.images.forEach((img) => {
      data.append("images", img);
    });

    try {
      const res = await fetch(
        "http://localhost:5000/api/product/add-product",
        {
          method: "POST",
          body: data, // ❌ no headers
        }
      );

      const result = await res.json();

      if (result.success) {
        alert("✅ Product added successfully");
        router.push("/admin/products");
      } else {
        alert("❌ Failed to add product");
      }
    } catch (error) {
      alert("❌ Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="mb-6">
        <Link
          href="/admin/products"
          className="text-sm text-gray-500 hover:underline"
        >
          ← Back to Products
        </Link>

        <h1 className="text-2xl font-semibold mt-2">
          Add New Product
        </h1>
        <p className="text-sm text-gray-500">
          Fill product details below
        </p>
      </div>

      {/* FORM */}
      <div className="max-w-2xl bg-white rounded-lg shadow p-6">
        <form className="space-y-5" onSubmit={handleSubmit}>
          
          {/* TITLE */}
          <input
            required
            placeholder="Product Title"
            className="w-full border rounded-md px-4 py-2"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />

          {/* IMAGE UPLOAD */}
          <input
            type="file"
            multiple
            accept="image/*"
            className="w-full border rounded-md px-4 py-2"
            onChange={handleImageChange}
          />

          {/* IMAGE PREVIEW */}
          {formData.images.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {formData.images.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(img)}
                    alt="preview"
                    className="w-24 h-24 object-cover border"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* CATEGORY */}
          <select
            required
            className="w-full border rounded-md px-4 py-2"
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="">Select Category</option>
            <option value="Women">Women</option>
            <option value="Men">Men</option>
          </select>

          {/* BRAND */}
          <input
            required
            placeholder="Brand"
            className="w-full border rounded-md px-4 py-2"
            onChange={(e) =>
              setFormData({ ...formData, brand: e.target.value })
            }
          />

          {/* PRICE */}
          <input
            type="number"
            required
            placeholder="Price"
            className="w-full border rounded-md px-4 py-2"
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />

          {/* MRP */}
          <input
            type="number"
            placeholder="MRP (optional)"
            className="w-full border rounded-md px-4 py-2"
            onChange={(e) =>
              setFormData({ ...formData, mrp: e.target.value })
            }
          />

          {/* SIZES */}
          <div>
            <p className="text-sm font-medium mb-2">
              Available Sizes
            </p>
            <div className="flex flex-wrap gap-4">
              {sizesList.map((size) => (
                <label key={size} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.sizes.includes(size)}
                    onChange={() => handleSizeChange(size)}
                  />
                  {size}
                </label>
              ))}
            </div>
          </div>

          {/* FLAGS */}
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isNew}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    isNew: e.target.checked,
                  })
                }
              />
              New Arrival
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.onSale}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    onSale: e.target.checked,
                  })
                }
              />
              On Sale
            </label>

            {/* ✅ BEST SELLER */}
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isBestSeller}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    isBestSeller: e.target.checked,
                  })
                }
              />
              Show in Best Sellers
            </label>
          </div>

          {/* DESCRIPTION */}
          <textarea
            rows="4"
            placeholder="Description"
            className="w-full border rounded-md px-4 py-2"
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
          />

          {/* ACTIONS */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded-md"
            >
              Save Product
            </button>

            <Link
              href="/admin/products"
              className="px-6 py-2 border rounded-md"
            >
              Cancel
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
}
