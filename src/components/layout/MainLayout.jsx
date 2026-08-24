import Header from "./Header";


function MainLayout({
    sidebar,
    children,
}) {

    return (

        <div
            className="
                h-screen
                flex
                flex-col
                overflow-hidden
                bg-[#f5f7fb]
                dark:bg-[#0f1117]
                text-gray-900
                dark:text-gray-100
                transition-colors
                duration-200
            "
        >

            <Header />


            <div
                className="
                    flex
                    flex-1
                    min-h-0
                    overflow-hidden
                "
            >

                {sidebar}


                <main
                    className="
                        flex-1
                        min-w-0
                        p-4
                        lg:p-5
                        overflow-hidden
                        flex
                        flex-col
                    "
                >

                    {children}

                </main>

            </div>

        </div>

    );

}


export default MainLayout;