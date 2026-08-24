import {
    Eye,
    Trash2,
    FileText,
} from "lucide-react";

import { deleteDocument } from "../../services/documentService";


function DocumentCard({
    id,
    name,
    pdfUrl,
    active,
    onClick,
    fetchDocuments,
}) {

    // ==========================
    // View PDF
    // ==========================

    const handleView = (e) => {

        e.stopPropagation();

        if (pdfUrl) {
            window.open(
                pdfUrl,
                "_blank"
            );
        } else {
            alert(
                "PDF URL not available."
            );
        }

    };


    // ==========================
    // Delete PDF
    // ==========================

    const handleDelete = async (e) => {

        e.stopPropagation();

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this document?"
            );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteDocument(id);

            // Refresh document list
            fetchDocuments();

        } catch (error) {

            console.error(error);

            alert(
                "Failed to delete document."
            );

        }

    };


    return (

        <div
            onClick={onClick}

            className={`
                group

                rounded-xl
                border

                p-4

                cursor-pointer

                transition-all
                duration-200

                ${
                    active

                        ? `
                            border-blue-500

                            bg-blue-50
                            dark:bg-blue-950/30

                            shadow-sm
                            shadow-blue-500/10
                        `

                        : `
                            border-gray-200
                            dark:border-gray-800

                            bg-white
                            dark:bg-[#1a1e27]

                            hover:bg-gray-50
                            dark:hover:bg-[#202530]

                            hover:border-gray-300
                            dark:hover:border-gray-700

                            hover:shadow-md
                            dark:hover:shadow-black/20
                        `
                }
            `}
        >

            <div
                className="
                    flex
                    items-center
                    justify-between
                    gap-3
                "
            >

                {/* -------------------------
                    Left Side
                ------------------------- */}

                <div
                    className="
                        flex
                        items-center
                        gap-3

                        flex-1
                        min-w-0
                    "
                >

                    {/* PDF Icon */}

                    <div
                        className="
                            w-10
                            h-10

                            shrink-0

                            rounded-lg

                            flex
                            items-center
                            justify-center

                            bg-red-50
                            dark:bg-red-950/30

                            text-red-500
                            dark:text-red-400
                        "
                    >

                        <FileText
                            size={23}
                            strokeWidth={2}
                        />

                    </div>


                    {/* Document Info */}

                    <div
                        className="
                            flex-1
                            min-w-0
                        "
                    >

                        <h3
                            className="
                                font-semibold
                                truncate

                                text-gray-900
                                dark:text-gray-100
                            "

                            title={name}
                        >
                            {name}
                        </h3>


                        <p
                            className="
                                text-sm

                                text-gray-500
                                dark:text-gray-400
                            "
                        >
                            PDF Document
                        </p>

                    </div>

                </div>


                {/* -------------------------
                    Right Side
                ------------------------- */}

                <div
                    className="
                        flex
                        items-center
                        gap-1

                        shrink-0
                    "
                >

                    {/* View */}

                    <button
                        onClick={handleView}

                        className="
                            w-8
                            h-8

                            rounded-lg

                            flex
                            items-center
                            justify-center

                            text-gray-500
                            dark:text-gray-400

                            hover:bg-blue-50
                            dark:hover:bg-blue-950/40

                            hover:text-blue-600
                            dark:hover:text-blue-400

                            transition
                        "

                        title="View PDF"
                    >

                        <Eye
                            size={17}
                        />

                    </button>


                    {/* Delete */}

                    <button
                        onClick={handleDelete}

                        className="
                            w-8
                            h-8

                            rounded-lg

                            flex
                            items-center
                            justify-center

                            text-gray-500
                            dark:text-gray-400

                            hover:bg-red-50
                            dark:hover:bg-red-950/40

                            hover:text-red-600
                            dark:hover:text-red-400

                            transition
                        "

                        title="Delete PDF"
                    >

                        <Trash2
                            size={17}
                        />

                    </button>

                </div>

            </div>

        </div>

    );

}


export default DocumentCard;