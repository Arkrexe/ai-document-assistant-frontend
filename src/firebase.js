import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAFUvL6Ilh0sz63t3o66IvXtF4hB5lEUgE",
    authDomain: "ai-document-assistant-41680.firebaseapp.com",
    projectId: "ai-document-assistant-41680",
    storageBucket: "ai-document-assistant-41680.firebasestorage.app",
    messagingSenderId: "1067855297982",
    appId: "1:1067855297982:web:b9dc35487d8380335c4def",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;