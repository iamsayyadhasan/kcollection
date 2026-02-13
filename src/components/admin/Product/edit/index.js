"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

/* SIZES */
const sizesList = ["XS", "S", "M", "L", "XL", "XXL"];

/* BRANDS */
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

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const [loading, setLoading] = useState(true);
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
    existingImages: [],
    newImages: [],
  });

  /* FETCH PRODUCT */
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/product/get-product-details/${id}`
        );
        const data = await res.json();

        if (data.success) {
          setGender(data.product.category); // Women / Men
          setStitchType(data.product.productType || "");

          setFormData({
            title: data.product.title || "",
            brand: data.product.brand || "",
            price: data.product.price || "",
            mrp: data.product.mrp || "",
            description: data.product.description || "",
            sizes: data.product.sizes || [],
            isNew: data.product.isNew || false,
            onSale: data.product.onSale || false,
            isBestSeller: data.product.isBestSeller || false,
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

  /* SIZE TOGGLE */
  const handleSizeChange = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  /* IMAGE HANDLERS */
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      newImages: [...prev.newImages, ...files],
    }));
  };

  const removeExistingImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      existingImages: prev.existingImages.filter((_, i) => i !== index),
    }));
  };

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      (gender === "Men" || (gender === "Women" && stitchType === "Stitched")) &&
      !formData.sizes.length
    ) {
      alert("Select at least one size");
      return;
    }

    const data = new FormData();

    data.append("title", formData.title);
    data.append("category", gender); // Women / Men
    data.append("brand", formData.brand);
    data.append("price", formData.price);
    data.append("mrp", formData.mrp);
    data.append("description", formData.description);

    data.append(
      "sizes",
      JSON.stringify(
        gender === "Men" || stitchType === "Stitched"
          ? formData.sizes
          : []
      )
    );

    data.append(
      "productType",
      gender === "Women" ? stitchType : "Stitched"
    );

    data.append("isNew", formData.isNew);
    data.append("onSale", formData.onSale);
    data.append("isBestSeller", formData.isBestSeller);

    data.append(
      "existingImages",
      JSON.stringify(formData.existingImages)
    );

    formData.newImages.forEach((img) => {
      data.append("images", img);
    });

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/product/update-product/${id}`,
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
      <div className="mb-6">
        <Link href="/admin/products" className="text-sm text-gray-500">
          ← Back to Products
        </Link>
        <h1 className="text-2xl font-semibold mt-2">Edit Product</h1>
      </div>

      <div className="max-w-2xl bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Product Title"
            className="w-full border px-4 py-2 rounded"
            required
          />

          {/* EXISTING IMAGES */}
          {formData.existingImages.length > 0 && (
            <div className="flex gap-3 flex-wrap">
              {formData.existingImages.map((img, i) => (
                <div key={i} className="relative">
                  <img src={img} className="w-24 h-24 object-cover border" />
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
          )}

          <input type="file" multiple onChange={handleImageChange} />

          {/* GENDER */}
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            required
          >
            <option value="">Select Gender</option>
            <option value="Women">Women</option>
            <option value="Men">Men</option>
          </select>

          {/* BRAND */}
          {gender && (
            <select
              value={formData.brand}
              onChange={(e) =>
                setFormData({ ...formData, brand: e.target.value })
              }
              className="w-full border px-4 py-2 rounded"
              required
            >
              <option value="">Select Brand</option>
              {(gender === "Women"
                ? WOMEN_CATEGORIES
                : MEN_CATEGORIES
              ).map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          )}

          {/* STITCH TYPE */}
          {gender === "Women" && (
            <select
              value={stitchType}
              onChange={(e) => setStitchType(e.target.value)}
              className="w-full border px-4 py-2 rounded"
              required
            >
              <option value="">Select Stitch Type</option>
              <option value="Stitched">Stitched</option>
              <option value="Unstitched">Unstitched</option>
            </select>
          )}
            {/* PRICE */}
        <input
          type="number"
          value={formData.price}
          onChange={e=>setFormData({...formData,price:e.target.value})}
          className="w-full border px-3 py-2"
          placeholder="Price"
        />

        <input
          type="number"
          value={formData.mrp}
          onChange={e=>setFormData({...formData,mrp:e.target.value})}
          className="w-full border px-3 py-2"
          placeholder="MRP"
        />


          {/* SIZES */}
          {(gender === "Men" || stitchType === "Stitched") && (
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
          )}

          {/* FLAGS */}
          <div className="flex gap-6">
            <label><input type="checkbox" checked={formData.isNew}
              onChange={(e)=>setFormData({...formData,isNew:e.target.checked})}/> New</label>
            <label><input type="checkbox" checked={formData.onSale}
              onChange={(e)=>setFormData({...formData,onSale:e.target.checked})}/> Sale</label>
            <label><input type="checkbox" checked={formData.isBestSeller}
              onChange={(e)=>setFormData({...formData,isBestSeller:e.target.checked})}/> Best</label>
          </div>

          <textarea
            rows="4"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full border px-4 py-2 rounded"
            placeholder="Description"
          />

          <button className="w-full bg-black text-white py-2 rounded">
            Update Product
          </button>

        </form>
      </div>
    </div>
  );
}
