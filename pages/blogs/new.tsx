import Head from "next/head";
import React, {useEffect} from "react";
import {Breadcrumbs, Footer, Nav, ThemeChanger,} from "../../src/components";
import TextareaAutosize from 'react-textarea-autosize';
import { useState} from "react";
import {FaImage, FaPaperPlane, FaQuestion, FaSave, FaSpinner} from "react-icons/fa";
import { withProtected } from "../../src/routes";

import ReactMarkdown from 'react-markdown'

import { useUserContext } from "../../src/firebase/authContext";



const CreateNewPost = () => {
    // @ts-ignore
    const { user, loginWithGoogle, logout, loggingIn } = useUserContext();

    const [showPreview, setShowPreview] = useState(true);

    const [coverImageInput, setCoverImageInput] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const checkCoverImage = () => {
        //check if url is valid using regex
        const url = coverImageInput;
        const regex = new RegExp(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g);
        if (regex.test(url)) {
            //valid url
            setCoverImage(url);
        } else {
            //invalid url
            console.log('invalid url');
        }

    }
    const setPostTitle = (e) => {

        if (e.target.value.includes('\n')) {
            e.target.value = e.target.value.replace('\n', '');
        }
        setTitle(e.target.value);
    }

    const setPostBody = (e) => {
        setBody(e.target.value);
    }

    const [savedPost, setSavedPost] = useState(null);
    const [unsavedChanges, setUnsavedChanges] = useState(false);

    useEffect(()=>{

        //compare savedPost and post
        if(savedPost?.title == title && savedPost?.body == body && savedPost?.coverImage == coverImage){
            //no changes
            console.log('no changes');
            setUnsavedChanges(false);
        }
        else{
            //changes
            console.log('changes');
            setUnsavedChanges(true);
            savePost();
        }

    }, [coverImageInput, title, body]);

    const [saving, setSaving] = useState(false);


    const savePost = () => {
        const post = {
            title: title,
            body: body,
            coverImage: coverImage,
            date: new Date().toISOString(),
            author: {
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid
            }
        }
        setSavedPost(post)
        setSaving(true);
        console.log(post);
        setTimeout(()=>{
            setSaving(false);
            setUnsavedChanges(false);
        }, 2000);
        //save post to firestore
    }

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
            <div className="px-6 grid grid-cols-6 container h-fit mx-auto gap-4">
                <div className={'col-span-full gap-4 w-full flex flex-row justify-center items-center'}>
                    <span className={`${showPreview ? '':'font-extrabold'} cursor-pointer`} onClick={()=>{setShowPreview(false)}}>
                        Edit
                    </span>
                    <span className={` ${showPreview ? 'font-extrabold':''} cursor-pointer`}  onClick={()=>{setShowPreview(true)}}>
                        Preview
                    </span>
                </div>

                {
                    showPreview ? (
                        <div className="col-span-full lg:col-span-4 flex flex-col justify-between container mx-auto border-2 dark:border-gray-800 rounded-lg dark:bg-gray-800 bg-gray-100 border-gray-200">
                            <div className="w-full min-h-[80vh] p-4 flex flex-col gap-5">
                                <h1
                                    className="w-full text-5xl font-extrabold placeholder:dark:text-gray-600 placeholder:text-gray-300 bg-transparent outline-0 h-fit"
                                >
                                    {title}
                                </h1>
                                {
                                    coverImageInput &&
                                    <img src={coverImageInput} alt={'cover-image'} className={'max-h-[400px] max-w-[800px] object-cover w-full rounded-lg'}/>
                                }
                                <div className="prose prose-img:rounded-lg prose-img:max-h-[50vh] prose-img:mx-auto  dark:prose-invert w-full min-h-[20vh] prose-p:text-lg+">
                                    <ReactMarkdown>
                                            {body}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    ) : (
                    <>
                        <div className="col-span-full lg:col-span-4 flex flex-col justify-between container mx-auto border-2 dark:border-gray-800 rounded-lg dark:bg-gray-800 bg-gray-100 border-gray-200">
                            <div className="w-full min-h-[80vh] p-4 flex flex-col gap-5">
                                <TextareaAutosize
                                    className="w-full text-5xl font-extrabold placeholder:dark:text-gray-500 placeholder:text-gray-400 bg-transparent outline-0 h-fit resize-none overflow-y-auto"
                                    placeholder="New post title here..."
                                    onChange={setPostTitle}
                                    value={title}
                                    autoFocus={true}
                                >
                                </TextareaAutosize>
                                <hr className={"border-gray-200 dark:border-gray-700"}/>

                                <div className={'flex flex-col gap-2'}>
                                    <h1 className={'text-2xl font-bold'}>Cover Image</h1>
                                    <input type={"text"} className={'border-2 w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 dark:border-gray-700 rounded-md border-gray-200'}  placeholder={'insert your image url (use imgbb.com)'} onChange={(e)=>{setCoverImageInput(e.target.value)}} value={coverImageInput}/>
                                    <p className={''}>
                                        Use <a className={'text-green-500 underline'} target={'__blank'} href={"https://imgbb.com/upload"}>ImageBB.com</a> to upload your image and paste the image url, <i>check url before pasting</i>
                                    </p>
                                </div>
                                <hr className={"border-gray-200 dark:border-gray-700"}/>
                                <TextareaAutosize
                                    className="w-full min-h-[20vh] text-lg font-regular placeholder:dark:text-gray-500 placeholder:text-gray-400 bg-transparent outline-0 h-fit resize-none overflow-y-auto"
                                    placeholder="Write your post content here..."
                                    onChange={setPostBody}
                                    value={body}
                                >
                                </TextareaAutosize>
                            </div>
                        </div>
                        <div className="col-span-full lg:col-span-2 flex flex-col gap-5 container mx-auto ">
                            <div className="w-full p-4 flex flex-col gap-5 border-2 dark:border-gray-800 rounded-lg dark:bg-gray-800 bg-gray-100 border-gray-200">
                                <>
                                    {
                                        unsavedChanges &&
                                        <h1 className={'text-md font-regular w-fit rounded-lg'}>
                                            Unsaved Changes
                                        </h1>
                                    }
                                </>

                                <div className={'w-full flex flex-row justify-between items-center'}>
                                    <span className={'text-md p-2 flex flex-row gap-3 justify-center items-center rounded-lg hover:bg-green-500 bg-gray-100 dark:bg-gray-700 dark:hover:bg-green-500 cursor-pointer'}>
                                        {
                                            saving ?
                                                <span onClick={()=>{savePost()}} className={'flex flex-row items-center gap-2'}><FaSpinner className={'animate-spin'}/> Saving</span>
                                                :
                                                <span onClick={()=>{savePost()}} className={'flex flex-row items-center gap-2'}><FaSave/> Save Draft</span>
                                        }
                                    </span>
                                    <span className={'text-md p-2 flex flex-row gap-3 justify-center items-center rounded-lg hover:bg-green-500 bg-gray-100 dark:bg-gray-700 dark:hover:bg-green-500 cursor-pointer'}>
                                        <FaPaperPlane/> Publish
                                    </span>
                                    <span className={'text-md p-2 flex flex-row gap-3 justify-center items-center rounded-lg hover:bg-green-500 bg-gray-100 dark:bg-gray-700 dark:hover:bg-green-500 cursor-pointer'}>
                                        <FaQuestion/> Help
                                    </span>
                                </div>
                            </div>

                            <div className="w-full p-4 flex flex-col gap-5 border-2 dark:border-gray-800 rounded-lg dark:bg-gray-800 bg-gray-100 border-gray-200">

                                <div className={'w-full flex flex-col'}>
                                    <h1 className={'text-xl font-semibold'}>
                                        Editor Basics
                                    </h1>
                                    <p>
                                        Use Markdown to write and format posts.
                                    </p>
                                    <table
                                        className="w-full text-sm text-left text-gray-700 dark:text-gray-300 rounded-lg overflow-hidden mt-5">
                                        <tbody>
                                        <tr className={'bg-white border-b dark:bg-gray-700 dark:border-gray-600'}>
                                            <td className="p-2 font-medium text-md"># Header<br/>...<br/>#### Header</td>
                                            <td>H1 Header<br/>...<br/>H4 Header</td>
                                        </tr>
                                        <tr className={'bg-white border-b dark:bg-gray-700 dark:border-gray-600'}>
                                            <td className="p-2 font-medium text-md">*italics* or _italics_</td>
                                            <td><em>italics</em></td>
                                        </tr>
                                        <tr className={'bg-white border-b dark:bg-gray-700 dark:border-gray-600'}>
                                            <td className="p-2 font-medium text-md">**bold**</td>
                                            <td><strong>bold</strong></td>
                                        </tr>
                                        <tr className={'bg-white border-b dark:bg-gray-700 dark:border-gray-600'}>
                                            <td className="p-2 font-medium text-md">[Link](https://...)</td>
                                            <td><a>Link</a></td>
                                        </tr>
                                        <tr className={'bg-white border-b dark:bg-gray-700 dark:border-gray-600'}>
                                            <td className="p-2 font-medium text-md">![Alt Text](https://...)</td>
                                            <td > <span className={'flex flex-row gap-2 h-full items-center'}><FaImage/> Image</span></td>
                                        </tr>
                                        <tr className={'bg-white border-b dark:bg-gray-700 dark:border-gray-600'}>
                                            <td className="p-2 font-medium text-md">* item 1<br/>* item 2</td>
                                            <td>
                                                <ul className="list-disc ml-5">
                                                    <li>item 1</li>
                                                    <li>item 2</li>
                                                </ul>
                                            </td>
                                        </tr>
                                        <tr className={'bg-white border-b dark:bg-gray-700 dark:border-gray-600'}>
                                            <td className="p-2 font-medium text-md">1. item 1<br/>2. item 2</td>
                                            <td>
                                                <ul className="list-decimal ml-5">
                                                    <li>item 1</li>
                                                    <li>item 2</li>
                                                </ul>
                                            </td>
                                        </tr>
                                        <tr className={'bg-white border-b dark:bg-gray-700 dark:border-gray-600'}>
                                            <td className="p-2 font-medium text-md">&gt; quoted text</td>
                                            <td>
                                                <span className="pl-2 border-0 border-solid border-l-2 border-base-50">
                                                    quoted text
                                                </span>
                                            </td>
                                        </tr>
                                        <tr className={'bg-white border-b dark:bg-gray-700 dark:border-gray-600'}>
                                            <td className="p-2 font-medium text-md">`inline code`</td>
                                            <td className={'prose dark:prose-invert'}>
                                                <code>inline code</code>
                                            </td>
                                        </tr>
                                        <tr className={'bg-white dark:bg-gray-700 dark:border-gray-600'}>
                                            <td className="p-2 font-medium text-md"><span className="fs-xs">```</span><br/>code
                                                block<br/><span className="fs-xs">```</span></td>
                                            <td>
                                                <div className="prose overflow-hidden">
                                                    <pre>code block</pre>
                                                </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>
                    </>
                    )

                }


            </div>
            <Footer/>
        </>
    );
};

export default withProtected(CreateNewPost);
