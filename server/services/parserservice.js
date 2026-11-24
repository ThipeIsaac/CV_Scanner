const { spawn } = require("child_process");
const path = require("path");

function parsePDF(filePath){

    return new Promise((resolve, reject) => {

        const pythonPath = path.join(
            __dirname,
            "../../python-parser/venv/Scripts/python.exe"
        );

        const scriptPath = path.join(
            __dirname,
            "../../python-parser/parse_resume.py"
        );

        const process = spawn(pythonPath, [scriptPath, filePath]);

        let output = "";
        let errorOutput = "";

        process.stdout.on("data", (data) => {

            output += data.toString();
        });

        process.stderr.on("data", (data) => {

            errorOutput += data.toString();
        });

        process.on("close", (code) => {

            if(code !== 0) {
                
                reject(new Error(`Python error: ${errorOutput}`));
            }
            else{

                resolve(output.trim());
            }
        });

    });
}

module.exports = { parsePDF };