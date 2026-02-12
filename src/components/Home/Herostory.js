import SmoothGradient from "../common/SmoothGradient";

export default function HeroStorySection() {
  return (
    <section className="relative w-full h-[70vh] min-h-[480px] md:h-[75vh] lg:h-[85vh] overflow-hidden">

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
      <div className="absolute inset-0 z-10 flex flex-col justify-end md:justify-between md:flex-row items-start md:items-end gap-6 md:gap-0 px-5 sm:px-8 md:px-12 lg:px-20 pb-8 md:pb-12">

        {/* LEFT TEXT */}
        <div className="max-w-md sm:max-w-lg md:max-w-xl text-white">
          <p className="text-xs sm:text-sm opacity-70 mb-2">
            (About Khan's Collection)
          </p>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
            Pieces beyond seasons, created
            <br className="hidden sm:block" />
            to adapt and remain timeless.
          </h1>
        </div>

        {/* RIGHT BUTTON */}
        <button className="bg-white text-black px-5 py-3 sm:px-6 text-sm sm:text-base flex items-center gap-2 hover:bg-black hover:text-white transition rounded-sm">
          Our Story →
        </button>

      </div>
    </section>
  );
}
