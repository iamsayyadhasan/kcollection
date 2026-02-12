import { Truck, RefreshCw, Lock, Headset } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#1a1a1a] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
  <Feature 
    icon={Truck} 
    text="Shipping Charges Applicable" 
  />
  
  <Feature 
    icon={RefreshCw} 
    text="No Returns or Exchanges" 
  />
  
  <Feature 
    icon={Lock} 
    text="100% Secure Online Payments" 
  />
  
  <Feature 
    icon={Headset} 
    text="Dedicated Customer Support" 
  />
</div>


        {/* ================= BOTTOM SECTION ================= */}
        <div className="space-y-24">
          {/* -------- ROW 1: BRAND + LINKS -------- */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            {/* Brand */}
            <div className="md:col-span-5">
              <h1 className="text-5xl sm:text-6xl md:text-[96px] font-semibold tracking-tighter leading-none">
                Khan's Boutique
              </h1>
              <p className="text-gray-500 mt-6">© 2025 All Rights Reserved</p>

              <div className="flex gap-6 mt-10">
                <Payment src="gpay.svg" alt="Google Pay" />
                <Payment src="phonepe.svg" alt="PhonePe" />
                <Payment src="paytm.svg" alt="Paytm" />
              </div>
            </div>

            {/* Spacer */}
            <div className="hidden md:block md:col-span-1" />

            {/* Navigation */}
            <Links
              title="Navigation"
              span="md:col-span-2"
              items={[
                ["Men", "./Men"],
                ["Women", "./Women"],
                ["Our Story", "./Our-Story"],
              ]}
            />

            {/* Legal */}
            <Links
              title="Legal"
              span="md:col-span-2"
              items={[
                ["Privacy Policy", "./privacy-policy"],
                ["Terms of Service", "./terms-of-service"],
              ]}
            />

            {/* Help */}
            <Links
              title="Help"
              span="md:col-span-2"
              items={[
                ["Contact", "./contact"],
              ]}
            />
          </div>

          {/* -------- ROW 2: NEWSLETTER (RIGHT SIDE) -------- */}
          <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-6" />
            <div className="md:col-span-6 max-w-xl">
              <p className="mb-6">
                Subscribe to our newsletter for new arrivals and special offers.
              </p>

              <form className="relative mb-4">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-6 py-4 bg-[#262626] text-white focus:outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 bottom-0 px-8 bg-white text-black hover:bg-gray-200 transition"
                >
                  Submit
                </button>
              </form>

              <p className="text-sm text-gray-500">
                By subscribing, you agree to our{" "}
                <a
                  href="./legal/privacy-policy"
                  className="underline hover:text-white"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function Feature({ icon: Icon, text }) {
  return (
    <div className=" rounded-xl p-8  flex flex-col items-center text-center">
      <Icon className="w-10 h-10 mb-4" />
      <p className="text-gray-400 text-sm">{text}</p>
    </div>
  );
}

function Links({ title, items, span }) {
  return (
    <div className={span}>
      <p className="text-gray-500 uppercase text-sm tracking-widest mb-6">
        ({title})
      </p>
      <ul className="space-y-4">
        {items.map(([label, href]) => (
          <li key={label}>
            <a href={href} className="hover:opacity-80 transition">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Payment({ src, alt }) {
  return (
    <img
      src={`/payments/${src}`}
      alt={alt}
      className="h-7 object-contain invert brightness-200 opacity-90"
    />
  );
}
