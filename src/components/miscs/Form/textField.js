import React from 'react'
import { ErrorMessage, useField } from 'formik';

const TextField = ({label, disabled, spanClass, placeholder,id, ...props}) => {
  const [field, meta] = useField(props);
  return (
    <div className={spanClass}>
      <label className="text-sm font-bold">{label}</label>
      <div className='flex flex-row'>

        {
          props.type == 'tel' &&
          <div className="w-fit mr-2 bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-green-400 dark:border-gray-700 dark:text-gray-100 outline-0 disabled:cursor-not-allowed">
            +91
          </div>
        }
        
        <input
          id={id}
          {...field}
          placeholder={placeholder}
          className={`w-full bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-green-400 dark:border-gray-700 dark:text-gray-100 outline-0 disabled:cursor-not-allowed`}
          disabled={disabled}
          />
      </div>

      <ErrorMessage
        name={field.name}
        component="div"
        className="text-red-500 text-xs"
      />
    </div>
  );
}

export default TextField