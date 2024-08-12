import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DocumentSelection() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newDocTitle, setNewDocTitle] = useState(""); 
  const [editingDocId, setEditingDocId] = useState(null); 
  const [editedTitle, setEditedTitle] = useState(""); 
  const navigate = useNavigate();

  const fetchDocumentsStartingFromId = async (startId) => {
    let currentId = startId;
    const fetchedDocuments = [];

    while (true) {
      try {
        const response = await fetch(`http://localhost:1337/api/documents/${currentId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.data) {
            fetchedDocuments.push(data.data);
            currentId++;
          } else {
            break;
          }
        } else {
          break;
        }
      } catch (error) {
        console.error('Error fetching document:', error);
        setError('Failed to fetch some documents, continuing...');
        break;
      }
    }

    setDocuments(fetchedDocuments);
    setLoading(false);
  };

  const createDocument = async () => {
    if (!newDocTitle) return;

    try {
      const response = await fetch(`http://localhost:1337/api/documents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: { title: newDocTitle } }),
      });

      if (response.ok) {
        const newDoc = await response.json();
        setDocuments([...documents, newDoc.data]);
        setNewDocTitle(""); 
      }
    } catch (error) {
      console.error('Error creating document:', error);
      setError('Failed to create document');
    }
  };

  const editDocumentTitle = async (id) => {
    if (!editedTitle) return;

    try {
      const response = await fetch(`http://localhost:1337/api/documents/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: { title: editedTitle } }),
      });

      if (response.ok) {
        const updatedDoc = await response.json();
        setDocuments(documents.map(doc => (doc.id === id ? updatedDoc.data : doc)));
        setEditingDocId(null);
        setEditedTitle("");
      }
    } catch (error) {
      console.error('Error editing document:', error);
      setError('Failed to edit document title');
    }
  };

  useEffect(() => {
    fetchDocumentsStartingFromId(1);
  }, []);

  const handleDocumentClick = (id) => {
    navigate(`/editor/${id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <header className="bg-[#6482AD] text-white p-4 font-mono rounded-t-md">
        <h1 className="text-2xl font-bold text-center">&#128366; Real Time Collaborative Document Editor</h1>
      </header>

      <div className="flex flex-col items-center justify-center min-h-screen bg-[#E2DAD6]">
        <h1 className="text-3xl font-bold text-[#6482AD] mb-8">Select or Create a Document</h1>
        
        {/* Input for creating a new document */}
        <div className="flex items-center mb-8">
          <input
            type="text"
            value={newDocTitle}
            onChange={(e) => setNewDocTitle(e.target.value)}
            placeholder="Enter document title"
            className="p-2 border-2 border-[#7FA1C3] rounded-md"
          />
          <button
            onClick={createDocument}
            className="ml-4 p-2 bg-[#7FA1C3] text-white rounded-md"
          >
            Create Document
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {documents.map(doc => (
            <div
              key={doc.id}
              className="cursor-pointer text-center p-4 border-2 border-[#7FA1C3] rounded-md bg-[#F5EDED] shadow-lg hover:shadow-2xl transition-shadow"
            >
              <span style={{ fontSize: '100px' }} onClick={() => handleDocumentClick(doc.id)}>&#128196;</span>
              <p className="mt-4 text-lg font-bold text-[#6482AD]" onClick={() => handleDocumentClick(doc.id)}>
                {doc.attributes.title}
              </p>

              {editingDocId === doc.id ? (
                <div>
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    placeholder="Edit title"
                    className="mt-2 p-2 border-2 border-[#7FA1C3] rounded-md"
                  />
                  <button
                    onClick={() => editDocumentTitle(doc.id)}
                    className="mt-2 p-2 bg-[#6482AD] text-white rounded-md"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingDocId(null)}
                    className="mt-2 ml-2 p-2 bg-[#7FA1C3] text-white rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setEditingDocId(doc.id);
                    setEditedTitle(doc.attributes.title);
                  }}
                  className="mt-2 p-2 bg-[#6482AD] text-white rounded-md"
                >
                  Edit Title
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-[#7FA1C3] text-white p-4 text-center rounded-b-md">
        <p>&copy; 2024 real-time-collab-document.</p>
      </footer>
    </div>
  );
}

