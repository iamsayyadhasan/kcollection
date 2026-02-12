export const metadata = {
  title: "Terms of Service | Khan’s Boutique",
  description: "Terms and Conditions of Khan’s Boutique",
};

export default function TermsOfServicePage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 text-gray-800 mt-15">
      <h1 className="text-3xl md:text-4xl font-semibold mb-6">
        Terms of Service
      </h1>

      <p className="text-sm text-gray-500 mb-10">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <p className="mb-6">
        By accessing or using the <strong>Khan’s Boutique</strong> website,
        you agree to the following Terms of Service.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-3">
        1. Website Purpose
      </h2>
      <p>
        This website is designed to showcase products. Customers can browse
        items and place inquiries or orders via WhatsApp.
      </p>

     <h2 className="text-xl font-semibold mt-10 mb-3">
  3. Shipping & Courier Facility
</h2>
<p className="mb-3">
  Khan’s Boutique provides courier delivery services across selected
  regions. Delivery timelines may vary depending on your location.
</p>

<ul className="list-disc pl-6 space-y-2">
  <li>Orders are dispatched after confirmation via WhatsApp.</li>
  <li>Delivery time usually ranges between 3–7 working days.</li>
  <li>Shipping charges may apply depending on location.</li>
  <li>Delays caused by courier partners are beyond our control.</li>
  <li>Please ensure correct address and contact details are provided.</li>
</ul>


      <h2 className="text-xl font-semibold mt-10 mb-3">
        3. Stitched & Unstitched Products
      </h2>
      <p>
        Some products are available as stitched or unstitched. Size options
        apply only to stitched products. Customers are responsible for
        selecting the correct option before confirming an order.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-3">
        4. Pricing & Discounts
      </h2>
      <p>
        Prices, offers, and discounts may change without prior notice.
        Promotions are valid for a limited period only.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-3">
        5. Product Images
      </h2>
      <p>
        Product images are for reference only. Actual colors and designs
        may vary slightly due to lighting or screen differences.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-3">
        6. Intellectual Property
      </h2>
      <p>
        All content on this website, including images, text, and branding,
        belongs to Khan’s Boutique and may not be reused without permission.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-3">
        7. Limitation of Liability
      </h2>
      <p>
        Khan’s Boutique is not responsible for any indirect loss, delays,
        or technical issues arising from website usage.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-3">
        8. Changes to Terms
      </h2>
      <p>
        These Terms of Service may be updated at any time. Continued use
        of the website indicates acceptance of the updated terms.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-3">
        9. Contact Information
      </h2>
      <p>
        For questions regarding these Terms, please contact us via
        WhatsApp available on our website.
      </p>
    </section>
  );
}