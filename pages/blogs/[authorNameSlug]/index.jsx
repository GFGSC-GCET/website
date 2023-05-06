import React, {useEffect, useState} from "react";
import {Breadcrumbs, Footer, Nav, ThemeChanger,} from "../../../src/components";
import {useRouter} from "next/router";
import {teamDatabase, userByUIDPublicData} from "../../../src/firebase/fetchData";

import {getUserBlogList} from "../../../src/firebase/blogData";
import {BlogPost} from "../../../src/components/blogs";
import {useUserContext} from "../../../src/firebase/authContext";

import {getTime} from "date-fns";
import MiniSearch from "minisearch";

const UserBlogs = () => {

    // @ts-ignore
    const {user} = useUserContext();

    const router = useRouter();

    const {authorNameSlug} = router.query;

    const [authorData, setAuthorData] = useState({});

    useEffect(() => {

        if (!authorNameSlug) return;
        const getTeam = async () => {
            const teamData = await teamDatabase.get();
            //remove all data where regComplete is false
            const teamArray = teamData.filter(
                (team) => team.gfg.split("/")[4] === authorNameSlug
            );
            setAuthorData(teamArray[0]);
        };
        getTeam();

    }, [authorNameSlug]);


    const [posts, setPosts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    const [blogList, setBlogList] = React.useState([]);

    const getUnixTime = (date) => {
        const dateObj = new Date(date);
        return getTime(dateObj);
    }

    useEffect(() => {
        const fetchBlogList = async () => {
            setLoading(true);
            try {
                // @ts-ignore
                const blogList = await getUserBlogList(authorData.uid);
                // convert object to array
                let tempPosts = [];
                for (const [key, blog] of Object.entries(blogList)) {
                    userByUIDPublicData(blog.authorUID).then((data) => {
                        if (user?.uid === blog.authorUID) {
                            tempPosts.push({...blog, id: key, displayName: data.displayName, photoURL: data.photoURL});
                        } else {
                            if (blog.published) {
                                tempPosts.push({
                                    ...blog,
                                    id: key,
                                    displayName: data.displayName,
                                    photoURL: data.photoURL
                                });
                            }
                        }
                    })
                }
                // sort by date
                tempPosts.sort((a, b) => {
                    return getUnixTime(b.lastSaveTime) - getUnixTime(a.lastSaveTime);
                })
                console.log(tempPosts);
                setBlogList(tempPosts);
                setPosts(tempPosts);
            } catch (error) {
                setError(error);
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchBlogList();

    }, [authorData]);


    const [searchBar, setSearchBar] = useState("");

    let miniSearch = new MiniSearch({
        fields: [
            "title",
            "body",
            "displayName",
        ], // fields to index for full-text search
        storeFields: [
            "title",
            "body",
            "displayName",
            "photoURL",
            "authorUID",
        ], // fields to return with search results
        searchOptions: {
            boost: {body: 2},
            fuzzy: 0.2,
            prefix: true
        },
    });

    useEffect(() => {
        if (searchBar == '') {
            const Sorted = blogList.sort((a, b) => {
                return getUnixTime(b.lastSaveTime) - getUnixTime(a.lastSaveTime);
            })
            setPosts(Sorted);
        } else {
            miniSearch.addAll(blogList);
            let filteredPosts = miniSearch.search(searchBar)
            const Sorted = filteredPosts.sort((a, b) => {
                return getUnixTime(b.lastSaveTime) - getUnixTime(a.lastSaveTime);
            })
            console.log(Sorted)
            setPosts(Sorted);
        }
    }, [searchBar]);


    return (
        <div>
            <Nav/>
            <Breadcrumbs/>
            <ThemeChanger/>
            <div className={'min-h-[calc(100vh-29rem)] w-full'}>
                <div className="px-6 py-8 grid grid-cols-5 min-h-screen container px-6 py-10 mx-auto">
                    <div className="col-span-full lg:col-span-3 flex flex-col justify-between container mx-auto">
                        <div className="w-full">
                            <div className="flex flex-col items-center justify-between gap-5">
                                <div className={'flex flex-row justify-between w-full'}>
                                    <h1 className="text-xl font-bold text-green-500 md:text-4xl">Posts</h1>
                                    <span
                                        className={'px-5 py-2 bg-green-500 hover:bg-green-600 cursor-pointer text-lg font-semibold rounded-lg'}
                                        onClick={() => {
                                            router.push('/blogs/new')
                                        }}>
                                    Create Post
                                </span>
                                </div>
                                <div className={'flex flex-row justify-between w-full'}>
                                    <input
                                        type="text"
                                        className="w-full py-3 pl-10 pr-4 text-xl text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none"
                                        placeholder="Search Topics, Tags, Titles, Authors"
                                        onChange={(e) => setSearchBar(e.target.value)}
                                        value={searchBar}
                                    />
                                </div>
                                <div className={'flex flex-col gap-5 w-full'}>
                                    {
                                        posts.map(post => <BlogPost key={post.blogId} data={post}/>)
                                    }
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