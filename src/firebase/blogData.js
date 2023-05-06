import { database } from "./";
import { ref, get, set, update } from "firebase/database";
import { auth } from "./index";
import {userByUIDPublicData} from "./fetchData";
export const saveBlog = async (blogId, data) => {
    const dbRef = ref(database, `blog/${blogId}`);
    const snapshot = await get(dbRef);

    return new Promise((resolve, reject) => {
        if (snapshot.exists()) {
            update(dbRef, data).then(() => {
                resolve("Blog Updated");
            }).catch((error) => {
                reject(error);
            });
        } else {
            set(dbRef, data).then(() => {
                resolve("Blog Created");
            }).catch((error) => {
                reject(error);
            });
        }
    });

}

export const getBlogList = async () => {
    const dbRef = ref(database, "blog");
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
        const blogList = snapshot.val();
        const blogListArray = Object.entries(blogList).map(([key, blog]) => {
            const blogObj = {...blog, id: key};
            userByUIDPublicData(blog.authorUID).then((data) => {
                blogObj.displayName = data.displayName;
                blogObj.photoURL = data.photoURL;
            })
            return blogObj;
        });
        const publishedBlogList = blogListArray.filter((blog) => blog.published);
        return publishedBlogList;
    } else {
        return null;
    }
}

export const getUserBlogList = async (uid) => {
    const dbRef = ref(database, "blog");
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
        const blogList = snapshot.val();
        const userBlogArray = Object.keys(blogList).map((key) => ({
            ...blogList[key],
        }));
        const userBlogList = userBlogArray.filter((blog) => blog.author === uid);
        if (userBlogList.length > 0) {
            return userBlogList;
        } else {
            return null;
        }

    }
    return null;
}

export const getBlog = async (blogId) => {
    const dbRef = ref(database, `blog/${blogId}`);
    const snapshot = await get(dbRef);

    return snapshot.val();
}

export const incrementBlogViews = async (blogId) => {
    const dbRef = ref(database, `blog/${blogId}`);
    const snapshot = await get(dbRef);
    const post = snapshot.val();
    const views = post?.views || 0;
    update(dbRef, {
        views: views + 1
    });
}