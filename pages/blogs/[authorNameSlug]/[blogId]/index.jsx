import React, { useState, useEffect } from "react";
import {Breadcrumbs, Footer, Nav, ThemeChanger,} from "../../../../src/components";
import { useRouter } from "next/router";
import {teamDatabase} from "../../../../src/firebase/fetchData";

import { getBlog, incrementBlogViews } from "../../../../src/firebase/blogData";
import {BlogPost, UserList} from "../../../../src/components/blogs";
import { useUserContext } from "../../../../src/firebase/authContext";
import ReactMarkdown from "react-markdown";
import format from "date-fns/format";

import { FaPen } from "react-icons/fa";

const UserBlogs = () =>{

    // @ts-ignore
    const { user } = useUserContext();

    const router = useRouter();

    const { authorNameSlug, blogId } = router.query;

    const [authorData, setAuthorData] = useState({});

    useEffect(() => {
        console.log(authorNameSlug)

        if (!authorNameSlug) return;
        const getTeam = async () => {
            const teamData = await teamDatabase.get();
            //remove all data where regComplete is false
            const teamArray = teamData.filter(
                (team) => team.gfg.split("/")[4] === authorNameSlug
            );
            console.log(teamArray[0]);
            setAuthorData(teamArray[0]);
        };
        getTeam();

    }, [authorNameSlug]);

    const [post, setPost] = useState([]);

    useEffect(() => {
        console.log(authorNameSlug)

        if (!authorNameSlug) return;

        const getBlogData = async () => {
            const blogData = await getBlog(blogId);
            if (blogData == null) {
                await router.push('/404');
                return;
            }
            setPost(blogData);
        };

        getBlogData();

    }, [blogId]);

    const formatDate = (date) => {
        return format(new Date(date), "MMM dd, yyyy 'at' HH:mm");
    }

    useEffect(()=>{
        // check in local storage that this post is already visited or not from an array of visited posts
        // if not visited then add it to the array and update the local storage
        // if visited then do nothing
        if (post == null) return;
        // @ts-ignore
        if (post?.blogId == null || undefined) return;

        // @ts-ignore
        if (!post?.published) return;

        let visitedPosts = JSON.parse(localStorage.getItem('visitedPosts'));
        if (visitedPosts == null) {
            visitedPosts = [];
        }
        // @ts-ignore
        if (!visitedPosts.includes(post.blogId)) {
            // @ts-ignore
            incrementBlogViews(post.blogId).then(() => {
                // @ts-ignore
                visitedPosts.push(post.blogId);
                localStorage.setItem('visitedPosts', JSON.stringify(visitedPosts));
            });
        }

    },[post])


    return (
        <div>
            <Nav/>
            <Breadcrumbs/>
            <ThemeChanger/>
            <div className={'min-h-[calc(100vh-29rem)] w-full'}>
                <div className="px-6 py-8 grid grid-cols-5 min-h-screen container px-6 py-10 mx-auto">
                    <div className="col-span-full lg:col-span-3 flex flex-col justify-between container mx-auto">
                        <div className="w-full">
                            <div className="col-span-full lg:col-span-4 flex flex-col justify-between container mx-auto border-2 dark:border-gray-800 rounded-lg dark:bg-gray-800 bg-gray-100 border-gray-200">
                                {
                                    user?.uid === authorData?.uid ?
                                    <div className="w-full py-2 flex fex-row items-center justify-center bg-gray-300 dark:bg-gray-700 rounded-t-lg gap-1">
                                        <FaPen/>
                                        <a className={'underline font-bold'}
                                           href={authorData.gfg ? `/blogs/${authorData?.gfg.split("/")[4]}/${post.blogId}/edit` : "#"}>

                                            Edit
                                        </a>this Post

                                    </div>
                                        :
                                    <>
                                        {
                                            user.webRole === 'admin' &&
                                            <div className="w-full py-2 flex fex-row items-center justify-center bg-gray-300 dark:bg-gray-700 rounded-t-lg gap-1">
                                                <FaPen/>
                                                <a className={'underline font-bold'}
                                                   href={authorData.gfg ? `/blogs/${authorData?.gfg.split("/")[4]}/${post.blogId}/edit` : "#"}>

                                                    Edit
                                                </a>this Post as Admin

                                            </div>
                                        }
                                    </>
                                }

                                <div className="w-full min-h-[80vh] p-4 flex flex-col gap-5">
                                    <h1
                                        className="w-full text-5xl font-extrabold placeholder:dark:text-gray-600 placeholder:text-gray-300 bg-transparent outline-0 h-fit"
                                    >
                                        {/*@ts-ignore*/}
                                        {post?.title}
                                    </h1>
                                    {
                                        // @ts-ignore
                                        post?.coverImage &&
                                        // @ts-ignore
                                        <img src={post?.coverImage} alt={'cover-image'} className={'max-h-[400px] max-w-[808px] object-cover w-full rounded-lg'}/>
                                    }
                                    <div className={'flex flex-row justify-between items-center w-full'}>
                                        <div className={'flex flex-row gap-2 items-center'}>
                                            <img src={authorData?.photoURL} alt={'author'} className={'w-10 h-10 rounded-full'}/>
                                            <div className={'flex flex-col justify-center text-gray-700 dark:text-gray-400'}>
                                                <h1 className={'text-md font-bold'}>{authorData?.displayName}</h1>
                                                <h1 className={'text-sm '}>{post?.publishedTime ? formatDate(post?.publishedTime) : "N/A"}</h1>
                                            </div>
                                        </div>
                                        <div className={'lg:px-10 flex flex-row gap-2'}>
                                            {
                                                post?.published ?
                                                <h1 className={'text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-400 px-2 py-1 rounded-lg'}>
                                                    {post.views} views
                                                </h1>
                                                :
                                                <h1 className={'text-sm bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-lg'}>
                                                    Not Published Yet
                                                </h1>
                                            }
                                        </div>
                                    </div>
                                    <div className="prose prose-img:rounded-lg prose-img:max-h-[50vh] prose-img:mx-auto  dark:prose-invert w-full min-h-[20vh] prose-p:text-lg+">
                                        <ReactMarkdown>
                                            {/*@ts-ignore*/}
                                            {post?.body}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer/>

        </div>
    );
}

export default UserBlogs;