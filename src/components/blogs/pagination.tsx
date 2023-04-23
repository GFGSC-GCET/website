const Pagination = () => {
    return (
        <ul className="flex">
            <li className="mx-1 px-3 py-2 bg-gray-200 text-gray-500 rounded-lg">
                <a className="flex items-center font-bold" href="#">previous</a>
            </li>
            <li className="mx-1 px-3 py-2 bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
                <a className="font-bold" href="#">1</a>
            </li>
            <li className="mx-1 px-3 py-2 bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
                <a className="font-bold" href="#">2</a>
            </li>
            <li className="mx-1 px-3 py-2 bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
                <a className="font-bold" href="#">3</a>
            </li>
            <li className="mx-1 px-3 py-2 bg-gray-200 text-gray-700 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
                <a className="flex items-center font-bold" href="#">Next</a>
            </li>
        </ul>
    )
}

export default Pagination;