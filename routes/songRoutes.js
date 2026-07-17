const express = require("express");
const router = express.Router();

// Placeholder routes for songs
router.get("/", (req, res) => {
    res.status(200).json({ message: "Songs route placeholder" });
});

router.post("/upload", (req, res) => {
    res.status(200).json({ message: "Upload route placeholder" });
});

module.exports = router;
