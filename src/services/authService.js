import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";

import { auth } from "../firebase";

// ==========================
// Register
// ==========================

export async function registerUser(
    email,
    password
) {
    const userCredential =
        await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

    return userCredential.user;
}

// ==========================
// Login
// ==========================

export async function loginUser(
    email,
    password
) {
    const userCredential =
        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

    return userCredential.user;
}

// ==========================
// Logout
// ==========================

export async function logoutUser() {
    await signOut(auth);
}