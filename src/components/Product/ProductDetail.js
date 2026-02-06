"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductDetail() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/product/get-product-by-slug/${slug}`
        );
        const data = await res.json();

        if (data.success) {
          setProduct(data.product);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="py-32 text-center text-gray-500 ">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-32 text-center mt-5">
        <h2 className="text-xl font-semibold">
          Product not found
        </h2>
      </div>
    );
  }

  /* WHATSAPP ORDER */
  const handleWhatsAppOrder = () => {
    if (!selectedSize) return;

    const message = `
Hello 👋
I want to order:

Product: ${product.title}
Brand: ${product.brand}
Size: ${selectedSize}
Price: Rs. ${product.price}

Please guide me further.
    `;

    const url = `https://wa.me/9897266518?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
   {/* LEFT – IMAGES */}
<div className="space-y-6">
  {product.images.map((img, i) => (
    <div key={i} className="bg-gray-100">
      <img
        src={`http://localhost:5000${img}`}
        alt={product.title}
        className="w-full object-cover"
      />
    </div>
  ))}
</div>

      {/* RIGHT – DETAILS */}
      <div className="lg:sticky top-20 h-fit">

        {/* BADGES */}
        <div className="flex gap-2 mb-3 mt-5">
          {product.isNew && (
            <span className="bg-black text-white text-xs px-2 py-1">
              New
            </span>
          )}
          {product.onSale && (
            <span className="bg-[#B02724] text-white text-xs px-2 py-1">
              Sale
            </span>
          )}
        </div>

        <h1 className="text-3xl font-semibold">
          {product.title}
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Brand: {product.brand}
        </p>

        <p className="text-sm text-gray-500">
          Category: {product.category}
        </p>

        <p className="mt-4 text-gray-600 leading-relaxed">
          {product.description}
        </p>

        {/* SIZE SELECTOR */}
        <div className="mt-8">
          <span className="text-sm font-medium block mb-2">
            Select Size
          </span>

          <div className="flex gap-3 flex-wrap">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-12 h-12 border text-sm transition
                  ${
                    selectedSize === size
                      ? "border-black bg-black text-white"
                      : "border-gray-300 hover:border-black"
                  }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* PRICE */}
        <div className="mt-6 flex items-center gap-3">
          <span className="text-2xl font-semibold">
            Rs. {product.price}
          </span>

          {product.mrp && product.mrp !== product.price && (
            <span className="text-gray-400 line-through">
              Rs. {product.mrp}
            </span>
          )}
        </div>

        {/* WHATSAPP ORDER */}
        <button
          onClick={handleWhatsAppOrder}
          disabled={!selectedSize}
          className={`mt-8 w-full py-4 text-white transition
            ${
              selectedSize
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
        >
          Order on WhatsApp
        </button>

        {/* INFO SECTIONS */}
        <div className="mt-10 border-t pt-6 space-y-4">

          <details className="border-b pb-3">
            <summary className="cursor-pointer font-medium">
              Details & Care
            </summary>
            <p className="mt-3 text-sm text-gray-600 leading-relaxed">
              Premium quality fabric with a modern tailored fit.
              Easy to style for casual and festive occasions.
              Machine wash cold, do not bleach.
            </p>
          </details>

          <details className="border-b pb-3">
            <summary className="cursor-pointer font-medium">
              Delivery & Payment
            </summary>
            <p className="mt-3 text-sm text-gray-600 leading-relaxed">
              Delivery within 5–12 business days.
              Cash on Delivery and UPI available.
            </p>
          </details>

        </div>
      </div>
    </section>
  );
}
