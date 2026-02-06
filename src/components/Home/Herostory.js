import SmoothGradient from "../common/SmoothGradient"

export default function HeroStorySection() {
  return (
    <section className="relative w-full h-[600px] overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <img
        src="/images/aghanoor-2.jpg"
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* GRADIENT OVERLAY */}
      <SmoothGradient
        direction="to top"
        startColor="#000000"
        opacity={0.9}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
        }}
      />

      {/* CONTENT */}
      <div className="absolute inset-0 z-10 flex items-end justify-between px-10 pb-10">

        {/* LEFT TEXT */}
        <div className="max-w-xl text-white">
          <p className="text-sm opacity-70 mb-2">(About Khan's Collection)</p>

          <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
            Pieces beyond seasons, created <br />
            to adapt and remain timeless.
          </h1>
        </div>

        {/* RIGHT BUTTON */}
        <button className="bg-white text-black px-6 py-3 text-sm flex items-center gap-2 hover:bg-black hover:text-white transition">
          Our Story →
        </button>
      </div>

    </section>
  )
}
