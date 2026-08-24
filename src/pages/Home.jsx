import { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import ChatSection from "../components/chat/ChatSection";
import Sidebar from "../components/layout/Sidebar";

function Home() {

    const [selectedDocument, setSelectedDocument] = useState(null);

    const [selectedConversation, setSelectedConversation] = useState(null);

    const [messages, setMessages] = useState([]);

    const [loading, setLoading] = useState(false);

    return (
        <MainLayout
            sidebar={
                <Sidebar
                    selectedDocument={selectedDocument}
                    setSelectedDocument={setSelectedDocument}
                    selectedConversation={selectedConversation}
                    setSelectedConversation={setSelectedConversation}
                />
            }
        >
            <ChatSection
                selectedDocument={selectedDocument}
                selectedConversation={selectedConversation}
                setSelectedConversation={setSelectedConversation}
                messages={messages}
                setMessages={setMessages}
                loading={loading}
                setLoading={setLoading}
            />
        </MainLayout>
    );
}

export default Home;