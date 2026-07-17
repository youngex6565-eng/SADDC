const express = require("express");
const router = express.Router();

// Placeholder routes for authentication
router.post("/login", (req, res) => {
    res.status(200).json({ message: "Login route placeholder" });
});

router.post("/signup", (req, res) => {
    res.status(200).json({ message: "Signup route placeholder" });
});

module.exports = router;
