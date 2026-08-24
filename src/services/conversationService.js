import api from "../api/api";


// ==========================
// Create Conversation
// ==========================

export async function createConversation(
    documentId
) {

    const response = await api.post(
        "/conversation",
        {
            document_id: documentId,
        }
    );

    return response.data;
}


// ==========================
// Get Conversations
// ==========================

export async function getConversations(
    documentId
) {

    const response = await api.get(
        `/conversation/${documentId}`
    );

    return response.data;
}


// ==========================
// Get Messages
// ==========================

export async function getMessages(
    conversationId
) {

    const response = await api.get(
        `/conversation/messages/${conversationId}`
    );

    return response.data.messages || [];
}


// ==========================
// Rename Conversation
// ==========================

export async function renameConversation(
    conversationId,
    title
) {

    const response = await api.put(
        `/conversation/${conversationId}`,
        {
            title,
        }
    );

    return response.data;
}


// ==========================
// Delete Conversation
// ==========================

export async function deleteConversation(
    conversationId
) {

    const response = await api.delete(
        `/conversation/${conversationId}`
    );

    return response.data;
}