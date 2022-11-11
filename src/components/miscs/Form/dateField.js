import React from "react";
import {useState, useRef, useEffect} from 'react';
import { ErrorMessage, useField, Field } from "formik";
import format from "date-fns/format";

const DateField = ({
  label,
  disabled,
  spanClass,
  placeholder,
  id,
  setFieldValue,
  ...props
}) => {
  const dateRef = useRef(null);
  const [field, meta] = useField(props);
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  

  const setISO = () => {
    if(date && time){
      const dateString = (date)+" "+ (time) + ":00 UTC+5:30"
      const event = new Date(dateString);
      setFieldValue(field.name, event.toISOString());
    }
  }

  useEffect(()=>{
    if(field.value){
      const date = new Date(field.value);
      setDate(format(date, "yyyy-MM-dd"));
      setTime(format(date, "HH:mm"));
    }
  },[])

  return (
    <div className={spanClass}>
      <label className="text-sm font-bold">{label}</label>
      <div className="grid grid-cols-6 gap-2 w-full">
        <input
          id={id}
          {...field}
          type="text"
          // ref={dateRef}
          placeholder={placeholder}
          className={`hidden col-span-full w-full bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-green-400 dark:border-gray-700 dark:text-gray-100 outline-0 disabled:cursor-not-allowed`}
          disabled={disabled}
        />
        <input
          type="date"
          placeholder={placeholder}
          className={`col-span-full w-full bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-green-400 dark:border-gray-700 dark:text-gray-100 outline-0 disabled:cursor-not-allowed`}
          disabled={disabled}
          onChange={(e) => {
            setDate(e.target.value);
          }}
          onBlur={setISO}
          value={date}
        />
        <input
          type="time"
          placeholder={placeholder}
          className={`col-span-full w-full bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-green-400 dark:border-gray-700 dark:text-gray-100 outline-0 disabled:cursor-not-allowed`}
          disabled={disabled}
          onChange={(e) => {
            setTime(e.target.value);
          }}
          onBlur={setISO}
          value={time}
        />
      </div>

      <ErrorMessage
        name={field.name}
        component="div"
        className="text-red-500 text-xs"
      />
    </div>
  );
};

export default DateField;
