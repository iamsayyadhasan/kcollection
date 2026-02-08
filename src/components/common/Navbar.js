"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FiMenu, FiX, FiSearch } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);

  const pathname = usePathname();
  const router = useRouter();
  const isDetailPage = pathname.startsWith("/products/") || pathname.startsWith("/search");

  const API_BASE_URL = "https://api.khansboutique.com";
  const getImageUrl = (images = []) => {
  if (!images.length) return "/placeholder.png";

  const img = images[0];
  return img.startsWith("http")
    ? img
    : `${API_BASE_URL}${img}`;
};



  /* 🔒 DO NOT TOUCH THIS LOGIC */
  useEffect(() => {
    if (isDetailPage) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDetailPage]);

  /* 🔍 LIVE SEARCH */
  const handleSearchChange = async (value) => {
    setSearchText(value);

    if (value.length < 2) {
      setResults([]);
      return;
    }

    const res = await fetch(
      "https://api.khansboutique.com/api/product/get-all-products"
    );
    const data = await res.json();

    const filtered = data.products
      .filter(
        (p) =>
          p.title?.toLowerCase().includes(value.toLowerCase()) ||
          p.brand?.toLowerCase().includes(value.toLowerCase())
      )
      .slice(0, 6);

    setResults(filtered);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter" && searchText.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchText)}`);
      setShowSearch(false);
      setResults([]);
    }
  };

  /* 🎯 SEARCH COLOR FIX (ONLY SEARCH, NOT NAVBAR) */
  const searchTextColor = scrolled ? "text-white" : "text-black";
  const searchBg = scrolled ? "bg-black" : "bg-white";
  const dropdownBg = scrolled ? "bg-black" : "bg-white";
  const dropdownHover = scrolled ? "hover:bg-gray-800" : "hover:bg-gray-100";

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Top Strip */}
      <div className="bg-black text-white text-sm py-2 px-4">
        <div className="flex gap-6 justify-center marquee">
          <span>Home Boutique Timing 12PM to 08PM</span>
          <span>No Return No Exchange</span>
        </div>
      </div>

      {/* ================= DESKTOP NAVBAR ================= */}
      <div
        className={`hidden md:flex items-center justify-between px-6 transition-all duration-300
        ${isDetailPage || scrolled
          ? "py-2 bg-white text-black shadow-sm"
          : "py-4 bg-transparent text-white"}
      `}
      >
        {/* Left */}
        <div className="flex items-center gap-6">
          <a href="/">
            <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
              <img src="/images/logo.png" className="h-full w-full object-cover" />
            </div>
          </a>

          <nav className="flex gap-8 uppercase font-semibold">
            <a href="/Women">Women</a>
            <a href="/Men">Men</a>
            <a href="/Our-Story">Our Story</a>
            <a href="/Contact">Contact</a>
          </nav>
        </div>

        {/* Center */}
        <a href="/">
          <h1 className="text-3xl tracking-widest font-sans">
            Khan&apos;s Boutique
          </h1>
        </a>

        {/* Right */}
        <div className="relative flex items-center gap-5">
          {/* Search Icon */}
          <button onClick={() => setShowSearch(!showSearch)}>
            <FiSearch size={20} />
          </button>

          {/* Search Input + Dropdown */}
          {showSearch && (
            <div className="relative">
              <input
                autoFocus
                value={searchText}
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyDown={handleEnter}
                placeholder="Search products..."
                className={`border px-4 py-2 rounded-md w-72 text-sm outline-none ${searchBg} ${searchTextColor}`}
              />
{results.length > 0 && (
  <div
    className={`absolute top-full mt-2 w-full border shadow-lg z-50 ${dropdownBg} ${searchTextColor}`}
  >
    {results.map((p) => {
      const imageUrl = getImageUrl(p.images);

      return (
        <a
          key={p.slug}
          href={`/products/${p.slug}`}
          className={`flex items-center gap-3 px-4 py-2 text-sm ${dropdownHover}`}
        >
          {/* Thumbnail */}
          <img
            src={imageUrl}
            alt={p.title}
            className="w-10 h-10 object-cover rounded"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.png";
            }}
          />

          {/* Text */}
          <div className="flex flex-col">
            <span className="font-medium">{p.title}</span>
            <span className="text-xs opacity-70">{p.brand}</span>
          </div>
        </a>
      );
    })}

    <button
      onClick={() =>
        router.push(`/search?query=${encodeURIComponent(searchText)}`)
      }
      className={`w-full text-center text-sm py-2 border-t ${dropdownHover}`}
    >
      View all results →
    </button>
  </div>
)}

              
            </div>
          )}

          {/* WhatsApp */}
          <a
            href="https://wa.me/9897266518"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp size={22} className="text-green-600" />
          </a>
        </div>
      </div>

      {/* ================= MOBILE NAVBAR ================= */}
      <div
        className={`md:hidden flex items-center justify-between px-4 transition-all duration-300
        ${isDetailPage || scrolled || menuOpen
          ? "bg-white text-black py-3 shadow"
          : "bg-transparent text-white py-4"}
      `}
      >
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>

        <a href="/">
          <h1 className="text-base font-bold tracking-widest uppercase">
            Khan&apos;s Boutique
          </h1>
        </a>

        <div className="flex items-center gap-4">
<button onClick={() => router.push("/search")}>
  <FiSearch size={18} />
</button>
          <FaWhatsapp size={20} className="text-green-600" />
        </div>
      </div>
    </header>
  );
}
