import Wbanner from "./WBanner";
import WomenSuitsSection from "./WomenSuitsSection.client";
import Socialmedia from "../Home/Socialmedia";

// 🔥 Server-side fetch (fixes LCP/FCP on Vercel)
async function getWomenProducts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/product/get-all-products`,
    {
      next: { revalidate: 3600 }, // ✅ CDN caching
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();

  return (data.products || []).filter(
    (item) => item.category === "Women"
  );
}

// ✅ SERVER COMPONENT
export default async function Womenpage() {
  const products = await getWomenProducts();

  return (
    <div>
      {/* Static + priority image (LCP-safe) */}
      <Wbanner />

      {/* ONLY dynamic section */}
      <WomenSuitsSection products={products} />

      {/* Static section (SSR is good here) */}
      <Socialmedia />
    </div>
  );
}
