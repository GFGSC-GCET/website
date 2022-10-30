import React from 'react'
import {Breadcrumbs, Button, Footer, Nav, ThemeChanger} from '../../src/components'
import { useUserContext } from "../../src/firebase/authContext";
import { withProtected } from "../../src/routes"

import {BiError} from 'react-icons/bi'


const Complete = () => {

  const { user, logout, loginWithGoogle } = useUserContext();

  return (
    <>
      <Nav/>
      <Breadcrumbs/>
      <ThemeChanger/>
      <div className="container min-h-screen px-6 py-10 mx-auto">

      <h1 class="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white">
        Complete your <span
              class="text-green-500"
              title="Geeks for Geeks Student Club of Galgotas College of Engineering & Technology"
            >
              profile
            </span>
      </h1>
      <div class="flex flex-col items-center justify-center">


    <div class="flex flex-col justify-center items-center w-full max-w-xl m-auto m-5 p-2 border-2 border-gray-400 border-dashed rounded-lg">
      <section className="p-6 dark:bg-gray-800 dark:text-gray-50">
	<form novalidate="" action="" className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid">
		<fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
			<div className="space-y-2 col-span-full lg:col-span-1">
				<p className="text-lg font-medium">Personal Inormation</p>
				<p className="text-sm">This will help us to contact you.</p>
			</div>
			<div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
        <div className="col-span-full">
					<label for="bio" className="text-sm">Photo</label>
					<div className="flex items-center space-x-2">
						<img src="https://source.unsplash.com/30x30/?random" alt="" className="w-10 h-10 rounded-full dark:bg-gray-500 dark:bg-gray-700" />
						<button type="button" className="px-4 py-2 border rounded-md dark:border-gray-100">Change</button>
					</div>
				</div>

				<div className="col-span-full sm:col-span-full">
					<label for="firstname" className="text-sm">First name</label>
					<input id="firstname" type="text" placeholder="First name" className="w-full bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-green-400 dark:border-gray-700 dark:text-gray-100 " />
				</div>

				<div className="col-span-full sm:col-span-full">
					<label for="email" className="text-sm">Email</label>
					<input id="email" type="email" placeholder="Email" className="w-full bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-green-400 dark:border-gray-700 dark:text-gray-100 cursor-not-allowed" disabled/>
				</div>

				<div className="col-span-full sm:col-span-full">
					<label for="email" className="text-sm">College Email</label>
					<input id="email" type="email" placeholder="College Email" className="w-full bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-green-400 dark:border-gray-700 dark:text-gray-100" />
				</div>

				<div className="col-span-full sm:col-span-full">
					<label for="email" className="text-sm">Whatsapp Number</label>
					<input id="email" type="email" placeholder="Whatsapp Number" className="w-full bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-green-400 dark:border-gray-700 dark:text-gray-100" />
				</div>
				
        <div className="col-span-full sm:col-span-3">
					<label for="email" className="text-sm">Year</label>
					<input id="email" type="email" placeholder="2018" className="w-full bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-green-400 dark:border-gray-700 dark:text-gray-100" />
				</div>

				<div className="col-span-full sm:col-span-3">
					<label for="email" className="text-sm">Branch Section</label>
					<input id="email" type="email" placeholder="ECE-A" className="w-full bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-green-400 dark:border-gray-700 dark:text-gray-100" />
				</div>        
			</div>
		</fieldset>
		<fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
			<div className="space-y-2 col-span-full lg:col-span-1">
				<p className="font-medium">Profile</p>
				<p className="text-xs">Adipisci fuga autem eum!</p>
			</div>
			<div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
				<div className="col-span-full sm:col-span-3">
					<label for="username" className="text-sm">Github</label>
					<input id="username" type="text" placeholder="Github" className="w-full bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-green-400 dark:border-gray-700 dark:text-gray-100" />
				</div>
				<div className="col-span-full sm:col-span-3">
					<label for="website" className="text-sm">Linked In</label>
					<input id="website" type="text" placeholder="Linked In" className="w-full bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-green-400 dark:border-gray-700 dark:text-gray-100" />
				</div>
				<div className="col-span-full">
					<label for="bio" className="text-sm">Bio</label>
					<textarea id="bio" placeholder="" className="w-full bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-md focus:ring focus:ring-opacity-75 focus:ring-green-400 dark:border-gray-700 dark:text-gray-100"></textarea>
				</div>
				
			</div>
		</fieldset>
	</form>
</section>
    </div>

      </div>
      
      
      </div>
      <Footer/>
    </>
  )
}

export default withProtected(Complete)

