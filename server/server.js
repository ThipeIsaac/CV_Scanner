const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const analyseRoute = require("./routes/analyseroute");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({origin: "http://localhost:5173"}));
app.use(express.json());

app.use("/api/analyseresume", analyseRoute);

app.get("/", (req, res) => {

    res.json({message: "Resume Screener API is running" });
});

app.listen(PORT, () => {
    
  console.log(`Server running on http://localhost:${PORT}`);
});