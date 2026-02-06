"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // <-- import this
import { FiMenu, FiX, FiSearch, FiShoppingCart } from "react-icons/fi";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const isDetailPage = pathname.startsWith("/products/"); // detect detail page

  useEffect(() => {
    if (isDetailPage) return; // skip scroll effect on detail page

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDetailPage]);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Top Black Strip */}
      <div className="bg-black text-white text-sm py-2 px-4">
        <div className="flex gap-6 justify-center marquee">
          <span>Home Boutique Timing 12PM to 08PM</span>
          <span>No Return No Exchange</span>
        </div>
      </div>

      <div
        className={`hidden md:flex items-center justify-between px-6 transition-all duration-300
          ${isDetailPage || scrolled ? "py-2 bg-white text-black shadow-sm" : "py-4 bg-transparent text-white"}
        `}
      >
        {/* Left */}
        <div className="flex items-center gap-6">
          <a href="/">
          <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="h-full w-full object-cover"
            />
          </div>
          
          </a>
          


          <nav className="flex gap-8  uppercase font-semibold">
            <a href="/Women" className="hover:opacity-80">Women</a>
            <a href="/Men" className="hover:opacity-80">Men</a>

            <a href="/Our-Story" className="hover:opacity-80">Our Story</a>
            <a href="/Contact" className="hover:opacity-80">Contact</a>
          </nav>
        </div>

        {/* Center */}
        <a href="/">
        <h1 className="text-3xl font-sans tracking-widest">
          Khan&apos;s Collection
        </h1>
        </a>


        {/* Right */}
        <div className="flex items-center gap-6">
          <FiSearch size={20} />
          <FiShoppingCart size={20} />
        </div>
      </div>

      {/* ================= MOBILE NAVBAR ================= */}
      <div
        className={`md:hidden flex items-center justify-between px-4 transition-all duration-300
          ${isDetailPage || scrolled || menuOpen ? "bg-white text-black py-3 shadow" : "bg-transparent text-white py-4"}
        `}
      >
        {/* Left - Menu Icon */}
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>

        {/* Center Logo */}
        <a href="/">
        <h1 className="text-base font-bold tracking-widest uppercase">

          Khan&apos;s Collection
        </h1>
        </a>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          <FiSearch size={18} />
          <FiShoppingCart size={18} />
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {menuOpen && (
        <div className="md:hidden bg-white px-6 py-6 shadow-lg">
          <nav className="flex flex-col gap-5 text-gray-800 text-lg">
            <a href="/Men">Men</a>
            <a href="/Women">Women</a>
            <a href="/Our-Story">Our Story</a>
            <a href="/Contact">Contact</a>
          </nav>
        </div>
      )}
    </header>
  );
}
