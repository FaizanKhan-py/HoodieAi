const express            = require("express");
const router             = express.Router();
import protect from "../middleware/authMiddleware.js";
const { generateImage }  = require("../controllers/imageController");

// Public — no auth needed to generate a preview
router.post("/generate",protect, generateImage);

module.exports = router;
