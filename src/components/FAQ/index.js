import React, {useState} from "react";
import {RiAddFill, RiSubtractFill} from "react-icons/ri";

const Single = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleFAQ = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div
            className="cursor-pointer transition border border-gray-100 rounded-lg dark:border-gray-800"
        >
            <button
                className="flex items-center justify-between w-full px-8"
                onClick={() => {
                    toggleFAQ();
                }}
            >
                <h3 className="my-4 text-left">
                    {props.FAQ.question}
                </h3>

                {isOpen ? (
                    <span className="text-gray-400 dark:bg-gray-600 bg-gray-200 rounded-full">
           <RiSubtractFill size={25}/>
          </span>
                ) : (
                    <span className="text-green-500 bg-opacity-30 bg-green-600 rounded-full">
          <RiAddFill size={25}/>
          </span>
                )}
            </button>

            {isOpen && (
                <>
                    <p className="px-8 my-3">
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
            question: "What are the perks after joining?",
            answer: "It will help you to grow , learn and explore. You will get a chance to win exciting prizes and goodies if hold a position in any competition. You may get an internship opportunity at GeeksforGeeks",
        },
        {
            question: "What are some of the events we organise?",
            answer: "You can have coding competition, events, webinars and rest is imagination with no limits.",
        },
        {
            question: "How it is beneficial for me? ",
            answer: "You will get an opportunity to compete on a PAN India level. It will help students to grow a network among 145+ colleges.You will stay updated regarding internships, placement and ongoing events.",
        },
    ];

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="container max-w-4xl px-6 py-10 mx-auto prose dark:prose-invert">
                <h1 className="text-center">
                    Frequently asked questions
                </h1>

                <div className="mt-2 space-y-4">
                    {FAQs.map((FAQ, index) => {
                        return <Single FAQ={FAQ} key={index}/>;
                    })}
                </div>
            </div>
        </section>
    );
};

export default Faq;
