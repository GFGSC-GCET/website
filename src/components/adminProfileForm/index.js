import React from "react";

import { useState, useEffect, useRef } from "react";

import { useUserContext } from "../../firebase/authContext";
import { uploadIMG } from "../../firebase/uploadIMG";
import { FormComponents, Button } from "../index";
import { Formik, Form, FormikErrors } from "formik";
import { adminUsereditformSchema } from "../../schema/formSchema";

import { useRouter } from "next/router";

const AdminProfileForm = (props) => {
  const { user, member, setUser } = useUserContext();

  const [memberData, setMemberData] = useState({});

  const getMember = async () => {
    const memberRes = await member.get(props?.user);
    console.log(props?.user ,memberRes);
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
    { value: "first", label: "First Year" },
    { value: "second", label: "Second Year" },
    { value: "third", label: "Third Year" },
    { value: "fourth", label: "Fourth Year" },
  ];
  

  const batchOptionList = [
    { value: "CSE A", label: "CSE A" },
    { value: "CSE B", label: "CSE B" },
    { value: "CSE AI", label: "CSE AI" },
    { value: "CSE DS", label: "CSE DS" },
    { value: "CSE D", label: "CSE Design" },
    { value: "AI DS", label: "AI DS" },
    { value: "AI ML", label: "AI ML" },
    { value: "IT A", label: "IT A" },
    { value: "IT B", label: "IT B" },
    { value: "IT C", label: "IT C" },
    { value: "ECE A", label: "ECE A" },
    { value: "ECE B", label: "ECE B" },
    { value: "ECE C", label: "ECE C" },
    { value: "EEE A", label: "EEE A" },
    { value: "EEE B", label: "EEE B" },
    { value: "EEE C", label: "EEE C" },
    { value: "EE A", label: "EE A" },
    { value: "EE B", label: "EE B" },
    { value: "EE C", label: "EE C" },
    { value: "EIE A", label: "EIE A" },
    { value: "EIE B", label: "EIE B" },
    { value: "EIE C", label: "EIE C" },
    { value: "ME A", label: "ME A" },
    { value: "ME B", label: "ME B" },
    { value: "ME C", label: "ME C" },
    { value: "CE A", label: "CE A" },
    { value: "CE B", label: "CE B" },
    { value: "CE C", label: "CE C" },
  ];
    
  const webRoleOptionList = [
    { value: "admin", label: "Admin (Full Access)" },
    { value: "eventManager", label: "Event Manager" },
    { value: "member", label: "Member" },
  ];
  const { TextField, SelectField, TextareaField, TagField } = FormComponents; //Form Components

  const router = useRouter();

  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("save changes");

  const onFormSubmit = async (values) => {
    setSaving(true);
    try {
      await member.set({ ...memberData, ...values, regComplete: true });
      setSaveMsg("changes saved");
      setSaving(false);
      setUser({ ...memberData, ...values, regComplete: true });
    } catch (e) {
      setSaveMsg("an error occured");
    }
    setTimeout(() => {
      setSaveMsg("Save Changes");
    }, 2000);
  };

  const warnForm = (errors) => {
    //change error from object to array
    const errorArray = Object.keys(errors);
    if (errorArray.length > 0) {
      console.log(errorArray);
      const firstError = document.getElementById(errorArray[0]);
      firstError.focus();
    }
  };
  return (
    <Formik
      initialValues={{ ...memberData }}
      enableReinitialize={true}
      onSubmit={(values) => {
        onFormSubmit(values);
      }}
      isSubmitting={true}
      validationSchema={adminUsereditformSchema}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className=" flex flex-col mx-auto space-y-5">
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-800 bg-gray-100">
            <div className="grid grid-cols-6 gap-4 col-span-full ">
              <div className="col-span-full xl:col-span-1">
                <label htmlFor="bio" className="text-sm font-bold">
                  Photo
                </label>
                <div className="flex flex-row xl:flex-col items-center space-y-2 mr-5">
                  <div className="w-40 h-40 dark:bg-gray-500 dark:bg-gray-700">
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
                    className="px-2 py-1 border text-sm rounded-md dark:border-gray-100 flex flex-row justify-center items-center space-y-3 ml-3 xl:ml-auto xl:space-x-1 xl:space-y-auto xl:w-full"
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
              <div className="grid grid-cols-6 gap-4 col-span-6 xl:col-span-5">
                <TextField
                  spanClass="col-span-full md:col-span-3"
                  label="Name"
                  name="displayName"
                  id="displayName"
                  type="text"
                />
                <div className="col-span-full md:col-span-3">
                  <label className="text-sm font-bold">Email</label>
                  <div className="h-fit w-full cursor-not-allowed bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-green-400 dark:border-gray-700 dark:text-gray-100 outline-0 disabled:cursor-not-allowed">
                    {memberData.email}
                  </div>
                </div>
                <TextField
                  spanClass="col-span-full md:col-span-3"
                  label="College Email"
                  name="collegeEmail"
                  id="collegeEmail"
                  type="text"
                />
                <TextField
                  spanClass="col-span-full md:col-span-3"
                  label="WhatsApp Number"
                  name="whatsappNumber"
                  id="whatsappNumber"
                  type="tel"
                />
                <SelectField
                  spanClass="col-span-3 md:col-span-3"
                  options={yearOptionList}
                  label="Year"
                  name="year"
                  id="year"
                />
                <SelectField
                  spanClass="col-span-3 md:col-span-3"
                  options={batchOptionList}
                  label="Batch"
                  name="batch"
                  id="batch"
                />
              </div>
            </div>
          </fieldset>

          <hr className="border-gray-200 dark:border-gray-700 " />

          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-800 bg-gray-100">
            <div className="grid grid-cols-6 gap-4 col-span-full">
              <TextareaField
                spanClass="col-span-full"
                label="Bio"
                description="Write a short introduction about yourself"
                name="bio"
                id="bio"
              />
              <TagField
                spanClass="col-span-full lg:col-span-3"
                label="Currently Learning"
                description="What projects are currently occupying most of your time?"
                name="learning"
                id="learning"
                placeholder="Android, Machine Learning..."
              />
              <TagField
                spanClass="col-span-full lg:col-span-3"
                label="Skills/Languages"
                description="What projects are currently occupying most of your time?"
                name="skills"
                id="skills"
                placeholder="C, Python, Javascript..."
              />
            </div>
          </fieldset>
          <hr className="border-gray-200 dark:border-gray-700 " />
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-800 bg-gray-100">
            <div className="grid grid-cols-6 gap-4 col-span-full">
              <TextField
                spanClass="col-span-full md:col-span-3"
                label="Github Profile URL"
                name="github"
                id="github"
                placeholder="https://github.com/...."
                type="text"
              />
              <TextField
                spanClass="col-span-full md:col-span-3"
                label="Linked In Profile URL"
                name="linkedin"
                id="linkedin"
                placeholder="https://linkedin.com/in/...."
                type="text"
              />
              <TextField
                spanClass="col-span-full md:col-span-3"
                label="Personal Website URL (if any)"
                name="website"
                id="website"
                placeholder="https://myportfolio.com/...."
                type="text"
              />
              <TextField
                spanClass="col-span-full md:col-span-3"
                label="Instagram Profile URL"
                name="instagram"
                id="instagram"
                placeholder="https://instagram.com/...."
                type="text"
              />
            </div>
          </fieldset>
          <hr className="border-gray-200 dark:border-gray-700 " />
          <span className="text-red-500 text-lg font-bold uppercase">
            Admin only fileds
          </span>
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-800 bg-gray-100 border-2 border-red-500">
            <div className="grid grid-cols-6 gap-4 col-span-full">
              <SelectField
                spanClass="col-span-full sm:col-span-3 md:col-span-2"
                options={webRoleOptionList}
                label="Web Role"
                name="webRole"
                id="webRole"
              />
              <TextField
                spanClass="col-span-full sm:col-span-3 md:col-span-2"
                label="Member's Priority"
                name="priority"
                id="priority"
                placeholder="10, 20, 30, 40, 50... 100"
                type="text"
              />
              <TextField
                spanClass="col-span-full md:col-span-2"
                label="Designation in Team"
                name="role"
                id="role"
                placeholder="Chapter Lead, Technical Lead, Mentor, Member ...."
                type="text"
              />
            </div>
          </fieldset>
          <hr className="border-gray-200 dark:border-gray-700 " />
          <Button
            type="submit"
            className="flex flex-row justify-center items-center bg-green-700 w-full max-w-lg focus:outline-green-600 col-span-full mx-auto"
            click={() => {
              warnForm(errors);
            }}
          >
            {saveMsg}
            {saving && (
              <svg
                className="animate-spin ml-2 mr-3 h-5 w-5 text-white"
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
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AdminProfileForm;
