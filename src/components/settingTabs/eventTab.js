import React from "react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { Button, FormComponents } from "../";

import { Formik, Form, ErrorMessage } from "formik";
import { eventFormSchema } from "../../schema/formSchema";
import { uploadIMG } from "../../firebase/uploadIMG";

import { setEvent } from "../../firebase/eventData";

import { RiClipboardFill, RiUpload2Fill } from "react-icons/ri";

const EventTab = ({loadEvent}) => {
  const { TextField, SelectField, TextareaField, DateField } = FormComponents; //Form Components

  //  Make ID function, I use this to create random ID
  // credit : https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
  const makeid = (length) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };



  //  Create state for event name
  const [eventData, setEventData] = useState({
    id: makeid(10),
    category: "",
    description: "",
    image: "",
    link: "",
    title: "",
    when: "",
    where: "",
    createdAt: new Date().toISOString(),
  });

  useEffect(()=>{
    console.log(loadEvent);
    setEventData({...eventData,...loadEvent});
  },[loadEvent]);

  const inputRef = useRef(null);
  const handleFileClick = () => {
    inputRef.current.click();
  };

  const [uploading, setUploading] = useState(false);

  const updateEventImage = (file) => {
    setUploading(true);
    uploadIMG(file, `event/${eventData.id}`).then((url) => {
      setUploading(false);
      setEventData({ ...eventData, image: url });
    });
  };

  const warnForm = (errors) => {
    //change error from object to array
    const errorArray = Object.keys(errors);
    if (errorArray.length > 0) {
      console.log(errorArray);
      //use element as id and goto first element
      const firstError = document.getElementById(errorArray[0]);
      firstError.focus();
    }
  };

  const [eventLink, setEventLink] = useState("");

  const router = useRouter();

  useEffect(() => {
    console.log(router);
    const baseURL = window.location.origin;
    setEventLink(`${baseURL}/events/${eventData.id}`);
  }, [eventData]);

  const [copyMsg, setCopyMsg] = useState("Copy Link To Clipboard");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(eventLink);
    setCopyMsg("Copied!");
    setTimeout(() => {
      setCopyMsg("Copy Link To Clipboard");
    }, 2000);
  };

  const [saveMsg, setSaveMsg] = useState("Publish Event");
  const [saving, setSaving] = useState(false);
  const onFormSubmit = async (values) => {
    console.log(values);
    setSaving(true);
    setSaveMsg("Publishing ");
    await setEvent(eventData.id, values);
    setSaveMsg("Published!");
    setSaving(false);
  };

  return (
    <div>
      <div>
        <div className="grid grid-cols-6 gap-2 p-2 border-2 border-green-700 rounded-lg shadow-sm dark:bg-gray-800 bg-gray-100 my-5">
          <div className="col-span-full py-1 flex items-center justify-center text-lg capitalize w-full rounded-md font-bold">
            {copyMsg}
          </div>

          <div className="col-span-5 truncate w-full bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-green-400 dark:border-gray-700 dark:text-gray-100 outline-0 select-none">
            {eventLink}
          </div>
          <div
            className="col-span-1 flex items-center justify-center text-2xl bg-green-600 hover:bg-green-500 active:bg-green-600 w-full rounded-md cursor-pointer text-white "
            onClick={copyToClipboard}
          >
            <RiClipboardFill />
          </div>
        </div>

        <Formik
          initialValues={{ ...eventData }}
          enableReinitialize={true}
          onSubmit={(values) => {
            onFormSubmit(values);
          }}
          isSubmitting={true}
          validationSchema={eventFormSchema}
        >
          {({ errors, setFieldValue }) => (
            <Form className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid">
              <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-800 bg-gray-100">
                <div className="space-y-2 col-span-full lg:col-span-full">
                  <p className="text-lg font-medium">About Event</p>
                  <p className="text-sm">This will contain event details.</p>
                </div>
                <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-4">
                  <div className="col-span-full">
                    <label htmlFor="bio" className="text-sm font-bold">
                      Image/Poster
                    </label>
                    <div className="flex flex-col space-y-2">
                      <div className="dark:bg-gray-500 dark:bg-gray-700 rounded-lg overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                          src={
                            eventData.image ||
                            "https://via.placeholder.com/700x500"
                          }
                          alt=""
                        />
                      </div>
                      <input
                        type="file"
                        ref={inputRef}
                        onChange={(e) => {
                          updateEventImage(e.target.files[0]);
                        }}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={handleFileClick}
                        id="image"
                        className="px-2 py-1 w-fit border text-sm rounded-md border-gray-500 dark:border-gray-100 flex flex-row items-center space-x-1 shadow-sm focus:outline-none focus:ring focus:ring-opacity-75 focus:ring-green-400 dark:bg-gray-700 dark:text-gray-100"
                      >
                        Change Event Image
                        {uploading ? (
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
                        ) : (
                          <RiUpload2Fill className="ml-2 mr-1 h-5 w-5 text-white" />
                        )}
                      </button>
                      <ErrorMessage
                        name="image"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                  </div>
                  <TextField
                    spanClass="col-span-full"
                    label="Title"
                    name="title"
                    id="title"
                    type="text"
                  />
                  <SelectField
                    spanClass="col-span-full"
                    label="Category"
                    name="category"
                    options={[
                      { value: "Coding Event", label: "Coding Event" },
                      { value: "Job Event", label: "Job Event" },
                      { value: "Fun Event", label: "Fun Event" },
                      { value: "Miscs", label: "Miscs" },
                    ]}
                    id="category"
                    type="text"
                  />
                  <TextareaField
                    spanClass="col-span-full"
                    label="Description"
                    name="description"
                    id="description"
                    type="text"
                  />
                  <DateField
                    spanClass="col-span-full"
                    label="Date & Time"
                    name="when"
                    id="when"
                    type="date"
                    setFieldValue={setFieldValue}
                  />
                  <SelectField
                    spanClass="col-span-full"
                    label="Online or Offline"
                    name="online"
                    options={[
                      { value: "online", label: "Online" },
                      { value: "offline", label: "Offline" },
                    ]}
                    id="category"
                    type="text"
                  />
                  <TextField
                    spanClass="col-span-full"
                    label="Event Venue or Platform"
                    name="where"
                    id="where"
                    type="text"
                  />
                  <TextField
                    spanClass="col-span-full"
                    label="Link to External Website"
                    placeholder="Leave Blank if not applicable"
                    name="link"
                    id="link"
                    type="text"
                  />
                </div>
              </fieldset>

              <Button
                type="submit"
                className="bg-green-700 w-full focus:outline-green-600 flex flex-row items-center justify-center"
                click={(e) => {
                  warnForm(errors);
                }}
              >
                {saveMsg}
                {saving && (
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
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EventTab;
