import Head from "next/head";
import React from "react";
import {Breadcrumbs, Footer, Nav, ThemeChanger,} from "../../src/components";
import {BlogPost, Categories, Pagination, PostFilter, RecentPost, UserList} from "../../src/components/blogs";

const BlogPage = () => {

    const posts = [
        {
            id: 1,
            date: "Jun 1, 2020",
            tag: "Laravel",
            title: "Build Your New Idea with Laravel Freamwork.",
            body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos enim reprehenderit nisi, accusamus delectus nihil quis facere in modi ratione libero!",
            image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80",
            userName: "Alex John"
        },
        {
            id: 2,
            date: "mar 4, 2019",
            tag: "Design",
            title: "Accessibility tools for designers and developers",
            body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos enim reprehenderit nisi, accusamus delectus nihil quis facere in modi ratione libero!",
            image: "https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=333&q=80",
            userName: "Jane Doe"
        },
        {
            id: 3,
            date: "Feb 14, 2019",
            tag: "PHP",
            title: "PHP: Array to Map",
            body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos enim reprehenderit nisi, accusamus delectus nihil quis facere in modi ratione libero!",
            image: "https://images.unsplash.com/photo-1531251445707-1f000e1e87d0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=281&q=80",
            userName: "Lisa Way"
        },
        {
            id: 4,
            date: "Dec 23, 2018",
            tag: "Django",
            title: "Django Dashboard - Learn by Coding",
            body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos enim reprehenderit nisi, accusamus delectus nihil quis facere in modi ratione libero!",
            image: "https://images.unsplash.com/photo-1500757810556-5d600d9b737d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=735&q=80",
            userName: "Steve Matt"
        },
        {
            id: 5,
            date: "Mar 10, 2018",
            tag: "Testing",
            title: "TDD Frist",
            body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos enim reprehenderit nisi, accusamus delectus nihil quis facere in modi ratione libero!",
            image: "https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=373&q=80",
            userName: "Khatab Wedaa"
        },
    ]

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
                                <span className={'px-5 py-2 bg-green-500 hover:bg-green-600 cursor-pointer text-lg font-semibold rounded-lg'}>
                                    Create Post
                                </span>
                            </div>
                            <div className={'flex flex-row justify-between w-full'}>
                                <input
                                    type="text"
                                    className="w-full py-3 pl-10 pr-4 text-xl text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none"
                                    placeholder="Search Topics, Tags, Titles, Authors"
                                />
                            </div>
                            <div className={'flex flex-col gap-5 w-full'}>
                                {
                                    posts.map(post => <BlogPost key={post.id} data={post}/>)
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-2 hidden lg:block">
                    <div className="px-8">
                        <h1 className="mb-4 text-xl font-bold text-gray-700 dark:text-gray-100">Authors</h1>
                        <UserList/>
                    </div>
                    <div className="mt-10 px-8">
                        <h1 className="mb-4 text-xl font-bold text-gray-700 dark:text-gray-100">Categories</h1>
                        <Categories/>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default BlogPage;