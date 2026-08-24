import { FiUpload } from "react-icons/fi";

function UploadButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="
                w-full

                flex
                items-center
                justify-center
                gap-2

                py-3
                px-4

                rounded-xl

                bg-blue-600
                hover:bg-blue-700
                active:bg-blue-800

                dark:bg-blue-600
                dark:hover:bg-blue-500

                text-white

                text-sm
                font-semibold

                shadow-sm
                hover:shadow-md

                transition-all
                duration-200

                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:ring-offset-2
                dark:focus:ring-offset-[#151821]
            "
        >
            <FiUpload
                size={17}
                strokeWidth={2}
            />

            Upload PDF
        </button>
    );
}

export default UploadButton;