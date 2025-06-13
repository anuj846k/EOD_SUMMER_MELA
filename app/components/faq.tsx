"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
  {
    question: "What are the operating hours of the Adventure Park?",
    answer:
      "Our Adventure Park is open from 9:00 AM to 10:00 PM on weekdays , weekends and holidays. Last entry is permitted 2 hours before closing time.",
  },
  {
    question: "How do I book tickets?",
    answer:
      "You can book tickets online through our website . Alternatively, you can also purchase tickets at the venue. Student discounts are available with valid ID cards.",
  },
  {
    question: "Are there any height or age restrictions for rides?",
    answer:
      "Yes, different attractions have specific height and age requirements for safety reasons. Our most thrilling rides require a minimum height of 48 inches (122 cm). Children under 12 must be accompanied by an adult on all park premises.",
  },
  {
    question: "What should I wear to the Adventure Park?",
    answer:
      "We recommend comfortable athletic clothing and closed-toe shoes. For rain dance, bring change of clothes and a towel. Avoid loose articles like scarves or dangling jewelry that could pose safety risks on rides.",
  },
  {
    question: "Is outside food and drink allowed in the park?",
    answer:
      "Outside food and drinks are not permitted except for water bottles and special dietary requirements (baby food, medical needs, etc.). We offer a variety of dining options throughout the park to suit different tastes and dietary needs.",
  },
  {
    question: "Do you offer any discounts or special packages?",
    answer:
      "Yes! We offer exclusive student discounts on tickets upon presenting a valid student ID card. Don't miss the limited-time 20% off offer—book online or at the venue!",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="bg-gradient-to-b from-blue-50 via-blue-100 to-white py-20 px-4 md:px-8 lg:px-16 "
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-blue-600 text-lg max-w-2xl mx-auto">
            Everything you need to know before your adventure begins
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden border-l-4 border-blue-500 hover:shadow-xl transition-all duration-300"
            >
              <button
                className="w-full flex justify-between items-center p-5 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="text-lg md:text-xl font-semibold text-blue-900">
                  {faq.question}
                </h3>
                <div className="bg-blue-100 rounded-full p-2 text-blue-700">
                  {openIndex === index ? (
                    <FaChevronUp className="h-5 w-5" />
                  ) : (
                    <FaChevronDown className="h-5 w-5" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 pt-2 border-t border-blue-100">
                      <p className="text-blue-800">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
