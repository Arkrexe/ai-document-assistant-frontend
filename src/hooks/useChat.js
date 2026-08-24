import { useEffect, useRef, useState } from "react";

import {
    streamQuestion,
} from "../services/chatService";

import {
    createConversation,
    getMessages,
} from "../services/conversationService";

export default function useChat(
    selectedDocument,
    selectedConversation,
    setSelectedConversation
) {

    // ==========================
    // States
    // ==========================

    const [messages, setMessages] = useState([]);

    const [loading, setLoading] = useState(false);

    const abortControllerRef = useRef(null);

    // ==========================
    // Load Messages
    // ==========================

    useEffect(() => {

        if (!selectedConversation) {

            setMessages([]);

            return;

        }

        loadMessages();

    }, [selectedConversation]);

    // ==========================
    // Load Messages Function
    // ==========================

    const loadMessages = async () => {

        try {

            const data =
                await getMessages(selectedConversation);

            const formatted =
                data.messages.map((message) => ({

                    sender:
                        message.sender === "assistant"
                            ? "ai"
                            : "user",

                    message: message.message,

                }));

            setMessages(formatted);

        } catch (error) {

            console.error(error);

        }

    };

    // ==========================
    // Create Conversation
    // ==========================

    const ensureConversation = async () => {

        if (selectedConversation)
            return selectedConversation;

        const conversation =
            await createConversation(
                selectedDocument
            );

        setSelectedConversation(
            conversation.conversation_id
        );

        return conversation.conversation_id;

    };}