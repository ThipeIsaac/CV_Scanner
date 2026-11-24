const multer = require("multer");
const path  = require("path");
const { createBrotliCompress } = require("zlib");

const storage = multer.diskStorage({ // this how we are going to store our files

    destination: (req, file, cb) => {

        cb(null, path.join(__dirname, "../uploads"));
    },
    filename: (req, file, cb) => {

        const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, unique + "-" + file.originalname);
    },

});

const fileFilter = (req, file, cb) => { // ths s where filter our fles..only accepting pdf types

    if (file.mimetype === "application/pdf"){

        cb(null, true);
    }
    else{
        cb(new Error("Only PDF files are allowed"), false);
    }

};

const upload = multer({

    storage,
    fileFilter,
    limits: {fileSize: 5 * 1024 * 1024},
});

module.exports = upload;