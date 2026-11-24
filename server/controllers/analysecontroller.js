const fs = require("fs");
const { parsePDF } = require("../services/parserservice");
const { scoreResume } = require("../services/aiservice");

const analyseResumes = async (req, res) => {

    try{

        const { jobDescription } = req.body;
        const files = req.files?.resumes;

        if (!jobDescription || !files || files.length === 0){

            return res.status(400).json({
                error: "Please provide a job description and at least one resume."
            });
        }

        const results = [];

        for(const file of files){

            try {

               const resumeText = await parsePDF(file.path);
               const score = await scoreResume(resumeText, jobDescription);
                
               results.push({

                filename: file.originalname,
                ...score,
                });

            } catch (err) {

                results.push({
                filename: file.originalname,
                score: 0,
                verdict: "Error",
                summary: "Could not process this file.",
                strengths: [],
                gaps: [],
                error: err.message,
                });

            } finally {

                fs.unlink(file.path, () => {});
            }
        }
        
        results.sort((a, b) => b.score - a.score);
        res.json({ results });
    } catch (err){

        console.error(err);
        res.status(500).json({ error: "Something went wrong on the server." });
    }

};

module.exports = { analyseResumes };