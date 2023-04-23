const Categories = () => {
    return (
        <div className="flex flex-col bg-white dark:bg-gray-800 px-4 py-6 mx-auto rounded-lg shadow-md">
            <ul className="">
                <li>
                    <a className="text-gray-700 dark:text-gray-100 font-bold mx-1 hover:text-gray-600 dark:hover:text-gray-300 hover:underline" href="#">- AWS</a>
                </li>
                <li className="mt-2">
                    <a className="text-gray-700 dark:text-gray-100 font-bold mx-1 hover:text-gray-600 dark:hover:text-gray-300 hover:underline" href="#">-
                        Laravel</a>
                </li>
                <li className="mt-2">
                    <a className="text-gray-700 dark:text-gray-100 font-bold mx-1 hover:text-gray-600 dark:hover:text-gray-300 hover:underline" href="#">- Vue</a>
                </li>
                <li className="mt-2">
                    <a className="text-gray-700 dark:text-gray-100 font-bold mx-1 hover:text-gray-600 dark:hover:text-gray-300 hover:underline" href="#">-
                        Design</a>
                </li>
                <li className="flex items-center mt-2">
                    <a className="text-gray-700 dark:text-gray-100 font-bold mx-1 hover:text-gray-600 dark:hover:text-gray-300 hover:underline" href="#">-
                        Django</a>
                </li>
                <li className="flex items-center mt-2">
                    <a className="text-gray-700 dark:text-gray-100 font-bold mx-1 hover:text-gray-600 dark:hover:text-gray-300 hover:underline" href="#">- PHP</a>
                </li>
            </ul>
        </div>
    )
}

export default Categories;