import React from "react";
import { useState } from "react";
import axios from "axios";

function UploadForm({ setResults, setLoading, setError}){

    const [jobDescription, setJobDescription] = useState("");
    const [files, setFiles] = useState([]);

    const handleSubmit = async () => {

        if(!jobDescription.trim()){

            setError("Please enter a job description.");
            return;
        }

        if(files.length === 0){
            setError("Please upload at least one resume.");
            return;
        }

        setError("");
        setLoading(true);
        setResults([]);

        const formData = new FormData();
        formData.append("jobDescription", jobDescription);
        files.forEach((file) => formData.append("resumes", file));

        try {
            
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/analyseresume/analyse`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            setResults(res.data.results);

            } catch (err) {

                setError(err.response?.data?.error || "Something went wrong.");
            } finally {

                setLoading(false);
            }   

    }

    return(

        <section className="form-card" arial-label = "Resume Analyzer Form">

            <fieldset className="form-group">

                <label htmlFor="jobDescription">Job Description</label>
                <textarea
                id="jobDescription"
                rows={6}
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                />
            </fieldset>

            <fieldset className="form-group">

                <label htmlFor="resumeUpload">Upload Resumes (PDF only, max 10)</label>
                <input
                id="resumeUpload"
                type="file"
                accept=".pdf"
                multiple
                onChange={(e) => setFiles(Array.from(e.target.files))}
                />
                {files.length > 0 && (
                <p className="file-count">{files.length} file(s) selected</p>
                )}
            </fieldset>

            <button className="btn-primary" onClick={handleSubmit}>
                Analyze Resumes
            </button>
        </section>

    );

}

export default UploadForm;