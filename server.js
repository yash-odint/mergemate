const express = require("express");
const path = require("path");
const multer = require("multer");
const app = express();
const cors = require("cors");
const {deleteFiles} = require("./handler/deleteFiles");
const {mergePDFs} = require("./handler/merger");
const fs = require('fs');

app.use(cors());
app.use(express.static(path.join(__dirname, "/public")));


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/");
    },
    filename: (req, file, cb) => {
        const fileName = new Date().toISOString() + file.originalname;
        cb(null, fileName);
    }
});

const upload = multer({
    storage: storage
});

app.get("/", (req, res) => {
    const uploadPath = path.join(__dirname, "/uploads")
    deleteFiles(uploadPath);
    res.sendFile(path.join(__dirname, "/view/index.html"));
});

app.post("/upload", upload.array("pdfs", 12), (req, res) => {
    res.send("uploaded");
});

app.get("/merge",  async (req, res)=>{
    const uploadsPath = path.join(__dirname, "/uploads");
    const files = fs.readdirSync(uploadsPath);
    const date = await mergePDFs(files, uploadsPath);
    res.redirect(`http://localhost:8080/merged/${date}.pdf`);
});
// app.post("/merge", upload.array("pdfs", 12), async (req, res) => {
//     const files = req.files;
//     const file1 = path.join(__dirname,files[0].path);
//     const file2 = path.join(__dirname,files[1].path);
//     const date = await mergePDFs(file1, file2);
//     res.redirect(`http://localhost:8080/static/${date}.pdf`);
// });

app.listen(8080);