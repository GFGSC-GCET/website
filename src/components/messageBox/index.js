import React from 'react'

import { FaTimes } from 'react-icons/fa'
import { useState } from 'react'
const MessageBox = () => {
  const [show,setShow] = useState(true);

  return (
    <>
      { show &&
        <section class="bg-gray-100 dark:bg-transparent lg:py-2 mb-5 lg:flex lg:justify-center">
            <div class="relative bg-gray-100 lg:bg-white dark:bg-gray-800 lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg">
                <div className="absolute top-5 right-5 text-xl text-gray-300 dark:text-gray-500 hover:text-red-500 hover:dark:text-red-500 cursor-pointer">
                  <FaTimes onClick={()=>{setShow(!show)}}/>
                </div>
                <div class="hidden lg:block lg:w-1/2 ">
                    <div class="flex items-center justify-center h-full lg:rounded-lg overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="http://unsplash.it/1080/650" className="bg-cover object-cover" alt='message'/>
                    </div>
                </div>

                <div class="max-w-xl px-6 py-12 lg:max-w-5xl lg:w-1/2">
                    <h2 class="text-2xl font-bold text-gray-800 dark:text-white md:text-3xl">Welcome to <span class="text-green-700 dark:text-green-600">GFGSC-GCET</span></h2>
                    <p class="mt-4 text-gray-600 dark:text-gray-400">
                      Website Still under development <br/>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem modi reprehenderit vitae exercitationem aliquid dolores ullam temporibus enim expedita aperiam mollitia iure consectetur dicta tenetur, porro consequuntur saepe accusantium consequatur.</p>

                    <div class="mt-8">
                        <a href="#" class="px-5 py-2 font-semibold text-gray-100 transition-colors duration-300 transform bg-gray-900 rounded-md hover:bg-gray-700">Start Now</a>
                    </div>
                </div>
            </div>
        </section>
      }
    </>
  )
}

export default MessageBox