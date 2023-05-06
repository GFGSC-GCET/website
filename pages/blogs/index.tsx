import Head from "next/head";
import React, {useEffect, useState} from "react";
import {Breadcrumbs, Footer, Nav, ThemeChanger,} from "../../src/components";
import {BlogPost, Categories, Pagination, PostFilter, RecentPost, UserList} from "../../src/components/blogs";
import {useRouter} from "next/router";

import { getBlogList } from "../../src/firebase/blogData";
import post from "../../src/components/blogs/post";
import {userByUIDPublicData} from "../../src/firebase/fetchData";
import MiniSearch from "minisearch";
import {getTime} from "date-fns";

const BlogPage = () => {
    const router = useRouter();

    const [blogList, setBlogList] = React.useState([]);
    const [posts, setPosts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    const fetchBlogList = async () => {
        setLoading(true);
        try {
            const blogList = await getBlogList();
            setBlogList(blogList);
            setPosts(blogList);

        } catch (error) {
            setError(error);
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    React.useEffect(() => {
        fetchBlogList();
    }, []);


    const [authors, setAuthors] = React.useState([]);

    React.useEffect(() => {
        // make an array of authours Uids with post count
        let authors = [];
        for (const [key, blog] of Object.entries(blogList)) {
            if (!blog?.published) continue;
            let author = authors.find(author => author.uid === blog.authorUID);
            if (author) {
                author.count++;
            } else {
                authors.push({
                    uid: blog.authorUID,
                    count: 1
                })
            }
        }
        setAuthors(authors);
    }, [blogList]);

    const getUnixTime = (date) => {
        const dateObj = new Date(date);
        return getTime(dateObj);
    }

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
        <>
            <Head>
                <title>Blogs</title>
                <meta name="description" content="Blog Page for GFGSC_GCET"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Nav/>
            <Breadcrumbs/>
            <ThemeChanger/>
            <div className="px-6 py-8 grid grid-cols-5 min-h-screen container px-6 py-10 mx-auto">
                <div className="col-span-full lg:col-span-3 flex flex-col justify-between container mx-auto">
                    <div className="w-full">
                        <div className="flex flex-col items-center justify-between gap-5">
                            <div className={'flex flex-row justify-between w-full'}>
                                <h1 className="text-xl font-bold text-green-500 md:text-4xl">Posts</h1>
                                <span className={'px-5 py-2 bg-green-500 hover:bg-green-600 cursor-pointer text-lg font-semibold rounded-lg'} onClick={()=>{router.push('/blogs/new')}}>
                                    Create Post
                                </span>
                            </div>
                            <div className={'flex flex-row justify-between w-full'}>
                                <input
                                    type="text"
                                    className="w-full py-3 pl-10 pr-4 text-xl text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none"
                                    placeholder="Search Topics, Tags, Titles, Authors"
                                    value={searchBar}
                                    onChange={(e) => setSearchBar(e.target.value)}
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

                <div className="col-span-2 hidden lg:block">
                    <div className="px-8">
                        <h1 className="mb-4 text-xl font-bold text-gray-700 dark:text-gray-100">Authors</h1>
                        <UserList authors={authors}/>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default BlogPage;