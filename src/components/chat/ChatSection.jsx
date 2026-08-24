import { useEffect, useRef } from "react";
import { MessageCircle } from "lucide-react";

import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";

import { streamQuestion } from "../../services/chatService";

import {
    createConversation,
    getMessages,
} from "../../services/conversationService";


function ChatSection({
    selectedDocument,
    selectedConversation,
    setSelectedConversation,
    messages,
    setMessages,
    loading,
    setLoading,
}) {

    const abortControllerRef = useRef(null);


    // ----------------------------
    // Load previous conversation
    // ----------------------------

    useEffect(() => {

        if (
            !selectedConversation ||
            loading
        ) {
            return;
        }

        async function loadConversation() {

            try {

                const messagesData =
                    await getMessages(
                        selectedConversation
                    );

                const formatted =
                    messagesData.map(
                        (msg) => ({
                            sender:
                                msg.sender ===
                                "assistant"
                                    ? "ai"
                                    : "user",

                            message:
                                msg.message,
                        })
                    );

                setMessages(
                    formatted
                );

            } catch (error) {

                console.error(
                    "Failed to load conversation:",
                    error
                );

                setMessages([]);

            }

        }

        loadConversation();

    }, [selectedConversation]);


    // ----------------------------
    // Send Message
    // ----------------------------

    const sendMessage = async (
        question,
        regenerate = false
    ) => {

        if (!selectedDocument) {

            alert(
                "Please select a document first."
            );

            return;
        }

        let conversationId =
            selectedConversation;


        try {

            // Create conversation if needed

            if (!conversationId) {

                const conversation =
                    await createConversation(
                        selectedDocument
                    );

                conversationId =
                    conversation.conversation_id;

                setSelectedConversation(
                    conversationId
                );

            }


            // ----------------------------
            // Add messages to UI
            // ----------------------------

            if (regenerate) {

                setMessages((prev) => {

                    const updated = [
                        ...prev,
                    ];

                    if (
                        updated.length > 0
                    ) {

                        updated[
                            updated.length - 1
                        ] = {
                            sender: "ai",
                            message: "",
                            prompt: question,
                        };

                    }

                    return updated;

                });

            } else {

                setMessages((prev) => [

                    ...prev,

                    {
                        sender: "user",
                        message: question,
                    },

                    {
                        sender: "ai",
                        message: "",
                        prompt: question,
                    },

                ]);

            }


            // ----------------------------
            // Start loading
            // ----------------------------

            setLoading(true);

            abortControllerRef.current =
                new AbortController();


            // ----------------------------
            // Stream response
            // ----------------------------

            await streamQuestion(
                {
                    document_id:
                        selectedDocument,

                    conversation_id:
                        conversationId,

                    question,
                },

                (chunk) => {

                    setMessages((prev) => {

                        const updated = [
                            ...prev,
                        ];

                        if (
                            updated.length === 0
                        ) {
                            return updated;
                        }

                        const lastMessage =
                            updated[
                                updated.length - 1
                            ];

                        updated[
                            updated.length - 1
                        ] = {

                            ...lastMessage,

                            message:
                                lastMessage.message +
                                chunk,

                        };

                        return updated;

                    });

                },

                abortControllerRef
                    .current
                    .signal
            );


            abortControllerRef.current =
                null;

            setLoading(false);


        } catch (error) {

            setLoading(false);


            // ----------------------------
            // User stopped generation
            // ----------------------------

            if (
                error.name ===
                "AbortError"
            ) {

                console.log(
                    "Generation stopped."
                );

                abortControllerRef.current =
                    null;

                return;

            }


            // ----------------------------
            // Other error
            // ----------------------------

            console.error(
                "Chat error:",
                error
            );


            setMessages((prev) => {

                const updated = [
                    ...prev,
                ];

                if (
                    updated.length === 0
                ) {
                    return updated;
                }

                updated[
                    updated.length - 1
                ] = {

                    sender: "ai",

                    message:
                        "Something went wrong while generating the response.",

                };

                return updated;

            });

        }

    };


    // ----------------------------
    // Stop Generation
    // ----------------------------

    const stopGeneration = () => {

        if (
            abortControllerRef.current
        ) {

            abortControllerRef.current.abort();

            abortControllerRef.current =
                null;

        }

        setLoading(false);

    };


    // ----------------------------
    // UI
    // ----------------------------

    return (

        <section
            className="
                flex
                flex-col
                flex-1
                min-h-0
                overflow-hidden
                rounded-2xl

                bg-white
                dark:bg-[#151821]

                border
                border-gray-200
                dark:border-gray-800

                shadow-sm
                dark:shadow-black/20

                transition-colors
                duration-200
            "
        >

            {/* -------------------------
                Chat Header
            ------------------------- */}

            <div
                className="
                    h-16
                    shrink-0
                    px-6

                    flex
                    items-center
                    gap-3

                    border-b
                    border-gray-200
                    dark:border-gray-800

                    bg-white
                    dark:bg-[#151821]
                "
            >

                <div
                    className="
                        w-9
                        h-9
                        rounded-xl

                        flex
                        items-center
                        justify-center

                        bg-blue-50
                        dark:bg-blue-950/40

                        text-blue-600
                        dark:text-blue-400
                    "
                >

                    <MessageCircle
                        size={19}
                        strokeWidth={2}
                    />

                </div>


                <div>

                    <h2
                        className="
                            text-base
                            font-semibold

                            text-gray-900
                            dark:text-gray-100
                        "
                    >
                        Chat
                    </h2>

                    <p
                        className="
                            text-[11px]

                            text-gray-500
                            dark:text-gray-400
                        "
                    >
                        Ask questions about your document
                    </p>

                </div>

            </div>


            {/* -------------------------
                Messages
            ------------------------- */}

            <ChatWindow
                messages={messages}
                onRegenerate={(prompt) =>
                    sendMessage(
                        prompt,
                        true
                    )
                }
            />


            {/* -------------------------
                Input
            ------------------------- */}

            <ChatInput
                loading={loading}
                onSend={sendMessage}
                onStop={stopGeneration}
            />

        </section>

    );

}


export default ChatSection;