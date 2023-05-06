import { userByUIDPublicData } from "../../firebase/fetchData";
import {useEffect, useState} from "react";

const Author = (data) => {

    const [ author, setAuthor ] = useState(null);

    useEffect(()=>{
        userByUIDPublicData(data.uid).then((res)=>{
            setAuthor(res)
        }).catch((err)=>{
            console.error(err)
        })


    },[])

    return(
        <li className="flex items-center">
            <img className="w-10 h-10 object-cover rounded-full mx-4"
                 src={author?.photoURL}
                 alt={author?.displayName}/>
            <p>
                <a className="text-gray-700 dark:text-gray-100 font-bold mx-1 hover:underline"
                   href={`/blogs/${author?.gfg.split("/")[4]}`}>
                    {author?.displayName}
                </a>
                <span className="text-gray-700 dark:text-gray-100 text-sm font-light">
                    Published {data.count > 1 ? `${data.count} Posts` : `${data.count} Post`}
                </span>
            </p>
        </li>
    )
}

const UserList = ({authors}) => {
    return (
        <div className="flex flex-col bg-white dark:bg-gray-800 px-6 py-4 mx-auto rounded-lg shadow-md">
            <ul className="-mx-4">
                {authors.map((author, index) => (
                    <Author key={index} uid={author.uid} count={author.count}/>
                ))}
            </ul>
        </div>
    )
}

export default UserList;