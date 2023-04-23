
const BlogPost = ({ data }) => {
    return(
        <div className="max-w-5xl px-10 py-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
                <span className="font-light text-gray-600 dark:text-gray-400">{data.date}</span>
                <a className="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500" href="#">
                    {data.tag}
                </a>
            </div>
            <div className="mt-2">
                <a className="text-2xl text-gray-700 dark:text-gray-100 font-bold hover:underline" href="#">{data.title}</a>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{data.body}</p>
            </div>
            <div className="flex justify-between items-center mt-4">
                <a className="text-green-500 hover:underline" href="#">Read more</a>
                <div>
                    <a className="flex items-center" href="#">
                        <img className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block" src={data.image}
                        alt="avatar"/>
                        <h1 className="text-gray-700 dark:text-gray-100 font-bold hover:underline">{data.userName}</h1>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default BlogPost;