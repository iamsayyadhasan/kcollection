export default function Detailsale() {
  return (
    <section className="w-full py-20 bg-white">
      
      {/* TEXT */}
      <div className="max-w-3xl mx-auto text-center mb-14">
        <p className="text-sm uppercase tracking-widest text-gray-500 mb-3">
          ((Recommended for you))
        </p>

        <h2 className="text-4xl md:text-5xl font-semibold text-black">
         You Might Like
        </h2>
      </div>

      {/* PRODUCTS GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-4">

        {/* PRODUCT 1 */}
        <div className="flex flex-col">
          
          {/* IMAGE WRAPPER */}
          <div className="relative bg-gray-100 h-[485px] flex items-center justify-center">
            
            {/* NEW BADGE */}
            <span className="absolute top-3 left-5 bg-black text-white text-xs px-3 py-1">
              New
            </span>

            <img
              src="/images/Charizma-1.jpeg"
              alt="Sand Oversize T-Shirt"
              className="max-h-full object-contain"
            />
          </div>

          <h3 className="mt-4 font-medium">Sand Oversize T-Shirt</h3>
          <p className="text-gray-600">$49</p>
        </div>

        {/* PRODUCT 2 */}
        <div className="flex flex-col">
          
          <div className="relative bg-gray-100 h-[485px] flex items-center justify-center">
            
            <span className="absolute top-3 left-6 bg-black text-white text-xs px-3 py-1">
              New
            </span>

            <img
              src="/images/aghanoor-1.jpeg"
              alt="Faded Black Jeans"
              className="max-h-full object-contain"
            />
          </div>

          <h3 className="mt-4 font-medium">Faded Black Jeans</h3>
          <p className="text-gray-600">$79</p>
        </div>

        {/* PRODUCT 3 */}
        <div className="flex flex-col">
          
          <div className="relative bg-gray-100 h-[485px] flex items-center justify-center">
            
            <span className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1">
              New
            </span>

            <img
              src="/images/Sapphire-1.jpeg"
              alt="Distressed Light Jeans"
              className="max-h-full object-contain"
            />
          </div>

          <h3 className="mt-4 font-medium">Distressed Light Jeans</h3>
          <p className="text-gray-600">$79</p>
        </div>

      </div>
    </section>
  );
}
