import React, {useEffect, useRef, useState} from "react";
import {Breadcrumbs, Button, Footer, FormComponents, Nav, ThemeChanger,} from "../../src/components";

import {useUserContext} from "../../src/firebase/authContext";
import {uploadIMG} from "../../src/firebase/uploadIMG";

import {withProtected} from "../../src/routes";

import {Form, Formik} from "formik";
import {formSchema} from "../../src/schema/formSchema";

import {useRouter} from "next/router";

const Complete = () => {
    const {user, member, setUser} = useUserContext();

    const [memberData, setMemberData] = useState({});

    const getMember = async () => {
        const memberRes = await member.get(user);
        memberRes?.regComplete ? router.push("/") : null;
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
            setMemberData({...memberData, photoURL: url});
            member.set({...memberData, photoURL: url});
            setUser({...user, photoURL: url});
            setUploading(false);
        });
    };

    const yearOptionList = [
        {value: "first", label: "First Year"},
        {value: "second", label: "Second Year"},
        {value: "third", label: "Third Year"},
        {value: "fourth", label: "Fourth Year"},
    ];


    const batchOptionList = [
        {value: "CSE A", label: "CSE A"},
        {value: "CSE B", label: "CSE B"},
        {value: "CSE AI", label: "CSE AI"},
        {value: "CSE DS", label: "CSE DS"},
        {value: "CSE D", label: "CSE Design"},
        {value: "AI DS", label: "AI DS"},
        {value: "AI ML", label: "AI ML"},
        {value: "IT A", label: "IT A"},
        {value: "IT B", label: "IT B"},
        {value: "IT C", label: "IT C"},
        {value: "ECE A", label: "ECE A"},
        {value: "ECE B", label: "ECE B"},
        {value: "ECE C", label: "ECE C"},
        {value: "EEE A", label: "EEE A"},
        {value: "EEE B", label: "EEE B"},
        {value: "EEE C", label: "EEE C"},
        {value: "EE A", label: "EE A"},
        {value: "EE B", label: "EE B"},
        {value: "EE C", label: "EE C"},
        {value: "EIE A", label: "EIE A"},
        {value: "EIE B", label: "EIE B"},
        {value: "EIE C", label: "EIE C"},
        {value: "ME A", label: "ME A"},
        {value: "ME B", label: "ME B"},
        {value: "ME C", label: "ME C"},
        {value: "CE A", label: "CE A"},
        {value: "CE B", label: "CE B"},
        {value: "CE C", label: "CE C"},
    ];

    const {TextField, SelectField, TextareaField, TagField} = FormComponents; //Form Components

    const router = useRouter();

    const onFormSubmit = async (values) => {
        try {
            await member.set({ ...memberData, ...values, regComplete: true });
            setUser({...memberData, ...values, regComplete: true});
            await router.push("/profile");
        } catch (e) {
            console.error(e);
        }
        await router.push("/profile");
    };

    const warnForm = (errors) => {
        //change error from object to array
        const errorArray = Object.keys(errors);
        if (errorArray.length > 0) {
            console.log(errorArray);
            //use element as id and goto first element
            const firstError = document.getElementById(errorArray[0]);
            firstError.focus();

            // const headerOffset = 200;
            // var elementPosition = firstError.getBoundingClientRect().top;
            // var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            // //focus in the element

            // window.scrollTo({
            //   top: offsetPosition,
            //   behavior: "smooth"
            // });
            // firstError.scrollTo({ top: 0, behavior: "smooth" });

        }
    };

    return (
      <>
        <Nav />
        <Breadcrumbs />
        <ThemeChanger />
        <div className="container min-h-screen px-6 py-10 mx-auto">
          <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white">
            Complete your <span className="text-green-500">Profile</span>
          </h1>
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col justify-center items-center w-full max-w-xl m-auto m-5 p-2 border-2 border-gray-100 dark:border-gray-800 border rounded-lg">
              <section className="p-6 dark:bg-gray-800 dark:text-gray-50">
                <Formik
                  initialValues={{ ...memberData }}
                  enableReinitialize={true}
                  onSubmit={(values) => {
                    onFormSubmit(values);
                  }}
                  isSubmitting={true}
                  validationSchema={formSchema}
                >
                  {({ errors, touched, isSubmitting }) => (
                    <Form className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid">
                      <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900 bg-gray-100">
                        <div className="space-y-2 col-span-full lg:col-span-1">
                          <p className="text-lg font-medium">
                            Personal Inormation
                          </p>
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
                            id="displayName"
                            type="text"
                          />
                          <div className="col-span-full">
                            <label className="text-sm font-bold">Email</label>
                            <div className="h-fit w-full cursor-not-allowed bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-green-400 dark:border-gray-700 dark:text-gray-100 outline-0 disabled:cursor-not-allowed">
                              {memberData.email}
                            </div>
                          </div>
                          <TextField
                            spanClass="col-span-full"
                            label="College Email"
                            name="collegeEmail"
                            id="collegeEmail"
                            type="text"
                          />
                          <TextField
                            spanClass="col-span-full"
                            label="WhatsApp Number"
                            name="whatsappNumber"
                            id="whatsappNumber"
                            type="tel"
                          />
                          <SelectField
                            spanClass="col-span-3"
                            options={yearOptionList}
                            label="Year"
                            name="year"
                            id="year"
                          />
                          <SelectField
                            spanClass="col-span-3"
                            options={batchOptionList}
                            label="Batch"
                            name="batch"
                            id="batch"
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
                            description="Write a short introduction about yourself"
                            name="bio"
                            id="bio"
                          />
                          <TagField
                            spanClass="col-span-full"
                            label="Currently Learning"
                            description="What projects are currently occupying most of your time?"
                            name="learning"
                            id="learning"
                            placeholder="Android, Machine Learning..."
                          />
                          <TagField
                            spanClass="col-span-full"
                            label="Skills/Languages"
                            description="What projects are currently occupying most of your time?"
                            name="skills"
                            id="skills"
                            placeholder="C, Python, Javascript..."
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
                            label="GFG Profile URL"
                            name="gfg"
                            id="gfg"
                            placeholder="https://auth.geeksforgeeks.org/user/...."
                            type="text"
                          />
                          <TextField
                            spanClass="col-span-full"
                            label="Github Profile URL"
                            name="github"
                            id="github"
                            placeholder="https://github.com/...."
                            type="text"
                          />
                          <TextField
                            spanClass="col-span-full"
                            label="Linked In Profile URL"
                            name="linkedin"
                            id="linkedin"
                            placeholder="https://linkedin.com/in/...."
                            type="text"
                          />
                          <TextField
                            spanClass="col-span-full"
                            label="Personal Website URL (if any)"
                            name="website"
                            id="website"
                            placeholder="https://myportfolio.com/...."
                            type="text"
                          />
                          <TextField
                            spanClass="col-span-full"
                            label="Instagram Profile URL"
                            name="instagram"
                            id="instagram"
                            placeholder="https://instagram.com/...."
                            type="text"
                          />
                        </div>
                      </fieldset>
                      <Button
                        type="submit"
                        className="bg-green-700 w-full focus:outline-green-600"
                        click={(e) => {
                          warnForm(errors);
                        }}
                      >
                        submit
                      </Button>
                    </Form>
                  )}
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
