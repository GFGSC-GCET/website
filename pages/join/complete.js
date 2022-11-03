import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Breadcrumbs,
  Button,
  Footer,
  Nav,
  ThemeChanger,
  FormComponents,
} from "../../src/components";

import { useUserContext } from "../../src/firebase/authContext";
import { uploadIMG } from "../../src/firebase/uploadIMG";

import { withProtected } from "../../src/routes";

import { Formik, Form } from "formik";
import { formSchema } from "../../src/schema/formSchema";


const Complete = () => {
  const { TextField, SelectField, TextareaField } = FormComponents; //Form Components

  const { user, member, setUser } = useUserContext();

  const [memberData, setMemberData] = useState({});

  const getMember = async () => {
    const memberRes = await member.get(user);
    console.log(memberRes);
    setMemberData(memberRes);
  };

  useEffect(() => {
    getMember();
  }, []);

  const inputRef = useRef(null);
  const handleFileClick = () => {
    inputRef.current.click();
  };

  const [uploading, setUploading] = useState(false);

  const updateProfileImage = (file) => {
    setUploading(true);
    uploadIMG(file, `profile/${user.uid}`).then((url) => {
      setMemberData({ ...memberData, photoURL: url });
      member.set({ ...memberData, photoURL: url });
      setUser({ ...user, photoURL: url });
      setUploading(false);
    });
  };

  const yearOptionList = [
    { value: 1, label: "First Year" },
    { value: 2, label: "Second Year" },
    { value: 3, label: "Third Year" },
  ];

  const batchOptionList = [
    { value: "ECE-A", label: "ECE A" },
    { value: "ECE-B", label: "ECE B" },
    { value: "CSE-A", label: "CSE A" },
    { value: "CSE-B", label: "CSE B" },
  ];

  const onFormSubmit=(values)=>{
    member.set({...memberData,...values})
  }

  return (
    <>
      <Nav />
      <Breadcrumbs />
      <ThemeChanger />
      <div className="container min-h-screen px-6 py-10 mx-auto">
        <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white">
          Complete your{" "}
          <span
            className="text-green-500"
            title="Geeks for Geeks Student Club of Galgotas College of Engineering & Technology"
          >
            Profile
          </span>
        </h1>
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col justify-center items-center w-full max-w-xl m-auto m-5 p-2 border-2 border-gray-100 dark:border-gray-800 border rounded-lg">
            <section className="p-6 dark:bg-gray-800 dark:text-gray-50">
              <Formik
                initialValues={{...memberData }}
                enableReinitialize={true}
                onSubmit={(values) => {
                  console.log(values);
                  onFormSubmit(values);
                }}
                isSubmitting={true}
                validationSchema={formSchema}
              >
                <Form className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid">
                  <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900 bg-gray-100">
                    <div className="space-y-2 col-span-full lg:col-span-1">
                      <p className="text-lg font-medium">Personal Inormation</p>
                      <p className="text-sm">
                        This will help us to contact you.
                      </p>
                    </div>
                    <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                      <div className="col-span-full">
                        <label htmlFor="bio" className="text-sm">
                          Photo
                        </label>
                        <div className="flex items-center space-x-2">
                          <div className="w-28 h-28 dark:bg-gray-500 dark:bg-gray-700">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={memberData.photoURL}
                              alt=""
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <input
                            type="file"
                            ref={inputRef}
                            onChange={(e) => {
                              updateProfileImage(e.target.files[0]);
                            }}
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={handleFileClick}
                            className="px-2 py-1 border text-sm rounded-md dark:border-gray-100 flex flex-row items-center space-x-1"
                          >
                            Change
                            {uploading && (
                              <svg
                                className="animate-spin ml-2 mr-1 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>
                      <TextField
                        spanClass="col-span-full"
                        label="Name"
                        name="displayName"
                        type="text"
                      />
                      <TextField
                        spanClass="col-span-full"
                        label="Email"
                        name="email"
                        type="email"
                        disabled={true}
                      />
                      <TextField
                        spanClass="col-span-full"
                        label="College Email"
                        name="collegeEmail"
                        type="text"
                      />
                      <TextField
                        spanClass="col-span-full"
                        label="WhatsApp Number"
                        name="whatsappNumber"
                        type="tel"
                      />
                      <SelectField
                        spanClass="col-span-3"
                        options={yearOptionList}
                        label="Year"
                        name="year"
                      />
                      <SelectField
                        spanClass="col-span-3"
                        options={batchOptionList}
                        label="Batch"
                        name="batch"
                      />
                    </div>
                  </fieldset>

                  <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900 bg-gray-100">
                    <div className="space-y-2 col-span-full lg:col-span-1">
                      <p className="font-medium">About You</p>
                      <p className="text-xs">Adipisci fuga autem eum!</p>
                    </div>
                    <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                      <TextareaField
                        spanClass="col-span-full"
                        label="Bio"
                        description=""
                        name="bio"
                      />
                      <TextareaField
                        spanClass="col-span-full"
                        label="Currently learning"
                        description="What are you learning right now? What are the new tools and languages you're picking up right now?"
                        name="learning"
                      />
                      <TextareaField
                        spanClass="col-span-full"
                        label="Skills/Languages"
                        description="What projects are currently occupying most of your time?"
                        name="skills"
                      />
                      <TextareaField
                        spanClass="col-span-full"
                        label="Currently hacking on"
                        description="What tools and languages are you most experienced with? Are you specialized or more of a generalist?"
                        name="skills"
                      />
                    </div>
                  </fieldset>
                  <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900 bg-gray-100">
                    <div className="space-y-2 col-span-full lg:col-span-1">
                      <p className="font-medium">Profiles</p>
                      <p className="text-xs">Adipisci fuga autem eum!</p>
                    </div>
                    <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                      <TextField
                        spanClass="col-span-full"
                        label="Github Profile URL"
                        name="github"
                        type="text"
                      />
                      <TextField
                        spanClass="col-span-full"
                        label="Linked In Profile URL"
                        name="linkedin"
                        type="text"
                      />
                      <TextField
                        spanClass="col-span-full"
                        label="Personal Website URL (if any)"
                        name="website"
                        type="text"
                      />
                      <TextField
                        spanClass="col-span-full"
                        label="Instagram Profile URL"
                        name="website"
                        type="text"
                      />
                    </div>
                  </fieldset>
                  <Button type="submit" className="bg-green-700 w-full">
                    submit
                  </Button>
                </Form>
              </Formik>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default withProtected(Complete);
