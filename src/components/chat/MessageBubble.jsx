import { useState } from "react";

import {
    Copy,
    Check,
    RefreshCw,
    Sparkles,
} from "lucide-react";

import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";

import {
    Prism as SyntaxHighlighter,
} from "react-syntax-highlighter";

import {
    oneDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";


function MessageBubble({
    message,
    sender,
    prompt,
    onRegenerate,
}) {

    const isUser =
        sender === "user";

    const isThinking =
        !isUser && !message;


    const [
        copied,
        setCopied,
    ] = useState(false);


    const handleCopy =
        async () => {

            try {

                await navigator.clipboard.writeText(
                    message
                );

                setCopied(true);

                setTimeout(() => {

                    setCopied(false);

                }, 2000);

            } catch (error) {

                console.error(
                    "Failed to copy:",
                    error
                );

            }

        };


    return (

        <div
            className={`
                flex
                w-full

                ${
                    isUser
                        ? "justify-end"
                        : "justify-start"
                }
            `}
        >

            <div
                className={`
                    relative
                    max-w-3xl
                    rounded-2xl

                    px-5
                    py-3.5

                    shadow-sm

                    leading-7

                    transition-colors
                    duration-200

                    ${
                        isUser

                            ? `
                                bg-blue-600
                                text-white

                                rounded-br-md

                                shadow-blue-600/10
                            `

                            : `
                                bg-white
                                dark:bg-[#1a1e27]

                                text-gray-800
                                dark:text-gray-200

                                border
                                border-gray-200
                                dark:border-gray-800

                                rounded-bl-md

                                shadow-black/5
                                dark:shadow-black/20
                            `
                    }
                `}
            >

                {isUser ? (

                    <div
                        className="
                            whitespace-pre-wrap
                            break-words
                        "
                    >
                        {message}
                    </div>

                ) : isThinking ? (

                    /* =========================
                       AI Thinking Indicator
                    ========================= */

                    <div
                        className="
                            flex
                            items-center
                            gap-3

                            py-1
                        "
                    >

                        {/* Animated icon */}

                        <div
                            className="
                                w-8
                                h-8

                                shrink-0

                                rounded-lg

                                flex
                                items-center
                                justify-center

                                bg-blue-50
                                dark:bg-blue-950/40

                                text-blue-600
                                dark:text-blue-400

                                animate-pulse
                            "
                        >

                            <Sparkles
                                size={16}
                                strokeWidth={2}
                            />

                        </div>


                        {/* Text + dots */}

                        <div
                            className="
                                flex
                                items-center
                                gap-1.5
                            "
                        >

                            <span
                                className="
                                    text-sm
                                    font-medium

                                    text-gray-500
                                    dark:text-gray-400
                                "
                            >
                                Thinking
                            </span>


                            <span
                                className="
                                    flex
                                    gap-1
                                "
                            >

                                <span
                                    className="
                                        w-1.5
                                        h-1.5
                                        rounded-full

                                        bg-gray-400
                                        dark:bg-gray-500

                                        animate-bounce
                                    "
                                />

                                <span
                                    className="
                                        w-1.5
                                        h-1.5
                                        rounded-full

                                        bg-gray-400
                                        dark:bg-gray-500

                                        animate-bounce
                                    "
                                    style={{
                                        animationDelay:
                                            "150ms",
                                    }}
                                />

                                <span
                                    className="
                                        w-1.5
                                        h-1.5
                                        rounded-full

                                        bg-gray-400
                                        dark:bg-gray-500

                                        animate-bounce
                                    "
                                    style={{
                                        animationDelay:
                                            "300ms",
                                    }}
                                />

                            </span>

                        </div>

                    </div>

                ) : (

                    <>

                        {/* =========================
                            AI Response
                        ========================= */}

                        <div
                            className="
                                prose
                                prose-sm
                                max-w-none

                                dark:prose-invert

                                prose-p:my-2
                                prose-headings:font-semibold

                                prose-headings:text-gray-900
                                dark:prose-headings:text-gray-100

                                prose-a:text-blue-600
                                dark:prose-a:text-blue-400

                                prose-li:my-1
                            "
                        >

                            <ReactMarkdown
                                remarkPlugins={[
                                    remarkGfm,
                                ]}

                                components={{

                                    code({
                                        inline,
                                        className,
                                        children,
                                        ...props
                                    }) {

                                        const match =
                                            /language-(\w+)/.exec(
                                                className ||
                                                ""
                                            );


                                        return !inline &&
                                            match ? (

                                            <div
                                                className="
                                                    my-4
                                                    overflow-hidden
                                                    rounded-xl

                                                    border
                                                    border-gray-200
                                                    dark:border-gray-700
                                                "
                                            >

                                                <SyntaxHighlighter
                                                    style={
                                                        oneDark
                                                    }

                                                    language={
                                                        match[1]
                                                    }

                                                    PreTag="div"

                                                    customStyle={{
                                                        margin: 0,
                                                        borderRadius: 0,
                                                        fontSize:
                                                            "0.85rem",
                                                        lineHeight:
                                                            "1.6",
                                                    }}

                                                    {...props}
                                                >

                                                    {String(
                                                        children
                                                    ).replace(
                                                        /\n$/,
                                                        ""
                                                    )}

                                                </SyntaxHighlighter>

                                            </div>

                                        ) : (

                                            <code
                                                className="
                                                    bg-gray-100
                                                    dark:bg-gray-800

                                                    text-gray-800
                                                    dark:text-gray-200

                                                    px-1.5
                                                    py-0.5

                                                    rounded-md

                                                    text-[0.85em]

                                                    border
                                                    border-gray-200
                                                    dark:border-gray-700
                                                "

                                                {...props}
                                            >

                                                {children}

                                            </code>

                                        );

                                    },


                                    table({
                                        children,
                                    }) {

                                        return (

                                            <div
                                                className="
                                                    overflow-x-auto
                                                    my-4
                                                    rounded-xl

                                                    border
                                                    border-gray-200
                                                    dark:border-gray-700
                                                "
                                            >

                                                <table
                                                    className="
                                                        min-w-full
                                                        text-sm
                                                    "
                                                >

                                                    {children}

                                                </table>

                                            </div>

                                        );

                                    },

                                }}
                            >

                                {message}

                            </ReactMarkdown>

                        </div>


                        {/* =========================
                            Actions
                        ========================= */}

                        <div
                            className="
                                mt-4
                                pt-3

                                border-t
                                border-gray-100
                                dark:border-gray-800

                                flex
                                items-center
                                justify-end
                                gap-1
                            "
                        >

                            {/* Copy */}

                            <button
                                onClick={
                                    handleCopy
                                }

                                className="
                                    flex
                                    items-center
                                    gap-1.5

                                    px-2.5
                                    py-1.5

                                    rounded-lg

                                    text-xs
                                    font-medium

                                    text-gray-500
                                    dark:text-gray-400

                                    hover:bg-gray-100
                                    dark:hover:bg-gray-800

                                    hover:text-blue-600
                                    dark:hover:text-blue-400

                                    transition
                                "
                            >

                                {copied ? (

                                    <>
                                        <Check
                                            size={14}
                                        />

                                        Copied
                                    </>

                                ) : (

                                    <>
                                        <Copy
                                            size={14}
                                        />

                                        Copy
                                    </>

                                )}

                            </button>


                            {/* Regenerate */}

                            {prompt &&
                                onRegenerate && (

                                    <button
                                        onClick={() =>
                                            onRegenerate(
                                                prompt
                                            )
                                        }

                                        className="
                                            flex
                                            items-center
                                            gap-1.5

                                            px-2.5
                                            py-1.5

                                            rounded-lg

                                            text-xs
                                            font-medium

                                            text-gray-500
                                            dark:text-gray-400

                                            hover:bg-gray-100
                                            dark:hover:bg-gray-800

                                            hover:text-green-600
                                            dark:hover:text-green-400

                                            transition
                                        "
                                    >

                                        <RefreshCw
                                            size={14}
                                        />

                                        Regenerate

                                    </button>

                                )}

                        </div>

                    </>

                )}

            </div>

        </div>

    );

}


export default MessageBubble;