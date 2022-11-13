import {createContext, useContext, useState} from "react";
import {useRouter} from "next/router";

import {GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth";
import {auth, database} from ".";

import {get, ref, set} from "firebase/database";

export const UserContext = createContext({});

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = (props) => {
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [loggingIn, setLoggingIn] = useState(false);

    const checkAccount = async (user) => {

        if (user != null) {

            const userRef = ref(database, `users/${user.uid}`);
            const snapshot = await get(userRef);
            console.log("Heyyy!")
            if (snapshot.exists()) {
                console.log(snapshot.val().regComplete)
                try {
                    const userObj = await snapshot.val();
                    if (!userObj.regComplete) {
                        await router.push("/join/complete");
                    }
                    setUser(userObj);
                } catch (e) {
                    console.log(e);
                }
            } else {
                const userObj = {
                    displayName: user.displayName,
                    uid: user.uid,
                    email: user.email,
                    collegeEmail: '',
                    whatsappNumber: '',
                    year: '',
                    batch: '',
                    bio: '',
                    learning: '',
                    skills: '',
                    gfg: '',
                    github: '',
                    linkedin: '',
                    website: '',
                    instagram: '',
                    photoURL: user.photoURL,
                    createdAt: new Date().toISOString(),
                    regComplete: false,
                    priority: 10,
                    role: 'Member',
                    webRole: 'member'
                };
                setUser(userObj);
                await set(userRef, userObj);
                console.log("running")
                router.push("/join/complete");
            }

            // const docRef = doc(db, "users", user.uid);
            // const docSnap = await getDoc(docRef);
            // if (docSnap.exists()) {
            //   docSnap.data().regComplete ? router.push("/") : router.push("/join/complete");
            //   setUser(docSnap.data());
            // } else {
            //   const userObj = {
            //     displayName: user.displayName,
            //     uid: user.uid,
            //     email: user.email,
            //     photoURL: user.photoURL,
            //     createdAt: new Date().toISOString(),
            //     regComplete: false,
            //     priority: 10,
            //     admin: false,
            //   };
            //   setDoc(doc(db, "users", user.uid), userObj);
            //   setUser(userObj);
            //   router.push("/join");
            // }
        }

    };

    const member = {
        get: async (user) => {
            if (user != null) {
                const userRef = ref(database, `users/${user.uid}`);
                const snapshot = await get(userRef);
                return await snapshot.val();
                // const docRef = doc(db, "users", user.uid);
                // const docSnap = await getDoc(docRef);
                // return docSnap.data();
            } else {
                return user
            }
        },

        getPublic: async (user) => {
            if (user != null) {
                const userRef = ref(database, `team/${user.uid}`);
                const snapshot = await get(userRef);
                return await snapshot.val();
                // const docRef = doc(db, "users", user.uid);
                // const docSnap = await getDoc(docRef);
                // return docSnap.data();
            } else {
                return user
            }
        },

        set: async (user) => {
            if (user != null) {
                
                let completeUserData = user;
                let privateFields = [
                    "createdAt",
                    "collegeEmail",
                    "webRole",
                    "whatsappNumber",
                ];

                let privateData = {}
                //stripping private data
                privateFields.forEach((fieldName) => {
                    privateData[fieldName] = completeUserData[fieldName];
                    delete completeUserData[fieldName];
                });
                
                // The private data has now been stripped
                let publicData = completeUserData;
                
                

                const teamRef = ref(database, `team/${user.uid}`);
                const teamSnapshot = await get(teamRef);
                await set(teamRef, publicData);
                

                const userRef = ref(database, `users/${user.uid}`);
                const snapshot = await get(userRef);
                await set(userRef, {...privateData,...publicData});
                return       
                // const docRef = doc(db, "users", user.uid);
                // const docSnap = await getDoc(docRef);
                // if (docSnap.exists()) {
                //   const response = await setDoc(docRef, user);
                //   return response;
                // }
                // return null;
            } else {
                return user
            }
        },
    };

    const AuthService = {
        loginWithGoogle: async () => {
            const provider = new GoogleAuthProvider();
            try {
                setLoggingIn(true);
                const userCred = await signInWithPopup(auth, provider);
                setLoggingIn(false);
                userCred.user.photoURL = userCred.user.photoURL.replace("s96-c", "s400-c");
                return {
                    user: userCred.user,
                };
            } catch (e) {
                setLoggingIn(false);
                const msg = e.message.match(/\(([^)]+)\)/)[1];
                return {
                    error: msg,
                };
            }
        }, logout: async () => {
            await signOut(auth);
        },
    };

    const loginWithGoogle = async () => {
        const {error, user} = await AuthService.loginWithGoogle();
        setError(error ?? "");
        await checkAccount(user);
        const u = await member.get(user);
        u?.regComplete === true ? await router.push('/profile') : null

    };

    const logout = async () => {
        await AuthService.logout();
        setUser(null);
    };

    const contextValue = {
        loginWithGoogle, logout, user, error, setUser, loggingIn, checkAccount, member,
    };

    return <UserContext.Provider value={contextValue} {...props} />;
};
