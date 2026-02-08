"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/* AVAILABLE SIZES */
const sizesList = ["XS", "S", "M", "L", "XL", "XXL"];

/* WOMEN & MEN BRANDS */
const WOMEN_CATEGORIES = [
  "Maria B",
  "Charizma",
  "Sadabahar",
  "Agha Noor",
  "Sapphire",
  "Zara Shahjahan",
  "Ethnc",
  "Junaid Jamshed",
  "Qalamkar",
];

const MEN_CATEGORIES = [
  "Junaid Jamshed",
  "Alkaram",
  "Gul Ahmed",
];

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AddProductPage() {
  const router = useRouter();

  const [gender, setGender] = useState("");
  const [stitchType, setStitchType] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    price: "",
    mrp: "",
    description: "",
    sizes: [],
    isNew: false,
    onSale: false,
    isBestSeller: false,
    images: [],
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

  /* IMAGE UPLOAD */
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
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

    if (!gender) {
      alert("Please select gender");
      return;
    }

    if (!formData.brand) {
      alert("Please select brand");
      return;
    }

    if (gender === "Women" && !stitchType) {
      alert("Please select stitch type");
      return;
    }

    if (
      (gender === "Men" ||
        (gender === "Women" && stitchType === "Stitched")) &&
      !formData.sizes.length
    ) {
      alert("Please select at least one size");
      return;
    }

    const data = new FormData();

    /* BASIC */
    data.append("title", formData.title);
    data.append(
      "slug",
      formData.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-")
    );

    data.append("category", gender);
    data.append("brand", formData.brand);

    /* ✅ ALWAYS SET productType */
    const finalProductType =
      gender === "Women" ? stitchType : "Stitched";

    data.append("productType", finalProductType);

    /* PRICING */
    data.append("price", formData.price);
    if (formData.mrp) data.append("mrp", formData.mrp);

    /* DESCRIPTION */
    data.append("description", formData.description);

    /* SIZES */
    if (
      gender === "Men" ||
      (gender === "Women" && stitchType === "Stitched")
    ) {
      data.append("sizes", JSON.stringify(formData.sizes));
    } else {
      data.append("sizes", JSON.stringify([]));
    }

    /* FLAGS */
    data.append("isNew", formData.isNew);
    data.append("onSale", formData.onSale);
    data.append("isBestSeller", formData.isBestSeller);

    /* IMAGES */
    formData.images.forEach((img) => {
      data.append("images", img);
    });

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/product/add-product`,
        {
          method: "POST",
          body: data,
        }
      );

      const result = await res.json();

      if (result.success) {
        alert("✅ Product added successfully");
        router.push("/admin/products");
      } else {
        alert(result.message || "❌ Failed to add product");
      }
    } catch (error) {
      console.error(error);
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

          {/* IMAGES */}
          <input
            type="file"
            multiple
            accept="image/*"
            className="w-full border rounded-md px-4 py-2"
            onChange={handleImageChange}
          />

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

          {/* GENDER */}
          <select
            required
            className="w-full border rounded-md px-4 py-2"
            value={gender}
            onChange={(e) => {
              setGender(e.target.value);
              setStitchType("");
              setFormData({ ...formData, brand: "", sizes: [] });
            }}
          >
            <option value="">Select Gender</option>
            <option value="Women">Women</option>
            <option value="Men">Men</option>
          </select>

          {/* BRAND */}
          {gender && (
            <select
              required
              className="w-full border rounded-md px-4 py-2"
              value={formData.brand}
              onChange={(e) =>
                setFormData({ ...formData, brand: e.target.value })
              }
            >
              <option value="">Select Brand</option>
              {(gender === "Women"
                ? WOMEN_CATEGORIES
                : MEN_CATEGORIES
              ).map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          )}

          {/* STITCH TYPE */}
          {gender === "Women" && (
            <select
              className="w-full border rounded-md px-4 py-2"
              value={stitchType}
              onChange={(e) => setStitchType(e.target.value)}
            >
              <option value="">Select Stitch Type</option>
              <option value="Stitched">Stitched</option>
              <option value="Unstitched">Unstitched</option>
            </select>
          )}

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
          {(gender === "Men" ||
            (gender === "Women" && stitchType === "Stitched")) && (
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
          )}

          {/* FLAGS */}
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isNew}
                onChange={(e) =>
                  setFormData({ ...formData, isNew: e.target.checked })
                }
              />
              New Arrival
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.onSale}
                onChange={(e) =>
                  setFormData({ ...formData, onSale: e.target.checked })
                }
              />
              On Sale
            </label>

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
              Best Seller
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
