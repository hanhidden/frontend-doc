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
