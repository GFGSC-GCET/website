import React from "react";
import { FaInstagram } from "react-icons/fa";


import { FormComponents, Button } from "../index";
import { Formik, Form, FormikErrors } from "formik";
import { contactFormSchema } from "../../schema/formSchema";

import { sendResponse } from "../../discord";


const ContactForm = () => {

  const { TextField, SelectField, TextareaField, TagField } = FormComponents; //Form Components

  const onFormSubmit = (values) => {
    console.log(values);
    const msg = `
     You got a message from ${values.name}: \n
     \n
     ${values.message}
     \n
     you can reply at ${values.email}
     `
    sendResponse(msg,"Contact Form")
  }

  return (
    <section className="w-full max-w-2xl px-6 py-4 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 my-10">
      <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white">
        Get in touch
      </h2>

      <p className="mt-3 text-center text-gray-600 dark:text-gray-400">
        Any queries? Feel free to contact us.
      </p>

      <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 md:grid-cols-3">
        <a
          href="#"
          className="flex flex-col items-center px-4 py-3 text-gray-700 transition-colors duration-300 transform rounded-md dark:text-gray-200 hover:bg-green-200 dark:hover:bg-green-600"
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>

          <span className="mt-2">GCET, KP 2</span>
        </a>

        <a
          rel="noreferrer"
          target="_blank"
          href="tel:+918178592355"
          className="flex flex-col items-center px-4 py-3 text-gray-700 transition-colors duration-300 transform rounded-md dark:text-gray-200 hover:bg-green-200 dark:hover:bg-green-600"
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>

          <span className="mt-2">+91 81785 92355</span>
        </a>

        <a
          rel="noreferrer"
          target="_blank"
          href="https://www.instagram.com/gfgsc-gcet"
          className="flex flex-col items-center px-4 py-3 text-gray-700 transition-colors duration-300 transform rounded-md dark:text-gray-200 hover:bg-green-200 dark:hover:bg-green-600"
        >
          <FaInstagram  className="text-lg"/>

          <span className="mt-2">gfgsc-gcet</span>
        </a>
      </div>

    <Formik
      initialValues={{ name:"",email:"",message:"" }}
      enableReinitialize={true}
      onSubmit={(values) => {
        onFormSubmit(values);
      }}
      isSubmitting={true}
      validationSchema={contactFormSchema}
    >
        <Form className="container flex flex-col mx-auto space-y-5">

          <div className="mt-6 ">
            <div className="items-center -mx-2 md:flex">
              <div className="w-full mx-2">
                <TextField
                  spanClass="col-span-3"
                  label="Name"
                  name="name"
                  id="name"
                  type="text"
                />
              </div>

              <div className="w-full mx-2 mt-4 md:mt-0">
                <TextField
                  spanClass="col-span-3"
                  label="Email"
                  name="email"
                  id="email"
                  type="text"
                />
              </div>
            </div>

            <div className="w-full mt-4">
              <TextareaField
                spanClass="col-span-full"
                label="Message"
                name="message"
                id="message"
              />
            </div>

            <div className="flex justify-center mt-6">
              <button className="px-4 py-2 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                Send Message
              </button>
            </div>
          </div>
                
        </Form>
    </Formik>
    </section>
  );
};

export default ContactForm;
