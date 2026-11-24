const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { analyseResumes } = require("../controllers/analysecontroller");

router.post("/analyse",
    upload.fields([{ name: "resumes", maxCount: 10}]),
    analyseResumes
);

module.exports = router;