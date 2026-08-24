import api from "../api/api";
import { auth } from "../firebase";

// ==========================
// Normal Chat
// ==========================

export const askQuestion = async (
    documentId,
    conversationId,
    question
) => {
    const response = await api.post(
        "/chat",
        {
            document_id: documentId,
            conversation_id: conversationId,
            question,
        }
    );

    return response.data;
};


// ==========================
// Streaming Chat
// ==========================

export const streamQuestion = async (
    {
        document_id,
        conversation_id,
        question,
    },
    onChunk,
    signal
) => {

    const user = auth.currentUser;

    if (!user) {
        throw new Error(
            "User is not authenticated."
        );
    }

    const token =
        await user.getIdToken();

    const response = await fetch(
        "http://127.0.0.1:8000/chat/stream",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },

            signal,

            body: JSON.stringify({
                document_id,
                conversation_id,
                question,
            }),
        }
    );

    if (!response.ok) {

        let message =
            "Streaming request failed.";

        try {
            const errorData =
                await response.json();

            if (errorData.detail) {
                message =
                    errorData.detail;
            }
        } catch {
            // Ignore JSON parsing errors
        }

        throw new Error(message);
    }

    if (!response.body) {
        throw new Error(
            "ReadableStream is not supported."
        );
    }

    const reader =
        response.body.getReader();

    const decoder =
        new TextDecoder("utf-8");

    while (true) {

        const {
            value,
            done,
        } = await reader.read();

        if (done) {
            break;
        }

        const chunk =
            decoder.decode(value, {
                stream: true,
            });

        if (chunk) {
            onChunk(chunk);
        }
    }

    // Flush remaining decoder data

    const remaining =
        decoder.decode();

    if (remaining) {
        onChunk(remaining);
    }
};