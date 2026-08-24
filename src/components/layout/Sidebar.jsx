import {
    FileText,
    FolderOpen,
    Plus,
    Pencil,
    Trash2,
} from "lucide-react";

import {
    useEffect,
    useRef,
    useState,
} from "react";

import UploadButton from "../document/UploadButton";
import DocumentCard from "../document/DocumentCard";

import {
    uploadDocument,
    getDocuments,
} from "../../services/documentService";

import {
    createConversation,
    getConversations,
    renameConversation,
    deleteConversation,
} from "../../services/conversationService";

import { useAuth } from "../../context/AuthContext";


function Sidebar({
    selectedDocument,
    setSelectedDocument,
    selectedConversation,
    setSelectedConversation,
}) {

    const fileInputRef =
        useRef(null);

    const [
        documents,
        setDocuments,
    ] = useState([]);

    const [
        conversations,
        setConversations,
    ] = useState([]);

    const {
        user,
        loading: authLoading,
    } = useAuth();


    // -------------------------
    // Fetch documents
    // -------------------------

    const fetchDocuments = async () => {

        if (!user) {
            return;
        }

        try {

            const data =
                await getDocuments();

            setDocuments(data);

        } catch (error) {

            console.error(
                "Failed to fetch documents:",
                error
            );

        }

    };


    // -------------------------
    // Fetch conversations
    // -------------------------

    const fetchConversations =
        async (documentId) => {

            if (
                !documentId ||
                !user
            ) {

                setConversations([]);

                return;
            }

            try {

                const data =
                    await getConversations(
                        documentId
                    );

                setConversations(
                    data.conversations || []
                );

            } catch (error) {

                console.error(
                    "Failed to fetch conversations:",
                    error
                );

                setConversations([]);

            }

        };


    // -------------------------
    // Initial load
    // -------------------------

    useEffect(() => {

        if (authLoading) {
            return;
        }

        if (!user) {

            setDocuments([]);
            setConversations([]);

            return;
        }

        fetchDocuments();

    }, [
        user,
        authLoading,
    ]);


    // -------------------------
    // Load conversations
    // -------------------------

    useEffect(() => {

        if (
            !user ||
            authLoading
        ) {
            return;
        }

        if (selectedDocument) {

            fetchConversations(
                selectedDocument
            );

        } else {

            setConversations([]);

        }

    }, [
        selectedDocument,
        user,
        authLoading,
    ]);


    // -------------------------
    // Upload
    // -------------------------

    const handleUploadClick = () => {

        if (!user) {

            alert(
                "Please login first."
            );

            return;
        }

        fileInputRef.current?.click();

    };


    const handleFileChange =
        async (event) => {

            const file =
                event.target.files?.[0];

            if (!file) {
                return;
            }

            if (!user) {

                alert(
                    "Please login first."
                );

                event.target.value = "";

                return;
            }

            try {

                await uploadDocument(
                    file
                );

                alert(
                    "PDF Uploaded Successfully!"
                );

                await fetchDocuments();

                event.target.value = "";

            } catch (error) {

                console.error(
                    "Upload failed:",
                    error
                );

                alert(
                    "Upload Failed!"
                );

            }

        };


    // -------------------------
    // Select document
    // -------------------------

    const handleDocumentSelect =
        (documentId) => {

            setSelectedDocument(
                documentId
            );

            setSelectedConversation(
                null
            );

        };


    // -------------------------
    // New conversation
    // -------------------------

    const handleNewChat =
        async () => {

            if (!selectedDocument) {

                alert(
                    "Please select a document first."
                );

                return;
            }

            if (!user) {

                alert(
                    "Please login first."
                );

                return;
            }

            try {

                const conversation =
                    await createConversation(
                        selectedDocument
                    );

                await fetchConversations(
                    selectedDocument
                );

                setSelectedConversation(
                    conversation.conversation_id
                );

            } catch (error) {

                console.error(
                    "Failed to create conversation:",
                    error
                );

                alert(
                    "Failed to create new conversation."
                );

            }

        };


    // -------------------------
    // Rename
    // -------------------------

    const handleRename = async (
        event,
        conversation
    ) => {

        event.stopPropagation();

        const currentTitle =
            conversation.title ||
            "New Chat";

        const newTitle =
            window.prompt(
                "Enter a new conversation name:",
                currentTitle
            );

        if (newTitle === null) {
            return;
        }

        const trimmedTitle =
            newTitle.trim();

        if (!trimmedTitle) {

            alert(
                "Conversation name cannot be empty."
            );

            return;
        }

        if (
            trimmedTitle ===
            currentTitle
        ) {
            return;
        }

        try {

            await renameConversation(
                conversation.conversation_id,
                trimmedTitle
            );

            await fetchConversations(
                selectedDocument
            );

        } catch (error) {

            console.error(
                "Failed to rename conversation:",
                error
            );

            alert(
                "Failed to rename conversation."
            );

        }

    };


    // -------------------------
    // Delete
    // -------------------------

    const handleDelete = async (
        event,
        conversation
    ) => {

        event.stopPropagation();

        const confirmed =
            window.confirm(
                `Delete "${conversation.title || "New Chat"}"?\n\nThis will permanently delete the conversation and its messages.`
            );

        if (!confirmed) {
            return;
        }

        try {

            await deleteConversation(
                conversation.conversation_id
            );

            if (
                selectedConversation ===
                conversation.conversation_id
            ) {

                setSelectedConversation(
                    null
                );

            }

            await fetchConversations(
                selectedDocument
            );

        } catch (error) {

            console.error(
                "Failed to delete conversation:",
                error
            );

            alert(
                "Failed to delete conversation."
            );

        }

    };


    // -------------------------
    // Select conversation
    // -------------------------

    const handleConversationSelect =
        (conversationId) => {

            setSelectedConversation(
                conversationId
            );

        };


    // -------------------------
    // UI
    // -------------------------

    return (

        <aside
            className="
                w-72
                lg:w-80
                shrink-0

                flex
                flex-col

                bg-white
                dark:bg-[#151821]

                border-r
                border-gray-200
                dark:border-gray-800

                transition-colors
                duration-200
            "
        >

            {/* =========================
                Sidebar Header
            ========================= */}

            <div
                className="
                    px-5
                    pt-5
                    pb-4
                    shrink-0
                "
            >

                <div
                    className="
                        flex
                        items-center
                        gap-3
                    "
                >

                    <div
                        className="
                            w-10
                            h-10
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

                        <FolderOpen
                            size={20}
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
                            Documents
                        </h2>

                        <p
                            className="
                                text-[11px]

                                text-gray-500
                                dark:text-gray-400
                            "
                        >
                            Your uploaded PDFs
                        </p>

                    </div>

                </div>

            </div>


            {/* =========================
                Hidden File Input
            ========================= */}

            <input
                type="file"
                accept=".pdf"
                ref={fileInputRef}
                onChange={
                    handleFileChange
                }
                hidden
            />


            {/* =========================
                Upload Button
            ========================= */}

            <div
                className="
                    px-4
                    shrink-0
                "
            >

                <UploadButton
                    onClick={
                        handleUploadClick
                    }
                />

            </div>


            {/* =========================
                Content
            ========================= */}

            <div
                className="
                    flex-1
                    min-h-0

                    mt-5
                    px-4
                    pb-5

                    overflow-y-auto

                    space-y-3

                    [scrollbar-width:thin]

                    [&::-webkit-scrollbar]:w-1.5
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    [&::-webkit-scrollbar-thumb]:bg-gray-300
                    dark:[&::-webkit-scrollbar-thumb]:bg-gray-700
                "
            >

                {/* =====================
                    Documents
                ===================== */}

                {documents.length === 0 ? (

                    <div
                        className="
                            rounded-xl

                            border
                            border-dashed
                            border-gray-300
                            dark:border-gray-700

                            px-4
                            py-7

                            text-center
                        "
                    >

                        <div
                            className="
                                mx-auto
                                mb-3

                                w-10
                                h-10

                                rounded-full

                                flex
                                items-center
                                justify-center

                                bg-gray-100
                                dark:bg-gray-800

                                text-gray-400
                                dark:text-gray-500
                            "
                        >

                            <FileText
                                size={19}
                            />

                        </div>


                        <p
                            className="
                                text-sm
                                font-medium

                                text-gray-700
                                dark:text-gray-300
                            "
                        >
                            No documents yet
                        </p>


                        <p
                            className="
                                mt-1

                                text-xs

                                text-gray-400
                                dark:text-gray-500
                            "
                        >
                            Upload a PDF to start chatting
                        </p>

                    </div>

                ) : (

                    documents.map(
                        (document) => (

                            <div
                                key={
                                    document.document_id
                                }
                            >

                                <DocumentCard

                                    id={
                                        document.document_id
                                    }

                                    name={
                                        document.file_name
                                    }

                                    pdfUrl={
                                        document.cloudinary_url
                                    }

                                    active={
                                        selectedDocument ===
                                        document.document_id
                                    }

                                    onClick={() =>
                                        handleDocumentSelect(
                                            document.document_id
                                        )
                                    }

                                    fetchDocuments={
                                        fetchDocuments
                                    }

                                />


                                {/* =====================
                                    Conversations
                                ===================== */}

                                {selectedDocument ===
                                    document.document_id && (

                                    <div
                                        className="
                                            ml-3
                                            mt-3
                                            pl-3

                                            border-l-2
                                            border-gray-200
                                            dark:border-gray-700
                                        "
                                    >

                                        {/* Header */}

                                        <div
                                            className="
                                                flex
                                                items-center
                                                justify-between

                                                mb-2
                                            "
                                        >

                                            <div
                                                className="
                                                    flex
                                                    items-center
                                                    gap-1.5
                                                "
                                            >

                                                <FileText
                                                    size={13}

                                                    className="
                                                        text-gray-400
                                                        dark:text-gray-500
                                                    "
                                                />

                                                <span
                                                    className="
                                                        text-[11px]
                                                        font-semibold
                                                        uppercase
                                                        tracking-wide

                                                        text-gray-500
                                                        dark:text-gray-400
                                                    "
                                                >
                                                    Conversations
                                                </span>

                                            </div>


                                            <button
                                                onClick={
                                                    handleNewChat
                                                }

                                                className="
                                                    flex
                                                    items-center
                                                    gap-1

                                                    px-2
                                                    py-1

                                                    rounded-md

                                                    text-[11px]
                                                    font-semibold

                                                    text-blue-600
                                                    dark:text-blue-400

                                                    hover:bg-blue-50
                                                    dark:hover:bg-blue-950/40

                                                    transition
                                                "
                                            >

                                                <Plus
                                                    size={13}
                                                />

                                                New

                                            </button>

                                        </div>


                                        {/* Conversation List */}

                                        <div
                                            className="
                                                flex
                                                flex-col
                                                gap-1
                                            "
                                        >

                                            {conversations.length ===
                                                0 ? (

                                                <div
                                                    className="
                                                        px-2
                                                        py-3

                                                        rounded-lg

                                                        bg-gray-50
                                                        dark:bg-gray-800/40
                                                    "
                                                >

                                                    <p
                                                        className="
                                                            text-xs

                                                            text-gray-400
                                                            dark:text-gray-500
                                                        "
                                                    >
                                                        No conversations yet
                                                    </p>

                                                </div>

                                            ) : (

                                                conversations.map(
                                                    (
                                                        conversation
                                                    ) => (

                                                        <div
                                                            key={
                                                                conversation.conversation_id
                                                            }

                                                            className={`
                                                                group

                                                                flex
                                                                items-center

                                                                rounded-lg

                                                                border

                                                                transition

                                                                ${
                                                                    selectedConversation ===
                                                                    conversation.conversation_id

                                                                        ? `
                                                                            bg-blue-50
                                                                            dark:bg-blue-950/30

                                                                            border-blue-100
                                                                            dark:border-blue-900/50
                                                                        `

                                                                        : `
                                                                            border-transparent

                                                                            hover:bg-gray-50
                                                                            dark:hover:bg-gray-800/60
                                                                        `
                                                                }
                                                            `}
                                                        >

                                                            {/* Conversation */}

                                                            <button
                                                                onClick={() =>
                                                                    handleConversationSelect(
                                                                        conversation.conversation_id
                                                                    )
                                                                }

                                                                className={`
                                                                    flex-1
                                                                    min-w-0

                                                                    text-left

                                                                    px-2.5
                                                                    py-2

                                                                    rounded-lg

                                                                    text-xs

                                                                    transition

                                                                    ${
                                                                        selectedConversation ===
                                                                        conversation.conversation_id

                                                                            ? `
                                                                                text-blue-700
                                                                                dark:text-blue-300

                                                                                font-medium
                                                                            `

                                                                            : `
                                                                                text-gray-700
                                                                                dark:text-gray-300
                                                                            `
                                                                    }
                                                                `}

                                                                title={
                                                                    conversation.title
                                                                }
                                                            >

                                                                <span
                                                                    className="
                                                                        block
                                                                        truncate
                                                                    "
                                                                >

                                                                    {
                                                                        conversation.title
                                                                    }

                                                                </span>

                                                            </button>


                                                            {/* Actions */}

                                                            <div
                                                                className="
                                                                    flex
                                                                    items-center

                                                                    mr-1

                                                                    opacity-0
                                                                    group-hover:opacity-100

                                                                    transition-opacity
                                                                "
                                                            >

                                                                {/* Rename */}

                                                                <button
                                                                    onClick={(
                                                                        event
                                                                    ) =>
                                                                        handleRename(
                                                                            event,
                                                                            conversation
                                                                        )
                                                                    }

                                                                    className="
                                                                        w-7
                                                                        h-7

                                                                        flex
                                                                        items-center
                                                                        justify-center

                                                                        rounded-md

                                                                        text-gray-400
                                                                        dark:text-gray-500

                                                                        hover:bg-blue-50
                                                                        dark:hover:bg-blue-950/40

                                                                        hover:text-blue-600
                                                                        dark:hover:text-blue-400

                                                                        transition
                                                                    "

                                                                    title="Rename conversation"
                                                                >

                                                                    <Pencil
                                                                        size={13}
                                                                    />

                                                                </button>


                                                                {/* Delete */}

                                                                <button
                                                                    onClick={(
                                                                        event
                                                                    ) =>
                                                                        handleDelete(
                                                                            event,
                                                                            conversation
                                                                        )
                                                                    }

                                                                    className="
                                                                        w-7
                                                                        h-7

                                                                        flex
                                                                        items-center
                                                                        justify-center

                                                                        rounded-md

                                                                        text-gray-400
                                                                        dark:text-gray-500

                                                                        hover:bg-red-50
                                                                        dark:hover:bg-red-950/40

                                                                        hover:text-red-600
                                                                        dark:hover:text-red-400

                                                                        transition
                                                                    "

                                                                    title="Delete conversation"
                                                                >

                                                                    <Trash2
                                                                        size={13}
                                                                    />

                                                                </button>

                                                            </div>

                                                        </div>

                                                    )
                                                )

                                            )}

                                        </div>

                                    </div>

                                )}

                            </div>

                        )
                    )

                )}

            </div>

        </aside>

    );

}


export default Sidebar;