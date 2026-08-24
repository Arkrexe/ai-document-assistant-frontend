import { useState } from "react";

import {
    Send,
    Square,
} from "lucide-react";


function ChatInput({
    loading,
    onSend,
    onStop,
}) {

    const [
        question,
        setQuestion,
    ] = useState("");


    const handleSend = () => {

        if (!question.trim()) {
            return;
        }

        onSend(question);

        setQuestion("");

    };


    return (

        <div
            className="
                shrink-0

                border-t
                border-gray-200
                dark:border-gray-800

                bg-white
                dark:bg-[#151821]

                p-4
                lg:p-5

                transition-colors
                duration-200
            "
        >

            <div
                className="
                    flex
                    gap-3
                    items-center
                "
            >

                {/* Input */}

                <div
                    className="
                        flex-1
                        relative
                    "
                >

                    <input
                        type="text"

                        value={question}

                        onChange={(e) =>
                            setQuestion(
                                e.target.value
                            )
                        }

                        onKeyDown={(e) => {

                            if (
                                e.key === "Enter" &&
                                !loading
                            ) {

                                handleSend();

                            }

                        }}

                        placeholder="Ask a question..."

                        className="
                            w-full

                            h-12

                            rounded-xl

                            border
                            border-gray-200
                            dark:border-gray-700

                            bg-gray-50
                            dark:bg-[#1c202b]

                            text-gray-900
                            dark:text-gray-100

                            placeholder:text-gray-400
                            dark:placeholder:text-gray-500

                            px-4

                            outline-none

                            focus:border-blue-500
                            dark:focus:border-blue-500

                            focus:ring-2
                            focus:ring-blue-500/15

                            transition

                            disabled:opacity-60
                        "

                        disabled={loading}
                    />

                </div>


                {/* Send / Stop */}

                <button
                    type="button"

                    onClick={
                        loading
                            ? onStop
                            : handleSend
                    }

                    className={`
                        h-12

                        px-5

                        rounded-xl

                        flex
                        items-center
                        justify-center
                        gap-2

                        text-sm
                        font-semibold
                        text-white

                        shadow-sm

                        transition-all

                        active:scale-[0.98]

                        ${
                            loading

                                ? `
                                    bg-red-600
                                    hover:bg-red-700
                                    shadow-red-600/10
                                `

                                : `
                                    bg-blue-600
                                    hover:bg-blue-700
                                    shadow-blue-600/10
                                `
                        }
                    `}
                >

                    {loading ? (

                        <>
                            <Square
                                size={15}
                                fill="currentColor"
                            />

                            Stop
                        </>

                    ) : (

                        <>
                            Send

                            <Send
                                size={16}
                            />

                        </>

                    )}

                </button>

            </div>


            {/* Small helper */}

            <p
                className="
                    mt-2
                    px-1

                    text-[10px]
                    text-gray-400
                    dark:text-gray-500
                "
            >
                Press Enter to send
            </p>

        </div>

    );

}


export default ChatInput;