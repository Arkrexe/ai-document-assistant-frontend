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
} from "lucide-react";

import { loginUser } from "../services/authService";


function Login() {

    const navigate = useNavigate();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");


    const handleLogin = async (event) => {

        event.preventDefault();

        setError("");

        if (
            !email.trim() ||
            !password
        ) {

            setError(
                "Please enter your email and password."
            );

            return;
        }


        try {

            setLoading(true);

            await loginUser(
                email.trim(),
                password
            );

            navigate("/", {
                replace: true,
            });

        } catch (error) {

            console.error(
                "Login failed:",
                error
            );

            switch (error.code) {

                case "auth/invalid-credential":

                    setError(
                        "Invalid email or password."
                    );

                    break;


                case "auth/user-not-found":

                    setError(
                        "No account found with this email."
                    );

                    break;


                case "auth/wrong-password":

                    setError(
                        "Incorrect password."
                    );

                    break;


                case "auth/invalid-email":

                    setError(
                        "Please enter a valid email address."
                    );

                    break;


                case "auth/too-many-requests":

                    setError(
                        "Too many attempts. Please try again later."
                    );

                    break;


                default:

                    setError(
                        "Login failed. Please try again."
                    );

            }

        } finally {

            setLoading(false);

        }

    };


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
                        Chat with your documents using AI
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
                            Welcome back
                        </h2>


                        <p
                            className="
                                mt-1

                                text-sm

                                text-gray-500
                                dark:text-gray-400
                            "
                        >
                            Sign in to continue to your documents.
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
                        onSubmit={handleLogin}
                        className="space-y-5"
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
                                className="
                                    relative
                                "
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
                                        dark:focus:border-blue-500

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

                                    placeholder="Enter your password"

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

                                    autoComplete="current-password"
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

                                    title={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
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

                                    Signing in...
                                </>

                            ) : (

                                <>
                                    Sign in

                                    <ArrowRight
                                        size={18}
                                    />
                                </>

                            )}

                        </button>

                    </form>


                    {/* =========================
                        Register
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

                        Don't have an account?{" "}

                        <button
                            type="button"

                            onClick={() =>
                                navigate(
                                    "/register"
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
                            Create one
                        </button>

                    </p>

                </div>

            </div>

        </div>

    );

}


export default Login;