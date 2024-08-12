// // // import React, { useEffect, useState } from "react";
// // // import ReactQuill from "react-quill";
// // // import "react-quill/dist/quill.snow.css";
// // // import { useSelector, useDispatch } from 'react-redux';
// // // import { setContent, setTitle } from "./documentslice";
// // // import { io } from 'socket.io-client';

// // // const socket = io('http://localhost:1337');

// // // export default function Example() {
// // //   const dispatch = useDispatch();
// // //   const value = useSelector(state => state.document.content);
// // //   const title = useSelector(state => state.document.title);
// // //   const count = useSelector(state => state.counter.value);
// // //   const [documents, setDocuments] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [selectedID, setSelectedID] = useState("1");

// // //   const fetchDocumentsStartingFromId = async (startId) => {
// // //     let currentId = startId;
// // //     const fetchedDocuments = [];

// // //     while (true) {
// // //       try {
// // //         const response = await fetch(`http://localhost:1337/api/documents/${currentId}`);
// // //         if (response.ok) {
// // //           const data = await response.json();
// // //           if (data.data) {
// // //             fetchedDocuments.push(data.data);
// // //             currentId++;
// // //           } else {
// // //             break;
// // //           }
// // //         } else {
// // //           break;
// // //         }
// // //       } catch (error) {
// // //         console.error('Error fetching document:', error);
// // //         setError('Failed to fetch documents');
// // //         break;
// // //       }
// // //     }

// // //     setDocuments(fetchedDocuments);
// // //     setLoading(false);
// // //   };

// // //   useEffect(() => {
// // //     fetchDocumentsStartingFromId(1);
// // //   }, []);

// // //   useEffect(() => {
// // //     async function fetchDocumentData() {
// // //       if (!selectedID) return;
// // //       try {
// // //         const response = await fetch(`http://localhost:1337/api/documents/${selectedID}`);
// // //         const data = await response.json();
// // //         const { attributes: { title, content } } = data.data;
// // //         dispatch(setTitle(title));
// // //         dispatch(setContent(content));
// // //       } catch (error) {
// // //         console.error('Error fetching document:', error);
// // //       }
// // //     }
// // //     fetchDocumentData();
// // //   }, [selectedID, dispatch]);

// // //   useEffect(() => {
// // //     if (value) {
// // //       const updateDocument = async () => {
// // //         try {
// // //           await fetch(`http://localhost:1337/api/documents/${selectedID}`, {
// // //             method: 'PUT',
// // //             headers: {
// // //               'Content-Type': 'application/json'
// // //             },
// // //             body: JSON.stringify({ data: { content: value } })
// // //           });
// // //         } catch (error) {
// // //           console.error('Error updating document:', error);
// // //         }
// // //       };
// // //       const debounceUpdate = setTimeout(updateDocument, 500);
// // //       return () => clearTimeout(debounceUpdate);
// // //     }
// // //   }, [value, selectedID]);

// // //   useEffect(() => {
// // //     socket.on('documentUpdate', (data) => {
// // //       dispatch(setContent(data.content));
// // //       dispatch(setTitle(data.title));
// // //     });

// // //     return () => {
// // //       socket.off('documentUpdate');
// // //     };
// // //   }, [dispatch]);

// // //   const handleContentChange = (content) => {
// // //     dispatch(setContent(content));
// // //     socket.emit('documentUpdated', { title, content });
// // //   };

// // //   const handleIDChange = (event) => {
// // //     setSelectedID(event.target.value);
// // //   };

// // //   const modules = {
// // //     toolbar: [
// // //       [{ 'font': [] }, { 'size': [] }],
// // //       ['bold', 'italic', 'underline', 'strike'],
// // //       [{ 'color': [] }, { 'background': [] }],
// // //       [{ 'list': 'ordered'}, { 'list': 'bullet' }],
// // //       ['link', 'image'],
// // //       ['clean']
// // //     ],
// // //   };

// // //   if (loading) return <div>Loading...</div>;
// // //   if (error) return <div>{error}</div>;

// // //   return (
// // //     <div className="flex flex-col min-h-screen bg-[#E2DAD6]">
// // //       <header className="bg-[#6482AD] text-white p-4 font-mono rounded-t-md">
// // //         <h1 className="text-2xl font-bold text-center">&#128366;  Real Time Collaborative Document Editor</h1>
// // //       </header>

// // //       <main className="flex-grow p-4 flex flex-col items-center justify-center">
// // //         <div className="mb-4">
// // //           <label htmlFor="documentSelect" className="mr-2">Select Document:</label>
// // //           <select
// // //             id="documentSelect"
// // //             value={selectedID}
// // //             onChange={handleIDChange}
// // //             className="p-2 rounded-md bg-[#F5EDED] border-2 border-[#7FA1C3]"
// // //           >
// // //             {documents.map(doc => (
// // //               <option key={doc.id} value={doc.id}>{doc.id}</option>
// // //             ))}
// // //           </select>
// // //         </div>

// // //         <h1 className="text-2xl font-bold mb-4 font-mono underline text-[#6482AD]">{title}</h1>

// // //         <ReactQuill
// // //           className="font-mono border border-[#7FA1C3] rounded-md"
// // //           theme="snow"
// // //           value={value}
// // //           onChange={handleContentChange}
// // //           modules={modules}
// // //         />
// // //       </main>

// // //       <footer className="bg-[#7FA1C3] text-white p-4 mt-4 text-center rounded-b-md">
// // //         <p>&copy; 2024 real-time-collab-document.</p>
// // //       </footer>
// // //     </div>
// // //   );
// // // }
// import { useEffect, useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { useSelector, useDispatch } from 'react-redux';
// import { setContent, setTitle } from "./documentslice";
// import { io } from 'socket.io-client';

// const socket = io('http://localhost:1337');

// export default function Example() {
//   const dispatch = useDispatch();
//   const value = useSelector(state => state.document.content);
//   const title = useSelector(state => state.document.title);
//   const [documents, setDocuments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedID, setSelectedID] = useState("1");

//   const fetchDocumentsStartingFromId = async (startId) => {
//     let currentId = startId;
//     const fetchedDocuments = [];

//     while (true) {
//       try {
//         //http://localhost:1337/api/documents/${currentId}    if in local
//         const response = await fetch(`https://doc-edit-1.onrender.com/api/documents/${currentId}`);
//         if (response.ok) {
//           const data = await response.json();
//           if (data.data) {
//             fetchedDocuments.push(data.data);
//             currentId++;
//           } else {
//             break;
//           }
//         } else {
//           break;
//         }
//       } catch (error) {
//         console.error('Error fetching document:', error);
//         setError('Failed to fetch documents');
//         break;
//       }
//     }

//     setDocuments(fetchedDocuments);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchDocumentsStartingFromId(1);
//   }, []);

//   useEffect(() => {
//     async function fetchDocumentData() {
//       if (!selectedID) return;
//       try {
//         //http://localhost:1337/api/documents/${selectedID}
//         const response = await fetch(`https://doc-edit-1.onrender.com/api/documents/${selectedID}`);
//         const data = await response.json();
//         const { attributes: { title, content } } = data.data;
//         dispatch(setTitle(title));
//         dispatch(setContent(content));
//       } catch (error) {
//         console.error('Error fetching document:', error);
//       }
//     }
//     fetchDocumentData();
//   }, [selectedID, dispatch]);

//   useEffect(() => {
//     if (value) {
//       const updateDocument = async () => {
//         try {
//           //http://localhost:1337/api/documents/${selectedID}
//           await fetch(`https://doc-edit-1.onrender.com/api/documents/${selectedID}`, {
//             method: 'PUT',
//             headers: {
//               'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ data: { content: value } })
//           });
//         } catch (error) {
//           console.error('Error updating document:', error);
//         }
//       };
//       const debounceUpdate = setTimeout(updateDocument, 500);
//       return () => clearTimeout(debounceUpdate);
//     }
//   }, [value, selectedID]);

//   useEffect(() => {
//     // Join the document room on selecting a new document
//     socket.emit('joinDocument', selectedID);

//     socket.on('documentUpdate', (data) => {
//       // Update content only if the document ID matches
//       if (data.documentId === selectedID) {
//         dispatch(setContent(data.content));
//         dispatch(setTitle(data.title));
//       }
//     });

//     return () => {
//       socket.off('documentUpdate');
//     };
//   }, [selectedID, dispatch]);

//   const handleContentChange = (content) => {
//     dispatch(setContent(content));
//     // Emit the documentUpdated event with the document ID, title, and content
//     socket.emit('documentUpdated', { documentId: selectedID, title, content });
//   };

//   const handleIDChange = (event) => {
//     setSelectedID(event.target.value);
//   };

//   const modules = {
//     toolbar: [
//       [{ 'font': [] }, { 'size': [] }],
//       ['bold', 'italic', 'underline', 'strike'],
//       [{ 'color': [] }, { 'background': [] }],
//       [{ 'list': 'ordered'}, { 'list': 'bullet' }],
//       ['link', 'image'],
//       ['clean']
//     ],
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="flex flex-col min-h-screen bg-[#E2DAD6]">
//       <header className="bg-[#6482AD] text-white p-4 font-mono rounded-t-md">
//         <h1 className="text-2xl font-bold text-center">&#128366;  Real Time Collaborative Document Editor</h1>
//       </header>

//       <main className="flex-grow p-4 flex flex-col items-center justify-center">
//         <div className="mb-4">
//           <label htmlFor="documentSelect" className="mr-2">Select Document:</label>
//           <select
//             id="documentSelect"
//             value={selectedID}
//             onChange={handleIDChange}
//             className="p-2 rounded-md bg-[#F5EDED] border-2 border-[#7FA1C3]"
//           >
//             {documents.map(doc => (
//               <option key={doc.id} value={doc.id}>{doc.id}</option>
//             ))}
//           </select>
//         </div>

//         <h1 className="text-2xl font-bold mb-4 font-mono underline text-[#6482AD]">{title}</h1>

//         <ReactQuill
//           className="font-mono border border-[#7FA1C3] rounded-md"
//           theme="snow"
//           value={value}
//           onChange={handleContentChange}
//           modules={modules}
//         />
//       </main>

//       <footer className="bg-[#7FA1C3] text-white p-4 mt-4 text-center rounded-b-md">
//         <p>&copy; 2024 real-time-collab-document.</p>
//       </footer>
//     </div>
//   );
// }

// App.jsx
//import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DocumentSelection from "./DocumentSelection";
import DocumentEditor from "./DocumentEditor";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DocumentSelection />} />
        <Route path="/editor/:id" element={<DocumentEditor />} />
      </Routes>
    </Router>
  );
}

export default App;
