import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    FileText,
    ArrowRight,
    Loader2,
    AlertCircle,
    Check,
} from "lucide-react";

import { registerUser } from "../services/authService";


function Register() {

    const navigate = useNavigate();


    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");


    const handleRegister = async (
        event
    ) => {

        event.preventDefault();

        setError("");


        if (
            !email.trim() ||
            !password ||
            !confirmPassword
        ) {

            setError(
                "Please fill in all fields."
            );

            return;
        }


        if (password.length < 6) {

            setError(
                "Password must contain at least 6 characters."
            );

            return;
        }


        if (
            password !==
            confirmPassword
        ) {

            setError(
                "Passwords do not match."
            );

            return;
        }


        try {

            setLoading(true);

            await registerUser(
                email.trim(),
                password
            );

            navigate("/", {
                replace: true,
            });

        } catch (error) {

            console.error(
                "Registration failed:",
                error
            );


            switch (error.code) {

                case "auth/email-already-in-use":

                    setError(
                        "An account already exists with this email."
                    );

                    break;


                case "auth/invalid-email":

                    setError(
                        "Please enter a valid email address."
                    );

                    break;


                case "auth/weak-password":

                    setError(
                        "Password is too weak. Use at least 6 characters."
                    );

                    break;


                default:

                    setError(
                        "Registration failed. Please try again."
                    );

            }

        } finally {

            setLoading(false);

        }

    };


    const passwordValid =
        password.length >= 6;

    const passwordsMatch =
        confirmPassword.length > 0 &&
        password === confirmPassword;


    return (

        <div
            className="
                min-h-screen

                flex
                items-center
                justify-center

                px-4
                py-8

                bg-gray-50
                dark:bg-[#0f1117]

                transition-colors
                duration-200
            "
        >

            <div
                className="
                    w-full
                    max-w-md
                "
            >

                {/* =========================
                    Brand
                ========================= */}

                <div
                    className="
                        text-center
                        mb-8
                    "
                >

                    <div
                        className="
                            mx-auto

                            w-14
                            h-14

                            rounded-2xl

                            flex
                            items-center
                            justify-center

                            bg-blue-600

                            text-white

                            shadow-lg
                            shadow-blue-600/20
                        "
                    >

                        <FileText
                            size={27}
                            strokeWidth={2}
                        />

                    </div>


                    <h1
                        className="
                            mt-5

                            text-2xl
                            font-bold
                            tracking-tight

                            text-gray-900
                            dark:text-gray-100
                        "
                    >
                        AI Document Assistant
                    </h1>


                    <p
                        className="
                            mt-2

                            text-sm

                            text-gray-500
                            dark:text-gray-400
                        "
                    >
                        Your documents, powered by AI
                    </p>

                </div>


                {/* =========================
                    Card
                ========================= */}

                <div
                    className="
                        rounded-2xl

                        border
                        border-gray-200
                        dark:border-gray-800

                        bg-white
                        dark:bg-[#151821]

                        p-6
                        sm:p-8

                        shadow-xl
                        shadow-gray-200/40
                        dark:shadow-black/20
                    "
                >

                    <div
                        className="mb-7"
                    >

                        <h2
                            className="
                                text-xl
                                font-semibold

                                text-gray-900
                                dark:text-gray-100
                            "
                        >
                            Create your account
                        </h2>


                        <p
                            className="
                                mt-1

                                text-sm

                                text-gray-500
                                dark:text-gray-400
                            "
                        >
                            Get started with your AI document assistant.
                        </p>

                    </div>


                    {/* =========================
                        Error
                    ========================= */}

                    {error && (

                        <div
                            className="
                                mb-5

                                flex
                                items-start
                                gap-3

                                rounded-xl

                                border
                                border-red-200
                                dark:border-red-900/50

                                bg-red-50
                                dark:bg-red-950/20

                                px-4
                                py-3

                                text-sm

                                text-red-700
                                dark:text-red-400
                            "
                        >

                            <AlertCircle
                                size={18}
                                className="shrink-0 mt-0.5"
                            />

                            <span>
                                {error}
                            </span>

                        </div>

                    )}


                    {/* =========================
                        Form
                    ========================= */}

                    <form
                        onSubmit={
                            handleRegister
                        }

                        className="
                            space-y-5
                        "
                    >

                        {/* Email */}

                        <div>

                            <label
                                className="
                                    block

                                    text-sm
                                    font-medium

                                    text-gray-700
                                    dark:text-gray-300

                                    mb-2
                                "
                            >
                                Email
                            </label>


                            <div
                                className="relative"
                            >

                                <Mail
                                    size={18}

                                    className="
                                        absolute
                                        left-3.5
                                        top-1/2
                                        -translate-y-1/2

                                        text-gray-400
                                        dark:text-gray-500
                                    "
                                />


                                <input
                                    type="email"

                                    value={email}

                                    onChange={(event) =>
                                        setEmail(
                                            event.target.value
                                        )
                                    }

                                    placeholder="you@example.com"

                                    className="
                                        w-full

                                        rounded-xl

                                        border
                                        border-gray-300
                                        dark:border-gray-700

                                        bg-white
                                        dark:bg-[#101218]

                                        text-gray-900
                                        dark:text-gray-100

                                        placeholder-gray-400
                                        dark:placeholder-gray-600

                                        pl-11
                                        pr-4
                                        py-3

                                        outline-none

                                        transition

                                        focus:border-blue-500

                                        focus:ring-2
                                        focus:ring-blue-500/20

                                        disabled:opacity-60
                                    "

                                    disabled={loading}

                                    autoComplete="email"
                                />

                            </div>

                        </div>


                        {/* Password */}

                        <div>

                            <label
                                className="
                                    block

                                    text-sm
                                    font-medium

                                    text-gray-700
                                    dark:text-gray-300

                                    mb-2
                                "
                            >
                                Password
                            </label>


                            <div
                                className="relative"
                            >

                                <Lock
                                    size={18}

                                    className="
                                        absolute
                                        left-3.5
                                        top-1/2
                                        -translate-y-1/2

                                        text-gray-400
                                        dark:text-gray-500
                                    "
                                />


                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }

                                    value={password}

                                    onChange={(event) =>
                                        setPassword(
                                            event.target.value
                                        )
                                    }

                                    placeholder="Create a password"

                                    className="
                                        w-full

                                        rounded-xl

                                        border
                                        border-gray-300
                                        dark:border-gray-700

                                        bg-white
                                        dark:bg-[#101218]

                                        text-gray-900
                                        dark:text-gray-100

                                        placeholder-gray-400
                                        dark:placeholder-gray-600

                                        pl-11
                                        pr-12
                                        py-3

                                        outline-none

                                        transition

                                        focus:border-blue-500

                                        focus:ring-2
                                        focus:ring-blue-500/20

                                        disabled:opacity-60
                                    "

                                    disabled={loading}

                                    autoComplete="new-password"
                                />


                                <button
                                    type="button"

                                    onClick={() =>
                                        setShowPassword(
                                            (value) =>
                                                !value
                                        )
                                    }

                                    className="
                                        absolute
                                        right-3
                                        top-1/2
                                        -translate-y-1/2

                                        w-8
                                        h-8

                                        rounded-lg

                                        flex
                                        items-center
                                        justify-center

                                        text-gray-400
                                        dark:text-gray-500

                                        hover:bg-gray-100
                                        dark:hover:bg-gray-800

                                        hover:text-gray-600
                                        dark:hover:text-gray-300

                                        transition
                                    "

                                    tabIndex={-1}
                                >

                                    {showPassword ? (
                                        <EyeOff
                                            size={17}
                                        />
                                    ) : (
                                        <Eye
                                            size={17}
                                        />
                                    )}

                                </button>

                            </div>


                            {/* Password requirement */}

                            <div
                                className={`
                                    mt-2

                                    flex
                                    items-center
                                    gap-1.5

                                    text-xs

                                    ${
                                        passwordValid

                                            ? `
                                                text-green-600
                                                dark:text-green-400
                                            `

                                            : `
                                                text-gray-400
                                                dark:text-gray-500
                                            `
                                    }
                                `}
                            >

                                <Check
                                    size={13}
                                />

                                At least 6 characters

                            </div>

                        </div>


                        {/* Confirm Password */}

                        <div>

                            <label
                                className="
                                    block

                                    text-sm
                                    font-medium

                                    text-gray-700
                                    dark:text-gray-300

                                    mb-2
                                "
                            >
                                Confirm Password
                            </label>


                            <div
                                className="relative"
                            >

                                <Lock
                                    size={18}

                                    className="
                                        absolute
                                        left-3.5
                                        top-1/2
                                        -translate-y-1/2

                                        text-gray-400
                                        dark:text-gray-500
                                    "
                                />


                                <input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }

                                    value={
                                        confirmPassword
                                    }

                                    onChange={(event) =>
                                        setConfirmPassword(
                                            event.target.value
                                        )
                                    }

                                    placeholder="Confirm your password"

                                    className="
                                        w-full

                                        rounded-xl

                                        border
                                        border-gray-300
                                        dark:border-gray-700

                                        bg-white
                                        dark:bg-[#101218]

                                        text-gray-900
                                        dark:text-gray-100

                                        placeholder-gray-400
                                        dark:placeholder-gray-600

                                        pl-11
                                        pr-12
                                        py-3

                                        outline-none

                                        transition

                                        focus:border-blue-500

                                        focus:ring-2
                                        focus:ring-blue-500/20

                                        disabled:opacity-60
                                    "

                                    disabled={loading}

                                    autoComplete="new-password"
                                />


                                <button
                                    type="button"

                                    onClick={() =>
                                        setShowConfirmPassword(
                                            (value) =>
                                                !value
                                        )
                                    }

                                    className="
                                        absolute
                                        right-3
                                        top-1/2
                                        -translate-y-1/2

                                        w-8
                                        h-8

                                        rounded-lg

                                        flex
                                        items-center
                                        justify-center

                                        text-gray-400
                                        dark:text-gray-500

                                        hover:bg-gray-100
                                        dark:hover:bg-gray-800

                                        hover:text-gray-600
                                        dark:hover:text-gray-300

                                        transition
                                    "

                                    tabIndex={-1}
                                >

                                    {showConfirmPassword ? (
                                        <EyeOff
                                            size={17}
                                        />
                                    ) : (
                                        <Eye
                                            size={17}
                                        />
                                    )}

                                </button>

                            </div>


                            {passwordsMatch && (

                                <div
                                    className="
                                        mt-2

                                        flex
                                        items-center
                                        gap-1.5

                                        text-xs

                                        text-green-600
                                        dark:text-green-400
                                    "
                                >

                                    <Check
                                        size={13}
                                    />

                                    Passwords match

                                </div>

                            )}

                        </div>


                        {/* Submit */}

                        <button
                            type="submit"

                            disabled={loading}

                            className="
                                w-full

                                flex
                                items-center
                                justify-center
                                gap-2

                                rounded-xl

                                bg-blue-600
                                hover:bg-blue-700
                                active:bg-blue-800

                                disabled:bg-blue-400
                                disabled:cursor-not-allowed

                                text-white

                                font-semibold

                                py-3

                                transition

                                shadow-sm
                                hover:shadow-md

                                focus:outline-none

                                focus:ring-2
                                focus:ring-blue-500
                                focus:ring-offset-2
                                dark:focus:ring-offset-[#151821]
                            "
                        >

                            {loading ? (

                                <>
                                    <Loader2
                                        size={18}
                                        className="animate-spin"
                                    />

                                    Creating account...
                                </>

                            ) : (

                                <>
                                    Create account

                                    <ArrowRight
                                        size={18}
                                    />
                                </>

                            )}

                        </button>

                    </form>


                    {/* =========================
                        Login
                    ========================= */}

                    <p
                        className="
                            text-center

                            text-sm

                            text-gray-500
                            dark:text-gray-400

                            mt-7
                        "
                    >

                        Already have an account?{" "}

                        <button
                            type="button"

                            onClick={() =>
                                navigate(
                                    "/login"
                                )
                            }

                            className="
                                font-semibold

                                text-blue-600
                                dark:text-blue-400

                                hover:text-blue-700
                                dark:hover:text-blue-300

                                hover:underline

                                transition
                            "
                        >
                            Sign in
                        </button>

                    </p>

                </div>

            </div>

        </div>

    );

}


export default Register;