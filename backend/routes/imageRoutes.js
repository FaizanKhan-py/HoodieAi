const express            = require("express");
const router             = express.Router();
const { generateImage }  = require("../controllers/imageController");

// Public — no auth needed to generate a preview
router.post("/generate", generateImage);

module.exports = router;
