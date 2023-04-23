const PostFilter = () => {
    return (
        <div>
            <select className="flex flex-row justify-between bg-gray-300 text-gray-700 py-2 px-2 rounded-lg focus:outline-none md:py-3">
                <option>Latest</option>
                <option>Last Week</option>
            </select>
        </div>
    )
}

export default PostFilter;