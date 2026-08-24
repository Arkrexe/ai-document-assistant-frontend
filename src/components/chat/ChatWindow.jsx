import {
    useEffect,
    useRef,
} from "react";

import {
    FileText,
    MessageCircle,
    Sparkles,
} from "lucide-react";

import MessageBubble from "./MessageBubble";


function ChatWindow({
    messages,
    onRegenerate,
}) {

    const bottomRef =
        useRef(null);

    const containerRef =
        useRef(null);


    useEffect(() => {

        const container =
            containerRef.current;

        if (!container) {
            return;
        }

        const distanceFromBottom =
            container.scrollHeight -
            container.scrollTop -
            container.clientHeight;

        const nearBottom =
            distanceFromBottom < 120;

        if (nearBottom) {

            bottomRef.current?.scrollIntoView({
                behavior: "smooth",
            });

        }

    }, [messages]);


    return (

        <div
            ref={containerRef}

            className="
                flex-1
                min-h-0
                overflow-y-auto

                px-5
                py-6
                lg:px-7

                bg-gray-50/70
                dark:bg-[#101218]

                transition-colors
                duration-200
            "
        >

            {messages.length === 0 ? (

                /* =========================
                   Empty Chat State
                ========================= */

                <div
                    className="
                        h-full
                        flex
                        items-center
                        justify-center

                        px-4
                    "
                >

                    <div
                        className="
                            max-w-md
                            w-full

                            text-center
                        "
                    >

                        {/* -------------------------
                            Icon
                        ------------------------- */}

                        <div
                            className="
                                mx-auto

                                w-16
                                h-16

                                rounded-2xl

                                flex
                                items-center
                                justify-center

                                bg-blue-50
                                dark:bg-blue-950/40

                                text-blue-600
                                dark:text-blue-400

                                shadow-sm
                            "
                        >

                            <Sparkles
                                size={28}
                                strokeWidth={2}
                            />

                        </div>


                        {/* -------------------------
                            Title
                        ------------------------- */}

                        <h2
                            className="
                                mt-5

                                text-xl
                                font-semibold
                                tracking-tight

                                text-gray-900
                                dark:text-gray-100
                            "
                        >
                            Chat with your document
                        </h2>


                        {/* -------------------------
                            Description
                        ------------------------- */}

                        <p
                            className="
                                mt-2

                                text-sm
                                leading-6

                                text-gray-500
                                dark:text-gray-400
                            "
                        >
                            Ask questions about your uploaded
                            PDF and get answers based on its
                            content.
                        </p>


                        {/* -------------------------
                            Quick info cards
                        ------------------------- */}

                        <div
                            className="
                                mt-7

                                grid
                                grid-cols-2

                                gap-3
                            "
                        >

                            {/* Document */}

                            <div
                                className="
                                    rounded-xl

                                    border
                                    border-gray-200
                                    dark:border-gray-800

                                    bg-white
                                    dark:bg-[#151821]

                                    p-4

                                    text-left

                                    transition-colors
                                "
                            >

                                <FileText
                                    size={18}

                                    className="
                                        text-blue-600
                                        dark:text-blue-400
                                    "
                                />

                                <p
                                    className="
                                        mt-3

                                        text-xs
                                        font-semibold

                                        text-gray-800
                                        dark:text-gray-200
                                    "
                                >
                                    Upload a PDF
                                </p>

                                <p
                                    className="
                                        mt-1

                                        text-[11px]
                                        leading-5

                                        text-gray-500
                                        dark:text-gray-500
                                    "
                                >
                                    Select a document from
                                    the sidebar.
                                </p>

                            </div>


                            {/* Ask */}

                            <div
                                className="
                                    rounded-xl

                                    border
                                    border-gray-200
                                    dark:border-gray-800

                                    bg-white
                                    dark:bg-[#151821]

                                    p-4

                                    text-left

                                    transition-colors
                                "
                            >

                                <MessageCircle
                                    size={18}

                                    className="
                                        text-blue-600
                                        dark:text-blue-400
                                    "
                                />

                                <p
                                    className="
                                        mt-3

                                        text-xs
                                        font-semibold

                                        text-gray-800
                                        dark:text-gray-200
                                    "
                                >
                                    Ask anything
                                </p>

                                <p
                                    className="
                                        mt-1

                                        text-[11px]
                                        leading-5

                                        text-gray-500
                                        dark:text-gray-500
                                    "
                                >
                                    Ask questions about
                                    the document.
                                </p>

                            </div>

                        </div>


                        {/* -------------------------
                            Hint
                        ------------------------- */}

                        <p
                            className="
                                mt-6

                                text-[11px]

                                text-gray-400
                                dark:text-gray-600
                            "
                        >
                            Your AI assistant will use the
                            document content to answer.
                        </p>

                    </div>

                </div>

            ) : (

                /* =========================
                   Messages
                ========================= */

                <div className="space-y-5">

                    {messages.map(
                        (
                            message,
                            index
                        ) => (

                            <MessageBubble
                                key={index}

                                sender={
                                    message.sender
                                }

                                message={
                                    message.message
                                }

                                prompt={
                                    message.prompt
                                }

                                onRegenerate={
                                    onRegenerate
                                }
                            />

                        )
                    )}

                </div>

            )}


            <div
                ref={bottomRef}
            />

        </div>

    );

}


export default ChatWindow;