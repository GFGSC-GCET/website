import React from "react";
import { useState } from "react";

const Single = (props) =>{

  const [isOpen, setIsOpen] = useState(false);

  const toggleFAQ = () => {
    setIsOpen(!isOpen);
  }

  return(
    <div className="cursor-pointer transition border-2 dark:border-gray-100 rounded-lg border-gray-700" key={props.key}>
                  <button className="flex items-center justify-between w-full p-8" onClick={()=>{toggleFAQ()}}>
                    <h1 className="font-semibold dark:text-gray-700 text-white text-left">
                      {props.FAQ.question}
                    </h1>

                      {
                        isOpen ?
                        <span className="text-gray-400 bg-gray-200 rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M18 12H6"
                              />
                          </svg>
                        </span>
                        :
                        
                        <span class="text-white bg-green-600 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </span>
                      }

                  </button>

                  <hr className="dark:border-gray-200 border-gray-700" />
                  {
                    isOpen &&
                    <p className="p-8 text-sm dark:text-gray-500 text-gray-300 text-left">
                      {props.FAQ.answer}
                    </p>
                  }

                </div>
  )

}

const Faq = () => {

  const FAQs = [
    {
      "question":"How to join ?",
      "answer": "Click the join button"
    },
    {
      "question":"What to do after joining?",
      "answer": "Do fun stuffs"
    },
  ]


  return (
    <section className="dark:bg-white bg-gray-900">
      <div className="container max-w-4xl px-6 py-10 mx-auto">
        <h1 className="text-4xl font-semibold text-center dark:text-gray-800 text-white">
          Frequently asked questions
        </h1>

        <div className="mt-12 space-y-8">

          {
            FAQs.map((FAQ,index)=>{

              return(
                <Single FAQ={FAQ} key={index}/>
              )
            })
          }




        </div>
      </div>
    </section>
  );
};

export default Faq;
