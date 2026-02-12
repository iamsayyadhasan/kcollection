export const metadata = {
  title: "Privacy Policy | Khan’s Boutique",
  description: "Privacy Policy of Khan’s Boutique",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 text-gray-800 mt-15">
      <h1 className="text-3xl md:text-4xl font-semibold mb-6">
        Privacy Policy
      </h1>

      <p className="text-sm text-gray-500 mb-10">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <p className="mb-6">
        Welcome to <strong>Khan’s Boutique</strong>. Your privacy is important
        to us. This Privacy Policy explains how we collect, use, and protect
        your information when you visit our website or contact us.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-3">
        1. Information We Collect
      </h2>
      <p className="mb-3">
        We collect limited information only to assist with customer inquiries
        and orders. This may include:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Your name</li>
        <li>Your mobile number (for WhatsApp communication)</li>
        <li>Product preferences such as size or stitched/unstiched selection</li>
        <li>Messages shared with us on WhatsApp</li>
      </ul>

      <h2 className="text-xl font-semibold mt-10 mb-3">
        2. How We Use Your Information
      </h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>To respond to product inquiries</li>
        <li>To confirm product availability</li>
        <li>To communicate order details via WhatsApp</li>
        <li>To improve our customer experience</li>
      </ul>

      <h2 className="text-xl font-semibold mt-10 mb-3">
        3. WhatsApp Orders
      </h2>
      <p>
        Khan’s Boutique does not provide online checkout or payment options
        on the website. All orders and discussions are handled via WhatsApp.
        By contacting us, you agree to receive order-related messages.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-3">
        4. Data Protection
      </h2>
      <p>
        We take reasonable steps to protect your personal information.
        However, no online platform is completely secure.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-3">
        5. Third-Party Services
      </h2>
      <p>
        We may use third-party services such as website hosting or analytics
        tools. These services follow their own privacy policies.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-3">
        6. Updates to This Policy
      </h2>
      <p>
        This Privacy Policy may be updated from time to time. Any changes
        will be posted on this page.
      </p>

      <h2 className="text-xl font-semibold mt-10 mb-3">
        7. Contact Us
      </h2>
      <p>
        If you have any questions regarding this Privacy Policy, please
        contact us through WhatsApp available on our website.
      </p>
    </section>
  );
}
