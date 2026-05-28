const express    = require("express");
const router     = express.Router();
const { getDesigns, createDesign, toggleSave, deleteDesign } = require("../controllers/designController");
const { protect } = require("../middleware/authMiddleware");

router.get("/",              protect, getDesigns);
router.post("/",             protect, createDesign);
router.patch("/:id/save",   protect, toggleSave);
router.delete("/:id",       protect, deleteDesign);

module.exports = router;
