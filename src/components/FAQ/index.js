import React from "react";
import { useState } from "react";

const Single = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFAQ = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="cursor-pointer transition border-2 border-gray-100 rounded-lg dark:border-gray-700"
    >
      <button
        className="flex items-center justify-between w-full p-8"
        onClick={() => {
          toggleFAQ();
        }}
      >
        <h1 className="font-semibold text-gray-700 dark:text-white text-left">
          {props.FAQ.question}
        </h1>

        {isOpen ? (
          <span className="text-gray-400 bg-gray-200 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18 12H6"
              />
            </svg>
          </span>
        ) : (
          <span className="text-white bg-green-600 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <hr className="border-gray-200 dark:border-gray-700" />
          <p className="p-8 text-sm text-gray-500 dark:text-gray-300 text-left">
            {props.FAQ.answer}
          </p>
        </>
      )}
    </div>
  );
};

const Faq = () => {
  const FAQs = [
    {
      question: "How to join ?",
      answer: "Click the join button",
    },
    {
      question: "What to do after joining?",
      answer: "Do fun stuffs",
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container max-w-4xl px-6 py-10 mx-auto">
        <h1 className="text-4xl font-semibold text-center text-gray-800 dark:text-white">
          Frequently asked questions
        </h1>

        <div className="mt-12 space-y-8">
          {FAQs.map((FAQ, index) => {
            return <Single FAQ={FAQ} key={index} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Faq;
