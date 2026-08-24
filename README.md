# AI Document Assistant - Frontend

A React-based frontend for an AI-powered document assistant that allows users to upload PDF documents, select documents, manage conversations, and ask questions about their uploaded content.

The frontend communicates with a FastAPI backend and uses Firebase Authentication for user authentication.

## Features

- Firebase email/password authentication
- User login and registration
- Protected application routes
- PDF document upload
- Uploaded document management
- PDF preview
- Document deletion
- Conversation management
- Streaming AI responses
- Stop response generation
- Regenerate responses
- Markdown rendering
- GitHub-Flavored Markdown support
- Syntax-highlighted code blocks
- Copy AI responses
- Light and dark themes
- Responsive application layout
- User-specific authentication state

## Tech Stack

- React
- Vite
- JavaScript
- Tailwind CSS
- React Router
- Firebase Authentication
- Axios
- React Markdown
- Remark GFM
- React Syntax Highlighter
- Lucide React
- React Icons

## Application Architecture

The frontend is organized into reusable components, pages, services, hooks, and authentication context.

```text
src/
├── api/
│   └── api.js
│
├── components/
│   ├── auth/
│   │   └── ProtectedRoute.jsx
│   │
│   ├── chat/
│   │   ├── ChatInput.jsx
│   │   ├── ChatSection.jsx
│   │   ├── ChatWindow.jsx
│   │   └── MessageBubble.jsx
│   │
│   ├── document/
│   │   ├── DocumentCard.jsx
│   │   └── UploadButton.jsx
│   │
│   └── layout/
│       ├── Header.jsx
│       ├── MainLayout.jsx
│       └── Sidebar.jsx
│
├── context/
│   └── AuthContext.jsx
│
├── hooks/
│   └── useChat.js
│
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   └── Register.jsx
│
├── services/
│   ├── authService.js
│   ├── chatService.js
│   ├── conversationService.js
│   └── documentService.js
│
├── App.jsx
├── firebase.js
├── index.css
└── main.jsx
