import React from 'react'

const Loading = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 z-50 bg-gray-100 dark:bg-gray-900">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-green-500"></div>
    </div>
  );
}

export default Loading