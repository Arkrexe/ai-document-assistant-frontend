import axios from "axios";

import {
    auth,
} from "../firebase";

import {
    onAuthStateChanged,
} from "firebase/auth";


const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
});


// ------------------------------------
// Wait for Firebase authentication
// ------------------------------------

function waitForAuthUser() {

    return new Promise((resolve) => {

        if (auth.currentUser) {
            resolve(auth.currentUser);
            return;
        }

        const unsubscribe =
            onAuthStateChanged(
                auth,
                (user) => {

                    unsubscribe();

                    resolve(user);

                }
            );

    });

}


// ------------------------------------
// Axios Request Interceptor
// ------------------------------------

api.interceptors.request.use(

    async (config) => {

        const user =
            await waitForAuthUser();


        // No authenticated user
        if (!user) {

            console.warn(
                "No Firebase user available. Request will not be authenticated."
            );

            return config;
        }


        try {

            // Force-refresh the token.
            // This prevents an old/expired cached token
            // from being sent to FastAPI.

            const token =
                await user.getIdToken(true);


            config.headers =
                config.headers || {};


            config.headers.Authorization =
                `Bearer ${token}`;


            console.log(
                "Firebase token attached to request."
            );

        } catch (error) {

            console.error(
                "Failed to get Firebase ID token:",
                error
            );

            throw error;
        }


        return config;

    },

    (error) => {

        return Promise.reject(error);

    }

);


export default api;