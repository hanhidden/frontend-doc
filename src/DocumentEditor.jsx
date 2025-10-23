import { useEffect, useState, useCallback } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setContent, setTitle } from "./documentslice";
import { io } from "socket.io-client";
import _ from "lodash";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "https://doc-edit-back.onrender.com";

export default function DocumentEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const value = useSelector((state) => state.document.content);
  const title = useSelector((state) => state.document.title);

  const [socket, setSocket] = useState(null);

  // Initialize socket
  useEffect(() => {
    const newSocket = io(BACKEND_URL);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Fetch document data
  useEffect(() => {
    if (!socket || !id) return;

    async function fetchDocumentData() {
      try {
        const response = await fetch(`${BACKEND_URL}/api/documents/${id}`);
        const data = await response.json();
        const { title, content } = data.data.attributes;

        dispatch(setTitle(title));
        dispatch(setContent(content));

        socket.emit("joinDocument", id);
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    }

    fetchDocumentData();

    return () => {
      socket.emit("leaveDocument", id);
    };
  }, [id, dispatch, socket]);

  // Listen for real-time updates
  useEffect(() => {
    if (!socket) return;

    const handleUpdate = (data) => {
      if (data.documentId === id) {
        dispatch(setContent(data.content));
        dispatch(setTitle(data.title));
      }
    };

    socket.on("documentUpdate", handleUpdate);

    return () => {
      socket.off("documentUpdate", handleUpdate);
    };
  }, [dispatch, id, socket]);

  // Debounced saving to backend
  const debouncedSave = useCallback(
    _.debounce(async (content) => {
      if (!id) return;
      try {
        await fetch(`${BACKEND_URL}/api/documents/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: { content, title } }),
        });
      } catch (error) {
        console.error("Error saving document:", error);
      }
    }, 1000),
    [id, title]
  );

  // Handle content changes
  const handleContentChange = (content) => {
    dispatch(setContent(content));
    debouncedSave(content);

    if (socket) {
      socket.emit("documentUpdated", { documentId: id, title, content });
    }
  };

  // Back button
  const handleBackButtonClick = () => navigate("/");

  const modules = {
    toolbar: [
      [{ font: [] }, { size: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#E2DAD6]">
      <header className="bg-[#6482AD] text-white p-4 font-mono rounded-t-md flex items-center justify-between">
        <h1 className="text-2xl font-bold text-center">
          &#128366; Real Time Collaborative Document Editor
        </h1>
        <button
          onClick={handleBackButtonClick}
          className="bg-[#7FA1C3] text-white py-2 px-4 rounded-md hover:bg-[#6482AD] transition-colors"
        >
          Back
        </button>
      </header>

      <main className="flex-grow p-4 flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 font-mono underline text-[#6482AD]">
          {title}
        </h1>
        <ReactQuill
          className="font-mono border border-[#7FA1C3] rounded-md w-full"
          theme="snow"
          value={value}
          onChange={handleContentChange}
          modules={modules}
        />
      </main>

      <footer className="bg-[#7FA1C3] text-white p-4 mt-4 text-center rounded-b-md">
        <p>&copy; 2024 real-time-collab-document.</p>
      </footer>
    </div>
  );
}
