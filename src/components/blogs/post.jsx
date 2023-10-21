import format from "date-fns/format";

import { userByUIDPublicData } from "../../firebase/fetchData";
import {useEffect, useState} from "react";

const BlogPost = ({ data }) => {

    const formatDate = (date) => {
        return format(new Date(date), "MMM dd, yyyy 'at' HH:mm");
    }

    const [ author, setAuthor ] = useState(null);

    useEffect(()=>{
        userByUIDPublicData(data.authorUID).then((data)=>{
            setAuthor(data)
        }).catch((err)=>{
            console.error(err)
        })


    },[])

    return(
        <div className="max-w-5xl px-10 py-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
                <span className="font-light text-gray-600 dark:text-gray-400">{data?.publishedTime ? formatDate(data?.publishedTime) : "N/A"}</span>
                <span className="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded">
                    {
                        data.published ?
                        `${data?.views || 0} views`
                            :
                        "Draft"
                    }
                </span>
            </div>
            <div className="mt-2">
                <a className="text-2xl text-gray-700 dark:text-gray-100 font-bold hover:underline"
                   href={`/blogs/${author?.gfg.split("/")[4]}/${data.blogId}`}>
                    {data.title}
                </a>
                <p className="mt-2 text-gray-600 dark:text-gray-300 line-clamp-3">{data.body}</p>
            </div>
            <div className="flex justify-between items-center mt-4">
                <a className="text-green-500 hover:underline" href={`/blogs/${author?.gfg.split("/")[4]}/${data.blogId}`}>Read more</a>
                <div>
                    <a className="flex items-center" href={`/blogs/${author?.gfg.split("/")[4]}`}>
                        <img className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block" src={data?.photoURL}
                        alt="avatar"/>
                        <h1 className="text-gray-700 dark:text-gray-100 font-bold hover:underline">{data?.displayName}</h1>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default BlogPost;