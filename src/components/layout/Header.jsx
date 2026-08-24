import {
    Moon,
    Sun,
    LogOut,
    User,
    Sparkles,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { logoutUser } from "../../services/authService";


function Header() {

    const navigate = useNavigate();

    const { user } = useAuth();

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });


    // -------------------------
    // Apply theme
    // -------------------------

    useEffect(() => {

        const root = document.documentElement;

        if (darkMode) {

            root.classList.add("dark");

            localStorage.setItem(
                "theme",
                "dark"
            );

        } else {

            root.classList.remove("dark");

            localStorage.setItem(
                "theme",
                "light"
            );

        }

    }, [darkMode]);


    // -------------------------
    // Logout
    // -------------------------

    const handleLogout = async () => {

        try {

            await logoutUser();

            navigate(
                "/login",
                {
                    replace: true,
                }
            );

        } catch (error) {

            console.error(
                "Logout failed:",
                error
            );

        }

    };


    return (

        <header
            className="
                h-[72px]
                shrink-0
                bg-white
                dark:bg-[#151821]
                border-b
                border-gray-200
                dark:border-gray-800
                transition-colors
                duration-200
            "
        >

            <div
                className="
                    h-full
                    px-5
                    lg:px-7
                    flex
                    items-center
                    justify-between
                "
            >

                {/* -------------------------
                    Brand
                ------------------------- */}

                <div className="flex items-center gap-3">

                    {/* Logo */}

                    <div
                        className="
                            w-10
                            h-10
                            rounded-xl
                            bg-blue-600
                            flex
                            items-center
                            justify-center
                            text-white
                            shadow-sm
                        "
                    >

                        <Sparkles
                            size={21}
                            strokeWidth={2.2}
                        />

                    </div>


                    {/* Brand text */}

                    <div>

                        <h1
                            className="
                                text-[17px]
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
                                text-[11px]
                                text-gray-500
                                dark:text-gray-400
                                mt-0.5
                            "
                        >
                            Chat with your PDFs
                        </p>

                    </div>

                </div>


                {/* -------------------------
                    Right side
                ------------------------- */}

                <div
                    className="
                        flex
                        items-center
                        gap-2
                    "
                >

                    {/* User */}

                    <div
                        className="
                            hidden
                            sm:flex
                            items-center
                            gap-2
                            px-3
                            h-10
                            rounded-xl
                            bg-gray-50
                            dark:bg-[#1c202b]
                            border
                            border-gray-200
                            dark:border-gray-700
                        "
                    >

                        <User
                            size={16}
                            className="
                                text-gray-500
                                dark:text-gray-400
                            "
                        />

                        <span
                            className="
                                text-sm
                                text-gray-700
                                dark:text-gray-300
                                max-w-[220px]
                                truncate
                            "
                            title={
                                user?.email || ""
                            }
                        >
                            {user?.email || "User"}
                        </span>

                    </div>


                    {/* Theme */}

                    <button
                        type="button"
                        onClick={() =>
                            setDarkMode(
                                (previous) =>
                                    !previous
                            )
                        }
                        className="
                            w-10
                            h-10
                            rounded-xl
                            flex
                            items-center
                            justify-center
                            border
                            border-gray-200
                            dark:border-gray-700
                            bg-white
                            dark:bg-[#1c202b]
                            text-gray-600
                            dark:text-gray-300
                            hover:bg-gray-100
                            dark:hover:bg-[#252b38]
                            transition
                        "
                        title={
                            darkMode
                                ? "Switch to light mode"
                                : "Switch to dark mode"
                        }
                    >

                        {darkMode ? (

                            <Sun
                                size={18}
                            />

                        ) : (

                            <Moon
                                size={18}
                            />

                        )}

                    </button>


                    {/* Logout */}

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="
                            h-10
                            px-3.5
                            rounded-xl
                            flex
                            items-center
                            gap-2
                            border
                            border-gray-200
                            dark:border-gray-700
                            bg-white
                            dark:bg-[#1c202b]
                            text-gray-700
                            dark:text-gray-300
                            hover:bg-red-50
                            dark:hover:bg-red-950/30
                            hover:text-red-600
                            dark:hover:text-red-400
                            hover:border-red-200
                            dark:hover:border-red-900
                            transition
                        "
                    >

                        <LogOut
                            size={17}
                        />

                        <span className="hidden sm:inline">
                            Logout
                        </span>

                    </button>

                </div>

            </div>

        </header>

    );
}


export default Header;