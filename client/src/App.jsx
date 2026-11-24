import { useState } from "react";
import UploadForm from "./components/UploadForm";
import ResultsTable from "./components/ResultsTable";
import "./index.css";

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="app">
      <header>
        <h1>Resume Screener</h1>
        <p>Upload resumes and a job description — AI ranks the best matches</p>
      </header>

      <main>
        <UploadForm
          setResults={setResults}
          setLoading={setLoading}
          setError={setError}
        />
        {error && <p className="error">{error}</p>}
        {loading && <p className="loading">Analyzing resumes...</p>}
        {results.length > 0 && <ResultsTable results={results} />}
      </main>
    </div>
  );
}

export default App;