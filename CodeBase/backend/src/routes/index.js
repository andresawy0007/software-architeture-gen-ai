const express = require("express");
const router = express.Router();

// Define routes here
router.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

module.exports = router;
