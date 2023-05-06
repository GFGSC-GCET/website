const RecentPosts = () => {
    return (
        <div className="flex flex-col bg-white px-8 py-6 mx-auto rounded-lg shadow-md">
            <div className="flex justify-center items-center">
                <a className="px-2 py-1 bg-gray-600 text-sm text-green-100 rounded hover:bg-gray-500"
                   href="#">Laravel</a>
            </div>
            <div className="mt-4">
                <a className="text-lg text-gray-700 font-medium hover:underline" href="#">Build Your New Idea with
                    Laravel Freamwork.</a>
            </div>
            <div className="flex justify-between items-center mt-4">
                <div className="flex items-center">
                    <img
                        src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80"
                        className="w-8 h-8 object-cover rounded-full" alt="avatar"/>
                        <a className="text-gray-700 text-sm mx-3 hover:underline" href="#">Alex John</a>
                </div>
                <span className="font-light text-sm text-gray-600">Jun 1, 2020</span>
            </div>
        </div>
    )
}

export default RecentPosts;