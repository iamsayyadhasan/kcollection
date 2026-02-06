"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

const sizesList = ["XS", "S", "M", "L", "XL", "XXL"];

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

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
    isBestSeller: false, // ✅ ADDED
    existingImages: [],
    newImages: [],
  });

  /* 🔹 FETCH PRODUCT */
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/product/get-product-details/${id}`
        );
        const data = await res.json();

        if (data.success) {
          setFormData({
            title: data.product.title || "",
            category: data.product.category || "",
            brand: data.product.brand || "",
            price: data.product.price || "",
            mrp: data.product.mrp || "",
            description: data.product.description || "",
            sizes: data.product.sizes || [],
            isNew: data.product.isNew || false,
            onSale: data.product.onSale || false,
            isBestSeller: data.product.isBestSeller || false, // ✅
            existingImages: data.product.images || [],
            newImages: [],
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  /* 🔹 INPUT CHANGE */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* 🔹 SIZE TOGGLE */
  const handleSizeChange = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  /* 🔹 NEW IMAGE SELECT */
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      newImages: [...prev.newImages, ...files],
    }));
  };

  /* 🔹 REMOVE EXISTING IMAGE */
  const removeExistingImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      existingImages: prev.existingImages.filter((_, i) => i !== index),
    }));
  };

  /* 🔹 REMOVE NEW IMAGE */
  const removeNewImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      newImages: prev.newImages.filter((_, i) => i !== index),
    }));
  };

  /* 🔹 SUBMIT UPDATE */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.sizes.length) {
      alert("Select at least one size");
      return;
    }

    const data = new FormData();

    data.append("title", formData.title);
    data.append("brand", formData.brand);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("mrp", formData.mrp);
    data.append("description", formData.description);
    data.append("sizes", JSON.stringify(formData.sizes));

    data.append("isNew", formData.isNew);
    data.append("onSale", formData.onSale);
    data.append("isBestSeller", formData.isBestSeller); // ✅

    data.append(
      "existingImages",
      JSON.stringify(formData.existingImages)
    );

    formData.newImages.forEach((img) => {
      data.append("images", img);
    });

    try {
      const res = await fetch(
        `http://localhost:5000/api/product/update-product/${id}`,
        {
          method: "PUT",
          body: data,
        }
      );

      const result = await res.json();

      if (result.success) {
        alert("✅ Product updated successfully");
        router.push("/admin/products");
      } else {
        alert("❌ Update failed");
      }
    } catch (error) {
      alert("❌ Server error");
    }
  };

  if (loading) return <p className="p-6">Loading product...</p>;

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
          Edit Product
        </h1>
      </div>

      {/* FORM */}
      <div className="max-w-2xl bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Product Title"
            className="w-full border px-4 py-2 rounded"
            required
          />

          {/* EXISTING IMAGES */}
          {formData.existingImages.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">
                Existing Images
              </p>
              <div className="flex flex-wrap gap-3">
                {formData.existingImages.map((img, i) => (
                  <div key={i} className="relative">
                    <img
                      src={img}
                      className="w-24 h-24 object-cover border"
                    />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(i)}
                      className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* NEW IMAGE UPLOAD */}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border px-4 py-2 rounded"
          />

          {/* CATEGORY */}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            required
          >
            <option value="">Select Category</option>
            <option value="Women">Women</option>
            <option value="Men">Men</option>
          </select>

          <input
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Brand"
            className="w-full border px-4 py-2 rounded"
            required
          />

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full border px-4 py-2 rounded"
            required
          />

          <input
            type="number"
            name="mrp"
            value={formData.mrp}
            onChange={handleChange}
            placeholder="MRP"
            className="w-full border px-4 py-2 rounded"
          />

          {/* SIZES */}
          <div>
            <p className="text-sm font-medium mb-2">
              Available Sizes
            </p>
            <div className="flex flex-wrap gap-4">
              {sizesList.map((size) => (
                <label key={size} className="flex gap-2 items-center">
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
            <label className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={formData.isNew}
                onChange={(e) =>
                  setFormData({ ...formData, isNew: e.target.checked })
                }
              />
              New Arrival
            </label>

            <label className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={formData.onSale}
                onChange={(e) =>
                  setFormData({ ...formData, onSale: e.target.checked })
                }
              />
              On Sale
            </label>

            {/* ✅ BEST SELLER */}
            <label className="flex gap-2 items-center">
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

          <textarea
            rows="4"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border px-4 py-2 rounded"
          />

          <button className="w-full bg-black text-white py-2 rounded">
            Update Product
          </button>

        </form>
      </div>
    </div>
  );
}
