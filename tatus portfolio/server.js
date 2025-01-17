const express = require("express");
const multer = require("multer");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static("public"));
app.use(express.json());

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);

    },
});
const upload = multer({ storage });

// Load videos
app.get("/api/videos", (req, res) => {
    fs.readFile("./videos.json", "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Error loading videos." });
        res.json(JSON.parse(data));
    });
});

// Upload video
app.post("/api/upload", upload.single("video"), (req, res) => {
    const newVideo = {
        title: req.body.title,
        filename: req.file.filename,
    };

    fs.readFile("./videos.json", "utf8", (err, data) => {
        const videos = JSON.parse(data || "[]");
        videos.push(newVideo);
        fs.writeFile("./videos.json", JSON.stringify(videos, null, 2), (err) => {
            if (err) return res.status(500).json({ error: "Error saving video." });
            res.json({ message: "Video uploaded successfully!" });
        });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

});