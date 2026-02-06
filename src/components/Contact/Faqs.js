"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, Khan’s Collection offers international shipping to selected countries. Shipping charges and delivery times vary based on location and will be shown at checkout.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Once your order is shipped, you will receive a tracking link via email or WhatsApp. You can use this link to track your order in real time.",
  },
  {
    question: "How can I apply a discount or promo code?",
    answer:
      "You can apply your promo code at checkout in the discount field. Make sure the code is valid and active before completing your purchase.",
  },
  {
    question: "What sizes do you offer and how do I choose?",
    answer:
      "We offer a wide range of sizes. Each product page includes a detailed size chart to help you choose the perfect fit.",
  },
  {
    question: "What is your return and exchange policy?",
    answer:
      "We accept returns and exchanges within 7 days of delivery, provided the item is unused and in original condition. Please refer to our return policy page for details.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can contact our customer support team via email at support@khanscollection.com or through the contact form on our website.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 py-24">

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">

          {/* LEFT SIDE */}
          <div className="md:col-span-5">
            <p className="text-sm text-gray-500 mb-6">(FAQ)</p>

            <h1 className="text-4xl sm:text-5xl font-semibold leading-tight">
              Quick Answers <br />
              to Common Questions
            </h1>
          </div>

          {/* RIGHT SIDE */}
          <div className="md:col-span-7 divide-y">

            {faqs.map((faq, index) => (
              <div key={index} className="py-6">

                {/* QUESTION */}
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full flex justify-between items-center text-left"
                >
                  <span className="text-base font-bold">
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* ANSWER */}
                {openIndex === index && (
                  <p className="mt-4 text-gray-600 text-sm leading-relaxed max-w-xl">
                    {faq.answer}
                  </p>
                )}

              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}
